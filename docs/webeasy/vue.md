# vue 实践技巧

[[toc]]

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
import HelloWorld from "@/components/HelloWorld";

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
    },
  ],
});
```

### 2、使用 ES 中的`import`进行懒加载   **(推荐使用，也是最常用的)**

```js
const HelloWorld = () => import("@/components/HelloWorld");
export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
    },
  ],
});

/*或者*/

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: () => import("@/components/HelloWorld"),
    },
  ],
});
```

### 3、使用 VUE 中的异步组件进行懒加载

```js
export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: (resolve) => {
        require(["@/components/HelloWorld"], resovle);
      },
    },
  ],
});
```

## 自定义指令

::: tip  
[官方地址：https://cn.vuejs.org/v2/guide/custom-directive.html](https://cn.vuejs.org/v2/guide/custom-directive.html)
:::

### 全局自定义指令

> 在**main.js**中使用

```js
Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  },
});
```

### 组件自定义指令

> 在**组件**中使用

```js
directives: {
  focus: {
    inserted: function(el) {
      el.focus();
    }
  }
}
```

### 指令中使用`this`

> 在`bind`函数中的第三个参数`vnode`代表当前的虚拟 dom，`vnode.context`指代当前上下文

```js
// 验证金额
directives: {
  vaildNum: {
    // 当绑定元素插入到 DOM 中。
    bind: function(el, binding, vnode) {
      el.handler = function() {
        if (vnode.context.canInput) {
          const reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/; //不可为负数，小数点2位
          if (!reg.test(el.value)) {
            // console.log(vnode.context);
            vnode.context.$message.error("请输入正确金额数");
            el.value = null;
          } else if (el.value <= 0) {
            vnode.context.$message.error("请输入大于零金额数");
            el.value = null;
          }
        }
      };
      el.addEventListener("blur", el.handler);
    },
    //解除绑定
    unbind: function(el) {
      el.removeEventListener("blur", el.handler);
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

## 滚动到指定`id`位置

```js
document.querySelector("#minSize").scrollIntoView(true);
```

> 1、scrollIntoView()：h5 标准，默认参数为`true`(顶部对齐),为`false`是底部对齐  
> 2、querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。

## `vue/cli`全局引用 sass

> 官方解释：[CSS 相关](https://cli.vuejs.org/zh/guide/css.html)

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: `@import "~@/variables.sass"`,
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "~@/variables.scss";`,
      },
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: "#fff",
        },
      },
    },
  },
};
```

## `Axios`请求参数

### 1、`get`,需使用 **params** 解析数据

```JS
axios.get('demo/url?id=132&name=xie')
axios.get('demo/url', { params: updata })
```

### 2、`delete`,和 get 是同一种方式

```js
axios.delete("/demo/url", { data: updata }); //服务端使用body接收数据
axios.delete("/demo/url", { params: updata }); //服务端使用url接收数据
```

### 3、`post` / `put` / `patch`

(1) 传参格式为 **formData**

```js
// 全局请求头:'Content-Type'= 'application/x-www-form-urlencoded'
// request的Header:'Content-Type'= 'multipart/form-data'

let formData = new FormData();
formData.append("user", 123456);
formData.append("pass", 12345678);
axios.post("/demo/url", formData);
```

(2) 传参格式为 **query** 形式

```js
// 全局请求头:'Content-Type'= 'application/x-www-form-urlencoded'
// request的Header:'Content-Type'= 'application/x-www-form-urlencoded'

// 使用qs.stringify
axios.post("demo/url", qs.stringify(updata)); //使用qs进行编码
```

(3) 传参格式为 **JSON**形式

> 第一种情况：axios 将 JavaScript 对象序列化为 JSON

```js
// 全局请求头:'Content-Type'= 'application/x-www-form-urlencoded'
// request的Header:'Content-Type'= 'application/json;charset=UTF-8' (请求头变了)

let updata = { id: 132, name: "xie" };
axios.post("/demo/url", updata, { headers: { "Content-Type": "application/json;charset=utf-8" } });
```

> 第二种情况：

```js
// 全局请求头:'Content-Type'= 'application/json;charset=UTF-8' (全局请求头变了)
// request的Header:'Content-Type'= 'application/json;charset=UTF-8'(请求头变了)

let updata = JSON.stringify({ id: 132, name: "xie" });
axios.post("/demo/url", updata, { headers: { "Content-Type": "application/json;charset=utf-8" } });
```

## `Render`函数

### render 定义

> Render 函数：render 函数接收一个 `createElement` 方法作为第一个参数用来创建 VNode（虚拟 DMO）

```js
render: function (createElement) {
    //do something
    return creatElement(参数1, 参数2, 参数3)
}
```

### 参数解析

> 参数 1：必须，渲染的 HTML 标签。类型可以是字符串、对象或函数。比如”div”就是创建一个  `<div>`标签  
> 参数 2：可选，类型是对象。主要用于设置这个 dom 的一些样式、属性、传的组件的参数、绑定事件之类  
> 参数 3：可选，"文本节点"，类型是数组或字符串

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

> 将 `h` 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例。所以有了其他写法。

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

#### 一个 render 渲染内部多个子元素

> 在第二个参数中写入一个数组，数组中可以用 h 再次创建 Vnode

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

## 可复用性&组合

### 1.Vue.extend

> 1、[官方解释](https://cn.vuejs.org/v2/api/#Vue-extend)  
> 1、使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象  
> 2、是全局 API

```javascript
// 创建构造器
var Profile = Vue.extend({
  template: "<p>{{extendData}}</br>实例传入的数据为:{{propsExtend}}</p>",
  data: function() {
    return {
      extendData: "这是extend扩展的数据",
    };
  },
  props: ["propsExtend"],
});

// 创建 Profile 实例，并挂载到一个元素上。可以通过propsData传参.
new Profile({ propsData: { propsExtend: "我是实例传入的数据" } }).$mount("#app-extend");
```

> `$mount`:手动挂载到 el 中。 [官方解释](https://cn.vuejs.org/v2/api/#vm-mount)

### 2.Vue.component

> 1、全局注册组件，有两个参数  
> 2、a:组件名，b:一个对象或 extend 构造器

```javascript
//1.创建组件构造器
var obj = {
  props: [],
  template: "<div><p>{{extendData}}</p></div>",
  data: function() {
    return {
      extendData: "这是Vue.component传入Vue.extend注册的组件",
    };
  },
};
var Profile = Vue.extend(obj); // extend构造

//2.注册组件方法一:传入Vue.extend扩展过得构造器
Vue.component("component-one", Profile);

//2.注册组件方法二:直接传入
Vue.component("component-two", obj);
```

### 3.mixins(混入)

> 1、来分发 Vue 组件中的可复用功能  
> 1、值可以是一个**混合对象数组**,混合实例可以包含选项,将在 extend 将相同的选项合并 mixins 代码  
> 3、[官方文档](https://cn.vuejs.org/v2/guide/mixins.html)

```javascript
var mixin = {
  data: { mixinData: "我是mixin的data" },
  created: function() {
    console.log("这是mixin的created");
  },
  methods: {
    getSum: function() {
      console.log("这是mixin的getSum里面的方法");
    },
  },
};

var mixinTwo = {
  data: { mixinData: "我是mixinTwo的data" },
  created: function() {
    console.log("这是mixinTwo的created");
  },
  methods: {
    getSum: function() {
      console.log("这是mixinTwo的getSum里面的方法");
    },
  },
};

var vm = new Vue({
  el: "#app",
  data: { mixinData: "我是vue实例的data" },
  created: function() {
    console.log("这是vue实例的created");
  },
  methods: {
    getSum: function() {
      console.log("这是vue实例里面getSum的方法");
    },
  },
  mixins: [mixin, mixinTwo],
});

//打印结果为:
这是mixin的created;
这是mixinTwo的created;
这是vue实例的created;
这是vue实例里面getSum的方法;
```

::: tip
1.mixins 执行的顺序为 mixins>mixinTwo>created(vue 实例的生命周期钩子)  
2.选项中数据属性如 data,methods,后面执行的回覆盖前面的,而生命周期钩子都会执行
:::

### 4.extends

> 1、extends 用法和 mixins 很相似,只不过接收的参数是简单的选项对象或构造函数  
> 2、extends 只能单次扩展一个组件

```javascript
var extend = {
  data: { extendData: "我是extend的data" },
  created: function() {
    console.log("这是extend的created");
  },
  methods: {
    getSum: function() {
      console.log("这是extend的getSum里面的方法");
    },
  },
};
var mixin = {
  data: { mixinData: "我是mixin的data" },
  created: function() {
    console.log("这是mixin的created");
  },
  methods: {
    getSum: function() {
      console.log("这是mixin的getSum里面的方法");
    },
  },
};

var vm = new Vue({
  el: "#app",
  data: { mixinData: "我是vue实例的data" },
  created: function() {
    console.log("这是vue实例的created");
  },
  methods: {
    getSum: function() {
      console.log("这是vue实例里面getSum的方法");
    },
  },
  mixins: [mixin],
  extends: extend,
});

//打印结果
这是extend的created;
这是mixin的created;
这是vue实例的created;
这是vue实例里面getSum的方法;
```

::: tip
1.extends 执行顺序为:extends>mixins>mixinTwo>created  
2.定义的属性覆盖规则和 mixins 一致
:::

### 5.components

> 1、注册一个局部组件

```javascript
//1.创建组件构造器
var obj = {
  props: [],
  template: "<div><p>{{extendData}}</p></div>",
  data: function() {
    return {
      extendData: "这是component局部注册的组件",
    };
  },
};

var Profile = Vue.extend(obj);

//3.挂载
new Vue({
  el: "#app",
  components: {
    "component-one": Profile,
    "component-two": obj,
  },
});
```

### 6.install

> 1、开发插件，第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象  
> 2、**vue.use**方法可以调用 install 方法,会自动阻止多次注册相同插件  
> 3、[插件](https://cn.vuejs.org/v2/guide/plugins.html)  [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

```javascript
var MyPlugin = {};
MyPlugin.install = function(Vue, options) {
  // 2. 添加全局资源,第二个参数传一个值默认是update对应的值
  Vue.directive("click", {
    bind(el, binding, vnode, oldVnode) {
      //做绑定的准备工作,添加时间监听
      console.log("指令my-directive的bind执行啦");
    },
    inserted: function(el) {
      //获取绑定的元素
      console.log("指令my-directive的inserted执行啦");
    },
    update: function() {
      //根据获得的新值执行对应的更新
      //对于初始值也会调用一次
      console.log("指令my-directive的update执行啦");
    },
    componentUpdated: function() {
      console.log("指令my-directive的componentUpdated执行啦");
    },
    unbind: function() {
      //做清理操作
      //比如移除bind时绑定的事件监听器
      console.log("指令my-directive的unbind执行啦");
    },
  });

  // 3. 注入组件
  Vue.mixin({
    created: function() {
      console.log("注入组件的created被调用啦");
      console.log("options的值为", options);
    },
  });

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function(methodOptions) {
    console.log("实例方法myMethod被调用啦");
  };
};

//调用MyPlugin
Vue.use(MyPlugin, { someOption: true });

//3.挂载
new Vue({
  el: "#app",
});
```

### 案例：全局自定义`v-loading`

```javascript
// directive.js
import Vue from "vue";
//TrinityRingsSpinner.vue 为loading动画组件
import Loading from "./components/TrinityRingsSpinner.vue";
const Mask = Vue.extend(Loading); //
const loadingDirective = {};
loadingDirective.install = (Vue) => {
  Vue.directive("loading", {
    bind: function(el, binding) {
      const mask = new Mask({
        el: document.createElement("div"),
        data: {},
      });
      el.instance = mask;
      el.mask = mask.$el;
      el.maskStyle = {};
      binding.value && toggleLoading(el, binding);
    },
    update: function(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: function(el) {
      el.instance && el.instance.$destroy();
    },
  });
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      el.classList.add("position-relative");
      Vue.nextTick(() => {
        insertDom(el, el, binding);
      });
    } else {
      el.classList.remove("position-relative");
      el.instance.visible = false;
    }
  };
  // 插入Loading
  const insertDom = (parent, el) => {
    parent.appendChild(el.mask);
    el.instance.visible = true;
  };
};
export default loadingDirective;
```

```javascript
// main.js
import loading from "./directive.js";
Vue.use(loading);
```

```vue
<template>
  <div class="trinity-rings-spinner" v-show="visible">
    <div class="circle-wrap" :style="circleStyle">
      <div class="circle circle1" :style="ring1Style"></div>
      <div class="circle circle2" :style="ring2Style"></div>
      <div class="circle circle3" :style="ring3Style"></div>
    </div>
    <div class="loading-txt" :style="txtStyle">加载中...</div>
  </div>
</template>

<script>
export default {
  name: "TrinityRingsSpinner",
  data() {
    return {
      visible: true, //控制显示
      size: 120,
      color: "#ff1d5e", //颜色
    };
  },
  computed: {
    // 动态计算转圈
  },
};
</script>

<style scoped>
/* 省略 */
</style>
```
