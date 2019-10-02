import React from "react";
import Input from "../../components/UI/Form/Input/Input";
import Button from "../../components/UI/Button/Button";
import EmailValidator from "email-validator";
import Classes from "./Auth.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spiner";

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        validation: {
          required: true,
          email: true
        },
        errorMessage: "Email is required",
        touched: false,
        valid: false,
        value: ""
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password"
        },
        validation: {
          required: true,
          minLength: 8
        },
        errorMessage: "Password is required",
        touched: false,
        valid: false,
        value: ""
      }
    },
    formValid: false,
    isSignup: true
  };

  componentDidMount() {
    if (this.props.buildingBurger && this.props.redirectPath === "/") {
      this.props.onSetAuthRedirectPath("/checkout");
    }
    if (!this.props.buildingBurger && this.props.redirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;
      }
      if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
      }
      if (rules.email) {
        isValid = isValid && EmailValidator.validate(value);
      }
    }
    return isValid;
  };
  submitHandler = e => {
    e.preventDefault();
    if (this.state.formValid) {
      this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.isSignup
      );
    } else {
      const formData = { ...this.state.controls };
      for (let formElement in formData) {
        formData[formElement] = { ...formData[formElement], touched: true };
      }
      this.setState({ controls: formData });
    }
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.controls,
      [inputIdentifier]: {
        ...this.state.controls[inputIdentifier],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
        touched: false
      }
    };

    let formValid = true;
    for (let key in updatedForm) {
      if (updatedForm[key].validation) {
        formValid = updatedForm[key].valid && formValid;
      }
    }

    this.setState({ controls: updatedForm, formValid: formValid });
  };
  switchAuthModeHandler = () =>
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  inputBlurHandler = inputIdentifier => {
    const updatedOrderForm = { ...this.state.controls };
    const updatedFormElement = { ...this.state.controls[inputIdentifier] };
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ controls: updatedOrderForm });
  };
  render() {
    const orderFormArray = [];
    for (let key in this.state.controls) {
      orderFormArray.push({
        id: key,
        config: { ...this.state.controls[key] }
      });
    }
    let authForm = (
      <form onSubmit={this.submitHandler}>
        {this.props.error ? (
          <p style={{ border: "1px solid red", color: "red" }}>
            <strong> {this.props.error.message}</strong>
          </p>
        ) : null}
        {orderFormArray.map(item => {
          return (
            <Input
              key={item.id}
              isSignup={this.state.isSignup}
              name={item.id}
              elementType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.config.value}
              shouldValidate={item.config.validation}
              valid={item.config.valid}
              touched={item.config.touched}
              errorMessage={item.config.errorMessage}
              clicked={() => this.inputBlurHandler(item.id)}
              changed={event => this.inputChangeHandler(event, item.id)}
            />
          );
        })}
        <Button btnType="Success" clicked={this.onAuth}>
          {this.state.isSignup ? " Sign Up" : " Sign In"}
        </Button>
      </form>
    );
    if (this.props.loading) {
      authForm = <Spinner />;
    }

    return (
      <div className={Classes.Auth}>
        {this.props.isAuthenticated ? (
          <Redirect to={this.props.redirectPath} />
        ) : null}
        {authForm}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch to
          {this.state.isSignup ? " Sign In" : " Sign Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    redirectPath: state.auth.redirectPath,
    buildingBurger: state.burgerBuilder.building
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
