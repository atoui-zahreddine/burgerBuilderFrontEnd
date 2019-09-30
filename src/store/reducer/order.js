import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchase: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.FETCH_ORDERS_SUCCES:
      return {
        ...state,
        orders: action.orders,
        error: false,
        loading: false
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchase: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCES:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchase: true,
        error: null
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default reducer;
