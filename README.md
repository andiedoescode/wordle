# Limitless Words (a Wordle clone)

[Click here for live demo](https://limitless-words.netlify.app)

![screenshot](https://user-images.githubusercontent.com/98671035/183322696-18d319dc-4ae0-4c04-9b20-819120ef1ef6.png)

## How It's Made:

**Tech used:** HTML, CSS (with Animate.css), vanilla JavaScript (with Toastr)

## Optimizations

Edge cases encountered: When keyboard press of 'Enter' to close an alert, the alert continues to pop up. Mouse click dismisses the alert appropriately --> Toastr JS library was included to apply non-blocking notifications.
Animate.css library used to give improve user experience.
Added mobile background to increase performance speeds.

## Lessons Learned:

Importing using live bindings, and interpreted as a module. Nested for loops to format based on accuracy statements.
User feedback indicated that the feedback alerts were startling and thought they had done something wrong.
