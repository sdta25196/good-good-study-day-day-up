//! applyMiddleware 收到多个中间件，返回一个接收store和reducer的函数
export default function applyMiddleware(...middlewares: any) {
  return (createStore: any) => (reducer: any) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    const midApi = {
      getState: store.getState,
      dispatch: (action: any, ...args: any) => dispatch(action, ...args)
    };
    const middlewareChain = middlewares.map((middleware: any) => middleware(midApi));
    dispatch = compose(...middlewareChain)(store.dispatch);
    return {
      ...store,
      // 加强版的dispatch
      dispatch
    };
  };
}
function compose(...funcs: any) {
  if (funcs.length === 0) {
    return (arg: any) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a: any, b: any) => (...args: any) => a(b(...args)));
}
