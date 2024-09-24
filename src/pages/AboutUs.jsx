import React from "react";
import aboutStyles from "../styles/About.module.css";
import {
  Founder,
  A,
  B,
  C,
  D,
  E,
  assessmentHeaderImg,
} from "../assets/assest.js";
import { IoMdCheckmark } from "react-icons/io";
import Headers from "../components/Headers";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <Headers />
      <section
        className={aboutStyles["header"]}
        style={{ backgroundImage: `url(${assessmentHeaderImg})` }}
      >
        <h2>About Us</h2>
      </section>
      <div className={aboutStyles["container"]}>
        <section className={aboutStyles["hero"]}>
          <img src={Founder} alt="Founder" />
          <div className={aboutStyles["hero-text"]}>
            <p className={aboutStyles["hero-text-about-us"]}>About Us</p>
            <h3>Get to Know Us</h3>
            <div className={aboutStyles["hero-text-content"]}>
              <p>
                At CareerExplorer.me we are a small group of dedicated
                professionals from various fields bringing our expertise to
                serve those interested in planning and developing their career
                paths and the advisers, guides or counsellors who seek to assist
                them in reaching their career aspirations.
              </p>
              <p>
                Our ambition is to make students consider a wide range of
                possibilities and then using our career guidance model and
                tools, explore to gain clarity and make decisions that create a
                positive impact on the direction of early stage careers.{" "}
              </p>
              <p>
                We use AI and rich individual datasets to provide relevant and
                hyper-personalized information that stays current with the
                changing demands of the job market and the educational and
                training opportunities that will allow students to make well
                thought through choices, that progress them along their career
                journeys. “We will always look at ways to provide the best
                experience and greatest value to our community of students,
                counsellors and educational partners”
              </p>
            </div>
            <p className={aboutStyles["hero-text-content-founder-name"]}>
              Mohamed Maladwala
            </p>
            <p className={aboutStyles["hero-text-content-founder-position"]}>
              Founder, CareerExplorer.me
            </p>
          </div>
        </section>
        <section className={aboutStyles["bottom-container"]}>
          <h3>Advisory Board</h3>
          <p>
            To set the direction of our corporate compass we have our Advisory
            Board whose members  bring their expert knowledge to shape the
            current and future offering of CareerExplorer.me.
          </p>
          <div className={`${aboutStyles["cards-container"]}`}>
            <div>
              <Card image={A} name="Amit" designation={"Founder, CE"} />
              <Card image={B} name="Amit" designation={"Founder, CE"} />
              <Card image={C} name="Amit" designation={"Founder, CE"} />
            </div>
            <div>
              <Card image={D} name="Amit" designation={"Founder, CE"} />
              <Card image={E} name="Amit" designation={"Founder, CE"} />
              <Card image={E} name="Amit" designation={"Founder, CE"} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

const Card = ({ image, name, designation }) => {
  return (
    <div>
      <img src={image} alt="" width={"200px"} height={"200px"} />
      <div>
        <p>{name}</p>
        <p>{designation}</p>
      </div>
    </div>
  );
};
