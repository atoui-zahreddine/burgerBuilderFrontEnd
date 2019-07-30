import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Button from "../UI/Button/Button";

const orderSummary =( props)=> {
    return (
        <Aux>
          <h3>Your order</h3>
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
          <Button btnType="Danger" clicked={props.purchaseCancel}>
            Cancel
          </Button>
          <Button btnType="Success" clicked={props.purchaseContinue}>
            Continue
          </Button>
        </Aux>
    );
}

export default orderSummary;
