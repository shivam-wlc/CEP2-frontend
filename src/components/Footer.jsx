import React from "react";
import footerStyles from "../styles/Footer.module.css";
import { interestLogo } from "../assets/assest.js";

const Footer = () => {
  return (
    <section className={footerStyles["footer"]}>
      <div className={footerStyles.card}>
        <div>
          <img
            src={interestLogo}
            alt="Career-Explorer-Logo"
            width={150}
            style={{ marginBottom: "1rem" }}
          />
          <p>
            CareerExplorer.me seeks to help High School and Higher Education
            students to plan their career journey, research and explore
            opportunities for education and early career employment.
          </p>
        </div>
        <div>
          <h3>Usefull Links</h3>
          <div className={footerStyles["line"]}></div>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </div>
        <div>
          <h3>Usefull Links</h3>
          <div className={footerStyles["line"]}></div>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </div>
        <div>
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
        &copy; COPYRIGHT 2024{" "}
        <span className={footerStyles.yellowText}>Career Explorer.</span>{" "}
      </p>
    </section>
  );
};

export default Footer;
