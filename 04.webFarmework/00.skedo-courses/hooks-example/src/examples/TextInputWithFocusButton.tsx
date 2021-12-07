import { useRef } from "react";

export default function TextInputWithFocusButton() {
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current!.focus();
  };
  return (
    <>
			{/* inputEl.current = ...elem */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}