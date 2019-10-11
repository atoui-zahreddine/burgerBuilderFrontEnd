import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Classes from "./ErrorMessage.module.css";

const errorMessage = props => {
  let message = null;
  // eslint-disable-next-line default-case
  switch (props.error) {
    case "EMAIL_EXISTS":
      message =
        "Sorry ,this email address is already in use by another account";
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      message =
        "We have blocked all requests from this device due to unusual activity. Try again later.";
      break;
    case "EMAIL_NOT_FOUND":
      message = "Sorry ,this email address doesn't exist";
      break;
    case "USER_DISABLED":
      message = "This account has been disabled by an administrator";
      break;
    case "INVALID_PASSWORD":
      message = "Sorry ,that password isn't right";
      break;
  }

  return (
    <div className={Classes.Error}>
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        size="2x"
        className={Classes.ErrorIcon}
      />
      <p className={Classes.ErrorMessage}>{message}</p>
    </div>
  );
};

export default errorMessage;
