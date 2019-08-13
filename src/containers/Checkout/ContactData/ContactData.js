import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spiner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: +this.props.totalPrice.toFixed(2),
      customer: {
        name: "zahry",
        email: "at.zahreddine@gmail.com",
        adress: {
          street: "26 rue imam chafei",
          zipCode: "4100",
          country: "medenine"
        }
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
