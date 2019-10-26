import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.module.css";

const orderSummary = props => {
  return (
    <Aux>
      <h1>
        <strong> Your Order</strong>{" "}
      </h1>
      <p>A delicious burger with the following ingredients :</p>
      <ul>
        {Object.keys(props.ingredients).map(igKey => (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {props.ingredients[igKey]}
          </li>
        ))}
      </ul>
      <p>
        Total Price :<strong> {props.price.toFixed(2)} $ </strong>
      </p>
      <p>continue to checkout ?</p>
      <div className={classes.Container}>
        <Button btnType="Danger" clicked={props.purchaseCancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>
          Continue
        </Button>
      </div>
    </Aux>
  );
};

export default orderSummary;
