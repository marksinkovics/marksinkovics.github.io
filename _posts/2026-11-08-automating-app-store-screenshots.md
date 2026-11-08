---
title: Automating App Store screenshots
description: Capture App Store screenshots for iPhone, iPad and Mac with a UI test, frame them with a Swift script and upload them with fastlane
tags: [xcode, xctest, fastlane, swift, swiftui, ios, macos]
---

When I was preparing [Runlight](/projects/runlight) for the App Store, I had to make screenshots for every device size it supports. Runlight runs on iPhone, iPad and Mac, so App Store Connect asks for iPhone 6.9", iPhone 6.3", iPad 13" and Mac screenshots. With four screens on each, that is 16 screenshots. Taking them by hand once is boring but doable. However, every time the UI changes, some of them get outdated, and I knew I would not redo them by hand every time.

So I decided to automate the whole thing, and now a single command does it:

```bash
bundle exec fastlane screenshots
```

It launches the app on the simulators and on the Mac with sample data, takes the screenshots, and puts a frame and a caption around each one. Here is a raw screenshot and the framed version of it:

{% include image-gallery.html folder="assets/img/posts/app-store-screenshots" %}

Fastlane has its own tools for this, [snapshot](https://docs.fastlane.tools/actions/snapshot/) and [frameit](https://docs.fastlane.tools/actions/frameit/). I went with plain `xcodebuild`, a UI test and a small Swift script instead, because I wanted to control the layout myself and handle the Mac app the same way as the iOS one. It has four parts:

1. The app shows sample data when it is launched with an environment variable
2. A UI test opens each screen and saves a screenshot
3. A shell script runs the test on every simulator and on the Mac
4. A Swift script draws the frame and the caption

## Sample data

The screenshots need data that looks real, but it must not contain real names, projects or tokens. It also has to be the same on every run, so a live GitLab server is not an option.

The app checks the `RUNLIGHT_SAMPLE` environment variable at launch, and if it is set, it starts with made-up data instead of the user's accounts. The check is inside `#if DEBUG`, so it never gets into the App Store build.

```swift
init() {
    #if DEBUG
    if ProcessInfo.processInfo.environment["RUNLIGHT_SAMPLE"] == "1" {
        _model = State(initialValue: AppModel(preview: SampleData.state))
        return
    }
    #endif
    _model = State(initialValue: AppModel())
}
```

`SampleData.state` is the same data the SwiftUI previews use. Two more variables decide what is on the screen: `RUNLIGHT_TAB` opens the app on a given tab, so the test does not have to tap around, and `RUNLIGHT_WIDGETS` shows all the widgets inside the app. A UI test cannot take a screenshot of the Home Screen, but it can take one of a view that draws the widgets.

## The UI test

The iOS test launches the app once for every screen, waits a bit, and attaches the screenshot to the test result. The name of the attachment is the file name we want at the end.

```swift
func testScreens() {
    let device = ProcessInfo.processInfo.environment["SCREENSHOT_DEVICE"] ?? "iphone69"
    let screens: [(name: String, environment: [String: String])] = [
        ("01_upNext", ["RUNLIGHT_TAB": "upNext"]),
        ("02_pipelines", ["RUNLIGHT_TAB": "pipelines"]),
        ("03_mergeRequests", ["RUNLIGHT_TAB": "mergeRequests"]),
        ("04_widgets", ["RUNLIGHT_WIDGETS": "1"]),
    ]

    for screen in screens {
        let app = XCUIApplication()
        app.launchEnvironment = ["RUNLIGHT_SAMPLE": "1"].merging(screen.environment) { $1 }
        app.launch()
        XCTAssertTrue(app.wait(for: .runningForeground, timeout: 15))
        sleep(2)
        attach(XCUIScreen.main.screenshot(), name: "\(device)_\(screen.name)")
        app.terminate()
    }
}

private func attach(_ screenshot: XCUIScreenshot, name: String) {
    let attachment = XCTAttachment(screenshot: screenshot)
    attachment.name = name
    attachment.lifetime = .keepAlways
    add(attachment)
}
```

Don't forget `lifetime = .keepAlways`. By default Xcode deletes the attachments of the tests that passed, and the screenshots are gone.

On the Mac the test opens the main window and clicks through the sidebar. It calls `window.screenshot()` instead of taking a screenshot of the whole screen, so the desktop and the other apps are not in the picture.

```swift
for (name, section) in [("02_upNext", "Up Next"), ("03_pipelines", "Pipelines"), ("04_reviews", "Needs My Review")] {
    window.outlines.staticTexts[section].firstMatch.click()
    sleep(2)
    attach(window.screenshot(), name: "mac_\(name)")
}
```

## Running it on every device

A shell script runs the test on each simulator. App Store Connect has a screenshot slot for each display size, so I picked one simulator per slot, and its prefix goes into the file name.

```bash
DEVICES=(
  "iPhone 17 Pro Max|iphone69"    # 6.9" display, 1320 x 2868 (required)
  "iPhone 17 Pro|iphone63"        # 6.3" display, 1206 x 2622
  "iPad Pro 13-inch (M5)|ipad13"  # 13" display, 2064 x 2752
)
```

For every simulator the script boots it, switches it to light mode, and sets the status bar to the usual 9:41 with full battery and signal. Then it runs the test:

```bash
xcrun simctl ui "$udid" appearance light
xcrun simctl status_bar "$udid" override --time 9:41 --batteryState charged --batteryLevel 100 \
  --wifiBars 3 --cellularMode active --cellularBars 4 --dataNetwork wifi

TEST_RUNNER_SCREENSHOT_DEVICE="$prefix" \
  xcodebuild test -quiet -project Runlight.xcodeproj -scheme RunlightUITests \
  -destination "id=$udid" -resultBundlePath "$WORK/$udid.xcresult"
```

The `TEST_RUNNER_` prefix is a small trick. `xcodebuild` removes the prefix and passes `SCREENSHOT_DEVICE` to the test, so the test knows which prefix to use. Without the prefix, the test never sees the variable.

After the test, the screenshots are inside the `.xcresult` bundle as attachments. `xcresulttool` can export them, together with a `manifest.json` that tells which file belongs to which attachment name:

```bash
xcrun xcresulttool export attachments --path "$result" --output-path "$export"
```

A few lines of Python read the manifest and copy every file to `build/screenshots/<name>.png`. The exported names have some extra parts after the name we gave, starting with `_0_`, so the script cuts the name there.

For the Mac it is the same `xcodebuild test` call with `-destination "platform=macOS"`. I build it signed ad hoc and without entitlements, so it needs no provisioning profiles. The sample data does not use the keychain or iCloud, so this works fine.

## The menu bar popup

There was one screen this did not work for. The main UI of Runlight on the Mac is a popup under the menu bar icon, and a UI test cannot reliably open a menu bar extra. Taking a screenshot of the whole screen would also need the Screen Recording permission.

The solution was to let the app draw the popup by itself. When `RUNLIGHT_SHOTS` is set, a debug build puts the popup's SwiftUI view into an off-screen window, renders it into a bitmap, prints it as base64 and quits.

```swift
let menu = NSHostingView(rootView: MenuContentView()
    .environment(AppModel(preview: SampleData.state)))
// put it into a borderless window and give it a second to lay out
if let rep = menu.bitmapImageRepForCachingDisplay(in: menu.bounds) {
    menu.cacheDisplay(in: menu.bounds, to: rep)
    if let png = rep.representation(using: .png, properties: [:]) {
        print("SHOT menu \(png.base64EncodedString())")
    }
}
exit(0)
```

The script runs the app, looks for the line starting with `SHOT menu` and decodes it into `mac_01_menu.png`. Unfortunately this does not work for the main window, because views with glass materials don't render this way. That is why the window screenshots come from the UI test.

## Frame and caption

The raw screenshots are fine, but most apps in the App Store have a headline and some design around the screen. I draw these with a Swift script that uses AppKit, and it runs with `swift Tools/frame-screenshots.swift`, no Xcode project needed.

The captions are in a dictionary. The key is the screen name, and a device can have its own version:

```swift
let captions: [String: Caption] = [
    "upNext": Caption(headline: "Know what needs you next", line: "Broken builds first, then reviews and merges", light: red),
    "pipelines": Caption(headline: "Every pipeline at a glance", line: "Running, passing or failing, per branch", light: amber),
    "mac_pipelines": Caption(headline: "See what failed and why", line: "Failing jobs and their logs, without the browser", light: amber),
    // ...
]
```

For every screenshot the script draws a dark gradient, the headline with a short line under it, a big coloured circle (a "status light", like on Runlight's icon), and the screenshot as a card with rounded corners and a shadow. On iPhone and iPad the card runs off the bottom of the image; on the Mac it is on the right and the caption is on the left. The card always starts at the same height, even when a headline is one line longer than the others. This way the screenshots line up nicely next to each other in the App Store.

One thing that surprised me: App Store Connect can reject a PNG with an alpha channel, even if every pixel is opaque. `NSBitmapImageRep` has an alpha channel by default, so the script draws the result into a `CGContext` without one before it saves it:

```swift
let context = CGContext(
    data: nil, width: image.width, height: image.height, bitsPerComponent: 8, bytesPerRow: 0,
    space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
)!
context.draw(image, in: CGRect(x: 0, y: 0, width: image.width, height: image.height))
```

## Uploading

The upload is a separate fastlane lane. It copies the framed screenshots into the folder structure `deliver` expects, one folder per platform, and uploads them with the App Store texts:

```ruby
deliver(
  platform: platform,
  screenshots_path: File.join(dir, platform, "screenshots"),
  sync_screenshots: true,
  skip_binary_upload: true,
  submit_for_review: false,
  # ...
)
```

With `sync_screenshots`, `deliver` only uploads the screenshots App Store Connect does not have yet (it compares the names and checksums), deletes the ones that are gone, and keeps the order. It is still a beta feature, so it needs `FASTLANE_ENABLE_BETA_DELIVER_SYNC_SCREENSHOTS=1` to be set.

## Small things

A freshly booted simulator shows some system banners for a while, and you don't want them in the first screenshot. The script simply waits 45 seconds after booting. It is not elegant, but it works.

If you have more iOS versions installed, there can be more than one "iPhone 17 Pro Max" simulator. The script reads `xcrun simctl list devices available -j` and picks the one with the newest iOS.

At the end, `simctl status_bar ... clear` resets the status bar. Otherwise the simulator stays at 9:41 the next time you use it.

## Conclusion

Setting all this up takes more time than taking 16 screenshots by hand once. But the second time it already pays off: after a UI change, new screenshots for every device are just one command and a few minutes of waiting. And since it is so cheap, the screenshots in the App Store keep matching the app.

### Links

* [Apple Dev Docs - XCTAttachment](https://developer.apple.com/documentation/xctest/xctattachment)
* [App Store Connect - Screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications)
* [fastlane - deliver](https://docs.fastlane.tools/actions/deliver/)
