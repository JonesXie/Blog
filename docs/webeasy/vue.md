# vue实践技巧

## @vue/cli 使用

1、安装`@vue/cli`

```js
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

2、创建一个项目

```js
vue create my-project
# OR
vue ui
```

## 路由懒加载

### 1、未使用懒加载

```js
import HelloWorld from '@/components/HelloWorld'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:HelloWorld
    }
  ]
})
```

### 2、使用ES中的`import`进行懒加载  **(推荐使用，也是最常用的)**

```js
const HelloWorld = () => import("@/components/HelloWorld");
export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }]
})

/*或者*/

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: () => import("@/components/HelloWorld")
  }]
})
```

### 3、使用VUE中的异步组件进行懒加载

```js
export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: resolve => { require(['@/components/HelloWorld'],resovle); }
  }]
})
```

## 自定义指令

::: tip  
[官方地址：https://cn.vuejs.org/v2/guide/custom-directive.html](https://cn.vuejs.org/v2/guide/custom-directive.html)
:::

### 全局自定义指令

>在**main.js**中使用

```js
Vue.directive('focus',{
  inserted: function(el) {
    el.focus();
  }
})
```

### 组件自定义指令

>在**组件**中使用

```js
directives: {
  focus: {
    inserted: function(el) {
      el.focus();
    }
  }
}
```

### 常用指令

```js
// input 聚焦
directives: {
  focus: {
    inserted: function(el) {
      el.focus();
    }
  }
}

//验证手机号
Vue.directive('validtel', {
  // 当绑定元素插入到 DOM 中。
  bind: function (el) {
    el.handler = function () {
      let reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
      if (notNull(el.value)) {
        if (!reg.test(el.value)) {
          alert('手机号码不正确')
          el.value = null
        }
      } else {
        alert('请填写手机号码')
      }

    };
    el.addEventListener('blur', el.handler);
  },
  //解除绑定
  unbind: function (el) {
    el.removeEventListener('blur', el.handler);
  }
})

```

## VUE 滚动到指定id位置

```js
document.querySelector("#minSize").scrollIntoView(true);
```

>1、scrollIntoView()：h5标准，默认参数为`true`(顶部对齐),为`false`是底部对齐  
>2、querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。

## axios请求参数

### 1、`get`,需使用 **params** 解析数据

```JS
axios.get('demo/url?id=132&name=xie')
axios.get('demo/url', { params: updata })
```

### 2、`delete`,和get是同一种方式

```js
axios.delete('/demo/url',{ data: updata })  //服务端使用body接收数据
axios.delete('/demo/url',{ params: updata })  //服务端使用url接收数据
```

### 3、`post` / `put` / `patch`

(1) 传参格式为 **formData**

```js
// 全局请求头:'Content-Type'= 'application/x-www-form-urlencoded'
// request的Header:'Content-Type'= 'multipart/form-data'

let formData=new FormData();
formData.append('user',123456);
formData.append('pass',12345678);
axios.post("/demo/url",formData)
```

(2) 传参格式为 **query** 形式

```js
// 全局请求头:'Content-Type'= 'application/x-www-form-urlencoded'
// request的Header:'Content-Type'= 'application/x-www-form-urlencoded'

// 使用qs.stringify
axios.post('demo/url', qs.stringify(updata )) //使用qs进行编码

```

(3) 传参格式为 **JSON**形式

>第一种情况：axios将JavaScript对象序列化为JSON

```js
// 全局请求头:'Content-Type'= 'application/x-www-form-urlencoded'
// request的Header:'Content-Type'= 'application/json;charset=UTF-8' (请求头变了)

let updata ={id:132,name:'xie'}
axios.post("/demo/url",updata, {headers:{"Content-Type": "application/json;charset=utf-8"}})
```

>第二种情况：

```js
// 全局请求头:'Content-Type'= 'application/json;charset=UTF-8' (全局请求头变了)
// request的Header:'Content-Type'= 'application/json;charset=UTF-8'(请求头变了)

let updata =JSON.stringify({id:132,name:'xie'})
axios.post("/demo/url",updata, {headers:{"Content-Type": "application/json;charset=utf-8"}})
```

## render 函数

### render定义

>Render函数：render函数接收一个 `createElement` 方法作为第一个参数用来创建VNode（虚拟DMO）  

```js
render: function (createElement) {
    //do something
    return creatElement(参数1, 参数2, 参数3)
}
```

### 参数解析

>参数1：必须，渲染的HTML标签。类型可以是字符串、对象或函数。比如”div”就是创建一个 `<div>`标签  
>参数2：可选，类型是对象。主要用于设置这个dom的一些样式、属性、传的组件的参数、绑定事件之类  
>参数3：可选，"文本节点"，类型是数组或字符串  

```js
// 参数2选项
{
  'class': {
     // 和`v-bind:class`一样的API
  },
  style: {
     // 和`v-bind:style`一样的API
  },
  attrs: {
     // 正常的 html 特性
  },
  props: {
     // 组件 props
  },
  domProps: {
    // DOM 属性
  },
  on: {
    // 事件监听器基于on
    // 不支持修饰器,如 `v-on:keyup.enter`，需手动匹配 keyCode
  },
  nativeOn: {
    // 仅对于组件，用于监听原生组件，而不是组件内部使用`vm.$emit`触发的事件
  },
  directives: [
    {
      // 自定义指令，注意事项：不能对绑定的旧值设值
      // vue 会为您持续追踪
    }
  ],
  scopedSlots: {
  },
  slot: '', // 如果组件是其他组件的子组件，需为 slot 指定名称
  // 其他特殊顶层属性
  key: '',
  ref: ''
}
```

案例：

```js
render: function (createElement) {
  var self = this
  return createElement('button', {
    class: 'isTest',
    on: {
       click: () => {  alert('1') }
    }
  },'点击我')
}

将会渲染成这样:
<button class='isTest'>点击我<button>
//并且有点击事件
```

### 简写

>将 `h` 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例。所以有了其他写法。

```js
ES5:
new Vue({
  el: '#demo',
  render: function (h) {
    return (
      h(APP)
    )
  }
})

ES6：
new Vue({
  el: '#demo',
  render: h => h(APP)
})
```

### 实践案例

#### 一个render渲染内部多个子元素

>在第二个参数中写入一个数组，数组中可以用h再次创建 Vnode

```js
render: h => {
  return h('div',[
      h('button',{style:{color:red;},attrs:{....}},'提交'),
      h('input',{....}),
      h('p',{.....},'我是P标签内的内容'),
  ])
}
```

#### 实践

```js
{
  title: '操作',
  render: (h, params) => {
    let isChange = true;
    return h('div', [
      h('Button', {
        props: {
          size: 'small',
        },
        on: {
          click: () => {
            console.log(params.row)
          }
        }
      }, isChange),
      h('Button', {
        props: {
          size: 'small',
        },
        style: {
          marginLeft: '5px'
        },
        on: {
          click: () => {
             console.log(params.row)
          }
        }
      }, '详情'),
    ]);
  }
}
```
