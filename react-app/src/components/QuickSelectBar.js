import React from 'react';
import {NavLink} from 'react-router-dom';

const QuickSelectBar = () => {
  return (
    <div className="quick-select">
      <div className="quick-select__container">
        <div className="quick-select__content-wrapper">
          <div className="quick-select__left-bookend"></div>
          <nav className="quick-select__navigation-links">
            <ul className="quick-select__navigation-links-list">
              <li className="quick-select__navigation-links-PLACEHOLDER">
                <NavLink></NavLink>
              </li>
            </ul>
          </nav>
          <div className="quick-select__right-bookend"></div>
        </div>
      </div>
    </div>
  )
}

export default QuickSelectBar;
