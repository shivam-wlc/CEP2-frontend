import React, { useState } from "react";
import footerStyles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import commonStyles from "./Common.module.css";
import { MdArrowOutward } from "react-icons/md";
import navBar from "./NavBar.module.css";

import explore from "./Explore.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import {
  interestLogo,
  homeHero,
  careerReportImg,
} from "../../assets/assest.js";

const NewTest = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(0);

  const images = [
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
  ];
  const cardPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * cardPerPage;
  const firstIndex = lastIndex - cardPerPage;
  const visibleImages = images.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(images.length / cardPerPage);

  const opotunityListItems = ["To Work", "To Upskill", "To Serve"];
  const work = [
    "Internships",
    "Apprenticeships",
    "Traineeships",
    "Micro-internships",
    "Virtual Internships",
    "Graduate Training",
  ];
  const upskill = ["A", "B", "C", "D", "E"];
  const serve = ["W", "F", "CA", "DW", "EA"];

  const [activeOportunityCard, setActiveOportunityCard] = useState(1);

  const handlePreviousPage = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };
  const handleNextPage = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1));
  };

  const navItems = [
    {
      name: "Explore",
      slug: "/",
    },
    {
      name: "Assessment Center",
      slug: "assessment-center",
    },
    {
      name: "Resume Builder",
      slug: "resume-builder",
    },
    {
      name: "How it works?",
      slug: "how-it-works",
    },
  ];
  return (
    <div>
      {/* header */}
      <nav className={navBar["navContainer"]}>
        <img src={interestLogo} alt="logo" width={"10%"} />
        <div className={navBar["right"]}>
          <ul className={navBar["navLinks"]}>
            {navItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavClick(index, item.slug)}
                className={index === activeLink ? navBar.active : ""}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <button
            className={commonStyles.navButton}
            id="navButton"
            onClick={() => navigate("/signup")}
          >
            Sign up{" "}
            <span>
              <MdArrowOutward />
            </span>
          </button>
        </div>
      </nav>

      {/* content  */}
      <div>
        <section className={explore.main}>
          <div className={explore["left"]}>
            <h3>Turning possibility to reality</h3>
            <p>
              Your future is closer than you think! Start figuring out what
              you're passionate about, build the skills you'll need, and plan
              your next steps now. It's never too early to start shaping a
              career that's exciting and right for you!
            </p>
            <button className={commonStyles.navButton}>
              Your Career journey starts here{" "}
              <span>
                <MdArrowOutward />
              </span>
            </button>
          </div>
          <div className={explore["right"]}>
            <img src={homeHero} alt="" />
          </div>
        </section>
        <section className={explore.cards}>
          <div className={explore.left}>
            <h3>Explore</h3>
            <p>
              Widen your horizons. Time to explore content from Career guidance
              counsellors sharing their wisdom and experiences, so you can make
              the best choices
            </p>
            <button>
              Go To Explore{" "}
              <span>
                <MdArrowOutward />
              </span>
            </button>
          </div>
          <div className={explore.right}>
            <div className={explore["pagination"]}>
              <div></div>
              <div className={explore["pagination-buttons"]}>
                <button
                  disabled={currentPage == 1}
                  onClick={handlePreviousPage}
                  className={currentPage == 1 ? `${explore.disabled}` : ""}
                >
                  <FaArrowLeft />
                </button>
                <button
                  disabled={currentPage == totalPages}
                  onClick={handleNextPage}
                  className={currentPage == totalPages ? explore.disabled : ""}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
            <div className={explore["horizontal-scroll-page"]}>
              {visibleImages.map((image, index) => (
                <div
                  className={explore.images}
                  key={index}
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
            </div>
          </div>
        </section>
        <section className={explore["understand-your-self"]}>
          <div className={explore["left"]}>
            <img src={careerReportImg} alt="UnderStand yourself Image" />
          </div>
          <div className={explore["right"]}>
            <h3>Understanding yourself</h3>
            <p>
              Our AI refined Assessment is a great way to profile your real
              interests, strengths and personality, to build a shortlist of
              potential educational and career pathways. Its quick and easy and
              should give you immediate insights into careers that you can
              flourish and excel in.
            </p>
            <p>
              You can do the whole Assessment and we will share 3 Career roles
              identified for you to consider, for{" "}
              <span className={explore.yellowText}>FREE</span>. For the more
              detailed analysis and the full 'Career Directions Report for you
              to download and share, there is a charge of <b>$49.</b>
            </p>
            <button
              className={commonStyles.navButton}
              onClick={() => navigate("#")}
            >
              Go To Assessment Centre{" "}
              <span>
                <MdArrowOutward />
              </span>
            </button>
          </div>
        </section>
        <section className={explore.oportunity}>
          <h3>Opportunity</h3>
          <ul className={explore["oportunity-list"]}>
            {opotunityListItems.map((item, index) => (
              <li
                key={index}
                onClick={() => setActiveOportunityCard(index + 1)}
                className={
                  activeOportunityCard == index + 1
                    ? explore["activeOportunityCard"]
                    : ""
                }
              >
                {item}
              </li>
            ))}
          </ul>
          <div>
            {activeOportunityCard == 1 && (
              <ul className={explore["oportunityItemCardsList"]}>
                {work.map((item, index) => (
                  <li key={index} className={explore["oportunityItemCard"]}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {activeOportunityCard == 2 && (
              <ul className={explore["oportunityItemCardsList"]}>
                {upskill.map((item, index) => (
                  <li key={index} className={explore["oportunityItemCard"]}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {activeOportunityCard == 3 && (
              <ul className={explore["oportunityItemCardsList"]}>
                {serve.map((item, index) => (
                  <li key={index} className={explore["oportunityItemCard"]}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className={commonStyles.navButton}
            onClick={() => navigate("#")}
          >
            Comming Soon...
          </button>
        </section>
      </div>

      {/* footer  */}
      <section className={footerStyles["footer"]}>
        <div className={footerStyles.card}>
          <div>
            <img src="/images/logo.png" alt="" />
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
    </div>
  );
};

export default NewTest;
