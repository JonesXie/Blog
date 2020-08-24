# CSS 常用技巧

## css 中宽高

### offsetHeight & offsetWidth

> `HTMLElement.offsetHeight`

::: tip
:white_check_mark: 只读  
:white_check_mark: 返回元素的布局高度(layout height)  
:white_check_mark: 值 = contentH + paddingH + borderH  
:white_check_mark: display:none 时，值为 0  
:white_check_mark: 不包含伪类(::before ::after)的高度  
:white_check_mark: 值的数据类型为数字  
:::

### clientHeight & clientWidth

> `Element.clientHeight`

::: tip
:white_check_mark: 只读  
:white_check_mark: 返回元素的内部高度  
:white_check_mark: 一个元素没有 css 或者这个元素是内联元素时，返回 **0**  
:white_check_mark: 值 = contentH + paddingH - scrollbarH (if present)  
:::

### scrollHeight & scrollWidth

::: tip
:white_check_mark: 只读  
:white_check_mark: 返回元素的高度，包括不可见的溢出部分  
:white_check_mark: 包含伪类的高度(::after,::before 等)  
:white_check_mark: 如果没有滚动条的话，和 clientHeight 相等  
:::

### offsetLeft & offsetTop

::: tip
:white_check_mark: 只读  
:white_check_mark: 对于块状元素，offsetLeft 和 offsetTop 描述的是当前元素的 border 外侧 距 offsetParent 的 border 内侧的距离，和 scroll 无关  
:white_check_mark: 对于内联元素，offsetLeft 和 offsetTop 描述的是当前元素的 border 外侧 距 offsetParent 的 border 外侧的距离，和 scroll 无关  
:::

## reset.css

```css
@charset "utf-8";

* {
  padding: 0;
  margin: 0;
}

*,
::before,
::after {
  background-repeat: no-repeat;
  box-sizing: inherit;
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

input::-webkit-input-placeholder,
input::-ms-input-placeholder,
input::-moz-input-placeholder {
  color: #dcdfe6;
}

mark {
  background-color: transparent;
}

a,
ins,
s,
u {
  text-decoration: none;
}

details,
main {
  display: block;
}

[hidden] {
  display: none; /* Add the correct display in IE */
}

[disabled] {
  cursor: default;
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto; /* Correct the cursor style of increment and decrement buttons in Chrome */
}

[type="search"] {
  -webkit-appearance: textfield; /* Correct the odd appearance in Chrome and Safari */
  outline-offset: -2px; /* Correct the outline style in Safari */
}

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none; /* Remove the inner padding in Chrome and Safari on macOS */
}

select {
  -moz-appearance: none; /* Firefox 36+ */
  -webkit-appearance: none; /* Chrome 41+ */
}

html,
body {
  width: 100%;
  height: 100%;
  color: #333;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: none;
}

a {
  color: #333333;
}
input {
  caret-color: #ff5353;
}

/* ios */
div {
  -webkit-appearance: none;
}
img {
  -webkit-touch-callout: none;
}
```

## public.scss

```css
$color: #f8f8f8;
$colorBg: #fafafa;
$line: #cccccc;

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
.isDisabled {
  cursor: not-allowed;
  background: #e4e4e4 !important;
  color: #999 !important;
}
.scroll {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
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

//背景图片
@mixin BG() {
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

// 扩大可点击区域
//使用：.test { @include expand-range($top: -5px, $position: absolute) }
@mixin expand-range($top: -10px, $right: $top, $bottom: $top, $left: $right, $position: relative) {
  position: $position;
  &:after {
    content: "";
    position: absolute;
    top: $top;
    right: $right;
    bottom: $bottom;
    left: $left;
  }
}
```

## scroll-bar 滚动条

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
