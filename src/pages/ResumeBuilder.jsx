import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  assessmentHeaderImg,
  resumeBulbImage,
  resumeHeroImage,
  resumeLSCard1,
  resumeLSCard2,
  resumeLSCard3,
  resumeTipsImage,
} from "../assets/assest";
import { selectAuthenticated } from "../redux/slices/authSlice.js";
import commonStyle from "../styles/Common.module.css";
import resumeBuilderStyles from "../styles/ResumeBuilder.module.css";

const ResumeBuilder = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/resume-dashboard");
    } else {
      navigate("/login");
    }
  };

  const letsStartcardsList = [
    {
      image: resumeLSCard1,
      heading: "For a High School Student",
      content:
        "You can use a resume to apply for part-time jobs, volunteer positions, or even scholarships. Highlight your school activities, any volunteer work, and skills you’ve gained, even if you don't have much work experience yet.",
    },
    {
      image: resumeLSCard2,
      heading: "For a College Student Looking for an Internship",
      content:
        "A resume helps you showcase your education, any relevant courses, projects and skills to potential employers. It shows them that you’re ready to apply what you’ve learned in school to real-world situations.",
    },
    {
      image: resumeLSCard3,
      heading: "For someone applying for a First Job",
      content:
        "A resume helps you present your qualifications, even if you haven’t worked extensively before. You can include your education, any training, skills acquired and volunteer work with evidence of initiative and leadership to show that you’re ready to learn and contribute ina team",
    },
  ];
  const tipsList = [
    "Develop different versions of your resume to target specific opportunities where you can highlight your knowledge, skills  and strengths to align with the opportunity. Use your personal workspace on CareerExplorer.me to store each one along with brief notes on areas or points emphasized.",
    "Your Career Directions Report will give you important insights on your personality. Include key points from this in the Summary section of your resume to show what’s important to you and how you think and work.",
    "Always keep your resume updated and ready. You never know when opportunity arises and you need to make a strong first impression.",
  ];

  return (
    <div className={resumeBuilderStyles["container"]} style={{ backgroundColor: "#FAFAFA" }}>
      <section
        className={resumeBuilderStyles["header"]}
        style={{ backgroundImage: `url(${assessmentHeaderImg})` }}
      >
        <h2>Resume Builder</h2>
      </section>
      <section className={resumeBuilderStyles["main"]}>
        <div
          className={resumeBuilderStyles["mainImage"]}
          style={{ backgroundImage: `url(${resumeHeroImage})` }}
        ></div>
        <div className={resumeBuilderStyles["content"]}>
          <h3>What is a Resume?</h3>
          <p>
            A resume or a CV is a brief document that highlights your skills, education, and experiences. It’s
            like your personal marketing tool to show what you can do and why you’d be a great fit for a job
            or opportunity.
          </p>
        </div>
      </section>
      <section className={resumeBuilderStyles["letsStart"]}>
        <ul className={resumeBuilderStyles["cardsList"]}>
          {letsStartcardsList.map(({ image, heading, content }, index) => (
            <li key={index}>
              <img src={image} alt="Content Image" />
              <h4>{heading}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
        <button className={commonStyle["navButton"]} onClick={handleGetStarted}>
          Let's get started{" "}
          <span>
            <MdArrowOutward />
          </span>
        </button>
      </section>
      <section className={resumeBuilderStyles["tips"]}>
        <ul className={resumeBuilderStyles["tipsList"]}>
          {tipsList.map((text, index) => (
            <li key={index}>
              <div className={resumeBuilderStyles["tipBanner"]}>
                <img
                  src={resumeBulbImage}
                  alt={`Tip ${index + 1}`}
                  className={resumeBuilderStyles["tipImage"]}
                />
                <span className={resumeBuilderStyles["tipText"]}>Tip {index + 1}</span>
                <div className={resumeBuilderStyles["back"]}></div>
              </div>
              <p>{text}</p>
            </li>
          ))}
        </ul>
        <div
          className={resumeBuilderStyles["tipsImage"]}
          style={{ backgroundImage: `url(${resumeTipsImage})` }}
        ></div>
      </section>
    </div>
  );
};

export default ResumeBuilder;
