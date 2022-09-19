# Limitless Words (a Wordle alternative)

Like playing Wordle, but not a fan of only getting one try per day? Limitless allows you to play as many times as you want every day. This accepts keyboard input as well as via the on screen keyboard.

[Click here for live demo](https://limitless-words.netlify.app)

![screenshot](https://user-images.githubusercontent.com/98671035/183322696-18d319dc-4ae0-4c04-9b20-819120ef1ef6.png)

## How It's Made:

**Tech used:** HTML, CSS (with Animate.css), vanilla JavaScript (with Toastr)

## Optimizations

+ Edge cases encountered: When keyboard press of 'Enter' to close an alert, the alert continued to pop up. Mouse click dismisses the alert appropriately.
+ Toastr JS library was included to apply non-blocking notifications. (User feedback indicated that the original feedback alerts were startling and thought they had done something wrong.)
+ Animate.css library used to give improve user experience.
+ Adjusted onscreen keyboard spacing and sizing for better mobile UX.
+ Added mobile background to increase performance speeds.

+ Refactor code to be more OOP and into MVC structure
+ Move word list into database

## Lessons Learned:

Importing using live bindings, and interpreting as a module. Nested for loops to format output based on accuracy statements. Using CSS animations to provide a better visual experience. 

