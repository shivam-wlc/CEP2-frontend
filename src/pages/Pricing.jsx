import React from "react";
import { IoMdCheckmark } from "react-icons/io";

import { assessmentHeaderImg, commingSoon, Councellers, HighSchools, student } from "../assets/assest";
import pricingStyles from "../styles/Pricing.module.css";

const Pricing = () => {
  return (
    <div>
      <section className={pricingStyles["header"]} style={{ backgroundImage: `url(${assessmentHeaderImg})` }}>
        <h2>Pricing</h2>
      </section>
      <div className={pricingStyles["container"]}>
        <section>
          <p className={pricingStyles["hero-content"]}>
            Our goal is to bring knowledge, opportunities and systems to individuals interested in
            investigating and planning their career pathways and high schools looking to provide cost
            effective Career Services Management.  We strive to keep a lot of our services available for free
            but need to charge for some services in order to continue with our mission of allowing our
            community of students to reach their personal career goals and ambitions.
          </p>
        </section>
        {/* student */}
        <Card
          className={`${pricingStyles["card"]} ${pricingStyles["student"]}`}
          image={student}
          cardName={"Student"}
          heading={"Free Forever for Registered Students:"}
        >
          <CardContent>Library of Global Career content</CardContent>
          <CardContent>Personal Career Planning Workspace</CardContent>
          <CardContent>Resume builder</CardContent>
          <CardContent>Assessment Centre – Top 3 Occupations</CardContent>
          <button className={pricingStyles["button"]}>
            <div>
              <p style={{ textAlign: "start", marginRight: "3px" }}>Full Career Directions Report</p>
              <p>
                <big>
                  <b>$49</b>
                </big>
              </p>
            </div>
          </button>
        </Card>
        {/* Counsellors */}
        <Card
          className={`${pricingStyles["card"]} ${pricingStyles["Counsellors"]}`}
          image={Councellers}
          cardName={"Counsellors"}
          heading={"Free forever for Career Counsellors:"}
        >
          <CardContent>Upload of Career content through shared link</CardContent>
          <CardContent>Personal Profile page</CardContent>
          <CardContent>Highlighted specialization and expertise</CardContent>
          <CardContent>2Gb of cloud storage for file uploads</CardContent>
          <div className={pricingStyles["Counsellors-button-container"]}>
            <button className={pricingStyles["button"]}>
              <p>15Gb of cloud storage for file uploads</p>
              <p>
                <big>
                  <b>$10</b>
                </big>
                /mo
              </p>
            </button>
            <button className={pricingStyles["button"]}>
              <p>Calendar integration for appointments</p>
              <p>
                <big>
                  <b>$10</b>
                </big>
                /mo
              </p>
            </button>
          </div>
        </Card>
        {/* High Schools */}
        <Card
          className={`${pricingStyles["card"]} ${pricingStyles["high-school"]}`}
          image={HighSchools}
          cardName={"High Schools"}
          heading={"Full High School Career Management System"}
        >
          <div className={pricingStyles["high-school-comming-soon-image-container"]}>
            <img src={commingSoon} alt="comming soon image" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;

const Card = ({ cardName, heading, image, children, className = "" }) => {
  return (
    <section className={className}>
      {/* left */}
      <div className={pricingStyles["left"]}>
        <div>
          <p>{cardName}</p>
          <div></div>
        </div>
      </div>
      {/* right */}
      <div className={pricingStyles["right"]}>
        {/* subleft */}
        <div className={pricingStyles["subleft"]}>
          <img src={image} alt={`${cardName}'s image`} />
        </div>
        {/* subright */}
        <div className={pricingStyles["subright"]}>
          <h3>{heading}</h3>
          {children}
        </div>
      </div>
    </section>
  );
};

const CardContent = ({ children }) => {
  return (
    <div className={pricingStyles["card-content"]}>
      <span>
        <IoMdCheckmark />
      </span>
      {children}
    </div>
  );
};
