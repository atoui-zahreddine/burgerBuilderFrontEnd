import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary/Auxiliary";

class Checkout extends React.Component {
  state = {
    ingredients: {},
    totalPrice: 4
  };
  componentDidMount() {
    this.setState({
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice
    });
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  checkoutCanceledHandler = () => {
    this.props.resetIngredientsHandler();
    this.props.history.goBack();
  };
  render() {
    return (
      <Aux>
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
}
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
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
