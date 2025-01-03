import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { assessmentResult, assessmentResultbottom, sampleCDR } from "../assets/assest.js";
import Footer from "../components/Footer.jsx";
import Headers from "../components/Headers.jsx";
import { config } from "../config/config.js";
import { selectToken, selectUserId } from "../redux/slices/authSlice.js";
import { getInterests, selectInterests } from "../redux/slices/interestSlice.js";
import assessmentStyles from "../styles/AssessmentResult.module.css";
import commonStyles from "../styles/Common.module.css";
import { Box, Button, Typography } from "@mui/material";
import { BsDownload } from "react-icons/bs";
import assessmentResult1 from "../styles/AssessmentResult1.module.css";
import PayNowModal from "../models/PayNowModal.jsx";
import SchoolContactFormModal from "../models/SchoolContactFormModal.jsx";
import SchoolCodeModal from "../models/SchoolCodeModal.jsx";

const AssessmentResult = () => {
  const dispatchToRedux = useDispatch();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const interestsProfile = useSelector(selectInterests);
  const [activePathCard, setActivePathCard] = useState(1);
  const [payNowModalOpen, setPayNowModalOpen] = useState(false);
  const [schoolContactFormModalOpen, setSchoolContactFormModalOpen] = useState(false);
  const [schoolCodeModalOpen, setSchoolCodeModalOpen] = useState(false);

  useEffect(() => {
    dispatchToRedux(getInterests({ userId, token }));
  }, []);

  const handleButtonClick = async () => {
    // const response = await fetch(`${config.api}/api/payment/createpayment/${userId}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     price: 500,
    //     productName: "Test product",
    //   }),
    // });
    // if (response.ok) {
    //   const redirectUrl = await response.json();
    //   console.log("redirectUrl", redirectUrl);

    //   // window.location.href = redirectUrl.url;
    //   // window.location.href = "http://localhost:5173/assessment-result1";

    // }

    setPayNowModalOpen(true);
  };

  const pathListItems = [
    { heading: "Graphic Designer", subheading: "Great to fit" },
    { heading: "Actor", subheading: "Best to fit" },
    { heading: "Interior designer", subheading: "Best to fit" },
  ];

  const graphicDesigner = [
    {
      statement: "Pay $49 now to review and download the Full Career Directions Report",
      button: "Pay Now",
      slug: "#",
    },
    {
      statement:
        "If your School has paid on your behalf, please input your School Access Code here to get your Career Directions Report  ",
      button: "School Code",
      slug: "#",
    },
    {
      statement:
        "If you want your School to pay on your behalf please provide School details here and our Schools team will contact your School",
      button: "Contact School",
      slug: "#",
    },
  ];
  const actor = [
    { statement: "da Full Career Directions Report", button: "Pay Now", slug: "#" },
    {
      statement: "sabehalf, please input your School Access Code here to get your Career Directions Report  ",
      button: "School Code",
      slug: "#",
    },
    {
      statement:
        "say on your behalf please provide School details here and our Schools team will contact your School",
      button: "Contact School",
      slug: "#",
    },
  ];
  const interierDesigner = [
    { statement: "dsas Report", button: "Pay Now", slug: "#" },
    {
      statement: "sabasss Code here to get your Career Directions Report  ",
      button: "School Code",
      slug: "#",
    },
    { statement: "saysa and our Schools team will contact your School", button: "Contact School", slug: "#" },
  ];

  // modal

  // Function to close the modal
  const handleClosePayModal = () => {
    setPayNowModalOpen(false);
  };

  const handleSchoolContactForm = () => {
    setSchoolContactFormModalOpen(true);
  };

  const handleCloseSchoolContactFormModal = () => {
    setSchoolContactFormModalOpen(false);
  };

  //schol code modal

  const handleSchoolCode = () => {
    setSchoolCodeModalOpen(true);
  };

  const handleCloseSchoolCodeModal = () => {
    setSchoolCodeModalOpen(false);
  };

  return (
    <div>
      <Headers />
      <div className={assessmentStyles["container"]}>
        <section className={assessmentStyles["result"]}>
          <img src={assessmentResult} alt="ass. result" />
          <div>
            <h3>Assessment Results</h3>
            <p>
              Great, you’ve completed our Career Assessment. You will now have a shortlist of 20 suitable
              career pathways that are a best fit for you. This is your starting point to begin a more focused
              exploration journey to see which careers might be most interesting for you. 
            </p>
            <p>
              As a <b>‘thank you’</b> for spending the time to do the assessment, here are 3 of your Career
              Pathway options FREE to give you a taster of the directions you can consider. 
            </p>
          </div>
        </section>
        <section className={assessmentStyles["career-paths"]}>
          <div>
            <p>Based on your Assessment. </p>
            <p>
              <b>3 Career</b> Pathways to consider....
            </p>
          </div>

          <div className={assessmentStyles.cards}>
            <ul className={assessmentStyles["paths-list"]}>
              {/* {pathListItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActivePathCard(index + 1)}
                  className={activePathCard == index + 1 ? assessmentStyles["activePathCard"] : ""}
                >
                  <h6>{item.heading}</h6>
                  <p>{item.subheading}</p>
                </li>
              ))} */}

              {interestsProfile?.careers?.career.slice(0, 3).map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActivePathCard(index + 1)}
                  className={activePathCard == index + 1 ? assessmentStyles["activePathCard"] : ""}
                >
                  <h6>{item.title}</h6>
                  <p>{item.fit}</p>
                </li>
              ))}
            </ul>

            <Box
              sx={{
                height: "50vh",
                width: "100%",
                marginTop: "1rem",
                // border: "1px solid black",
                backgroundColor: "white",
                display: "flex",
                borderRadius: "1rem",
                marginBottom: "3rem",
              }}
            >
              <Box sx={{ height: "100%", width: "70%" }}>
                <Typography
                  sx={{
                    padding: "1rem",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                    color: "gray",
                    font: "Poppins",
                  }}
                >
                  Top 6 reasons to get the full Career Directions Report
                </Typography>

                {/* <Box sx={{ display: "flex", justifyContent: "space-between", padding: "1rem", gap: "1rem" }}>
                  <Box sx={{ border: "1px solid green", height: "100%", width: "50%" }}>

                  </Box>
                  <Box sx={{ border: "1px solid green", height: "100%", width: "50%" }}></Box>
                </Box> */}

                <Box sx={{ display: "flex", justifyContent: "space-between", padding: "1rem", gap: "1rem" }}>
                  <Box sx={{ height: "100%", width: "47%", padding: 2 }}>
                    <ol>
                      <li style={{ fontSize: "18px", padding: 2 }}>
                        <span style={{ fontWeight: "bold", color: "#720361" }}>Hyper-personalized</span>{" "}
                        analysis and recommendations
                      </li>
                      <li style={{ fontSize: "18px", padding: 2 }}>
                        <span style={{ fontWeight: "bold", color: "#720361" }}>20 Career Pathways</span> to
                        choose from
                      </li>
                      <li style={{ fontSize: "18px", padding: 2 }}>
                        Your <span style={{ fontWeight: "bold", color: "#720361" }}>‘Perfect’ fit</span>{" "}
                        careers that you can excel in
                      </li>
                      <li style={{ fontSize: "18px", padding: 2 }}>
                        Recommended{" "}
                        <span style={{ fontWeight: "bold", color: "#720361" }}>academic courses</span> for
                        each career pathway
                      </li>
                    </ol>
                  </Box>
                  <Box sx={{ height: "100%", width: "47%" }}>
                    <ol start={5}>
                      <li style={{ fontSize: "18px", padding: 2 }}>
                        <span style={{ fontWeight: "bold", color: "#720361" }}>University options</span> for
                        your career pathway, in your chosen countries
                      </li>
                      <li style={{ fontSize: "18px", padding: 2 }}>
                        Detailed Personality analysis to help you connect your{" "}
                        <span style={{ fontWeight: "bold", color: "#720361" }}>strengths and passions</span>{" "}
                        to your career
                      </li>
                    </ol>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  // border: "1px solid green",
                  height: "100%",
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "3rem",
                }}
              >
                <button className={assessmentResult1.navButton}>
                  <BsDownload /> Download Report
                </button>

                <img src={sampleCDR} alt="Downlaod CDR" width={"50%"} border={"1px solid black"} />
              </Box>
            </Box>

            <div>
              {/* {
                <ul className={assessmentStyles["pathItemCardsList"]}>
                  {graphicDesigner.map((item, index) => (
                    <li key={index} className={assessmentStyles["pathItemCard"]}>
                      <p>{item.statement}</p>
                      <button className={assessmentStyles["navButton"]} onClick={handleButtonClick}>
                        {item.button}
                      </button>
                    </li>
                  ))}
                </ul>
              } */}

              <ul className={assessmentStyles["pathItemCardsList"]}>
                <li className={assessmentStyles["pathItemCard"]}>
                  <p>Pay $49 now to review and download the Full Career Directions Report</p>
                  <button className={assessmentStyles["navButton"]} onClick={handleButtonClick}>
                    Pay Now
                  </button>
                </li>
                <li className={assessmentStyles["pathItemCard"]}>
                  <p>
                    If your School has paid on your behalf, please input your School Access Code here to get
                    your Career Directions Report
                  </p>
                  <button className={assessmentStyles["navButton"]} onClick={handleSchoolCode}>
                    School Code
                  </button>
                </li>
                <li className={assessmentStyles["pathItemCard"]}>
                  <p>
                    If you want your School to pay on your behalf please provide School details here and our
                    Schools team will contact your School
                  </p>
                  <button className={assessmentStyles["navButton"]} onClick={handleSchoolContactForm}>
                    Contact School
                  </button>
                </li>
              </ul>

              {/* {activePathCard == 2 && (
                <ul className={assessmentStyles["pathItemCardsList"]}>
                  {actor.map((item, index) => (
                    <li key={index} className={assessmentStyles["pathItemCard"]}>
                      <p>{item.statement}</p>
                      <button className={assessmentStyles["navButton"]} onClick={()=>navigate(item.slug)}>{item.button}</button>
                    </li>
                  ))}
                </ul>
              )}
              {activePathCard == 3 && (
                <ul className={assessmentStyles["pathItemCardsList"]}>
                  {interierDesigner.map((item, index) => (
                    <li key={index} className={assessmentStyles["pathItemCard"]}>
                      <p>{item.statement}</p>
                      <button className={assessmentStyles["navButton"]} onClick={()=>navigate(item.slug)}>{item.button}</button>
                    </li>
                  ))}
                </ul>
              )} */}
            </div>
          </div>
        </section>
        <section className={assessmentStyles["bottom"]}>
          <div>
            <p>
              There’s more. You get upto <b>3 attempts…</b>
            </p>
            <div>
              <p>
                As time goes by and you continue in your education and build new experiences and skills, your
                focus may change and you may want to look at alternative careers. This is very healthy and is
                a sign of maturity. You are now evaluating different options and engaging your mind towards
                new opportunities for you. You may now feel the need to re-assess yourself and check which
                career pathways now constitute your best-fit.
              </p>
              <p>
                Once you feel ready to take the assessment again, go to your personal workspace and hit the{" "}
                <b>RE-ASSESS</b> button to retake. 
              </p>
              <p>
                We advise you to spread your 3 attempts over one or two years to reflect the changes in your
                interests and attitudes 
              </p>
            </div>
          </div>
          <img src={assessmentResultbottom} alt="" />
        </section>
        <SchoolCodeModal open={schoolCodeModalOpen} onClose={handleCloseSchoolCodeModal} />
        <PayNowModal open={payNowModalOpen} onClose={handleClosePayModal} />
        <SchoolContactFormModal
          open={schoolContactFormModalOpen}
          onClose={handleCloseSchoolContactFormModal}
        />
      </div>
      <Footer />
    </div>
  );
};

export default AssessmentResult;
