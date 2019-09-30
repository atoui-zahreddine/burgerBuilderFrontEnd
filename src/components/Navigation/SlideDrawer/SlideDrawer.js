import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import Classes from "./SlideDrawer.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const slideDrawer = props => {
  let attachedClasses = [Classes.SlideDrawer, Classes.close].join(" ");
  if (props.open) {
    attachedClasses = [Classes.SlideDrawer, Classes.open].join(" ");
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses}>
        <div className={Classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            isAuthenticated={props.isAuth}
            clicked={props.closed}
          />
        </nav>
      </div>
    </Aux>
  );
};

export default slideDrawer;
