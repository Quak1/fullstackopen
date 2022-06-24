import { useState, useImperativeHandle, forwardRef } from "react";

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisbile = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </button>
      <div style={showWhenVisbile}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Toggleable.displayName = "Toggleable";

export default Toggleable;
