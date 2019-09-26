import React from "react";
import Input from "../../components/UI/Form/Input/Input";
import Button from "../../components/UI/Button/Button";
import EmailValidator from "email-validator";
import Classes from "./Auth.module.css";

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
    formValid: false
  };
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
  orderHandler = e => {
    e.preventDefault();
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

    return (
      <div>
        <form className={Classes.Auth}>
          {orderFormArray.map(item => {
            return (
              <Input
                key={item.id}
                name={item.id}
                elementType={item.config.elementType}
                elementConfig={item.config.elementConfig}
                value={item.config.value}
                shouldValidate={item.config.validation}
                invalid={item.config.valid}
                touched={item.config.touched}
                errorMessage={item.config.errorMessage}
                clicked={() => this.inputBlurHandler(item.id)}
                changed={event => this.inputChangeHandler(event, item.id)}
              />
            );
          })}
          <Button btnType="Success">Login</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
