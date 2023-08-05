## Reset css
The purpose of `reset.css` and `reset_ext.css` is to strip out the style part of the html tags and to give 
only a *semantic* meaning. 
Resets like `normalize.css` and `reboot.css` includes styles as a default/fallback/base style.
Here in our use, we are not using reset.css as a fallback/default style. in this case we are resorting to the browser's style itself

For extendend resets, we are going to find them at element level and paste them here with refs. There was no 
one file that did reset perfectly for all html elements


## Units to use
We are using `rem` units for font properties and line-height. Others are based on 8x pixels
This is under the consideration of font resize based on user preference and browsers ability to resize the 
pixel based on the screen dpi

### Ref:
- https://css-tricks.com/is-it-better-to-use-ems-rems-than-px-for-font-size/ 
- https://stackoverflow.com/questions/11799236/should-i-use-px-or-rem-value-units-in-my-css
- https://www.youtube.com/watch?v=alG-UwRWV_U
