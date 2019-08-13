import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Aux/Aux";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spiner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get("https://react-burger-builder-b3cce.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => this.setState({ error: true }));
  }
  addIngredientsHandler = type => {
    const updatedCounted = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCounted;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };
  removeIngredientHandler = type => {
    if (this.state.ingredients[type] !== 0) {
      const updatedCounted = this.state.ingredients[type] - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedCounted;
      const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    }
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: queryString + "&price=" + this.state.totalPrice.toFixed(2)
    });
  };
  render() {
    let orderSummary = null;

    let burger = this.state.error ? (
      <p style={{ textAlign: "center", fontSize: "30px", color: "red" }}>
        ingredients can't be loaded !!!
      </p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredients={this.state.ingredients}
            ingredientAdded={this.addIngredientsHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
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
        {burger}
      </Aux>
    );
  }
}
export default WithErrorHandler(BurgerBuilder, axios);
