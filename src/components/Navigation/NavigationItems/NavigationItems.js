import React from "react";
import Classes from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";

const navigationItems = props => {
  return (
    <ul className={Classes.NavigationItems}>
      <li className={Classes.NavigationItem} onClick={props.clicked}>
        <NavLink exact activeClassName={Classes.active} to="/">
          Burger Builder
        </NavLink>
      </li>
      <li className={Classes.NavigationItem} onClick={props.clicked}>
        <NavLink exact activeClassName={Classes.active} to="/order">
          Order
        </NavLink>
      </li>
    </ul>
  );
};

export default navigationItems;
