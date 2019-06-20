# mapStateToProps

## state
mapStateToProps的第一个参数是整个Redux store state对象（与store.getState()方法返回的值相同）。因此第一个参数通常命名为state（当然你也可以选择别的名字，但是叫store就不推荐了——因为它是state值而不是store实例）

mapStateToProps方法至少要传递state参数。
```
function mapStateToProps(state) {
  const { todos } = state;
  return { todoList: todos.allIds };
};
    
export default connect(mapStateToProps)(TodoList);
```

## ownProps

这个参数可以是一个函数或对象，如果是一个函数，一旦该组件被创建，就会被调用。接收dispatch作为一个参数，并且返回一个能够使用dispatch来分发actions的若干函数组成的对象
如果是一个action creators构成的对象，每一个action creator将会转化为一个prop function并会在调用时自动分发actions。注意： 我们建议使用这种形式。
通常，你可以这样去connect：
```
// Todo.js
function mapStateToProps(state, ownProps) {
  const { visibilityFilter } = state;
  const { id } = ownProps;
  const todo = getTodoById(state, id);

  // 组件额外接收:
  return { todo, visibilityFilter };
};

// 之后，在你的应用里，渲染一个如下父组件：
<ConnectedTodo id={123} />
// 你的组件接收 props.id, props.todo, 以及 props.visibilityFilter
```
你不需要把ownProps中的值再添加入mapStateToProps返回的对象中，connect会自动的把这些不同源的prop合并为一个最终的prop集。

## 返回值
你的mapStateToProps方法应该返回一个包含了组件用到的数据的纯对象：

每一个对象中的字段都将作为你组件的一个 prop 字段中的值用来判断你的组件是否需要重新渲染，例如：
```
function mapStateToProps(state) {
  return {
    a : 42,
    todos : state.todos,
    filter : state.visibilityFilter
  }
}

// 组件会接收: props.a, props.todos,以及 props.filter
```
>注意：在一些高级场景中，你可能需要更多地对于渲染性能的控制，mapStateToProps也可以返回一个方法。在这种情况下，那个所返回的方法会做为一个特定组件实例的最终的mapStateToProps。这样一来，你就可以对每个实例进行memoization。参考高级用法部分以获取更多信息。也可以看[PR #279](https://github.com/reduxjs/react-redux/pull/279)以及上面增加的测试。但大部分应用根本不需要这样做
