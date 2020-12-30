import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../services/auth";
import Footer from "../Footer/Footer";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(firstname, lastname, username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      } else {
        console.log("there are errors");
        setErrors(user.errors);
      }
    } else {
      setErrors(["Password: The password did not match"]);
    }
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="signup-page__main-container">
        <div className="signup-form__main-container">
          <div className="login-link__main-container">
            <div className="login-link__message">Already have an account?</div>
            <NavLink className="login-link__link" to="/login" exact={true}>
              Log In
            </NavLink>
          </div>
          <form className="signup-form__form-container" onSubmit={onSignUp}>
            {errors.length ? (
              <div className="errors__main-container">
                <strong>We encountered the following errors:</strong>
                {errors.map((error, idx) => (
                  <div key={idx} className="error-message">
                    {error}
                  </div>
                ))}
              </div>
            ) : (
              <span></span>
            )}
            <div className="signup-form__title">Sign Up</div>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="signup-form__input-field"
              onChange={updateFirstname}
              value={firstname}
            ></input>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="signup-form__input-field"
              onChange={updateLastname}
              value={lastname}
            ></input>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="signup-form__input-field"
              onChange={updateUsername}
              value={username}
            ></input>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="signup-form__input-field"
              onChange={updateEmail}
              value={email}
            ></input>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={updatePassword}
              className="signup-form__input-field"
              value={password}
            ></input>
            <input
              type="password"
              name="repeat_password"
              placeholder="Confirm Password"
              className="signup-form__input-field"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <button className="signup-form__submit-button" type="submit">
              Create an account
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpForm;
