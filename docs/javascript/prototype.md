# 原型与原型链

## 构造函数

构造函数--拓展

> 1、var a={}，其实是 var a = new Object() 的语法糖  
> 2、var a=[]，其实是 var a = new Array() 的语法糖  
> 3、function Foo(){...}，其实是 var Foo = new Function(...) 的语法糖

```javascript
// es5
funtion Foo(name,age){
  this.name = name
  this.age = age
  this.class = 'class-1'
  // return this  //默认有这行
}
var f = new Foo('xie',18)

// es6 class 实现
class Foo{
  constructor(name,age){
    this.name = name
    this.age = age
    this.class = 'class-1'
  }
}
// 通过类 new 对象/实例
const f = new Foo('xie',18)

```

## 原型&原型链

### 原型规则

- 所有的引用类型(数组、对象、函数)，都具有对象特性，即可自由扩展属性(除了 **“null”** 以外)
- 所有的引用类型(数组、对象、函数)，都具一个 **`__proto__`** （隐式原型）属性，属性值是一个**普通的对象**
- 所有的**函数**，都有一个 **`prototype`** （显式原型）属性，属性值也是一个**普通的对象**
- 所有的引用类型(数组、对象、函数)， **`__proto__`** 属性值指向它的**构造函数的`prototype`属性值**
- 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 **`__proto__`** （即它的**构造函数** 的**prototype**中寻找）

```javascript
//自由拓展属性
var obj = {};
obj.a = 100;
var arr = [];
arr.a = 100;
function fn() {}
fn.a = 100;
// 隐式原型
console.log(obj.__proto__);
console.log(arr.__proto__);
console.log(fn.__proto__);
// 函数有prototype
console.log(fn.prototype);
// __proto__指向构造函数的 prototype
console.log(obj.__proto__ === Object.prototype);

// 原型链
// 构造函数
function Foo(name,age){
  this.name = name
}
Foo.prototype.alertName = function(){
  alert(this.name)
}
// 创建示例
var f = new Foo('xie)
f.printName= function (){
  console.log(this.name)
}
f.printName()
f.alertName()
```

### 原型链

> 原型链最终指向 Object 对象的隐式原型，浏览器将其设置为**null**

![git](@/prototype.png "git命令总结")

### new 一个对象过程

> 1、创建一个新对象  
> 2、this 指向这个新对象  
> 3、执行代码，即对 this 赋值  
> 4、返回 this

```javascript
funtion Foo(name,age){
  this.name = name
  this.age = age
  this.class = 'class-1'
  // return this  //默认有这行
}
var f = new Foo('xie',18)
```

## typeof、instanceof 和 hasOwnProperty

### typeof

typeof 操作符返回一个字符串，表示**未经计算的操作数的类型**。[MDN 解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

```javascript
// JavaScript 诞生以来便如此
typeof null === "object";

// 除 Function 外的所有构造函数的类型都是 'object'
var str = new String("String");
var num = new Number(100);
typeof str; // 返回 'object'
typeof num; // 返回 'object'

var func = new Function();
typeof func; // 返回 'function'

// 对象
typeof { a: 1 } === "object";

// 使用 Array.isArray 或者 Object.prototype.toString.call
// 区分数组和普通对象
typeof [1, 2, 4] === "object";

typeof new Date() === "object";
```

### instanceof

instanceof 运算符用于检测构造函数的 **`prototype`** 属性是否出现在某个实例对象的原型链上。会去隐式原型中查找，直到找到为止。

```javascript
class Pepole {
  constructor(name) {
    this.name = name;
  }
  eat() {
    return `${this.name} eat food!`;
  }
}
class Teacher extends Pepole {
  constructor(name, major) {
    super(name);
    this.major = major;
  }
  major() {
    return `${this.name} major is ${this.major}.`;
  }
}
class Study extends Pepole {
  constructor(name, number) {
    super(name);
    this.number = number;
  }
  number() {
    return `${this.name} number is ${this.number}.`;
  }
}

const xie = new Study("xie", 13);
xie instanceof Study; // true
xie instanceof Pepole; // true
xie instanceof Object; // true
xie instanceof Teacher; // false

[] instanceof Array; // true
[] instanceof Object; // true

{} instanceof Object; // true
```

### hasOwnProperty

hasOwnProperty() 方法会返回一个布尔值，指示 **`对象自身属性`** 中是否具有指定的属性（也就是，是否有指定的键）。

> 即使属性的值是 `null` 或 `undefined`，只要属性存在，hasOwnProperty 依旧会返回 `true`。

```javascript
o = new Object();
o.hasOwnProperty("prop"); // 返回 false
o.prop = "exists";
o.hasOwnProperty("prop"); // 返回 true
//特殊例子
o = new Object();
o.propOne = null;
o.hasOwnProperty("propOne"); // 返回 true
o.propTwo = undefined;
o.hasOwnProperty("propTwo"); // 返回 true
```
