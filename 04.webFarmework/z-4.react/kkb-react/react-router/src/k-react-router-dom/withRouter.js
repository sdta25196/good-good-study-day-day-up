// hoc

import RouterContext from "./RouterContext";

// hoc 是个函数 ，接收组件作为参数，返回新的组件
// 子组件消费context value  （match history location）
const withRouter = (WrappedComponent) => (props) => {
  return (
    <RouterContext.Consumer>
      {(context) => {
        return <WrappedComponent {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};

export default withRouter;
