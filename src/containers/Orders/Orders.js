import React from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ordersIcon from "../../assets/svg/clipboard-list-solid.svg";
import Spinner from "../../components/UI/Spinner/Spiner";
import classes from "./Orders.module.css";

class Orders extends React.Component {
  componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.props.onFetchOrder(this.props.token);
  }
  render() {
    let orders = <Spinner />;
    if (this.props.loading === false) {
      if (this.props.orders.length !== 0) {
        orders = this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.totalPrice}
          />
        ));
      } else {
        orders = (
          <div className={classes.Container}>
            <div className={classes.OrderListIcon}>
              <img src={ordersIcon} alt="orders icon" />
            </div>
            <p>
              <span style={{ display: "block" }}>
                you don't have any orders yet .
              </span>
              please make orders
            </p>
          </div>
        );
      }
    }
    return <div className={classes.Orders}>{orders}</div>;
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: (token) =>
      dispatch(actions.fetchOrders(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
