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

const ProtectedRoute = ({ component: Component, isAuthenticated , ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};

class App extends React.Component {
  state={
    authCheck: true
  }
  componentDidMount() {
    this.props.onAuthCheckState();
  }
  componentDidUpdate() {
    if(this.props.authCheck === false && this.state.authCheck){
      this.setState({authCheck:false})
    }
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      {(!this.state.authCheck)?
        <Layout>
          <Switch>
            <Route path="/auth" exact component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <ProtectedRoute
              path="/checkout"
              component={asyncCheckout}
              isAuthenticated={this.props.isAuthenticated}
            />
            <ProtectedRoute
              path="/orders"
              exact
              component={asyncOrders}
              isAuthenticated={this.props.isAuthenticated}
            />
            <ProtectedRoute
              path="/logout"
              exact
              component={Logout}
              isAuthenticated={this.props.isAuthenticated}
            />
            <Redirect to="/" />
          </Switch>
        </Layout>
      :null}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated:state.auth.token !== null,
    authCheck:state.auth.authCheck
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
