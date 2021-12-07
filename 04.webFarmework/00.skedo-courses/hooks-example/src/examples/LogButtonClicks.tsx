import { useRef, useState } from "react";

export default function LogButtonClicks() {
  const countRef = useRef(0);  

  const handle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };
  console.log('rendered')

  return <button onClick={handle}>Click me</button>;
}
