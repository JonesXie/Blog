# 常用 JS 方法

## ES 基础知识

**[ECMAScript2015~2020 语法全解析](http://es.xiecheng.live/introduction/preface.html)**

![git](@/es6.png "es6语法")

![git](@/es7-es11.png "es7-es11语法")

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

## 常用方法合集

> 完整**methods.js**

```js
/**
 * 非空验证  undefined,null,'',{},[]
 * @param {*} 验证的值
 */
export function isTrue(val) {
  let temp = true;
  if (typeof val === "object" && val !== null) {
    temp = !["{}", "[]"].includes(JSON.stringify(val));
  } else {
    temp = !!val;
  }
  return temp;
}

/**
 * 时间转化 建议使用moment.js/day.js
 * @param {Date} 时间
 */
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

/**
 * 隐藏电话
 * @param {Number} 手机号
 */
export function hideTel(val) {
  let arr = val.split("");
  if (arr.length === 11) {
    return `${arr[0]}${arr[1]}${arr[2]}****${arr[7]}${arr[8]}${arr[9]}${arr[10]}`;
  }
  return false;
}

/**
 * 深拷贝
 * @param {*} 拷贝内容
 */
export function deepClone(obj = {}) {
  if (typeof obj !== "object" || obj == null || obj instanceof RegExp || obj instanceof Date) {
    // obj不是数据/对象，或者为 null/undefined,正则,日期,直接返回
    return obj;
  }
  let result = {};
  obj instanceof Array && (result = []);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // **递归调用**
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}

/**
 * 复制指定文字到剪切板  可以使用clipboard.js插件
 * @param {*} 复制的内容
 */
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

/**
 * 验证手机号
 * @param {*} rule
 * @param {*} 手机号
 * @param {*} 回调函数
 */
export function validTel(rule, value, callback) {
  const reg = /^1[3-9]\d{9}$/;
  reg.test(value) ? callback("success") : callback(new Error("请输入正确手机号码"));
}

/**
 * 验证身份证
 * @param {*} rule
 * @param {*} 身份证号
 * @param {*} 回调函数
 */
export function checkID(rule, IDNumber, callback) {
  let reg15 = /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g; //15位
  let reg18 = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g; //18位
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

/**
 * 获取url全部参数，返回一个对象
 */
export function getAllQuery() {
  let url = decodeURI(window.location.href);
  let temp1 = url.split("?");
  let keyValue = temp1.length > 1 ? temp1[1].split("&") : [];
  let obj = {};
  keyValue.forEach((v) => {
    let temp2 = v.split("=");
    obj[temp2[0]] = temp2[1];
  });
  return obj;
}

/**
 * 返回当前时间戳
 */
export function getExpireTime() {
  return new Date().getTime();
}

/**
 * 根据name获取到url中对应的query参数
 * @param {*} 参数名
 */
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * 去除字符串的空格
 * @param {*} 字符串
 */
export function trim(str) {
  return str.replace(/\s|\xA0/g, "");
}

/**
 * 比较两个数组内的值是否相同 1.一维数组，2.不在乎顺序
 * @param {*} 数组一
 * @param {*} 数组二
 */
export function compareArr(arra, arrb) {
  let temp = true;
  arra.length === arrb.length &&
    arra.forEach((v) => {
      !arrb.includes(v) && (temp = false);
    });
  return temp;
}

// 防抖 --搜索框/滚动条  短时间内大量触发同一事件，只会执行一次函数
// 实现原理:设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作
/**
 * 防抖-搜索框/滚动条
 * @param {*} 延迟执行函数
 * @param {*} 等待时间
 * @param  {...any} 携带参数
 */
export function debounce(func, wait, ...rest) {
  let timeout = null;
  return function() {
    let context = this;
    let args = Array.from(arguments);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, [...args, ...rest]);
    }, wait);
  };
}
let debounceTimeout = null;
/**
 * 防抖-搜索框/滚动条-传递参数
 * @param {*} 延迟执行函数
 * @param {*} 等待时间
 * @param  {...any} 携带参数
 */
export function debounceParams(func, wait, ...rest) {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    func(...rest);
  }, wait);
}

// 节流 每隔一段时间就执行一次
//设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器
/**
 * 节流 每隔一段时间就执行一次
 * @param {*} 延迟执行函数
 * @param {*} 等待时间
 */
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
let throttleTimeout = null;
/**
 * 节流 每隔一段时间就执行一次
 * @param {*} 延迟执行函数
 * @param {*} 等待时间
 * @param {*} 携带参数
 */
export function throttleParams(func, wait, ...rest) {
  if (!throttleTimeout) {
    throttleTimeout = setTimeout(() => {
      func(...rest);
    }, wait);
  }
}

/**
 * 验证微信内浏览器
 */
export function isWXNav() {
  let ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}

/**
 * 验证安卓or ios
 */
export function isIOS() {
  let Nav = window.navigator.userAgent.toLowerCase();
  // let isAndroid = `${Nav}`.includes("android");
  return `${Nav}`.includes("iphone");
}

/**
 * h5-andriod 软键盘兼容
 */
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

/**
 * h5键盘回落
 */
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

/**
 * 动态设置标签icon
 * @param {*} icon 链接
 */
export function setIcon(url) {
  let link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

/**
 * 移动端添加 console
 */
export function addConsole() {
  let vConsole = document.createElement("script");
  vConsole.type = "text/javascript";
  vConsole.src = "https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js";
  process.env.VUE_APP_VCONSOLE === "true" &&
    document.body.appendChild(vConsole) &&
    (vConsole.onload = function() {
      // eslint-disable-next-line
      new VConsole();
    });
}
```
