import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary/Auxiliary";

class Checkout extends React.Component {
  componentWillUnmount() {
    this.props.resetIngredientsHandler();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchase = this.props.purchase ? <Redirect to="/" /> : null;
      summary = (
        <Aux>
          {purchase}
          <CheckoutSummary
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ingredients}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            render={() => (
              <ContactData
                {...this.props}
                totalPrice={this.props.totalPrice}
                ingredients={this.props.ingredients}
              />
            )}
          />
        </Aux>
      );
    }
    return summary;
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchase: state.order.purchase
  };
};
const mapDispatchToProps = dispatch => {
  return {
    resetIngredientsHandler: () => dispatch(actionCreators.resetIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
