# ⚡ 随手笔记

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

## IOS h5 input 垂直居中

```css
line-height: normal;
```

## 微信 jssdk 支持 CommonJS

```js
// 原版
!(function (e, n) {
  "function" == typeof define && (define.amd || define.cmd)
    ? define(function () {
        return n(e);
      })
    : n(e, !0);
})(this, function (o, e) {
  ....
});

// 支持commonjs
!(function (e, n) {
  module.exports = n(e);
})(window, function (o, e) {
  ...
});
```
