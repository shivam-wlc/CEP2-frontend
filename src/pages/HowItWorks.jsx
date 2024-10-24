import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  assessmentHeaderImg,
  worksHeroImg,
  worksStep1Img,
  worksStep2Img,
  worksStep3Img,
  worksStep4Img,
} from "../assets/assest";
import commonStyle from "../styles/Common.module.css";
import worksStyles from "../styles/HowItWorks.module.css";

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/explore");
  };

  const handleAssessmentClick = () => {
    navigate("/assessment");
  };

  const handleResumeClick = () => {
    navigate("/resume-builder");
  };

  return (
    <div className={worksStyles["container"]}>
      <section className={worksStyles["header"]} style={{ backgroundImage: `url(${assessmentHeaderImg})` }}>
        <h2>How it works?</h2>
      </section>
      <section className={worksStyles["planning-for-success"]}>
        <h3>Planning for Career Success</h3>
        <div className={worksStyles["heroImage"]} style={{ backgroundImage: `url(${worksHeroImg})` }}></div>
      </section>
      <section className={worksStyles["steps"]}>
        <div className={worksStyles["stepsImage"]} style={{ backgroundImage: `url(${worksStep1Img})` }}></div>
        <div className={worksStyles["stepsContent"]}>
          <h4>Research & Exploration</h4>
          <p>
            You should be hungry for information. Our career guides generously share their wisdom through
            their content on the Explore pages. Follow your instincts and have smart learning conversations
            with career specialists, friends, parents and mentors. Share, Save and Store what you find
            interesting. CareerExplorer.me allocates a private workspace for you to organize your research and
            build your career plan.
          </p>
          <button className={commonStyle["navButton"]} onClick={handleExploreClick}>
            Go Explore{" "}
            <span>
              <MdArrowOutward />
            </span>
          </button>
        </div>
      </section>
      <section className={`${worksStyles["steps"]} ${worksStyles["self-assessment"]}`}>
        <div className={worksStyles["stepsContent"]}>
          <h4>Self Assessment and Interests</h4>
          <p>
            Now you need to reflect and see what your strengths are so you can begin to identify potential
            educational options and work pathways. Our Assessment Centre brings this together in a
            personalized Career Directions Report, after you complete our short online assessment. You can
            take as long as you like but it should not take longer than 30 minutes and there are no right or
            wrong answers! 
          </p>
          <button className={commonStyle["navButton"]} onClick={handleAssessmentClick}>
            Assessment Centre{" "}
            <span>
              <MdArrowOutward />
            </span>
          </button>
        </div>
        <div className={worksStyles["stepsImage"]} style={{ backgroundImage: `url(${worksStep2Img})` }}></div>
      </section>
      <section className={worksStyles["steps"]}>
        <div className={worksStyles["stepsImage"]} style={{ backgroundImage: `url(${worksStep3Img})` }}></div>
        <div className={worksStyles["stepsContent"]}>
          <h4>Evaluating Opportunity </h4>
          <p>
            Opportunity comes in all shapes and sizes. It’s different for everyone and you need to be open to
            creating your own unique formula for success. To identify how you may fit into a particular
            industry or career you can undertake Internships or Apprenticeships or Volunteering with
            companies. Both physical or virtual opportunities are available. You may also find that you need
            to upskill and train to learn a new skill. Focused Online programmes are great for this and add to
            your knowledge and skills base.
          </p>
          <button className={commonStyle["navButton"]}>
            Coming Soon{" "}
            <span>
              <MdArrowOutward />
            </span>
          </button>
        </div>
      </section>
      <section className={`${worksStyles["steps"]} ${worksStyles["self-assessment"]}`}>
        <div className={worksStyles["stepsContent"]}>
          <h4>Building your Resume</h4>
          <p>
            Bringing everything together neatly is a key part of marketing yourself. A Living Resume is a
            constantly updated electronic document that showcases your knowledge, skills and experiences.
            Whether you are high school or at University always keep it ready because you never know when
            Opportunity comes knocking on your door. CareerExplorer.me has a free Resume builder for you to
            build your Resume and then download to send out. Your dedicated student workspace retains your
            Resume for you to update when you acquire new qualifications, certifications, skills and
            experience
          </p>
          <button className={commonStyle["navButton"]} onClick={handleResumeClick}>
            Resume Builder{" "}
            <span>
              <MdArrowOutward />
            </span>
          </button>
        </div>
        <div className={worksStyles["stepsImage"]} style={{ backgroundImage: `url(${worksStep4Img})` }}></div>
      </section>
    </div>
  );
};

export default HowItWorks;
