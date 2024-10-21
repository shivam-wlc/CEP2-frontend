import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Headers from "../components/Headers";
import { graph1 as Graph, india, insideGraph } from "../assets/assest";
import assessmentResult1 from "../styles/AssessmentResult1.module.css";
import { BsDownload } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ReactECharts from "echarts-for-react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUserId } from "../redux/slices/authSlice.js";
import { getInterests, selectInterests } from "../redux/slices/interestSlice.js";
import { getUserProfile, selectUserProfile } from "../redux/slices/profileSlice.js";

const AssessmentResult1 = () => {
  const dispatchToRedux = useDispatch();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const interestsProfile = useSelector(selectInterests);
  const userProfile = useSelector(selectUserProfile);

  useEffect(() => {
    dispatchToRedux(getInterests({ userId, token }));
  }, []);

  // Ensure the data exists before rendering
  // if (!interestsProfile || !interestsProfile.result) {
  //   return <div>Loading...</div>;
  // }

  const colorMap = {
    Realistic: ["#D97196", "#A03B7C"],
    Investigative: ["#E7A337", "#D3452F"],
    Artistic: ["#FF5454", "#AA1A1A"],
    Social: ["#ECB62B", "#F5DE57"],
    Enterprising: ["#4C7F98", "#77C8C3"],
    Conventional: ["#4638A3", "#7C6FCF"],
  };

  // Dynamically update graph and accordion data
  const dynamicGraphAccordionList = interestsProfile?.results?.result.map((interest) => ({
    title: interest.area,
    percent: ((interest.score / 84) * 100).toFixed(2), // Assuming max score is 84
    score: interest.score,
    description: interest.description,
    color: colorMap[interest.area] || ["#000", "#333"],
  }));

  const dynamicOption = {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
      },
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [50, 200],
        center: ["50%", "50%"],
        roseType: "area",
        label: {
          show: false, // Hide labels (names)
          emphasis: {
            show: false, // Hide labels on hover
          },
        },
        data: interestsProfile?.results?.result.map((interest) => {
          const [startColor, endColor] = colorMap[interest.area] || ["#000", "#333"];
          return {
            value: interest.score,
            name: interest.area,
            itemStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 1,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: startColor },
                  { offset: 1, color: endColor },
                ],
              },
            },
          };
        }),
      },
    ],
    graphic: {
      type: "image",
      style: {
        image: insideGraph,
        width: 100,
        height: 100,
      },
      left: "center",
      top: "center",
    },
  };

  console.log("interestsProfile", interestsProfile);

  return (
    <div>
      <Headers />
      <div className={assessmentResult1.container}>
        <div className={assessmentResult1.left}>
          <img src={india} alt="user" />
          <p>{userProfile?.firstName + " " + userProfile?.lastName}</p>
          <p>School/University name</p>
          <p>ABC University</p>
        </div>
        <div className={assessmentResult1.right}>
          <div className={assessmentResult1.aboutResults}>
            <h6>About Your Results</h6>
            <p>
              The first part of the Assessment has examined your Interests, based on a range of work
              activities that you find compelling and enjoyable. The second part has looked at your
              personality traits and the strengths that come easily and are natural to you. Our algorithms
              then look at the way the results of both these parts fit together. The final outcome is a
              recommended shortlist of Career pathways for you to now seriously consider.{" "}
            </p>
            <p>
              Its time to open your mind, be creative and play with the options. Consider where the Market
              Opportunities are and now begin your Career planning.
            </p>
          </div>
          <div className={assessmentResult1.howYouScored}>
            <div>
              <h6>How you scored</h6>
              <p>Full details in your Career Directions Report</p>
            </div>
            <button className={assessmentResult1.navButton}>
              <BsDownload /> Download Report
            </button>
          </div>
          <div className={assessmentResult1.graphResult}>
            <div className={assessmentResult1.graph}>
              {/* <img src={Graph} alt="graph" /> */}
              <ReactECharts option={dynamicOption} style={{ height: "400px", width: "100%" }} />;
            </div>
            <ul>
              {dynamicGraphAccordionList?.map((item, index) => {
                return (
                  <Accordion
                    key={index}
                    title={item.title}
                    percent={item.percent}
                    score={item.score}
                    description={item.description}
                    color={item.color} // Pass the color to Accordion
                  />
                );
              })}
            </ul>
          </div>
          <div className={assessmentResult1.bestMatch}>
            <h6>Best Career Matches based on assessement</h6>
            <p>
              The range of Career Pathways below have been selected based on your interests and strengths,
              using a RAISEC methodology. In addition you will see your Personality Factor (PF). This star
              rating shows you how good a match your natural personality is for that career. <br />{" "}
              (IMPORTANT: Please always remember that this is only a guide for you in your Career Exploration
              Journey. As you gain more practical experience and build your skills these selections may
              change)
            </p>
            <ul className={assessmentResult1.bestMatchCardsList}>
              {interestsProfile?.careers?.career.map((item, index) => {
                return (
                  <li key={index} className={assessmentResult1.bestMatchCard}>
                    <div>
                      <p className={assessmentResult1.title}>{item.title}</p>
                      <p className={assessmentResult1.description}>{item.fit}</p>
                    </div>
                    <div className={assessmentResult1.userAndRating}>
                      {/* <img src="#" alt="logo" className="image" /> */}
                      {/* dummy */}
                      <div className={assessmentResult1.logo}>P</div>
                      <p className={assessmentResult1.rating}>
                        <FaStar className={assessmentResult1.star} />5
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AssessmentResult1;

const Accordion = ({ title, percent, score, description, color, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={assessmentResult1["accordion"]} {...props}>
      <div className={assessmentResult1["accordion-header"]}>
        <div>
          <div
            className={assessmentResult1.circle}
            style={{ backgroundColor: color[0] }} // Use the first color for the circle
          ></div>
          <h6>{title}</h6>
          <p
            className={assessmentResult1.realisticPercent}
            style={{ backgroundColor: color[1] }} // Use the second color for the percent
          >
            {percent}
          </p>
        </div>
        <button className={assessmentResult1["accordion-button"]} onClick={toggleAccordion}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <p>
            <b>Score: {score}</b>
          </p>
          <p>{description}</p>
        </div>
      )}
    </li>
  );
};
