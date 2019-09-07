import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingName] !== 0) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingName]: state.ingredients[action.ingName] - 1
          },
          totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingName]
        };
      }
      return state;
    case actionTypes.RESET_INGREDIENTS:
      return {
        ...initialState,
        ingredients: { ...initialState.ingredients }
      };
    default:
      return state;
  }
};

export default reducer;
