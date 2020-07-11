import * as actionTypes from "./actionTypes";
import Axios from "../../axios";

export const purchaseBurgerSuccess = (orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData: orderData
  };
};
export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const setOrderSuccessMessage = show => {
  return {
    type: actionTypes.SHOW_ORDER_MESSAGE_SUCCESS,
    show: show
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());

    const config={headers: {authorization: "Bearer "+token}};

    Axios.post("/orders",orderData, config )
      .then(() => {

        dispatch(purchaseBurgerSuccess(orderData));
        dispatch(setOrderSuccessMessage(true));

        setTimeout(() => {
          dispatch(setOrderSuccessMessage(false));
        }, 3000);

      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};
export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};
export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};
export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart());

    const config={headers: {authorization: "Bearer "+token}};

    Axios.get("/orders",config)
      .then(response => {
        dispatch(fetchOrdersSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
