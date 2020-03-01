# Notes

[[toc]]

## nvm 镜像

> 使用淘宝镜像。在 nvm 安装路径中可以编辑 setting.txt 文件

原本：

```txt
root: D:\nvm
path: D:\nodejs
```

添加淘宝镜像

```txt
root: D:\nvm
path: D:\nodejs
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

## H5 和 app 通信

> 1、`callAndroid`/`callIOS`为 app 端约定好的函数名  
> 2、版本：`Android >= 4.0`,`iOS >= 7`

### Andriod

> andriod 直接通过 window 对象调用 app 函数

```js
window.android.callAndroid();
//或者省略window
Android.callAndroid();
```

### IOS

> [Vue 与 iOS 的通信](https://www.jianshu.com/p/2459e6fe05ca)

```js
//至少传一个空对象
window.webkit.messageHandlers.callIOS.postMessage({});
//或者省略window
webkit.messageHandlers.callIOS.postMessage({});
```

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

## JS 中的循环

### 无回调函数

> for...in、for...of、Object.keys()和 Object.values()

- for...in 循环：只能获得对象的键名，不能获得键值
- for...of 循环：允许遍历获得键值
- [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)返回一个包含所有给定对象**自身**可枚举`属性名称`的数组
- [Object.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values)返回给定对象自身可枚举`值`的数组

```javascript
var arr = ["red", "green", "blue"];

for (let item in arr) {
  console.log("for in item", item);
}
/*
  for in item 0
  for in item 1
  for in item 2
*/

for (let item of arr) {
  console.log("for of item", item);
}
/*
  for of item red
  for of item green
  for of item blue
*/
var arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

var obj = { foo: "bar", baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]
```

### 有回调函数

> [forEach、map、filter、find、sort、some 等易错点整理](https://juejin.im/post/5ca96c76f265da24d5070563)  
> [生动形象解释 forEach、filter、map、some、every、find、findIndex、reduce 间的区别](https://juejin.im/post/5d08467fe51d451063431814)

#### forEach

:tada:**多用于对数组自身的改变和各元素相关统计性的计算**

:100:**useage**:

```js
arr.forEach((value, index, array) => {
  //do somethings
});
```

:point_right:1、改变数组本身，无返回值  
:point_right:2、不可中断，可以使用抛出异常（try/catch）的方式，但不推荐这样做  
:point_right:3、不支持后续链式操作

> 当数组中元素是**值类型**，forEach 绝对不会改变数组；当是**引用类型**，则可以改变数组

#### map

:tada:**"map"即"映射"，也就是原数组被"映射"成对应新数组**

:100:**useage**:

```js
let arrList = arr.forEach((value, index, array) => {
  //do somethings
  return value * 2;
});
```

:point_right:1、不改变数组本身，有返回值  
:point_right:2、新建一个数组，需要有承载对象  
:point_right:3、数组中的每个元素都调用一个提供的函数后返回结果

> 必须有**return**返回值

#### filter

:tada:**创建一个新数组，新数组中的元素是筛选出来的符合条件的所有对象**

:100:**useage**:

```js
let newArr = [1, 2, 3, 4, 5].filter((value, index, array) => {
  if (value > 3) return value;
});
```

:point_right:1、不改变数组本身，根据条件有返回值  
:point_right:2、新建一个数组，需要有承载对象

#### sort

:tada:**对数组的元素进行排序。排序顺序可以是字母或数字，并按升序或降序**

:100:**useage**:

```js
[3, 4, 2, 1, 5].sort();
// => [1,2,3,4,5]

["Javascript", "Vue", "React", "Node", "Webpack"].sort();
// => ["Javascript", "Node", "React", "Vue", "Webpack"]
```

:point_right:1、直接改变本身数组  
:point_right:2、默认排序按字母升序（更准确一些是根据字符串 Unicode 码点）

#### some

:tada:**用于检查数组中是否有某些符合条件**

:100:**useage**:

```js
var result = [16, 17].some(item => {
  return item > 16;
});
//true
```

:point_right:1、返回的是 Boolean 值  
:point_right:2、只要有一个满足即返回 true，**之后的不再执行**

#### every

:tada:**用于检查数组中是都某些符合条件**

:100:**useage**:

```js
var result = [16, 17].every(item => {
  return item > 16;
});
//false
```

:point_right:1、返回的是 Boolean 值  
:point_right:2、必须所有的都符合条件才返回 true

#### find

:tada:**find 和 some 很类似,找到返回第一个符合条件的对象**

:100:**useage**:

```js
var potatos = [
  { id: "1001", weight: 50 },
  { id: "1003", weight: 120 },
  { id: "1005", weight: 110 },
  { id: "1006", weight: 60 }
];

var big = potatos.find(potato => {
  return potato.weight > 100;
});
//{ id: '1003', weight: 120 }
```

:point_right:1、返回第一个符合条件的**对象**

#### findIndex

:tada:**返回第一个符合条件的索引号**

:100:**useage**:

```js
// potatos 数组上面有

var i = potatos.findIndex(potato => {
  return potato.weight > 100;
});
//2
```

#### reduce

:tada:**`Array.reduce()`接受两个参数：一个是对数组每个元素执行的`回调方法`，一个是`初始值`**

:100:**useage**:

```js
var sum = weight.reduce((sum, w) => {
  return w + sum;
}, 0);
//并不会改变原表格
```

reduce()方法接收一个回调函数作为第一个参数，回调函数又接受四个参数，分别是：  
:point_right:1、previousValue =>初始值或上一次回调函数叠加的值；  
:point_right:2、currentValue => 本次回调（循环）将要执行的值；  
:point_right:3、index=>“currentValue”的索引值；  
:point_right:4、arr => 数组本身；
