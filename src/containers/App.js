import React from "react";
import Layout from "../hoc/Layout/Layout";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route } from "react-router-dom";
import Checkout from "../containers/Checkout/Checkout";
import Order from '../components/Order/Order';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order" component={Order} />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
