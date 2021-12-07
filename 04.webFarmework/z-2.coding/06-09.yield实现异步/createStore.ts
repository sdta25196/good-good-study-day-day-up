//! applyMiddleware（执行后就是enhancer）返回接收store和reducer
//! 为什么要执行applyMiddleware，是因为要搞一个闭包环境保存所有的中间件
export default function createStore(reducer: any, enhancer: any) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState: any;
  let currentListeners = <any>[];
  function getState() {
    return currentState;
  }
  function dispatch(action: any) {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener: any) => listener());
    return action;
  }
  function subscribe(listener: any) {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }
  dispatch({ type: "KKBREDUX/OOOO" });
  return {
    getState,
    dispatch,
    subscribe
  };
}