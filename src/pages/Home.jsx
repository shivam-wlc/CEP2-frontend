import React, { useState } from "react";
import homeStyle from "../styles/Home.module.css";
import commonStyles from "../styles/Common.module.css";
import { MdArrowOutward } from "react-icons/md";
import { careerReportImg, homeHero } from "../assets/assest";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeOportunityCard, setActiveOportunityCard] = useState(1);
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
  const opotunityListItems = ["To Work", "To Upskill", "To Serve"];
  const images = [
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
    "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
  ];
  const cardPerPage = 2;
  const lastIndex = currentPage * cardPerPage;
  const firstIndex = lastIndex - cardPerPage;
  const visibleImages = images.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(images.length / cardPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };
  const handleNextPage = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1));
  };

  return (
    <>
      <div
        className={homeStyle.container}
        // style={{
        //   backgroundImage: `url("./${backgroundVector}")`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <section className={homeStyle.main}>
          <div className={homeStyle["left"]}>
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
          <div className={homeStyle["right"]}>
            <img src={homeHero} alt="" />
          </div>
        </section>
        <section className={homeStyle.cards}>
          <div className={homeStyle.left}>
            <h3>Explore</h3>
            <p>
              Widen your horizons. Time to explore content from Career guidance
              counsellors sharing their wisdom and experiences, so you can make
              the best choices
            </p>
            <button>
              Go To Explore
              <span>
                <MdArrowOutward />
              </span>
            </button>
          </div>
          <div className={homeStyle.right}>
            <div className={homeStyle["pagination"]}>
              <div></div>
              <div className={homeStyle["pagination-buttons"]}>
                <button
                  disabled={currentPage == 1}
                  onClick={handlePreviousPage}
                  className={currentPage == 1 ? `${homeStyle.disabled}` : ""}
                >
                  <FaArrowLeft />
                </button>
                <button
                  disabled={currentPage == totalPages}
                  onClick={handleNextPage}
                  className={
                    currentPage == totalPages ? homeStyle.disabled : ""
                  }
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
            <div className={homeStyle["horizontal-scroll-page"]}>
              {visibleImages.map((image, index) => (
                <div
                  className={homeStyle.images}
                  key={index}
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
            </div>
          </div>
        </section>
        <section className={homeStyle["understand-your-self"]}>
          <div className={homeStyle["left"]}>
            <img src={careerReportImg} alt="UnderStand yourself Image" />
          </div>
          <div className={homeStyle["right"]}>
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
              <span className={homeStyle.yellowText}>FREE</span>. For the more
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
        <section className={homeStyle.oportunity}>
          <h3>Opportunity</h3>
          <ul className={homeStyle["oportunity-list"]}>
            {opotunityListItems.map((item, index) => (
              <li
                key={index}
                onClick={() => setActiveOportunityCard(index + 1)}
                className={
                  activeOportunityCard == index + 1
                    ? homeStyle["activeOportunityCard"]
                    : ""
                }
              >
                {item}
              </li>
            ))}
          </ul>
          <div>
            {activeOportunityCard == 1 && (
              <ul className={homeStyle["oportunityItemCardsList"]}>
                {work.map((item, index) => (
                  <li key={index} className={homeStyle["oportunityItemCard"]}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {activeOportunityCard == 2 && (
              <ul className={homeStyle["oportunityItemCardsList"]}>
                {upskill.map((item, index) => (
                  <li key={index} className={homeStyle["oportunityItemCard"]}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {activeOportunityCard == 3 && (
              <ul className={homeStyle["oportunityItemCardsList"]}>
                {serve.map((item, index) => (
                  <li key={index} className={homeStyle["oportunityItemCard"]}>
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
            Coming Soon...
          </button>
        </section>
      </div>
    </>
  );
};

export default Home;
