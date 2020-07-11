import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchase: false,
  showOrderSuccessMessage: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ORDER_MESSAGE_SUCCESS:
      return {
        ...state,
        showOrderSuccessMessage: action.show
      };
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
    case actionTypes.FETCH_ORDERS_SUCCESS:
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
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
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
