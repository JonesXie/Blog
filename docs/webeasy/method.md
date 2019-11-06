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

## 复制指定文字到剪切板

```js
export function copyText(text){
  if(document.execCommand('Copy')){
    //创建input
    var inputZ = document.createElement('input');
    //添加Id,用于后续操作
    inputZ.setAttribute('id','inputCopy');
    //获取传入的值
    inputZ.value = text;
    //创建的input添加到body
    document.body.appendChild(inputZ);
    //选中input中的值(使用前面的Id)
    document.getElementById('inputCopy').select();
    //把值复制下来
    document.execCommand('Copy')
    //删除添加的input
    document.body.removeChild(inputZ);
  }else{
    // 复制失败
    alert('复制失败')
  }
}
```
