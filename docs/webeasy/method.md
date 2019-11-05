# 常用JS方法

## 空值验证

```js
export function notNull(val) {
  if ([undefined, null, ''].includes(val)) {
    return false
  } else if (JSON.stringify(val) === "{}") {
    return false
  } else {
    return true
  }
}
```

## 时间转化 建议使用moment.js或者day.js

>1、momen.js中文:[http://momentjs.cn/](http://momentjs.cn/)  
>2、day.js:[https://github.com/iamkun/dayjs](https://github.com/iamkun/dayjs)

```js
function add0(m) {
  return m < 10 ? '0' + m : m
}
export function getTime(val) { //
  let now;
  if (val === undefined) {
    now = new Date()
  } else {
    now = new Date(val)
  }
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hour) + ':' + add0(minute) + ':' + add0(second)
}
```

## 隐藏电话

```js
export function hideTel(val) {
  let arr = val.split('')
  if (arr.length === 11) {
    return `${arr[0]}${arr[1]}${arr[2]}****${arr[7]}${arr[8]}${arr[9]}${arr[10]}`
  } else {
    return false
  }
}
```

## 深度拷贝

```js
export function deepClone(obj){
  let _obj = JSON.stringify(obj),objClone = JSON.parse(_obj);
  return objClone
}
```
