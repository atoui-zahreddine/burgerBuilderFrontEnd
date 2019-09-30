import React from "react";
import Layout from "../hoc/Layout/Layout";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route } from "react-router-dom";
import Checkout from "../containers/Checkout/Checkout";
import Orders from "./Orders/Orders";
import Auth from "./Auth/Auth";
import WithErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import axios from "../axios-orders";
import Logout from "./Auth/Logout/Logout";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default WithErrorHandler(App, axios);
