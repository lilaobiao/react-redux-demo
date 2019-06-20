## 创建项目

1、全局安装脚手架：
$ npm install -g create-react-app

2、通过脚手架搭建项目：
$ create-react-app <项目名称>

3、开始项目：
$ cd <项目名>
$ npm run start

## src目录说明
src-01：尚未连接 Redux Store 的UI组件源码



## 使用 React-Redux 

1、安装
```
npm install --save react-redux
或者
yarn add react-redux
```


2、连接组件
React-Redux提供一个connect方法使你可以从Redux store中读取数据（以及当store更新后，重新读取数据）

connect方法接收两个参数，都是可选参数：

mapStateToProps：每当store state发生变化时，就被调用。接收整个store state，并且返回一个该组件所需要的数据对象
mapDispatchToProps：这个参数可以是一个函数或对象

如果是一个函数，一旦该组件被创建，就会被调用。接收dispatch作为一个参数，并且返回一个能够使用dispatch来分发actions的若干函数组成的对象
如果是一个action creators构成的对象，每一个action creator将会转化为一个prop function并会在调用时自动分发actions。注意： 我们建议使用这种形式。
通常，你可以这样去connect：
```
const mapStateToProps = (state, ownProps) => ({
  // ... 从state中处理的一些数据，以及可选的ownProps
});

const mapDispatchToProps = {
  // ... 通常是action creators构成的对象
};

// `connect`返回一个新的函数，可以接收一个待包装的组件
const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
);
// 上面的函数能够返回一个已经包装、连接过的组件
const ConnectedComponent = connectToStore(Component);

// 我们通常写成一条语句如下：
connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
```
下面让我们开始编写<AddTodo/>。它要能够触发store的变化从而增加新的todos。因此，他要能够向store dispatch actions。


3、[https://segmentfault.com/a/1190000017064759?utm_source=tag-newest](https://segmentfault.com/a/1190000017064759?utm_source=tag-newest)


4、[详解react、redux、react-redux之间的关系](https://www.jianshu.com/p/728a1afce96d)

5、[vue-easytable](http://doc.huangsw.com/vue-easytable/app.html#/install)