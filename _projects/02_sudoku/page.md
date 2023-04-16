---
layout: page
title: Sudoku - a puzzle game
header_title: Sudoku - a puzzle game
permalink: /projects/sudoku
type: main
toc: true
---

## How is it started

I love playing Sudoku, I love challenging myself with more and more difficult ones where I can practice my newly learned solving techniques. I love playing on my mobile phone, cleaner and I can generate generate boards by a click. Although, it seems a perfect solution, I found it impossible to find an app which doesn’t require continuous Internet connection, presents ads before and after games, not mentioning the size of the apps. At that point, I decided to implement my own, and to make it better, I used [Swift](https://www.swift.org) and [SwiftUI](https://developer.apple.com/xcode/swiftui/).

## Implementation

The focus was on the simplicity and the usability. I intentionally kept the main and the game screen as simple as possible, adding the required buttons and functions as much as possible. It was important for me, that user could change anything game related, like the highlighting the rows, columns, and blocks. The app was designed to work offline, generate boards offline, and not require any Internet connection. On the top of that, the app doesn’t contain any tracking/analytics, and knowing nothing about the player was a high priority.

## Release notes

* Version 2.0.1
  * Various bug fixes
* Version 2.0
  * New redesigned interface and simpler game controls
  * iPad support
  * Split-screen support
  * Bug fixes and performance improvements
* Version 1.0
  * Initial release for iPhone only

## Upcoming releases

* Version 2.1
  * Improve game history, and snapshot capability

* Version 2.2
  * Add timer to the game
  * Localize the app

* Future releases
  * Add Apple Pencil support

## Screenshots

{% include image-gallery.html folder="images/sudoku" %}

## Links

* [Privacy Policy](/projects/sudoku/privacy-policy)

## Download

[{% asset appstore.svg %}](https://apps.apple.com/ca/app/sudoku-a-puzzle-game/id1520212139)