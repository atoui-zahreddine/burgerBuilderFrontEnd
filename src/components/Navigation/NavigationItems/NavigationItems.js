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
      {props.isAuthenticated ? (
        <li className={Classes.NavigationItem} onClick={props.clicked}>
          <NavLink exact activeClassName={Classes.active} to="/orders">
            Orders
          </NavLink>
        </li>
      ) : null}
      <li className={Classes.NavigationItem} onClick={props.clicked}>
        {!props.isAuthenticated ? (
          <NavLink exact activeClassName={Classes.active} to="/auth">
            Login
          </NavLink>
        ) : (
          <NavLink exact activeClassName={Classes.active} to="/logout">
            Logout
          </NavLink>
        )}
      </li>
    </ul>
  );
};

export default navigationItems;
