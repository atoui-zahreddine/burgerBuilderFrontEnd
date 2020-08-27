import * as actionTypes from "./actionTypes";

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
export const initIngredients = () => {
  return {
    type: actionTypes.SET_INGREDIENTS
  };
};
export const resetBuildingBurger = () => {
  return {
    type: actionTypes.RESET_BUILDING_BURGER
  };
};
