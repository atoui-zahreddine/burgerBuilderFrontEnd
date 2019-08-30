import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import Aux from "../../hoc/Auxiliary/Auxiliary";

class Checkout extends React.Component {
  state = {
    ingredients: {},
    totalPrice: 4
  };
  componentDidMount() {
    this.setState({ ingredients: this.props.ingredients, totalPrice: this.props.totalPrice });
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
const mapStateToProps = state => {
  return {
    ingredients:state.ingredients,
    totalPrice:state.totalPrice
  }

}


export default connect(mapStateToProps)(Checkout);
