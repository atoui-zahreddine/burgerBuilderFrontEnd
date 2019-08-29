import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spiner";

class Orders extends React.Component {
  state = {
    orders: [],
    loading: false
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/orders.json")
      .then(response => {
        const orders = [];

        for (let order in response.data) {
          orders.push({
            ...response.data[order],
            id: order
          });
        }

        this.setState({ orders: orders, loading: false });
      })
      .catch(error => console.log(error));
  }

  render() {
    let orders = (
      <div style={{ marginTop: "150px" }}>
        <Spinner />
      </div>
    );
    if (this.state.orders.length) {
      orders = this.state.orders.map(order => (
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

export default Orders;
