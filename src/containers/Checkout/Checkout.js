import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary/Auxiliary";

class Checkout extends React.Component {
  componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  componentWillUnmount() {
    this.props.resetIngredientsHandler();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");

    const element = document.getElementById("contactData");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  checkoutCanceledHandler = () => {
    this.props.history.replace("/");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.building) {
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
    purchase: state.order.purchase,
    building: state.burgerBuilder.building
  };
};
const mapDispatchToProps = dispatch => {
  return {
    resetIngredientsHandler: () => dispatch(actionCreators.initIngredients())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
