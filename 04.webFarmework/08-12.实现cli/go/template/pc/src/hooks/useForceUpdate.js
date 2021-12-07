import { useReducer } from "react";

function useForceUpdate(props) {
  const [, forceUpdate] = useReducer(x => x = !x, false);
  return forceUpdate;
}

export default useForceUpdate