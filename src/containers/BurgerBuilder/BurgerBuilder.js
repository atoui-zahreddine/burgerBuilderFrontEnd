import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
//import axios from "../../axios-orders";
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Spinner from "../../components/UI/Spinner/Spiner";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };
  
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    
    this.props.history.push("/checkout");
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
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
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
        <div style={{ marginTop: "150px" }}>{burger}</div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings:state.ingredients,
    totalPrice:state.totalPrice
  }

}

const mapDispatchToProps = dispatch => {
  
  return{
    onAddHandler : (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingName:ingName}),
    onRemoveHandler : (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingName:ingName})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);
