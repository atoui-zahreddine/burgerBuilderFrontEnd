import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingName: ingName
  };
};
export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingName: ingName
  };
};
export const resetIngredients = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS
  };
};
export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};
export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};
export const initIgredients = () => {
  return dispatch => {
    axios
      .get("https://react-burger-builder-b3cce.firebaseio.com/ingredients.json")
      .then(Response => {
        dispatch(setIngredients(Response.data));
      })
      .catch(() => {
        dispatch(fetchIngredientFailed());
      });
  };
};
export const resetBuildingBurger = () => {
  return {
    type: actionTypes.RESET_BUILDING_BURGER
  };
};
