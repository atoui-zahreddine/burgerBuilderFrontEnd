import * as actionTypes from "./actionTypes";
import axios from "../../axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => dispatch(authLogout()), expirationTime * 1000);
  };
};
export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};
export const auth = (email, password, isSignup) => {
  return dispatch => {
    const authData = {
      email: email,
      password: password
    };
    dispatch(authStart());
    let url =
      "http://localhost:8080/users";
    if (!isSignup) {
      url =
        "http://localhost:8080/auth/signin";
    }
    axios
      .post(url, authData)
      .then(response => {
        localStorage.setItem("token", response.data.token);

        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );

        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(response.data.token));
        dispatch(checkAuthTimeout(response.data.expiresIn));

      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }else{
        dispatch(authFail(null));
        dispatch(authLogout());
      }
    }else{
      dispatch(authFail(null));
    }
  };
};

export const removeAuthErrors = () => {
  return {
    type: actionTypes.REMOVE_AUTH_ERRORS
  };
};
