import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
//import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as BurgerBuilderActions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spiner";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };
  componentDidMount() {
    this.props.onInitHandler();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };
  render() {
    let orderSummary = null;

    let burger = this.props.error ? (
      <p style={{ textAlign: "center", fontSize: "30px", color: "red" }}>
        ingredients can't be loaded !!!
      </p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger
            ingredients={this.props.ings}
            resetBuildingBurger={this.props.onResetBuildingBurger}
          />
          <BuildControls
            isAuth={this.props.isAuthenticated}
            ingredients={this.props.ings}
            ingredientAdded={this.props.onAddHandler}
            ingredientRemoved={this.props.onRemoveHandler}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <div>{burger}</div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddHandler: ingName =>
      dispatch(BurgerBuilderActions.addIngredient(ingName)),
    onRemoveHandler: ingName =>
      dispatch(BurgerBuilderActions.removeIngredient(ingName)),
    onInitHandler: () => dispatch(BurgerBuilderActions.initIgredients()),
    onInitPurchase: () => dispatch(BurgerBuilderActions.purchaseInit()),
    onResetBuildingBurger: () =>
      dispatch(BurgerBuilderActions.resetBuildingBurger())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilder);
