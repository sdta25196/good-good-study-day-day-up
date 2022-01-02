import {Component} from "react";
import RouterContext from "./RouterContext";

class Redirect extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {to} = this.props;
          const {history} = context;
          // history.push replace
          return <LifeCycle onMount={() => history.push(to)} />;
        }}
      </RouterContext.Consumer>
    );
  }
}
export default Redirect;

class LifeCycle extends Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return null;
  }
}
