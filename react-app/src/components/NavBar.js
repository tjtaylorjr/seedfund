import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useHistory } from "react-router-dom";
// import { login } from "../services/auth";

const NavBar = ({ authenticated, setAuthenticated, setCurrentUser }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const hideSearch = () => {
    setIsHidden(true);
  };

  const showSearch = () => {
    setIsHidden(false);
  };

  // const demoLogin = async (e) => {
  //   e.preventDefault();
  //   const email = "demo@user.io";
  //   const password = "password";
  //   const user = await login(email, password);
  //   if (!user.errors) {
  //     setAuthenticated(true);
  //   }
  // }
  //   if (authenticated) {
  //     return <Redirect to="/" />;
  //   }
  // }

  const handleSearchQuery = (e) => {
    e.preventDefault();
    hideSearch();
    const query = searchText.toLowerCase();
    // const query = searchText.toLowerCase().split('%20a%20').join('%20').split('%20an%20').join('%20').split('%20the%20').join('%20').split('%20if%20').join('%20').split('$20or%20').join('%20').split('%20but%20').join('%20').split('%20and%20').join('%20').split('%20for%20').join('%20').split('%20nor%20').join('%20').split('%20yet%20').join('%20').split('%20so%20').join('%20').split('%20at%20').join('%20').split('%20by%20').join('%20').split('%20from%20').join('%20').split('%20in%20').join('%20').split('%20into%20').join('%20').split('%20of%20').join('%20').split('%20on%20').join('%20').split('%20to%20').join('%20').split('%20with%20').join('%20');
    setSearchText('');
    history.push(`/discover/${query}`);
  };

  const searchFunction = (
    <>
      <div className="navbar__searchfield-container">
        <div className="navbar__searchfield-wrapper">
          <div className="navbar__searchfield-component-container">
            <form className="navbar__searchfield-input-container">
              <input
                className="navbar__searchfield-input"
                placeholder="Search for projects or categories"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="navbar__searchfield-button--hidden"
                onClick={handleSearchQuery}
              ></button>
              <div className="navbar__searchfield-close-button-container">
                <button className="navbar__searchfield-close-button">
                  <svg
                    onClick={hideSearch}
                    className="navbar__searchfield-close-button-icon"
                    viewBox="0 0 60 60"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M34.242 30.3l15.556-15.557c.392-.392.392-1.024 0-1.414L46.97 10.5c-.39-.39-1.022-.39-1.414 0L30 26.058 14.444 10.5c-.392-.39-1.024-.39-1.414 0l-2.83 2.83c-.39.39-.39 1.02 0 1.413L25.758 30.3 10.2 45.854c-.39.392-.39 1.024 0 1.414l2.83 2.827c.39.392 1.022.392 1.414 0L30 34.54l15.556 15.557c.392.392 1.024.392 1.414 0l2.828-2.828c.392-.39.392-1.023 0-1.415L34.242 30.3z"
                        fill="#282828"
                        fillRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            </form>
            <div className="navbar__searchfield-results-container">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (authenticated) {
    return (
      <nav className="navbar">
        <section className="navbar__wrapper">
          {!isHidden && searchFunction}
          <section className="navbar__left-links-container">
            <ul className="navbar__left-links-list">
              <li className="navbar__navlink-home">
                <NavLink to="/" exact={true} activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="navbar__navlink-start">
                <NavLink to="/start" exact={true} activeClassName="active">
                  Start A Project
                </NavLink>
              </li>
            </ul>
          </section>
          <section className="navbar__sitename-container">
            <a className="navbar__sitename-text" href="/">
              <div className="navbar__sitename-text">SeedFund</div>
            </a>
          </section>
          <section className="navbar__right-links-container">
            <ul className="navbar__right-links-list">
              <div className="navbar__navlink-search-container">
                <li className="navbar__navlink-search">
                  <NavLink to="#" activeClassName="active" onClick={showSearch}>
                    Search
                  </NavLink>
                </li>
                <svg viewBox="0 0 60 60">
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M26.104 6.104c11.044 0 20 8.954 20 20 0 4.44-1.464 8.528-3.912 11.846l11.412 11.412c.39.39.39 1.024 0 1.414l-2.828 2.828c-.196.196-.452.292-.708.292-.256 0-.51-.096-.706-.292L37.95 42.192c-3.318 2.448-7.406 3.912-11.846 3.912-11.044 0-20-8.954-20-20s8.956-20 20-20zm0 6c-7.718 0-14 6.28-14 14s6.282 14 14 14c2.988 0 5.854-.948 8.284-2.74L36.1 36.1l1.264-1.712c1.792-2.43 2.74-5.294 2.74-8.284 0-7.72-6.282-14-14-14z"
                      fill="#282828"
                    ></path>
                  </g>
                </svg>
              </div>
              <li className="navbar__navlink-profile">
                <NavLink to="/profile" exact={true} activeClassName="active">
                  Profile
                </NavLink>
              </li>
              <LogoutButton
                setAuthenticated={setAuthenticated}
                setCurrentUser={setCurrentUser}
              />
            </ul>
          </section>
        </section>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <section className="navbar__wrapper">
          {!isHidden && searchFunction}
          <section className="navbar__left-links-container">
            <ul className="navbar__left-links-list">
              <li className="navbar__navlink-home">
                <NavLink to="/" exact={true} activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="navbar__navlink-start">
                <NavLink to="/start" exact={true} activeClassName="active">
                  Start A Project
                </NavLink>
              </li>
            </ul>
          </section>
          <section className="navbar__sitename-container">
            <div className="navbar__sitename-text">SeedFund</div>
          </section>
          <section className="navbar__right-links-container">
            <ul className="navbar__right-links-list">
              <div className="navbar__navlink-search-container">
                <li className="navbar__navlink-search">
                  <NavLink to="#" activeClassName="active" onClick={showSearch}>
                    Search
                  </NavLink>
                </li>
                <svg viewBox="0 0 60 60">
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M26.104 6.104c11.044 0 20 8.954 20 20 0 4.44-1.464 8.528-3.912 11.846l11.412 11.412c.39.39.39 1.024 0 1.414l-2.828 2.828c-.196.196-.452.292-.708.292-.256 0-.51-.096-.706-.292L37.95 42.192c-3.318 2.448-7.406 3.912-11.846 3.912-11.044 0-20-8.954-20-20s8.956-20 20-20zm0 6c-7.718 0-14 6.28-14 14s6.282 14 14 14c2.988 0 5.854-.948 8.284-2.74L36.1 36.1l1.264-1.712c1.792-2.43 2.74-5.294 2.74-8.284 0-7.72-6.282-14-14-14z"
                      fill="#282828"
                    ></path>
                  </g>
                </svg>
              </div>
              {/* <li className="navbar__navlink-profile">
                <NavLink to="#" exact={true} activeClassName="active" onClick={demoLogin}>
                  Demo
              </NavLink>
              </li> */}
              <li className="navbar__navlink-login">
                <NavLink to="/login" exact={true} activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" exact={true} activeClassName="active">
                  Signup
                </NavLink>
              </li>
            </ul>
          </section>
        </section>
      </nav>
    );
  }
};

export default NavBar;
