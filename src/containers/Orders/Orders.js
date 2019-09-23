import React from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spiner";

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrder();
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
    loading: state.order.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
