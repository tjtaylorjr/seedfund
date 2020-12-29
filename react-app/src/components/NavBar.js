import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ authenticated, setAuthenticated }) => {
  const [isHidden, setIsHidden] = useState(true)
  const [searchText, setSearchText] = useState(null)

  const hideSearch = () => {
    setIsHidden(true)
  }

  const showSearch = () => {
    setIsHidden(false)
  }

  const searchFunction = (
    <>
      <div className="navbar__searchfield-container">
        <div className="navbar__searchfield-wrapper">
          <div className="navbar__searchfield-component-container">
            <div className="navbar__searchfield-input-container">
              <input className="navbar__searchfield-input" placeholder="Search for projects or categories" />
              <div className="navbar__searchfield-close-button-container">
                <button className="navbar__searchfield-close-button">
                  <svg onClick={hideSearch} className="navbar__searchfield-close-button-icon" viewBox="0 0 60 60">
                    <g fill="none" fillRule="evenodd">
                      <path d="M 34.242 30.3 l 15.556 -15.557 c 0.392 -0.392 0.392 -1.024 0 -1.414 L 46.97 10.5 c -0.39 -0.39 -1.022 -0.39 -1.414 0 L 30 26.058 L 14.444 10.5 c -0.392 -0.39 -1.024 -0.39 -1.414 0 l -2.83 2.83 c -0.39 0.39 -0.39 1.02 0 1.413 L 25.758 30.3 L 10.2 45.854 c -0.39 0.392 -0.39 1.024 0 1.414 l 2.83 2.827 c 0.39 0.392 1.022 0.392 1.414 0 L 30 34.54 l 15.556 15.557 c 0.392 0.392 1.024 0.392 1.414 0 l 2.828 -2.828 c 0.392 -0.39 0.392 -1.023 0 -1.415 L 34.242 30.3 Z" fill="#282828" fillRule="evenodd"></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className="navbar__searchfield-results-container">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  if (authenticated) {
    return (
      <nav className="navbar">
        <section className="navbar__wrapper">
          {!isHidden && searchFunction}
          <section className="navbar__left-links-container">
            <ul>
              <li className="navbar__navlink-home">
                <NavLink to="/" exact={true} activeClassName="active">
                  Home
              </NavLink>
              </li>
              <li>
                <NavLink to="/start" exact={true} activeClassName="active">
                  Start A Project
              </NavLink>
              </li>
            </ul>
          </section>
          <ul>
            <li>
              <NavLink to="#" activeClassName="active" onClick={showSearch}>Search</NavLink>
            </li>
            <li>
              <NavLink to="/profile" exact={true} activeClassName="active">
                Profile
            </NavLink>
            </li>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </ul>
        </section>
      </nav>
    )
  } else {
    return (
      <nav className="navbar">
        <section className="navbar__wrapper">
          {!isHidden && searchFunction}
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
        </section>
      </nav>
    )
  }
}

export default NavBar;
