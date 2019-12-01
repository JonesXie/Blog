# 代码规范

## 基础命名规范

### 文件夹命名

* 项目文件夹：name
* 样式文件夹：css
* 脚本文件夹：js
* 图片文件夹：img
* 静态文件夹：static / assets
* 公用文件夹：layout / public
* 页面文件夹：pages
* 组件文件夹：components
* 工具类文件夹：utils
* 外部引用文件夹：vendor
* 打包文件夹：dist
* 私有化文件夹：以 **_** 开头，如 **_static**

### html/css文件命名

>确保文件命名总是以**字母开头**而不是数字，且字母一律小写，以下划线连接且不带其他标点符号

```js
<!-- HTML -->
xie.html
xie_list.html
xie_detail.html

<!-- SASS -->
xie.scss
xie_list.scss
xie_detail.scss
```

### 图片命名

>**1. 图片业务（可选） + 图片功能 （必选）+ 图片名称（可选） + 图片精度（可选）**  
>**2.引用页名（可选）+ 图片功能 （必选）+ 图片名称（可选） + 图片精度（可选）**

例如:  wx_mod_logo@1x.png

* 图片业务(可选)：
  * tb_：淘宝
  * wx_：微信
  * sq_：手Q
* 引用页名(可选)：
  * ly_: layout页
  * pg_: page页
  * xie_list_：xie_list 页
* 图片功能(必选)：
  * mod_：是否公共，可选
  * logo_：LOGO
  * icon_：图标
  * btn_：按钮
  * bg_：背景
* 图片名称(可选)：
  * goodslist：商品列表
  * goodsinfo：商品信息
  * userava tar：用户头像
* 图片精度(可选)：
  * 普清：@1x
  * 2倍图：@2x | @3x

### ClassName命名

>必须以**字母**开头命名，且全部字母为**小写**，单词之间统一使用下划线“_” 连接

* 命名原则--以继承的形式

  ```js
  <div class="modulename">
  <div class="modulename_cover"></div>
  <div class="modulename_info">
      <div class="modulename_info_user">
        <div class="modulename_info_user_img">
          <img src="" alt="">
          <!-- 这个时候 miui 为 modulename_info_user_img 首字母缩写-->
          <div class="miui_tit"></div>
          <div class="miui_txt"></div>
          ...
        </div>
      </div>
      <div class="modulename_info_list"></div>
  </div>
  </div>
  ```

* 模块命名
  * 全站公共模块：以 mod_ 开头
  * 业务公共模块：以 业务名_mod_ 开头

* 层级命名
  * body：使用公共模板样式 mod_
  * 外层样式： mod_headr mod_admin
  * 子页面：以 pg_ 开头
  * 组件重置：以 姓名第一个字开头。 如： x_admin

## VUE命名规范

> 组件

* 组件文件命名
  * 组件文件名使用大驼峰写法
  * 例如: Home.vue  TodoList.vue

* 组件中 name 命名
  * 组件名应该始终是多个单词的
  * 组件名使用大驼峰写法
  * 例如:

  ```js
  export default {
    name: 'HomeHeader',
    data:{....}
  }
  ```

> 路由

* 路由中 path 命名
  * path应该以 / 作为开始
* 路由中 name 命名
  * name 应该和组件名一致
