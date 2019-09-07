import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const purchaseBurgerSucces = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCES,
    orderData: orderData,
    orderid: id
  };
};
export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCES,
    error: error
  };
};

export const purchaseBurgerStart = orderData => {
  return dispatch => {
    Axios.post("./orders.json", orderData)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSucces(response.data.id, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerSucces(error));
      });
  };
};
