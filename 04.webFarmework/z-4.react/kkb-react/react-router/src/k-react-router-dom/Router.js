import {Component} from "react";
import RouterContext from "./RouterContext";

class Router extends Component {
  static computeRootMatch(pathname) {
    return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
  }

  constructor(props) {
    super(props);
    this.state = {location: props.history.location};
    // 监听路由变化
    props.history.listen((location) => {
      this.setState({location});
    });
  }
  render() {
    const {children, history} = this.props;
    return (
      <RouterContext.Provider
        value={{
          history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}>
        {children}
      </RouterContext.Provider>
    );
  }
}
export default Router;
