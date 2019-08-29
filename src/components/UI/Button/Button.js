import React from "react";
import Classes from "./Button.module.css";

const button = props => {
  let buttonClasse = [Classes.Button];
  if (props.disabled) {
    buttonClasse.push(Classes.Disabled);
  } else {
    buttonClasse.push(Classes[props.btnType]);
  }
  return (
    <button
      disabled={props.disabled}
      className={buttonClasse.join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;
