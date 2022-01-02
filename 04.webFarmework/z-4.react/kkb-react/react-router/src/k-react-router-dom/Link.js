import {useContext} from "react";
import RouterContext from "./RouterContext";

function Link({to, children, ...rest}) {
  const {history} = useContext(RouterContext);

  const handle = (e) => {
    e.preventDefault();
    history.push(to);
  };
  return (
    <a href={to} {...rest} onClick={handle}>
      {children}
    </a>
  );
}
export default Link;
