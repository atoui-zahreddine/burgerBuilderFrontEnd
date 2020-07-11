import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  error: null,
  loading: false,
  authCheck:true,
  redirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REMOVE_AUTH_ERRORS:
      return {
        ...state,
        error: null
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: action.path
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false,
        authCheck: false,
        error: null
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        authCheck: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        authCheck:false
      };
    default:
      return state;
  }
};

export default reducer;
