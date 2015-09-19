# fancycharts.js

Fancycharts.js is a Javascript library to enhance a single percentag value with a fancy chart.
Made on top of **d3.js**, it is designed to be a visual data  component for texts.

Examples on http://fancycharts.ahoi.in


## Usage
You can use `fancycharts.js` or `fancycharts.min.js` directly with a `<script>` tag.

### Init Fancychart
```
new Fancychart(width, height, colors, color_deactivated)
```
e.g. var chart = new Fancychart(200, 120, ["#00ACE4", "#00D8A5”], '#e5e5e5');



### Module
Vertical Bar Chart
```
chart.barVertical(selector, value, *color*, *rotate*);
```
color and rotate are optional.
color must be an array of colors and set rotate to true if chart should be rotated.

![Bar Charts](http://fancycharts.ahoi.in/examples/bar.png)

Horizontal Bar Chart and Circles
```
chart.barHorizontal(selector, value, *color*);
chart.circles(selector, value, *color*);
```
![Bar Charts](http://fancycharts.ahoi.in/examples/circles.png)

Donut Chart
```
chart.donut(selector, value, *color*);
```
![Donut Chart](http://fancycharts.ahoi.in/examples/donut.png)


## To Do
Implement Textures 
http://riccardoscalco.github.io/textures/