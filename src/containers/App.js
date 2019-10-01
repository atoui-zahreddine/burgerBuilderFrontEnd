import React from "react";
import Layout from "../hoc/Layout/Layout";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Checkout from "../containers/Checkout/Checkout";
import Orders from "./Orders/Orders";
import Auth from "./Auth/Auth";
import WithErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import axios from "../axios-orders";
import Logout from "./Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class App extends React.Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/order" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
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
