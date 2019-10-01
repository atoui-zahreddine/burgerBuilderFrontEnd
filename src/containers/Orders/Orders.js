import React from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spiner";

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }
  render() {
    let orders = (
      <div style={{ marginTop: "150px" }}>
        <Spinner />
      </div>
    );
    if (this.props.loading === false) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.totalPrice}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
