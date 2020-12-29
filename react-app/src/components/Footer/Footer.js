import React from "react";
import Community from "./Community";
import Contributers from "./Contributers";
import Product from "./Product";

function Footer() {
  return (
    <>
      <div className="footer-grid__main-container">
        <Contributers />
        <Product />
        <Community />
      </div>
      <div className="footer__bottom-container">
        <div className="footer-copyright">© 2020 SeedFund</div>
        <a
          className="footer-github"
          href="https://github.com/tjtaylorjr/seedfund"
        >
          <i className="fab fa-github-square"></i>
        </a>
      </div>
    </>
  );
}

export default Footer;
