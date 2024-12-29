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
          <h3>Our Policy</h3>
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
          <h3>Quick Links</h3>
          <div className={footerStyles["line"]}></div>
          <ul>
            <Link to="/explore" style={{ textDecoration: "none" }}>
              <li style={{ color: "#a98fa4" }}>Explore</li>
            </Link>
            <Link to="/assessment" style={{ textDecoration: "none" }}>
              <li style={{ color: "#a98fa4" }}>Assessment Center</li>
            </Link>
            <Link to="/resume-builder" style={{ textDecoration: "none" }}>
              <li style={{ color: "#a98fa4" }}>Resume Builder</li>
            </Link>
          </ul>
        </div>
        <div className={footerStyles["usefull-links"]}>
          <h3>Contact & Support</h3>
          <div className={footerStyles["line"]}></div>
          <ul>
            <li style={{ color: "#a98fa4" }}>Contact Us</li>
            <li style={{ color: "#a98fa4" }}>Student Support</li>
            <li style={{ color: "#a98fa4" }}>Technical Support</li>
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
