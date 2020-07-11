import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return {
        ...initialState,
        ingredients: { ...initialState.ingredients }
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingName],
        building: true
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
    case actionTypes.RESET_BUILDING_BURGER:
      return {
        ...state,
        building: false
      };
    default:
      return state;
  }
};

export default reducer;
