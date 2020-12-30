import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../services/auth";
import Footer from "../Footer/Footer";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="login-page__main-container">
        <div className="login-form__main-container">
          <form className="login-form__form-container" onSubmit={onLogin}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div className="login-form__title">Log In</div>
            <input
              name="email"
              type="text"
              className="login-form__input-field"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="login-form__input-field"
              value={password}
              onChange={updatePassword}
            />
            <button className="login-form__submit-button" type="submit">
              Log in
            </button>
          </form>
          <div className="signup-link__main-container">
            <div className="signup-link__message">New to SeedFund?</div>
            <NavLink
              className="signup-link__link"
              to="/users/signup"
              exact={true}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
