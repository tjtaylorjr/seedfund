import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = ({ authenticated, setAuthenticated }) => {
  if (authenticated) {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/start" exact={true} activeClassName="active">
              Start A Project
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" exact={true} activeClassName="active">
              Profile
            </NavLink>
          </li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export default NavBar;
