---
layout:         post
title:          SwiftUI - Detect multiple tap gestures
header_title:   Blog
date:           2021-09-10
author:         Mark Sinkovics
tags:           swiftui gesture swift ios
summary:        Detect multiple gestures in SwiftUI app
---

SwiftUI offers a super easy way to recognize simple gestures and detect different gestures simultaneously on a view, for example long press, tap, magnification or rotate. However, the task gets complicated when multiple tap gestures must be recognized with various tap counts like single tap, double tap exclusively. 

Here is a simple example code to demonstrate how to recognize a long press gesture alongside with a single and a double tap gesture on a view. The view will be represented by the  `Rectagle`{:.language-swift .highlight} class.

{% highlight swift linenos %}
struct GestureExample: View {
    var body: some View {
        Rectangle()
            .foregroundColor(Color.red)
            .frame(width: 100, height: 100, alignment: .center)
            .simultaneousGesture(LongPressGesture().onEnded { event in
                debugPrint("Long tap")
            })
            .simultaneousGesture(
                SimultaneousGesture(TapGesture(count: 1),TapGesture(count: 2))
                    .onEnded { gestures in
                        if gestures.second != nil {
                            debugPrint("Double tap")
                        } else if gestures.first != nil {
                            debugPrint("Single tap")
                        }
                    })
    }
}
{% endhighlight %}

### Links

* [Apple Dev Docs - SwiftUI Gesture](https://developer.apple.com/documentation/swiftui/gestures)
