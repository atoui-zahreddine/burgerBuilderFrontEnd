import React from "react";
import Classes from "./Input.module.css";


const input = props => {
  let inputElement = null;
  let classesInputElement = [Classes.InputElement];
  let errorMessage=null;
  
  if (props.invalid === false && props.touched  && props.shouldValidate  ) {
    errorMessage=<p className={Classes.ErrorMessage}>{props.errorMessage}</p>;
    classesInputElement.push(Classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classesInputElement.join(" ")}
          {...props.elementConfig}
          value={props.value}
          id={props.name}
          onChange={props.changed}
          onBlur={props.clicked}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classesInputElement.join(" ")}
          {...props.elementConfig}
          value={props.value}
          id={props.name}
          onChange={props.changed}
          onBlur={props.clicked}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classesInputElement.join(" ")}
          onChange={props.changed}
          id={props.name}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classesInputElement.join(" ")}
          {...props.elementConfig}
          value={props.value}
          id={props.name}
          onChange={props.changed}
          onBlur={props.clicked}
        />
      );
  }

  return (
    <div className={Classes.Input}>
      <label className={Classes.Label} htmlFor={props.name}>
        {props.name}
      </label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default input;
