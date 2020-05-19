# 常用 JS 方法

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
var result = [16, 17].some((item) => {
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
var result = [16, 17].every((item) => {
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
  { id: "1006", weight: 60 },
];

var big = potatos.find((potato) => {
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

var i = potatos.findIndex((potato) => {
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

## 空值验证

```js
export function notNull(val) {
  let temp = true;
  ([undefined, null, ""].includes(val) || JSON.stringify(val) === "{}") && (temp = false);
  return temp;
}
```

## 时间转化

建议使用 moment.js 或者 day.js

> 1、momen.js 中文:[http://momentjs.cn/](http://momentjs.cn/)  
> 2、day.js:[https://github.com/iamkun/dayjs](https://github.com/iamkun/dayjs)

```js
export function getTime(val) {
  let now = new Date();
  val && (now = new Date(val));
  let year = now.getFullYear(),
    month = now.getMonth() + 1,
    date = now.getDate(),
    hour = now.getHours(),
    minute = now.getMinutes(),
    second = now.getSeconds();
  function add0(m) {
    return m < 10 ? "0" + m : m;
  }
  return year + "-" + add0(month) + "-" + add0(date) + " " + add0(hour) + ":" + add0(minute) + ":" + add0(second);
}
```

## 隐藏电话

```js
export function hideTel(val) {
  let arr = val.split("");
  if (arr.length === 11) {
    return `${arr[0]}${arr[1]}${arr[2]}****${arr[7]}${arr[8]}${arr[9]}${arr[10]}`;
  }
  return false;
}
```

## 深度拷贝

```js
export function deepClone(obj) {
  let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone;
}
```

## 复制指定文字到剪切板

```js
export function copyText(text) {
  if (document.execCommand("Copy")) {
    //创建input
    var inputZ = document.createElement("input");
    //添加Id,用于后续操作
    inputZ.setAttribute("id", "inputCopy");
    //获取传入的值
    inputZ.value = text;
    //创建的input添加到body
    document.body.appendChild(inputZ);
    //选中input中的值(使用前面的Id)
    document.getElementById("inputCopy").select();
    //把值复制下来
    document.execCommand("Copy");
    //删除添加的input
    document.body.removeChild(inputZ);
  } else {
    // 复制失败
    alert("复制失败");
  }
}
```

## 去除字符串的空格

```js
export function trim(str) {
  return str.replace(/\s|\xA0/g, "");
}
```

## 验证手机号

```js
export function validTel(rule, value, callback) {
  const reg = /^1[3-9]\d{9}$/;
  reg.test(value) ? callback("success") : callback(new Error("请输入正确手机号码"));
}
```

## 验证身份证号

```js
export function checkID(rule, IDNumber, callback) {
  let reg15 = /^\d{8}(0\d|11|12)([0-2]\d|30|31)\d{3}$/; //15位
  let reg18 = /^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/; //18位
  //判断15位
  if (reg15.test(IDNumber)) {
    callback("success");
  }
  //判断第18位校验值
  if (reg18.test(IDNumber)) {
    let IDArr = IDNumber.split("");
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    let code = IDNumber.substring(17);
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += IDArr[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      callback("success");
    } else {
      callback(new Error("非法身份证号，请仔细检查！"));
    }
  } else {
    callback(new Error("非法身份证号，请仔细检查！"));
  }
}
```

## 获取 url 中参数

> 根据 **name** 获取到 url 中对应的 query 参数

```js
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
```

## 比较数组内值是否相同

> 1、判断数组内的值相等，**不论顺序**  
> 2、必须是一维数组

```js
export function compareArr(arra, arrb) {
  let temp = false;
  arra.length == arrb.length &&
    arra.forEach((v) => {
      !arrb.includes(v) && (temp = false);
    });
  return temp;
}
```

## 防抖

> 1、搜索框/滚动条 短时间内大量触发同一事件，只会执行一次函数  
> 2、实现原理:设置一个定时器，约定在 xx 毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到 xx 毫秒内无第二次操作

```js
export function debounce(func, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
```

## 节流

> 1、每隔一段时间就执行一次  
> 2、设置一个定时器，约定 xx 毫秒后执行事件，如果时间到了，那么执行函数并重置定时器

```js
export function throttle(func, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
```

## 验证微信内浏览器

```js
export function isWXNav() {
  let ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}
```

## 验证 IOS 平台

```js
export function isIOS() {
  let Nav = window.navigator.userAgent.toLowerCase();
  // let isAndroid = `${Nav}`.includes("android");
  return `${Nav}`.includes("iphone");
}
```

## h5-andriod 软键盘兼容

> 我们在 app 布局中会有个固定的底部。安卓中，输入弹窗出来，会将解压 absolute 和 fixed 定位的元素。导致可视区域变小，布局错乱。

```js
export function compatibleInput() {
  if (isIOS()) return;
  const originalHeight = document.body.clientHeight || document.documentElement.clientHeight; // 记录原有的视口高度
  window.onresize = function() {
    var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (resizeHeight < originalHeight) {
      document.body.style.height = originalHeight + "px"; // 恢复内容区域高度
      // document.getElementById("app").style.height = originalHeight + "px"; // 恢复内容区域高度
    }
  };
}
```

## h5 键盘回落

> 键盘聚焦时，页面被顶起来，键盘失焦时，将页面滚动回原本的地方

```js
export function inputDown() {
  window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
}
```

## 动态设置标签 icon 图标

```js
export function setIcon(url) {
  let link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}
```

## h5 添加 console

> 移动端调试时，添加控制台

```js
export function addConsole() {
  let vConsole = document.createElement("script");
  vConsole.type = "text/javascript";
  vConsole.src = "https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js";
  process.env.NODE_ENV === "development" &&
    document.body.appendChild(vConsole) &&
    (vConsole.onload = function() {
      // eslint-disable-next-line
      new VConsole();
    });
}
```

## 完整的**methods.js**

```js
// 空值验证
export function notNull(val) {
  let temp = true;
  ([undefined, null, ""].includes(val) || JSON.stringify(val) === "{}") && (temp = false);
  return temp;
}

// 时间转化 建议使用moment.js/day.js
export function getTime(val) {
  let now = new Date();
  val && (now = new Date(val));
  let year = now.getFullYear(),
    month = now.getMonth() + 1,
    date = now.getDate(),
    hour = now.getHours(),
    minute = now.getMinutes(),
    second = now.getSeconds();
  function add0(m) {
    return m < 10 ? "0" + m : m;
  }
  return year + "-" + add0(month) + "-" + add0(date) + " " + add0(hour) + ":" + add0(minute) + ":" + add0(second);
}

// 隐藏电话
export function hideTel(val) {
  let arr = val.split("");
  if (arr.length === 11) {
    return `${arr[0]}${arr[1]}${arr[2]}****${arr[7]}${arr[8]}${arr[9]}${arr[10]}`;
  }
  return false;
}

// 深度拷贝
export function deepClone(obj) {
  let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone;
}

// 复制指定文字到剪切板  可以使用clipboard.js插件
export function copyText(text) {
  if (document.execCommand("Copy")) {
    var inputZ = document.createElement("input");
    inputZ.setAttribute("id", "inputCopy");
    inputZ.value = text;
    document.body.appendChild(inputZ);
    document.getElementById("inputCopy").select();
    document.execCommand("Copy");
    document.body.removeChild(inputZ);
  } else {
    alert("复制失败");
  }
}

//验证手机号 valid
export function validTel(rule, value, callback) {
  const reg = /^1[3-9]\d{9}$/;
  reg.test(value) ? callback("success") : callback(new Error("请输入正确手机号码"));
}

//验证身份证
export function checkID(rule, IDNumber, callback) {
  let reg15 = /^\d{8}(0\d|11|12)([0-2]\d|30|31)\d{3}$/; //15位
  let reg18 = /^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/; //18位
  //判断15位
  if (reg15.test(IDNumber)) {
    callback("success");
  }
  //判断第18位校验值
  if (reg18.test(IDNumber)) {
    let IDArr = IDNumber.split("");
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    let code = IDNumber.substring(17);
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += IDArr[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      callback("success");
    } else {
      callback(new Error("非法身份证号，请仔细检查！"));
    }
  } else {
    callback(new Error("非法身份证号，请仔细检查！"));
  }
}

// 根据name获取到url中对应的query参数
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

// 去除字符串的空格
export function trim(str) {
  return str.replace(/\s|\xA0/g, "");
}

// 比较两个数组内的值是否相同 1.一维数组，2.不在乎顺序
export function compareArr(arra, arrb) {
  let temp = false;
  arra.length == arrb.length &&
    arra.forEach((v) => {
      !arrb.includes(v) && (temp = false);
    });
  return temp;
}

// 防抖 --搜索框/滚动条  短时间内大量触发同一事件，只会执行一次函数
// 实现原理:设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作
export function debounce(func, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 节流 每隔一段时间就执行一次
//设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器
export function throttle(func, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

// 验证微信内浏览器
export function isWXNav() {
  let ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}

// 验证安卓or ios
export function isIOS() {
  let Nav = window.navigator.userAgent.toLowerCase();
  // let isAndroid = `${Nav}`.includes("android");
  return `${Nav}`.includes("iphone");
}

// h5-andriod 软键盘兼容
export function compatibleInput() {
  if (isIOS()) return;
  const originalHeight = document.body.clientHeight || document.documentElement.clientHeight; // 记录原有的视口高度
  window.onresize = function() {
    var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (resizeHeight < originalHeight) {
      document.getElementById("app").style.height = originalHeight + "px"; // 恢复内容区域高度
    }
  };
}

// h5键盘回落
export function inputDown() {
  window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
  // const isWechat = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
  // if (!isWechat) return;
  // const wechatVersion = wechatInfo[1];
  // const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);

  // // 如果设备类型为iOS 12+ 和wechat 6.7.4+，恢复成原来的视口
  // if (+wechatVersion.replace(/\./g, "") >= 674 && +version[1] >= 12) {
  //   window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
  // }
}

// 动态设置标签icon
export function setIcon(url) {
  let link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

// 移动端添加 console
export function addConsole() {
  let vConsole = document.createElement("script");
  vConsole.type = "text/javascript";
  vConsole.src = "https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js";
  process.env.NODE_ENV === "development" &&
    document.body.appendChild(vConsole) &&
    (vConsole.onload = function() {
      // eslint-disable-next-line
      new VConsole();
    });
}
```
