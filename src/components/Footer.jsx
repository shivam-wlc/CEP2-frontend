import React from "react";
import { Link } from "react-router-dom";

import { interestLogo } from "../assets/assest.js";
import footerStyles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <section className={footerStyles["footer"]}>
      <div className={footerStyles.card}>
        <div>
          <Link to="/">
            <img src={interestLogo} alt="Career-Explorer-Logo" width={150} style={{ marginBottom: "1rem" }} />
          </Link>
          <p>
            CareerExplorer.me seeks to help High School and Higher Education students to plan their career
            journey, research and explore opportunities for education and early career employment.
          </p>
        </div>
        <div className={footerStyles["usefull-links"]}>
          <h3>Usefull Links</h3>
          <div className={footerStyles["line"]}></div>
          <ul>
            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <li style={{ color: "#a98fa4" }}>About Us</li>
            </Link>
            <Link to="/privacy-and-policy" style={{ textDecoration: "none" }}>
              <li style={{ color: "#a98fa4" }}>Privacy Policy</li>
            </Link>

            <Link to="/terms-and-conditions" style={{ textDecoration: "none" }}>
              <li style={{ color: "#a98fa4" }}>Terms and Conditions</li>
            </Link>
          </ul>
        </div>
        <div className={footerStyles["usefull-links"]}>
          <h3>Usefull Links</h3>
          <div className={footerStyles["line"]}></div>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </div>
        <div className={footerStyles["usefull-links"]}>
          <h3>Usefull Links</h3>
          <div className={footerStyles["line"]}></div>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </div>
      </div>
      <p>
        {" "}
        &copy; COPYRIGHT 2024 <span className={footerStyles.yellowText}>Career Explorer.</span>{" "}
      </p>
    </section>
  );
};

export default Footer;
