import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import Aux from "../../hoc/Auxiliary/Auxiliary";

class Checkout extends React.Component {
  state = {
    ingredients: {},
    totalPrice: 4
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 4;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, totalPrice: price });
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <Aux>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              {...this.props}
              totalPrice={this.state.totalPrice}
              ingredients={this.state.ingredients}
            />
          )}
        />
      </Aux>
    );
  }
}

export default Checkout;
