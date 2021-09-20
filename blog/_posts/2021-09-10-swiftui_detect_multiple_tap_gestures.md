---
layout:         post
title:          SwiftUI - Detect multiple tap gestures
header_title:   Blog
date:           2021-09-19
author:         Mark Sinkovics
tags:           swiftui gesture swift ios
summary:        Detect multiple gestures in SwiftUI app
---

SwiftUI offers a super easy way to recognize simple gestures and detect different gestures simultaneously on a view, for example long press, tap, magnification or rotate. However, the task gets complicated when multiple tap gestures must be recognized with various tap counts like single tap, double tap exclusively. 

The simplest way would to use `simultaneousGesture`{:.language-swift .highlight} function for each gesture that we want to recognize.

{% highlight swift linenos %}
struct GestureExample: View {
    var body: some View {
        Rectangle()
            .foregroundColor(Color.red)
            .frame(width: 100, height: 100, alignment: .center)
            .simultaneousGesture(LongPressGesture().onEnded { event in
                debugPrint("Long tap")
            })
            .simultaneousGesture(TapGesture(count: 1).onEnded { event in
                debugPrint("Single tap")
            })
            .simultaneousGesture(TapGesture(count: 2).onEnded { event in
                debugPrint("Double tap")
            })
    }
}
{% endhighlight %}

Although it is able to recognize long tap and single tap separately, in the case of double tap it triggers both single and double tap gesture recognizers. Here is the given output for double tap

{% highlight swift linenos %}
"Single tap"
"Double tap"
"Single tap"
{% endhighlight %}

The solution should be to "combine" single and double tap gesture recognizers and invoce a callback method if one of it was fired. Fortunately, by using `SimultaneousGesture`{:.language-swift .highlight} we could reach the same result. During the initalization it requires 2 different type of gesture recognizers. The `onEnded`{:.language-swift .highlight} function calls a compilation block if one of the gesture got recognized. The compilation block get called with a `SimultaneousGesture.Value`{:.language-swift .highlight} struct with parameter `first`{:.language-swift .highlight} and `second`{:.language-swift .highlight} it will be valid (not nil) `Gesture`{:.language-swift .highlight} object if the given gestuire was recognized. Here is an example: 


{% highlight swift linenos %}
struct GestureExample: View {
    var body: some View {
        Rectangle()
            .foregroundColor(Color.red)
            .frame(width: 100, height: 100, alignment: .center)
            .gesture(SimultaneousGesture(TapGesture(count: 1),TapGesture(count: 2))
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


Combine this with a previous solution now we are able to recognize long tap, sinle and double tap separately Here is a simple example code to demonstrate it:

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
