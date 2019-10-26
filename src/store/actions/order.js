import * as actionTypes from "./actionTypes";
import Axios from "../../axios-orders";

export const purchaseBurgerSucces = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCES,
    orderData: orderData,
    orderid: id
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
    Axios.post("/orders.json?auth=" + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSucces(response.data.name, orderData));
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
export const fetchOrdersSucces = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCES,
    orders: orders
  };
};
export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    Axios.get("/orders.json?" + queryParams)
      .then(response => {
        const orders = [];

        for (let order in response.data) {
          orders.push({
            ...response.data[order],
            id: order
          });
        }
        dispatch(fetchOrdersSucces(orders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
