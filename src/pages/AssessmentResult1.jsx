import React, { useState } from "react";
import Footer from "../components/Footer";
import Headers from "../components/Headers";
import { graph1 as Graph, india, insideGraph } from "../assets/assest";
import assessmentResult1 from "../styles/AssessmentResult1.module.css";
import { BsDownload } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ReactECharts from "echarts-for-react";

const AssessmentResult1 = () => {
  const graphAccordionList = [
    {
      title: "Realistic",
      percent: "16.66",
      score: "11",
      description:
        "People with Realistic interests like work that includes practical, hands-on problems and answers. Often people with Realistic interests do not like careers that involve paperwork or working closely with others. They like working with plants and animals; real-world materials like wood, tools, and machinery; and outside work.",
    },
    {
      title: "Investigative",
      percent: "16.66",
      score: "20",
      description:
        "People with Investigative interests like work that has to do with ideas and thinking rather than physical activity or leading people. They like searching for facts and figuring out problems.",
    },
    {
      title: "Artistic",
      percent: "16.66",
      score: "18",
      description:
        "People with Artistic interests like work that deals with the artistic side of things, such as acting, music, art, and design. They like creativity in their work and work that can be done without following a set of rules.",
    },
    {
      title: "Social",
      percent: "16.66",
      score: "15",
      description:
        "People with Social interests like working with others to help them learn and grow. They like working with people more than working with objects, machines, or information. They like teaching, giving advice, and helping and being of service to people.",
    },
    {
      title: "Enterprising",
      percent: "16.66",
      score: "13",
      description:
        "People with Enterprising interests like work that has to do with starting up and carrying out business projects. These people like taking action rather than thinking about things. They like persuading and leading people, making decisions, and taking risks for profits.",
    },
    {
      title: "Conventional",
      percent: "16.66",
      score: "19",
      description:
        "People with Conventional interests like work that follows set procedures and routines. They prefer working with information and paying attention to details rather than working with ideas. They like working with clear rules and following a strong leader.",
    },
  ];
  const bestMatchList = [
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Actor", description: "Best to fit", rating: 4.5 },
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Interior designer", description: "Best to fit", rating: 4.5 },
    { title: "Actor", description: "Best to fit", rating: 4.5 },
    { title: "Interior designer", description: "Best to fit", rating: 4.5 },
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Actor", description: "Best to fit", rating: 4.5 },
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Interior designer", description: "Best to fit", rating: 4.5 },
    { title: "Actor", description: "Best to fit", rating: 4.5 },
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Actor", description: "Best to fit", rating: 4.5 },
    { title: "Interior designer", description: "Best to fit", rating: 4.5 },
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Actor", description: "Best to fit", rating: 4.5 },
    { title: "Interior designer", description: "Best to fit", rating: 4.5 },
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Actor", description: "Best to fit", rating: 4.5 },
    { title: "Interior designer", description: "Best to fit", rating: 4.5 },
    { title: "Graphic Designer", description: "Great to fit", rating: 4.5 },
    { title: "Actor", description: "Best to fit", rating: 4.5 },
  ];

  const option = {
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
        data: [
          {
            value: 11,
            name: "Realistic",
            itemStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 1,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#D97196" },
                  { offset: 1, color: "#A03B7C" },
                ],
              },
            },
          },
          {
            value: 20,
            name: "Investigative",
            itemStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 1,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#E7A337" },
                  { offset: 1, color: "#D3452F" },
                ],
              },
            },
          },
          {
            value: 18,
            name: "Artistic",
            itemStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 1,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#FF5454" },
                  { offset: 1, color: "#AA1A1A" },
                ],
              },
            },
          },
          {
            value: 15,
            name: "Social",
            itemStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 1,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#ECB62B" },
                  { offset: 1, color: "#F5DE57" },
                ],
              },
            },
          },
          {
            value: 13,
            name: "Enterprising",
            itemStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 1,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#4C7F98" },
                  { offset: 1, color: "#77C8C3" },
                ],
              },
            },
          },
          {
            value: 19,
            name: "Conventional",
            itemStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 1,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#4638A3" },
                  { offset: 1, color: "#7C6FCF" },
                ],
              },
            },
          },
        ],
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

  // option = {
  //   // legend: {
  //   //   top: 'bottom'
  //   // },
  //   toolbox: {
  //     show: true,
  //     feature: {
  //       mark: { show: true },
  //       // dataView: { show: true, readOnly: false },
  //       // restore: { show: true },
  //       // saveAsImage: { show: true }
  //     },
  //   },
  //   series: [
  //     {
  //       name: "Nightingale Chart",
  //       type: "pie",
  //       radius: [50, 250],
  //       center: ["50%", "50%"],
  //       roseType: "area",
  //       // itemStyle: {
  //       // borderRadius: 8
  //       // },
  //       data: [
  //         {
  //           value: 11,
  //           name: "Realistic",
  //           itemStyle: {
  //             color: {
  //               type: "linear",
  //               x: 1,
  //               y: 1,
  //               x2: 0,
  //               y2: 1,
  //               colorStops: [
  //                 { offset: 0, color: "#D97196" }, // start color
  //                 { offset: 1, color: "#A03B7C" }, // end color
  //               ],
  //             },
  //           },
  //         },
  //         {
  //           value: 20,
  //           name: "Investigative",
  //           itemStyle: {
  //             color: {
  //               type: "linear",
  //               x: 1,
  //               y: 1,
  //               x2: 0,
  //               y2: 1,
  //               colorStops: [
  //                 { offset: 0, color: "#E7A337" }, // start color
  //                 { offset: 1, color: "#D3452F" }, // end color
  //               ],
  //             },
  //           },
  //         },

  //         {
  //           value: 18,
  //           name: "Artistic",
  //           itemStyle: {
  //             color: {
  //               type: "linear",
  //               x: 1,
  //               y: 1,
  //               x2: 0,
  //               y2: 1,
  //               colorStops: [
  //                 { offset: 0, color: "#FF5454" }, // start color
  //                 { offset: 1, color: "#AA1A1A" }, // end color
  //               ],
  //             },
  //           },
  //         },

  //         {
  //           value: 15,
  //           name: "Social",
  //           itemStyle: {
  //             color: {
  //               type: "linear",
  //               x: 1,
  //               y: 1,
  //               x2: 0,
  //               y2: 1,
  //               colorStops: [
  //                 { offset: 0, color: "#ECB62B" }, // start color
  //                 { offset: 1, color: "#F5DE57" }, // end color
  //               ],
  //             },
  //           },
  //         },

  //         {
  //           value: 13,
  //           name: "Enterprising",
  //           itemStyle: {
  //             color: {
  //               type: "linear",
  //               x: 1,
  //               y: 1,
  //               x2: 0,
  //               y2: 1,
  //               colorStops: [
  //                 { offset: 0, color: "#4C7F98" }, // start color
  //                 { offset: 1, color: "#77C8C3" }, // end color
  //               ],
  //             },
  //           },
  //         },
  //         {
  //           value: 19,
  //           name: "Conventional",
  //           itemStyle: {
  //             color: {
  //               type: "linear",
  //               x: 1,
  //               y: 1,
  //               x2: 0,
  //               y2: 1,
  //               colorStops: [
  //                 { offset: 0, color: "#4638A3" }, // start color
  //                 { offset: 1, color: "#7C6FCF" }, // end color
  //               ],
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   graphic: {
  //     type: "image",
  //     style: {
  //       image:
  //         "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  //       width: 100,
  //       height: 100,
  //     },
  //     left: "center",
  //     top: "center",
  //   },
  // };

  return (
    <div>
      <Headers />
      <div className={assessmentResult1.container}>
        <div className={assessmentResult1.left}>
          <img src={india} alt="user" />
          <p>Ronald Valadez</p>
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
              <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />;
            </div>
            <ul>
              {graphAccordionList.map((item, index) => {
                return (
                  <Accordion
                    key={index}
                    title={item.title}
                    percent={item.percent}
                    score={item.score}
                    description={item.description}
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
              {bestMatchList.map((item, index) => {
                return (
                  <li key={index} className={assessmentResult1.bestMatchCard}>
                    <div>
                      <p className={assessmentResult1.title}>{item.title}</p>
                      <p className={assessmentResult1.description}>{item.description}</p>
                    </div>
                    <div className={assessmentResult1.userAndRating}>
                      {/* <img src="#" alt="logo" className="image" /> */}
                      {/* dummy */}
                      <div className={assessmentResult1.logo}>P</div>
                      <p className={assessmentResult1.rating}>
                        <FaStar className={assessmentResult1.star} />
                        {item.rating}
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

const Accordion = ({ title, percent, score, description, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={assessmentResult1["accordion"]} {...props}>
      <div className={assessmentResult1["accordion-header"]}>
        <div>
          <div className={assessmentResult1.circle}></div>
          <h6>{title}</h6>
          <p className={assessmentResult1.realisticPercent}>{percent}</p>
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
