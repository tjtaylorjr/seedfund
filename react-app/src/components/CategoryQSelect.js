import React from 'react';
import {NavLink} from 'react-router-dom';

const CategoryQSelect = () => {
  return (
    <div className="cat-select">
      <div className="cat-select__container">
        <div className="cat-select__content-wrapper">
          <div className="cat-select__PLACEHOLDER">
            <div className="cat-select__left-bookend"></div>
            <nav className="cat-select__navigation-links">
              <ul className="cat-select__navigation-links-list">
                <li className="cat-select__navigation-links-PLACEHOLDER">
                  <NavLink></NavLink>
                </li>
              </ul>
            </nav>
            <div className="cat-select__right-bookend"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryQSelect;
