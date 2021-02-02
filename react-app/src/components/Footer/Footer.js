import React from "react";
import Community from "./Community";
import Contributors from "./Contributors";
import Product from "./Product";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-grid__main-container">
        <Contributors />
        <Product />
        <Community />
      </div>
      <div className="footer__bottom-container">
        <div className="footer-copyright">SeedFund, © 2020</div>
        <a
          className="footer-github"
          href="https://github.com/tjtaylorjr/seedfund"
        >
          <i className="fab fa-github-square"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
