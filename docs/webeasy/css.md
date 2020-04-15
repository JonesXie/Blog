# CSS 常用技巧

## reset.css

```css
@charset "utf-8";
body,
ul,
ol,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
figure,
form,
fieldset,
legend,
input,
textarea,
button,
p,
blockquote,
th,
td,
pre,
xmp {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
small,
big,
input,
textarea,
button,
select {
  font-size: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
b,
strong {
  font-weight: normal;
}

address,
cite,
dfn,
em,
i,
optgroup,
var {
  font-style: normal;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

caption,
th {
  text-align: inherit;
}

ul,
ol,
li,
menu {
  list-style: none;
}

fieldset,
img {
  border: 0;
}

img,
object,
textarea,
button,
select {
  vertical-align: middle;
}

article,
aside,
footer,
header,
section,
nav,
figure,
figcaption,
hgroup,
details,
menu {
  display: block;
}

audio,
canvas,
video {
  display: inline-block;
  *display: inline;
  *zoom: 1;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "\0020";
}

textarea {
  overflow: auto;
  resize: vertical;
}

input,
textarea,
button,
select,
a {
  outline: 0 none;
  border: none;
}

button::-moz-focus-inner,
input::-moz-focus-inner {
  padding: 0;
  border: 0;
}
input::-webkit-input-placeholder {
  color: #dcdfe6;
}
input::-ms-input-placeholder {
  color: #dcdfe6;
}
input::-moz-input-placeholder {
  color: #dcdfe6;
}

mark {
  background-color: transparent;
}

a,
ins,
s,
u,
del {
  text-decoration: none;
}

sup,
sub {
  vertical-align: baseline;
}

html,
body {
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color: transparent;
  color: #333;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;
  line-height: 1;
  -webkit-text-size-adjust: none;
}
```

## public.scss

```scss
// $color: #e3f2ff;
$color: #f8f8f8;
$colorRed: #fc414a;

//单行文本溢出
.ellipsis-one {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

//两行文本溢出
.ellipsis-two {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

//三行文本溢出
.ellipsis-three {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.tc {
  text-align: center;
}

.tr {
  text-align: right;
}

.cursor {
  cursor: pointer;
}

.clear {
  &::before,
  &::after {
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
    opacity: 0;
  }
}
// 动画
.an-scale {
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
.an-scale:hover {
  transform: scale(1.3);
}
.an-up {
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
.an-up:hover {
  transform: translate3d(0, -10px, 0);
}

//按钮
@mixin btn($w, $h, $color, $radius: true, $disabled: false) {
  display: inline-block;
  width: $w;
  height: $h;
  line-height: $h;
  text-align: center;
  color: #fff;
  cursor: pointer;
  background-color: $color;

  &:active {
    opacity: 0.8;
  }

  @if $radius {
    //是否需要边框 默认需要
    border-radius: if($radius==true, $h/2, $radius);
  }
  @if $disabled {
    //是否禁用状态
    cursor: not-allowed;
    background-color: #dddddd;
  }
}

// 生成三角形
@mixin triangle($direction, $size, $borderColor) {
  content: "";
  height: 0;
  width: 0;

  @if $direction==top {
    border-bottom: $size solid $borderColor;
    border-left: $size dashed transparent;
    border-right: $size dashed transparent;
  } @else if $direction==right {
    border-left: $size solid $borderColor;
    border-top: $size dashed transparent;
    border-bottom: $size dashed transparent;
  } @else if $direction==bottom {
    border-top: $size solid $borderColor;
    border-left: $size dashed transparent;
    border-right: $size dashed transparent;
  } @else if $direction==left {
    border-right: $size solid $borderColor;
    border-top: $size dashed transparent;
    border-bottom: $size dashed transparent;
  }
}

//生成圆点
@mixin DOT($width, $color: #ddd) {
  width: $width;
  height: $width;
  border-radius: $width;
  background-color: $color;
}

//计算百分比  percentage(56 / 750)
@function math-percent($px, $base: 750) {
  @return ($px / $base) * 100%;
}

//背景图片
@mixin BG() {
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
```

## scroll-bar

```scss
.scroll-bar {
  overflow: auto;
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #bbb;
    transition: all 0.5s;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #777;
  }
}
```
