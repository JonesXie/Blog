# react 基础

## 安装环境

> 全局安装脚手架工具

```javascript
npm install create-react-app -g
```

> 创建项目

```javascript
create-react-app projectName
```

## 基础知识

### 组件

> 1、组件必须首字母大写，如: `<App/>`  
> 2、组件内必须是有一个包裹标签，使用`className`定义 classname  
> 3、可以使用`Fragment`当做最外层

```javascript
import React, { Component, Fragment } from "react";

class Todo extends Component {
  render() {
    return (
      <Fragment>
        <input />
        <button>点击</button>
        <ul>
          <li>加油</li>
          <li>未来</li>
        </ul>
      </Fragment>
    );
  }
}
export default Todo;
```

### 数据绑定

> 1、继承 **Component**  中的 **props**  
> 2、使用`{}`进行数据绑定， **setState**  进行改变数据， **bind**  绑定当前 **this**

```javascript
import React, { Component, Fragment } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "xie",
      list: []
    };
  }
  render() {
    return (
      <Fragment>
        <input value={this.state.inputVal} onChange={this.change.bind(this)} />
        <button>添加</button>
        <ul>
          <li>加油</li>
          <li>未来</li>
        </ul>
      </Fragment>
    );
  }
  change(e) {
    this.setState({
      inputVal: e.target.value
    });
  }
}
export default Todo;
```

### 循环数据

> 1、在 JSX 中使用数组循环方法进行循环  
> 2、必须添加 **key**  值

```javascript
import React, { Component, Fragment } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      list: ["react", "vue"]
    };
  }
  render() {
    return (
      <Fragment>
        <input value={this.state.inputVal} onChange={this.change.bind(this)} />
        <button onClick={this.addV.bind(this)}>添加</button>
        <ul>
          {this.state.list.map((v, i) => {
            return <li key={i + v}>{v}</li>;
          })}
        </ul>
      </Fragment>
    );
  }
  change(e) {
    this.setState({
      inputVal: e.target.value
    });
  }
  addV() {
    this.setState({
      list: [...this.state.list, this.state.inputVal],
      inputVal: ""
    });
  }
}
export default Todo;
```

### 数据增删

> 1、不能直接操作 **this.state**  中的数据

```javascript
import React, { Component, Fragment } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      list: ["react", "vue"]
    };
  }
  render() {
    return (
      <Fragment>
        <input value={this.state.inputVal} onChange={this.change.bind(this)} />
        <button onClick={this.addV.bind(this)}>添加</button>
        <ul>
          {this.state.list.map((v, i) => {
            return (
              <li key={i + v} onClick={this.delItem.bind(this, i)}>
                {v}
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
  change(e) {
    this.setState({
      inputVal: e.target.value
    });
  }
  addV() {
    this.setState({
      list: [...this.state.list, this.state.inputVal],
      inputVal: ""
    });
  }
  delItem(i) {
    // 千万不能直接操作 this.state中数据
    let list = this.state.list;
    list.splice(i, 1);
    this.setState({
      list: list
    });
  }
}
export default Todo;
```

### JSX 注意事项

```javascript

1、使用  {/*我是注释*/}  注释
2、class应该写成 className ，如：<h2 className='xie'>nihao</h2>
3、HTML 解析， dangerouslySetInnerHTML ，如：<li dangerouslySetInnerHTML={{__html:item}}></li>
4、label 标签中使用 for，如：<label htmlFor='xie'></label>

```

### 组件传值

> 1、父组件向子组件通过**props**传值  
> 2、子组件通过调用父组件传来的**props**向上级传值

```javascript
//父组件
import TodoItem from "./TodoItem"

render() {
  return (
    <Fragment>
      <input value={this.state.inputVal} onChange={this.change.bind(this)} />
      <button onClick={this.addV.bind(this)}>添加</button>
      <ul>
        {
          this.state.list.map((v, i) => {
            return (
              <TodoItem key={i + v} content={v} index={i} del={this.delItem.bind(this)}></TodoItem>
            )
          })
        }
      </ul>
    </Fragment>
  )
}

  //子组件
import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.handlerClick = this.handlerClick.bind(this)
  }
  render() {
    return (
      <li onClick={this.handlerClick}>{this.props.content}</li>
    );
  }
  handlerClick() {
    this.props.del(this.props.index)
  }
}

export default TodoItem
```

### 组件默认值&校验

> 1、引入 **props-type**  做校检  
> 2、使用 **propTypes**  做类型校验  
> 3、使用 **defaultProps**  设置默认值

```javascript
import React, { Component } from 'react';
import PropTypes from "prop-types"

class TodoItem extends Component {
   ....
}

//校检类型
TodoItem.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string.isRequired //必须传值
}

//默认值
TodoItem.defaultProps = {
  name: 'react'
}

export default TodoItem;
```

### refs 标签

> 1、ref 绑定当前 DOM 到自己指定的变量中  
> 2、ref 绑定是使用函数进行绑定的

```javascript
<input onChange={this.change.bind(this)} ref={input=>this.input=input}/>
change(){
  this.setData({
  value:this.input.value
  },()=>{
  // do somethings
  })
  //setData有一个回调函数，表明已经修改完data
}
```

### 生命周期

![lifeimg](@/lifeimg.png "生命周期")

#### 1、construcotr()

constructor()完成 react 数据初始化，接受 **props**  和 **context**  两个参数，使用 **super()**  传入

> 只要使用了 constructor，就必须使用 super(),否则会导致 **this 指向问题**

```javascript
class Todo extends Component {
  constructor(props, context) {
    super(props, context);
  }
}
```

#### 2、componentWillMount()

常用在服务端，还未渲染 DOM

> 此钩子将废弃，并重命名为 **UNSAFE_componentWillMount**

```javascript
class Todo extends Component {
  componentWillMount() {
    console.log("componentWillMount");
  }
}
```

#### 3、componentDidMount()

DOM 节点已经生成，可以调用 **ajax**  请求了

```javascript
class Todo extends Component {
  componentDidMount() {
    console.log("componentDidMount");
  }
}
```

#### 4、componentsWillReceiveProps(nextProps)

> 1、在接受父组件改变后的 props 需要重新渲染组件时用到的比较多  
> 2、接受一个参数 nextProps

```javascript
class Todo extends Component {
  componentsWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
}
```

#### 5、shouldComponentUpdate(nextProps,nextState)

> 1、主要用于性能优化(部分更新)  
> 2、必须返回一个**布尔值**  
> 3、唯一用于控制组件重新渲染的生命周期，由于在 react 中，setState 以后，state 发生变化，组件会进入重新渲染的流程，在这里 return false 可以阻止组件的更新。

```javascript
class Todo extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
  }
}
```

#### 6、componentWillUpdata(nextProps,nextState)

组件进入重新渲染的流程

```javascript
class Todo extends Component {
  componentWillUpdata(nextProps, nextState) {
    console.log(nextProps, nextState);
  }
}
```

#### 7、componentDidUpdata(nextProps,nextState)

组件更新完毕

```javascript
class Todo extends Component {
  componentDidUpdata(nextProps, nextState) {
    console.log(nextProps, nextState);
  }
}
```

#### 8、render()

render 函数会插入 jsx 生成的 dom 结构

```javascript
class Todo extends Component {
  render(){
  return(
    .....
  )
  }
}
```

#### 9、componentWillUnmount()

在此处完成组件的卸载和数据的销毁

> 1、clear 你在组建中所有的 setTimeout,setInterval  
> 2、移除所有组建中的监听 removeEventListener  
> 3、当 ajax 请求尚未完成时，销毁组件将报一个 warning。

```javascript
class Todo extends Component {
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}
```

### 动画

> 使用官方动画插件: **react-transition-group**

```javascript
npm install react-transition-group --save
```

#### CSSTransition

> 引入：**import { CSSTransition } from 'react-transition-group'**

添加关键帧

```css
xxx-enter: 进入（入场）前的CSS样式;
xxx-enter-active: 进入动画直到完成时之前的CSS样式;
xxx-enter-done: 进入完成时的CSS样式;
xxx-exit: 退出（出场）前的CSS样式;
xxx-exit-active: 退出动画知道完成时之前的的CSS样式;
xxx-exit-done: 退出完成时的CSS样式。;
```

案例：

```javascript
//js
render() {
    return (
        <div>
            <CSSTransition
                in={this.state.isShow}   //用于判断是否出现的状态
                timeout={2000}           //动画持续时间
                classNames="boss-text"   //className值，防止重复
                unmountOnExit            //隐藏元素
            >
                <div>BOSS级人物-孙悟空</div>
            </CSSTransition>
            <div><button onClick={this.toToggole}>召唤Boss</button></div>
        </div>
        );
}

//css
.input {border:3px solid #ae7000}

.boss-text-enter{
    opacity: 0;
}
.boss-text-enter-active{
    opacity: 1;
    transition: opacity 2000ms;
}
.boss-text-enter-done{
    opacity: 1;
}
.boss-text-exit{
    opacity: 1;
}
.boss-text-exit-active{
    opacity: 0;
    transition: opacity 2000ms;

}
.boss-text-exit-done{
    opacity: 0;
}
```

#### TransitionGroup

> 引入：**import { CSSTransition,TransitionGroup } from 'react-transition-group'**

案例：

```javascript
<ul
  ref={ul => {
    this.ul = ul;
  }}
>
  <TransitionGroup>
    {" "}
    //动画组
    {this.state.list.map((item, index) => {
      return (
        <CSSTransition //动画css
          timeout={1000} //时长
          classNames="boss-text" //classname
          unmountOnExit // 隐藏时移除
          appear={true} //一开始就展现动画
          key={index + item}
        >
          <XiaojiejieItem content={item} index={index} deleteItem={this.deleteItem.bind(this)} />
        </CSSTransition>
      );
    })}
  </TransitionGroup>
</ul>
```

## Redux 状态管理

![redux](@/redux.png "redux")

### 安装

`npm install redux --save`

> 创建 **store**  文件夹， **index.js**  和 **reducer.js**  文件

```javascript
// store/index.js
import { createStore } from "redux";
import reducer from "./reducer";
const store = createStore(reducer);
export default store;

// store/reducer.js
const storeDefault = {
  list: ["react", "vue"]
};
export default (store = storeDefault, action) => {
  return store;
};

// todo.js
import store from "./store"; //引入
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState(); //赋值
  }
  render() {
    return (
      <div style={{ marginTop: "10px", width: "200px" }}>
        <List dataSource={this.state.list} bordered renderItem={item => <List.Item>{item}</List.Item>}></List>
      </div>
    );
  }
}
```

### redux 工作流程

> 1、创建 **aciton**  对象  
> 2、调用 **store 中的 dispatch 方法** ，传递**action**对象  
> 3、**reducer.js**  中判断 **action**  方法，并返回新的**state**  
> 4、订阅**subscribe**，store 中的变化  
> 5、更新**store**中的状态

```javascript
// todo.js
import store from "./store"; //引入
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState(); //赋值
    this.changeInputValue = this.changeInputValue.bind(this);
    store.subscribe(this.storeChange.bind(this)); //订阅store变化
  }
  render() {
    return <Input placeholder={this.state.inputVal} onChange={this.changeInputValue} />;
  }
  changeInputValue(e) {
    const action = {
      //创建action
      type: "changeInput", // 名称
      value: e.target.value
    };
    store.dispatch(action); //调用dispatch
  }
  storeChange() {
    this.setState(store.getState()); //调用setState改变值
  }
}

// reducer.js
const stateDefault = {
  inputVal: "do somethings",
  list: ["vue", "react", "angular", "jonesxie"]
};
export default (state = stateDefault, action) => {
  if (action.type === "changeInput") {
    //不能直接修改state
    let newInputVal = JSON.parse(JSON.stringify(state));
    newInputVal.inputVal = action.value;
    return newInputVal;
  }
  return state;
};
```

### 项目工程化

#### redux 工程化

> 1、将 **action**  中的 **type 名**  放在一个文件中  
> 2、将创建 **aciton**  方法放在一个文件中  
> 3、**axios**  结合 **redux**  使用

```javascript
// src\store\actionTypes.js
export const CHANGE_INPUT = "changeInput";
export const GET_LIST = "getList";

// src\store\actionCreaters.js
import { CHANGE_INPUT, GET_LIST } from "./actionTypes";
export const changeInputAction = value => ({
  type: CHANGE_INPUT,
  value
});
export const getListAction = data => ({
  type: GET_LIST,
  data
});

// src\store\reducer.js
import { CHANGE_INPUT, GET_LIST } from "./actionTypes"; //引入type名
const stateDefault = {
  inputVal: "do somethings",
  list: []
};
export default (state = stateDefault, action) => {
  if (action.type === CHANGE_INPUT) {
    // 判断type
    let newInputVal = JSON.parse(JSON.stringify(state));
    newInputVal.inputVal = action.value;
    return newInputVal;
  }
  if (action.type === GET_LIST) {
    //根据type值，编写业务逻辑
    let newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data.data.list; //复制性的List数组进去
    return newState;
  }
  return state;
};

// src\TodoList.js
import { changeInputAction, getListAction } from "./store/actionCreaters"; //引入创造的action
class Todo extends Component {
  componentDidMount() {
    axios.get("https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList").then(res => {
      const data = res.data;
      const action = getListAction(data);
      store.dispatch(action);
    });
  }
  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <Input placeholder={this.state.inputVal} onChange={this.changeInputValue} />
      </div>
    );
  }
  changeInputValue(e) {
    const action = changeInputAction(e.target.value); //使用
    store.dispatch(action);
  }
  storeChange() {
    this.setState(store.getState()); //调用setState改变值
  }
}
export default Todo;
```

#### 无状态组件

将**UI 层**和**逻辑层**分离，UI 处理页面，逻辑层处理数据

```javascript
//  TodoListUi.js
import React from 'react';
import 'antd/dist/antd.css'
import { Input , Button , List } from 'antd'

const TodoListUi = (props)=>{
    return(
        <div style={{margin:'10px'}}>
            <div>
                <Input
                    style={{ width:'250px', marginRight:'10px'}}
                    onChange={props.changeInputValue}
                    value={props.inputValue}
                />
                <Button
                    type="primary"
                    onClick={props.clickBtn}
                >增加</Button>
            </div>
            <div style={{margin:'10px',width:'300px'}}>
                <List
                    bordered
                    dataSource={props.list}
                    renderItem={
                        (item,index)=>(
                            <List.Item onClick={()=>{props.deleteItem(index)}}>
                                {item}
                            </List.Item>
                        )
                    }
                />
            </div>
        </div>
    )
}
export default TodoListUi;

// TodoList.js的render部分
render() {
    return (
        <TodoListUI
            inputValue={this.state.inputValue}
            list={this.state.list}
            changeInputValue={this.changeInputValue}
            clickBtn={this.clickBtn}
            deleteItem={this.deleteItem}
        />
    );
}
```

### redux-thunk

redux 中间件，一般处理 **请求** 、**打印日志**  等

> 1、**npm install redux-thunk -S**  
> 2、使用 redux 中的 **applyMiddleware**  应用

```javascript
// src\store\index.js
import { createStore, applyMiddleware } from 'redux'  //引入 applyMiddleware
import thunk from 'redux-thunk'                       //引入 redux-thunk
import reducer from './reducer'

const store = createStore(reducer, applyMiddleware(thunk)) //使用 redux-thunk
export default store

// src\store\actionCreaters.js
import { GET_LIST } from './actionTypes'
import axios from 'axios'
export const getListAction = (data) => ({
  type: GET_LIST,
  data
})
export const getTodoList = () => {
  return (dispatch) => {  // 传参
    axios.get('https://www.easy-mock.com/mock/5e6648e5f4760626a3a312f1/list').then((res) => {
      const data = res.data
      const action = getListAction(data) // 调用 getListAction
      dispatch(action)                   // 分发action
    })
  }
}

// src\TodoList.js
import { getTodoList } from "./store/actionCreaters"  //引入
 componentDidMount() {
    const action = getTodoList()
    store.dispatch(action)            // 分发action
  }
```

### react-redux

#### 安装 react-redux

> 1、**react-redux**  依赖于 **redux**  和 **react**  
> 2、npm i react-redux -S

案例：

```javascript
// src\index.js
import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./TodoList";
ReactDOM.render(<TodoList />, document.getElementById("root"));

// src\TodoList.js
import React, { Component } from "react";
import store from "./store";
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.store = store.getState();
  }
  render() {
    return (
      <div>
        <input placeholder={this.store.inputVal} />
        <button>增加</button>
        <ul>
          <li>react</li>
        </ul>
      </div>
    );
  }
}
export default TodoList;

// src\store\reducer.js
const defalutState = {
  inputVal: "hello,world!",
  list: []
};
export default (state = defalutState, action) => {
  return state;
};

// src\store\index.js
import { createStore } from "redux";
import reducer from "./reducer";
const store = createStore(reducer);
export default store;
```

#### provider&connect

> 1、**`<Provider>`**是一个**提供器**，只要使用了这个组件，组件里边的其它所有组件都可以使用**store**了  
> 2、**connect**  是连接器，将 **store**  链接到 **props**  中

```javascript
// src\index.js
import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./TodoList";
import { Provider } from "react-redux"; // 引入Provider组件
import store from "./store"; //  引入store
const App = ( // 创建jsx
  <Provider store={store}>
    {" "}
    //传递 store
    <TodoList />
  </Provider>
);
ReactDOM.render(App, document.getElementById("root")); //使用 App

// src\TodoList.js
import React, { Component } from "react";
import { connect } from "react-redux"; //引入connect 并去除了store
class TodoList extends Component {
  render() {
    return (
      <div>
        <input placeholder={this.props.inputVal} /> // 替换成props
        <button>增加</button>
        <ul>
          <li>react</li>
        </ul>
      </div>
    );
  }
}
const stateToProps = state => {
  //state转props
  return { inputVal: state.inputVal };
};
export default connect(stateToProps, null)(TodoList); //connect传两个参数
```

#### 修改 store 值

> 1、使用 **connect**  中第二个参数，传递 **dispatch**  
> 2、在 **reducer.js**  中修改 **state**  的值

```javascript
// src\TodoList.js
import React, { Component } from "react";
import { connect } from "react-redux";
class TodoList extends Component {
  render() {
    return (
      <div>
        <input value={this.props.inputVal} onChange={this.props.inputChange} /> //change事件触发 props中事件
        <button>增加</button>
        <ul>
          <li>react</li>
        </ul>
      </div>
    );
  }
}

const stateToProps = state => {
  return { inputVal: state.inputVal };
};
const dispatchToProps = dispatch => {
  // 传递成props事件
  return {
    inputChange(e) {
      //定义的事件
      const action = {
        type: "input_change",
        value: e.target.value
      };
      dispatch(action);
    }
  };
};
export default connect(stateToProps, dispatchToProps)(TodoList); //第二参数是dispatch
```

#### 增加 store 值&优化

> 1、使用 **dispatch**  触发增加 **store**  值  
> 2、对 **props**  中的值解构赋值  
> 3、将 **render**  函数写成纯 **jsx**

```javascript
// src\TodoList.js
import React from "react";
import { connect } from "react-redux";

const TodoList = props => {
  let { inputVal, inputChange, addItem, list } = props;
  return (
    <div>
      <input value={inputVal} onChange={inputChange} />
      <button onClick={addItem}>增加</button>
      <ul>
        {list.map((v, i) => {
          return <li key={i}>{v}</li>;
        })}
      </ul>
    </div>
  );
};
const stateToProps = state => {
  return { inputVal: state.inputVal, list: state.list };
};
const dispatchToProps = dispatch => {
  return {
    inputChange(e) {
      const action = {
        type: "input_change",
        value: e.target.value
      };
      dispatch(action);
    },
    addItem() {
      const action = { type: "add_item" };
      dispatch(action);
    }
  };
};

export default connect(stateToProps, dispatchToProps)(TodoList);

// src\store\reducer.js
const defalutState = {
  inputVal: "hello,world!",
  list: []
};
export default (state = defalutState, action) => {
  if (action.type === "input_change") {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputVal = action.value;
    return newState;
  }
  if (action.type === "add_item") {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputVal);
    newState.inputValue = "";
    return newState;
  }
  return state;
};
```

## React-Router

### 安装 React-Router

> 安装： `npm i react-router-dom -S`  
> 1、引入 **BrowserRouter** 、**Route** 、**Link**

案例：

```javascript
// src\index.js
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";

ReactDOM.render(<AppRouter />, document.getElementById("root"));

// src\AppRouter.js
import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function Index() {
  return <h2>xie</h2>;
}
function List() {
  return <h2>this is list</h2>;
}
function AppRouter() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">to index</Link>
        </li>
        <li>
          <Link to="/list">to index</Link>
        </li>
      </ul>
      <Route path="/" exact component={Index} />
      <Route path="/list" component={List} />
    </Router>
  );
}
export default AppRouter;
```

### 路由传参

> 在路由路径中添加 **:**  进行传参，如: `list/:id`

```javascript
// src\AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./Pages/Index";
import List from "./Pages/List";

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/list/:id" component={List} />
    </Router>
  );
}

export default AppRouter;

//  src\Pages\Index.js
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { name: "react", id: "react" },
        { name: "vue", id: "vue" },
        { name: "angular", id: "angular" }
      ]
    };
  }
  render() {
    return (
      <ul>
        {this.state.list.map((v, i) => {
          return (
            <li key={i}>
              <Link to={"/list/" + v.id}>{v.name}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Index;

// src\Pages\List.js
import React, { Component } from "react";

class List extends Component {
  render() {
    return <p>page from {this.props.match.params.id}</p>;
  }
}

export default List;
```

### 重定向(redirect)

> 1、**标签重定向** ，使用标签进行重定向  
> 2、**编程重定向** ，编写重定向方法

```javascript
//  src\Pages\Index.js

// 标签重定向
import { Link , Redirect} from 'react-router-dom';
 render() {
    return (
      <Redirect to="/home/" />    // 重定向
      <ul>
        {
          this.state.list.map((v, i) => {
            return (
              <li key={i}>
                <Link to={'/list/' + v.id}>{v.name}</Link>
              </li>
            )
          })
        }
      </ul>
    );
  }

 // 编程式重定向

 constructor(){
   this.props.history.push("/home/");
 }
```

### 嵌套路由

```javascript
// 结构目录
- src
│  AppRouter.js
│  index.css
│  index.js
└─Pages
    │  Index.js
    │  Video.js
    ├─video
    │      FlutterPage.js
    │      ReactPage.js
    │      VuePage.js
    └─workplace

```

案例一：两层嵌套

```javascript
// src\AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./Pages/Index";
import "./index.css";

function AppRouter() {
  return (
    <Router>
      <div className="mainDiv">
        <div className="leftNav">
          <h3>一级导航</h3>
          <ul>
            <li>
              {" "}
              <Link to="/">博客首页</Link>{" "}
            </li>
            <li>
              <Link to="">视频教程</Link>{" "}
            </li>
            <li>
              <Link to="">职场技能</Link>{" "}
            </li>
          </ul>
        </div>
        <div className="rightMain">
          <Route path="/" exact component={Index} />
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;

// src\Pages\Index.js
import React, { Component } from "react";

class Index extends Component {
  render() {
    return <h2>我是首页</h2>;
  }
}

export default Index;
```

案例二：三层嵌套

```javascript
// src\AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./Pages/Index";
import Video from "./Pages/Video"; //添加
import "./index.css";
function AppRouter() {
  return (
    <Router>
      <div className="mainDiv">
        <div className="leftNav">
          <h3>一级导航</h3>
          <ul>
            <li>
              {" "}
              <Link to="/">博客首页</Link>{" "}
            </li>
            <li>
              <Link to="/video">视频教程</Link>{" "}
            </li>
            <li>
              <Link to="">职场技能</Link>{" "}
            </li>
          </ul>
        </div>
        <div className="rightMain">
          <Route path="/" exact component={Index} />
          <Route path="/video" component={Video} /> //添加
        </div>
      </div>
    </Router>
  );
}
export default AppRouter;

// src\Pages\Video.js
import React from "react";
import { Route, Link } from "react-router-dom";
import FlutterPage from "./video/FlutterPage";
import ReactPage from "./video/ReactPage";
import VuePage from "./video/VuePage";

function Video() {
  return (
    <div>
      <div className="topNav">
        <ul>
          <li>
            <Link to="/video/flutter">flutter</Link>
          </li>
          <li>
            <Link to="/video/react">react</Link>
          </li>
          <li>
            <Link to="/video/vue">vue</Link>
          </li>
        </ul>
      </div>
      <div className="videoContent">
        <div>
          <h3>视频教程</h3>
        </div>
        <Route path="/video/flutter" component={FlutterPage}></Route>
        <Route path="/video/react" component={ReactPage}></Route>
        <Route path="/video/vue" component={VuePage}></Route>
      </div>
    </div>
  );
}
export default Video;
```

### 动态路由

```javascript
// src\AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./Pages/Index";
import Video from "./Pages/Video";
import "./index.css";

function AppRouter() {
  const RouterConfig = [
    { path: "/", title: "博客首页", exact: true, component: Index },
    { path: "/video", title: "视频教程", exact: false, component: Video }
  ];
  return (
    <Router>
      <div className="mainDiv">
        <div className="leftNav">
          <h3>一级导航</h3>
          <ul>
            {RouterConfig.map((v, i) => {
              return (
                <li key={i}>
                  {" "}
                  <Link to={v.path}>{v.title}</Link>{" "}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rightMain">
          {RouterConfig.map((v, i) => {
            return <Route key={i} path={v.path} exact={v.exact} component={v.component} />;
          })}
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;
```

## React Hooks

### useState

**useState**是 react 自带的一个 hook 函数，它的作用是用来**声明状态变量**

> **useState**  返回的是一个数组，第一个参数是 **变量** ，第二个是修改变量的 **函数名**

```javascript
import React, { useState } from "react"; // 引入useState

function Example() {
  let [count, setCount] = useState(1); // 解构赋值
  let [name] = useState("xie");
  return (
    <div>
      <p>count:{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>
      <p>{name}</p>
    </div>
  );
}
export default Example;
```

### useEffect

跟 class 组件中的**componentDidMount**、**componentDidUpdate**  和**componentWillUnmount**  具有相同的用途，只不过被合并成了一个 API

> 1、useEffect 第一个参数接收一个**函数**，该函数会在组件渲染到屏幕之后才执行。  
> 2、第一个参数中可以 **return**  一个**函数**，当状态发生改变执行，无论是**更新**还是**销毁**组件  
> 3、useEffect 第二个参数接收一个**数组**，如果是空数组，类似 **componentWillUnmount**  执行第一个参数的**return 函数**，若有值，当数组中值变化(包含组件销毁) **return 中的函数** 才执行。  
> 4、不像 **componentDidMount**  和 **componentDidUpdate**  会阻塞进程， **useEffect**  是异步的

```javascript
import React, { useState, useEffect } from "react";

function Example() {
  let [count, setCount] = useState(1);
  let [name] = useState("xie");
  useEffect(() => {
    console.log("xie");
    return () => {
      console.log("leave");
    };
  }, [count]);
  return (
    <div>
      <p>count:{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>
      <p>{name}</p>
    </div>
  );
}
export default Example;
```

### useContext

用类声明组件时，无法使用 **constructor**  构造函数传递 **props**  数据，使用 **useContext**  父子组件传值

> 1、需要使用 **createCotext**  对子组件包裹，并用使用  **Provider**  
> 2、在子组件使用 **useContext**  接收值

```javascript
import React, { useState, createContext, useContext } from "react";

const CountContext = createContext(); //创建

function Counter() {
  const count = useContext(CountContext); //接收
  return <p>{count}</p>;
}

function Example() {
  let [count, setCount] = useState(1);
  return (
    <div>
      <p>count:{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>
      <CountContext.Provider value={count}>
        {" "}
        //传参
        <Counter /> //子元素
      </CountContext.Provider>
    </div>
  );
}
export default Example;
```

### useReducer

类似于使用 redux

> 1、**useReducer**  内部接收两个参数，第一个是函数，处理逻辑，第二个是 state 初始值  
> 2、使用解构赋值获取到**state**的值和 **dipatch**

```javascript
import React, { useReducer } from "react";
function Example() {
  let [count, dispatch] = useReducer((state, action) => {
    switch (action) {
      case "add":
        return state + 1;
      case "reduce":
        return state - 1;
      default:
        return state;
    }
  }, 0);
  return (
    <div>
      <p>count:{count}</p>
      <button
        onClick={() => {
          dispatch("add");
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          dispatch("reduce");
        }}
      >
        reduce
      </button>
    </div>
  );
}
export default Example;
```

### useMemo

优化子组件渲染，效果类似 **shouldComponentUpdata**  满足相关条件才进行渲染

> 1、**useMemo**  内部接收两个参数，第一个是函数，在满足条件时调用，第二个是数组，那些状态改变进行执行第一个参数函数

```javascript
import React, { useMemo } from "react";
function Example({ name }) {
  function add(name) {
    console.log("增加");
    return name + "增加了";
  }
  const changeName = useMemo(() => add(name), [name]);
  return <>{<div>{changeName}</div>}</>;
}
export default Example;
```

### useRef

获取元素的 DOM 信息

```javascript
import React, { useRef } from "react";

function Example() {
  const inputVal = useRef();
  const printVal = () => {
    console.log(inputVal);
  };
  return (
    <div>
      <input ref={inputVal} />
      <button onClick={printVal}>打印值</button>
    </div>
  );
}
export default Example;
```

### 自定义 Hook

```javascript
import React, { useState, useEffect, useCallback } from "react";

function useWinSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
}

function Example() {
  const size = useWinSize();
  return (
    <p>
      页面宽：{size.width},页面高：{size.height}
    </p>
  );
}
export default Example;
```

## Next.js 服务端渲染

### 安装 next.js

#### 手动安装

> 1、`npm install react react-dom next -S`  安装 **react、react-dom、next**  
> 2、**src**  文件目录下新建 **pages**  将会自动配置路由  
> 3、文件中无需引入 **react 和 react-dom**  会自动引入

```javascript
// package.json
 "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },

  // pages\index.js
function index() {
  return (<h2>hello,next.js</h2>)
}
export default index
```

#### 脚手架安装

> 1、全局安装： **npm install create-next-app -g**  
> 2、安装依赖： **create-next-app demo**

### Pages 和 Components

> 1、**src** 文件目录下新建 **pages** 将会自动配置路由，多级路由使用 **文件夹**  可创建  
> 2、公用组件中可以 **children**  传入内容部分

```javascript
// components\Header.js
export default ({ children }) => {
  //接收参数，必须使用children
  return (
    <>
      <h3>我是头部，下面的是内容</h3>
      <div>{children}</div>
    </>
  );
};

// pages\index.js
import Header from "../components/Header";
const Home = () => <Header>从index传来的内容</Header>;
export default Home;
```

### 路由导航

#### 标签式导航

> 1、引入 **Link** , **import Link from "next/link"**  
> 2、Link 中必须有一个**a 标签**当父元素

#### 编程式导航

> 1、引入 **import Router from "next/router"**  
> 2、使用 **Router.push()**

```javascript
import Header from "../components/Header";
import Link from "next/link";
import Router from "next/router";
const Home = () => {
  const toPageB = () => {
    Router.push("/pageB");
  };
  return (
    <>
      <Header>从index传来的内容</Header>
      <p>这是首页</p>
      <Link href="/pageA">
        <a>通过a链接，连接到pageA</a>
      </Link>
      <button onClick={toPageB}>通过函数导航到pageB</button>
    </>
  );
};

export default Home;
```

#### 路由传参(query)

> 1、只能使用 **query**  方式传参。  
> 2、引入**withRouter**接收参数，到处组件时使用。

```javascript
// pages\index.js
import Link from "next/link";
import Router from "next/router";
const Home = () => {
  const toPageB = () => {
    Router.push("/pageB?name=xie");
  };
  const toPageA = () => {
    Router.push({
      pathname: "/pageA",
      query: { name: "xie" }
    });
  };
  return (
    <>
      <p>这是首页</p>
      <Link href="/pageA?name=xie">
        <a>通过a链接，连接到pageA</a>
      </Link>
      <Link href={{ pathname: "/pageB", query: { name: "xie" } }}>
        <a>通过a链接，连接到pageB</a>
      </Link>
      <button onClick={toPageB}>通过函数导航到pageB</button>
      <button onClick={toPageA}>通过函数导航到pageA</button>
    </>
  );
};
export default Home;

// pages\pageA.js
import Link from "next/link";
import { withRouter } from "next/router"; //引入
const pageA = (
  { router } //使用传入参数
) => (
  <Link href="/">
    <a>这是pageA,跳转到首页,{router.query.name}</a>
  </Link>
);
export default withRouter(pageA); //使用withRouter
```

### 路由钩子

使用 **Router.events.on('xxx',()=>{})**  进行监听

> 1、**routeChangeStart** ：history 下路由**开始变化**  
> 2、**beforeHistoryChange** ：history 下路由**开始变化了**  
> 3、**routeChangeComplete** ：history 下路由**完成变化**  
> 4、**routeChangeError** ：history 下路由**出错**  
> 5、**hashChangeStart** ：hash 下路由**完成变化**  
> 6、**hashChangeComplete** ：hash 下路由**完成变化**

```javascript
import Router from "next/router";
Router.events.on("routeChangeStart", (...args) => {
  console.log("routeChangeStart", args);
});
Router.events.on("routeChangeComplete", (...args) => {
  console.log("routeChangeComplete", args);
});
Router.events.on("beforeHistoryChange", (...args) => {
  console.log("beforeHistoryChange", args);
});
```

### Axios 获取数据

> 1、使用 **next.js**  规定的 **getInitialProps**  中发送请求

```javascript
import Link from "next/link";
import axios from "axios";
const pageA = ({ data }) => (
  <Link href="/">
    <a>这是pageA,跳转到首页,{data}</a>
  </Link>
);
pageA.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios.get("https://www.fastmock.site/mock/ead6c808eec0d96ad2fc313068910dd1/react/getName").then(res => {
      resolve(res.data);
    });
  });
  return await promise;
};
export default pageA;
```

### style jsx 样式

> 在 **return**  中写 **style**  样式，使用 **\${}**  写变量

```javascript
import { useState } from "react";
const index = () => {
  const [color, setColor] = useState("blue");
  const changeColor = () => {
    setColor(color === "blue" ? "red" : "red");
  };
  return (
    <>
      <div>首页</div>
      <button onClick={changeColor}>changecolor</button>
      <style>
        {`
          div{
            color:${color}
          }
        `}
      </style>
    </>
  );
};

export default index;
```

### 懒加载

> 1、模块懒加载使用 **async 和 await**  进行异步引入  
> 2、组件懒加载使用 **dynamic**

```javascript
import { useState } from "react";
import dynamic from "next/dynamic";
const One = dynamic(import("./one"));
const index = () => {
  const [time, setTime] = useState(Date.now());
  const changeTime = async () => {
    // 使用async
    const moment = await import("moment"); //等待 await
    setTime(moment.default(Date.now()).format());
  };
  return (
    <>
      <div>时间:{time}</div>
      <One />
      <button onClick={changeTime}>改变时间格式</button>
    </>
  );
};

export default index;

// one.js
export default () => <div>one</div>;
```

### 定义 Head 内容

> 引入 next 中的 **head**  组件

```javascript
import Head from "next/head";
const index = () => {
  return (
    <>
      <Head>
        <title>react learning</title>
        <meta charset="utf-8" />
      </Head>
      <div>时间:2020年</div>
    </>
  );
};
export default index;
```

### 使用 AantD

#### import 引入 css

> 1、安装：`npm i @zeit/next-css -S`  
> 2、next 配置，在根目录下创建 **next.config.js**

```javascript
// next.config.js
const withCss = require('@zeit/next-css')
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => { }
}
module.exports = withCss({})

// index.js
import "../static/reset.css"
export default ()=><div>首页</div>

// static/reset.css
body{color:red}
```

### 按需引入 AntD

> 1、安装 babel 插件: **npm i babel-plugin-import -D**  
> 2、配置 babel，根目录下

```javascript
// .babelrc
{
  "presets": ["next/babel"], //Next.js的总配置文件，相当于继承了它本身的所有配置
  "plugins": [
    //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ]
  ]
}

//  pages\index.js
import "../static/reset.css"
import { Button } from 'antd'
const index = () => {
  return (
    <>
      <div>首页</div>
      <Button>按钮</Button>
    </>
  )
}
export default index
```

### 踩坑指南

#### 设置开发环境端口号

> 在 package.json 中的"script"中设置："dev": "next dev -p 2020"

#### 引入 antd 打包错误

> 1、修改 **.babelrc**  文件，不能引入 **css**  样式  
> 2、新建 **\_app.js**  文件，并手动全局引入 **antd 的 css 样式**

```javascript
// .babelrc
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd"
       // "style": "css"    //去除
      }
    ]
  ]
}

//  pages\_app.js
import App from 'next/app'
import 'antd/dist/antd.css' //引入antd
export default App
```
