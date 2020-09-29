# sass 和 less 简介

[[toc]]

## sass 安装

在 webpack 中安装使用：

> npm i node-sass sass-loader -D

## sass 基本用法

### sass 变量(`$`)

> 1、SASS 允许使用变量，所有变量以`$`开头
> 2、变量需要镶嵌在字符串之中，就必须需要写在`#{}`之中
> 3、使用`!default`,如果变量定义了，将不会定义，如果没有定义将重新赋值

```css
$blue: #1875e7;
div {
  color: $blue;
}

//嵌套字符串

$side: left;
.rounded {
  border-#{$side}-radius: 5px;
}
```

### sass 计算

> 1、SASS 允许在代码中使用算式
> 2、对于颜色也可以计算

```css
$var: 10px;
body {
  margin: (14px/2);
  top: 50px + 100px;
  right: $var * 10%;
}
// 计算颜色
p {
  color: #010203 * 2;
}
```

### sass 嵌套(&)

> 1、SASS 允许选择器嵌套
> 2、在嵌套的代码块内，可以使用&引用父元素

```css
div {
  hi {
    color: red;
  }
}

//嵌套

a {
  &:hover {
    color: #ffb3ff;
  }
}
```

### sass 属性嵌套

> 1、对于 css 中具有相同命名空间的属性，使用属性嵌套会简化写法

```css
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
//编译后
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

### sass 继承(@extend)

> 1、SASS 允许一个选择器，继承另一个选择器`@extend`

```css
.button-basic {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report {
  @extend .button-basic;
  background-color: red;
}

// 转化为

.button-basic,
.button-report {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report {
  background-color: red;
}
```

### sass 混合(Mixin)

可以重用的代码块

> 1、使用`@mixin`命令，定义一个代码块
> 2、使用`@include`命令，调用这个 mixin
> 3、可以指定`参数`和`缺省值`

```css
// 定义
@mixin left($value: 10px, $color: red) {
  float: left;
  margin-right: $value;
  color: $color;
}
// 调用
div {
  @include left(20px);
}
```

### sass 条件语句(@if 和@else)

```css
@if lightness($color) > 30% {
  background-color: #000;
} @else {
  background-color: #fff;
}
```

### sass 循环语句

> 1、for 循环
> 2、while 循环
> 3、each 循环

```css
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
// while
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
// each
@each $member in a, b, c, d {
  .#{$member} {
    background-image: url("/image/#{$member}.jpg");
  }
}
```

### sass 自定义函数

> 1、SASS 允许用户编写自己的函数。

```css
@function double($n) {
  @return $n * 2;
}
#sidebar {
  width: double(5px);
}
```

---

## less 安装

在 webpack 中安装使用：

> npm i less less-loader -D

## less 基本用法

### less 变量(@)

> 1、Less 允许使用变量，所有变量以`@`开头
> 2、变量需要镶嵌在字符串之中，就必须需要写在`@{}`之中

```css
@color: #999;
div {
  color: @color;
}

//嵌套字符串
@mySelector: #wrap;
@{mySelector} {
  //变量名 必须使用大括号包裹
  color: #999;
  width: 50%;
}
```

### less 计算

> 1、Less 允许在代码中使用算式
> 2、对于颜色也可以计算

```css
@var: 10px;
body {
  margin: (14px/2);
  top: 50px + 100px;
  right: @var * 10%;
}
// 计算颜色
p {
  color: #010203 * 2;
}
```

### less 嵌套(&)

> 1、Less 允许选择器嵌套
> 2、在嵌套的代码块内，可以使用&引用父元素

```css
div {
  hi {
    color: red;
  }
}

//嵌套

a {
  &:hover {
    color: #ffb3ff;
  }
}
```

### less 继承(:extend)

> 1、extend 是 Less 的一个伪类。它可继承 所匹配声明中的全部样式

```css
/* Less */
.animation {
  transition: all 0.3s ease-out;
  .hide {
    transform: scale(0);
  }
}
#main {
  &: extend(.animation);
}
#con {
  &: extend(.animation .hide);
}

/* 生成后的 CSS */
.animation,
#main {
  transition: all 0.3s ease-out;
}
.animation .hide,
#con {
  transform: scale(0);
}
```

### less 混合(Mixin)

- 多个参数时，参数之间可以用分号或逗号分隔
- **注意逗号分隔的是“各个参数”还是“某个列表类型的参数”**

> - 两个参数，并且每个参数都是逗号分隔的列表：.name(1,2,3; something, ele)
> - 三个参数，并且每个参数都包含一个数字：.name(1,2,3)
> - 使用分号，调用包含一个逗号分割的 css 列表（一个参数）： .name(1,2,3; )
> - 逗号分割默认值（两个参数）：.name(@param1:red, blue)

```css
//less编写
.mixin(@color, @padding: xxx, @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}

.div {
  .mixin(1, 2, 3; something, ele); //2个参数
}
.div1 {
  .mixin(1, 2, 3); //3个参数
}
.div2 {
  .mixin(1, 2, 3;); //1个参数
}

//编译输出
.div {
  color-3: 1, 2, 3;
  padding-3: something, ele;
  margin: 2 2 2 2;
}
.div1 {
  color-3: 1;
  padding-3: 2;
  margin: 3 3 3 3;
}
.div2 {
  color-3: 1, 2, 3;
  padding-3: xxx;
  margin: 2 2 2 2;
}
```

### less 条件表达式

#### 1、when(){}表达式

```css
// lightness() 是检测亮度的函数，用%度量
.mixin(@a) when(lightness(@a) >= 50% ) {
  background-color: black;
}
.mixin(@a) when(lightness(@a) < 50% ) {
  background-color: white;
}

.mixin(@a) {
  color: @a;
}
.class1 {
  .mixin(#ddd);
}
.class2 {
  .mixin(#555);
}

//编译输出
.class1 {
  background-color: black;
  color: #dddddd;
}
.class2 {
  background-color: white;
  color: #555555;
}
```

#### 2、**判断类型**

> 1、isnumber：是否是数字
> 2、iscolor：是否是颜色
> 3、isurl：是否是 url
> 4、isstring：是否是字符串
> 5、ispixel：是否是 px
> 6、ispercentage：是否是百分比
> ......

```css
.mixin(@a: #fff; @b: 0) when(isnumber(@b)) {
  color: @a;
  font-size: @b;
}
.mixin(@a; @b: black) when(iscolor(@b)) {
  font-size: @a;
  color: @b;
}
```

### less 循环语句

> 混合可以调用自身，当一个混合递归调用自身就构成循环结构

```css
.loop(@counter) when(@counter > 0) {
  .h@{counter} {
    padding: (10px * @counter);
  }
  .loop((@counter - 1)); //递归调用自身
}
div {
  .loop(5);
}

//编译输出
div .h5 {
  padding: 50px;
}
div .h4 {
  padding: 40px;
}
div .h3 {
  padding: 30px;
}
div .h2 {
  padding: 20px;
}
div .h1 {
  padding: 10px;
}
```
