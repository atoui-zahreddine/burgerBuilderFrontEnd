import React from "react";
import Layout from "../hoc/Layout/Layout";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import WithErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import axios from "../axios-orders";
import Logout from "./Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import asyncComponent from "../hoc/asyncComponent/asyncComponent";

const asyncAuth = asyncComponent(() => {
  return import("./Auth/Auth");
});
const asyncOrders = asyncComponent(() => {
  return import("./Orders/Orders");
});
const asyncCheckout = asyncComponent(() => {
  return import("../containers/Checkout/Checkout");
});

class App extends React.Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"></Redirect>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/order" exact component={asyncOrders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/auth" exact component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(App, axios));
