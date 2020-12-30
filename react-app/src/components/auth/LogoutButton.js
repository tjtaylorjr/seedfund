import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/auth";

const LogoutButton = ({ setAuthenticated }) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return (
    <li className="navbar__navlink-logout" onClick={onLogout}>
      <NavLink to="#" exact={true} activeClassName="active">
        Logout
      </NavLink>
    </li>
  );
};

export default LogoutButton;
