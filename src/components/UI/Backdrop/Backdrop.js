import React from "react";
import Classes from "./Backdrop.module.css";

const backdrop = props => {
  return props.show ? (
    <div className={Classes.Backdrop} onClick={props.clicked} />
  ) : null;
};

export default backdrop;
