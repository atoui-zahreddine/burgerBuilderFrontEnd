import React from "react";
import Classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  let purchasable = Object.keys(props.ingredients)
    .map(igkey => {
      return props.ingredients[igkey];
    })
    .reduce((arr, el) => {
      return arr + el;
    }, 0);
  return (
    <div className={Classes.BuildControls}>
      <p>
        Current Price:<strong>{props.price.toFixed(2)} $</strong>
      </p>
      {controls.map(control => (
        <BuildControl
          disabled={props.ingredients[control.type] <= 0}
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
        />
      ))}
      <button
        className={Classes.OrderButton}
        disabled={purchasable === 0}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
