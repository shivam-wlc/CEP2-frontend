// import React, { useEffect } from "react";
// import { Box, Typography, Button, IconButton } from "@mui/material";
// import Card from "@mui/material/Card";
// import { CardActionArea } from "@mui/material";
// import CardContent from "@mui/material/CardContent";
// import { useTheme } from "@mui/material/styles";
// import CardMedia from "@mui/material/CardMedia";
// import { useNavigate } from "react-router-dom";
// import Headers from "../components/Headers";
// import Questions from "../components/onet/Questions";
// import PreTest from "../components/onet/PreTest";
// import { InterestProfileHeroImage } from "../assets/assest.js";
// import CastForEducationIcon from "@mui/icons-material/CastForEducation";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import GeneralButton from "../components/general/GeneralButton.jsx";
// import SurveyForm1 from "../models/SurveyForm1.jsx";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getUnifiedRecordData,
//   selectUnifiedRecord,
// } from "../redux/slices/unifiedRecordSlice.js";
// import { selectUserId, selectToken } from "../redux/slices/authSlice.js";

// const AssessmentCenter = () => {
//   const navigate = useNavigate();
//   const [surveyModalOpen, setSurveyModalOpen] = React.useState(false);
//   const dispatchToRedux = useDispatch();
//   const userId = useSelector(selectUserId);
//   const token = useSelector(selectToken);
//   const unifiedRecord = useSelector(selectUnifiedRecord);

//   useEffect(() => {
//     dispatchToRedux(getUnifiedRecordData({ userId, token }));
//   }, []);

//   const goodToKnow = [
//     {
//       title: "Think about what you like",
//       description:
//         "Try not to think about how qualified to do the work or how much money you would make doing the work described in the test.",
//     },
//     {
//       title: "Don't feel guilty",
//       description:
//         "Try not to guilt-trip yourself into choosing an activity over another based on perceived expectations or what’s socially acceptable",
//     },
//     {
//       title: "Don't worry about failing",
//       description:
//         "There are no right or wrong answers. The purpose of the Career Interests Test is to identify your personal interests and how they relate to the world of work.",
//     },
//     {
//       title: "Keep an open mind",
//       description:
//         "Be open to career directions you never previously considered. It’s very likely that you’re best suited to careers you never thought about",
//     },
//   ];

//   const whyTheseTests = [
//     {
//       title: "Why take this test?",
//       description:
//         "The Career Interests Test will help you identify your areas of interest that closely match the activities you enjoy doing in a job. This will help you make better-informed career decisions and choose a job in which you’ll find the work interesting and enjoyable.",
//     },
//     {
//       title: "About the test",
//       description:
//         "The test comprises 135 statements that describe various work activities and duties, presented in sets of five. You’ll be asked to rank each set by level of personal preference. At the end of the test, your results will be analyzed to determine your compatibility with CareerHunter’s 27 areas of interest, which include engineering, healthcare and entertainment.The test can be taken for free, but to gain access to your full results and your downloadable report, access must be purchased. The results from this test contribute to your final career matches on CareerHunter, if you choose to proceed to purchase full access.",
//     },
//   ];

//   const testTitle = [
//     {
//       title: "Interest Profiler",
//       image:
//         "https://elevates.marylandpublicschools.org/wp-content/uploads/2019/09/transitiontoolkit-home-1.jpg",
//     },
//     // {
//     //   title: "Test 2",
//     //   image:
//     //     "https://elevates.marylandpublicschools.org/wp-content/uploads/2019/09/transitiontoolkit-home-1.jpg",
//     // },
//     // {
//     //   title: "Test 2",
//     //   image:
//     //     "https://elevates.marylandpublicschools.org/wp-content/uploads/2019/09/transitiontoolkit-home-1.jpg",
//     // },
//     // {
//     //   title: "Test 2",
//     //   image:
//     //     "https://elevates.marylandpublicschools.org/wp-content/uploads/2019/09/transitiontoolkit-home-1.jpg",
//     // },
//   ];

//   // const handleClick = () => {
//   //   // navigate("/interest-profiler");
//   //   setSurveyModalOpen(true);
//   // };

//   // const handleClick = () => {
//   //   if (unifiedRecord?.survey?.isTaken) {
//   //     navigate("/interest-profiler");
//   //   } else {
//   //     setSurveyModalOpen(true);
//   //   }
//   // };

//   const handleClick = () => {
//     navigate("/interest-profiler");
//   };

//   const handleSurveyFormSubmit = () => {
//     setSurveyModalOpen(false); // Close the survey modal after submission
//     navigate("/interest-profiler"); // Redirect to "/interest-profiler"
//   };

//   function MediaControlCard({ title, image }) {
//     const theme = useTheme();

//     return (
//       <>
//         <Card sx={{ display: "flex" }}>
//           <Box sx={{ display: "flex", flexDirection: "column" }}>
//             <CardContent sx={{ flex: "1 0 auto" }}>
//               <Typography component="div" variant="h5">
//                 {title}
//               </Typography>
//               <Button onClick={handleClick}>Take Test</Button>
//             </CardContent>
//           </Box>
//           <CardMedia
//             component="img"
//             sx={{ width: 151 }}
//             image={image}
//             alt="Live from space album cover"
//           />
//         </Card>
//       </>
//     );
//   }

//   return (
//     <>
//       <Headers />
//       <Box
//         sx={{
//           height: "100vh",
//           backgroundColor: "#F5F5F5",
//         }}
//       >
//         <Box
//           sx={{
//             width: "70%",
//             margin: "auto",
//             padding: "2rem",
//             textAlign: "center",
//           }}
//         >
//           <Typography sx={{ fontSize: "3rem", fontWeight: "bold" }}>
//             Our Assessments
//           </Typography>
//           <Typography sx={{ marginTop: "1rem" }}>
//             At our Assessment Center within Career Explorer, we offer a range of
//             tests such as the Interest Profiler and more. These tests are
//             designed to help you understand your strengths and interests better,
//             guiding you towards suitable career paths. Let's dive into these
//             assessments and discover the possibilities they hold for your
//             future!
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-around",
//             flexWrap: "wrap",
//             marginTop: "5rem",
//           }}
//         >
//           {/* {testTitle.map((e) => (
//             <MediaControlCard title={e.title} image={e.image} />
//           ))} */}

//           <Box
//             sx={{
//               border: "1px solid gray",
//               // height: "300px",
//               width: "75%",
//               margin: "auto",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Box sx={{ width: "40%" }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <IconButton>
//                   <CastForEducationIcon sx={{ fontSize: "3rem" }} />
//                 </IconButton>
//                 <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
//                   Interest Profiler
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-around",
//                   alignItems: "center",
//                   padding: "1rem",
//                 }}
//               >
//                 <Box
//                   sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
//                 >
//                   <QuestionAnswerIcon />
//                   <Typography>30 questions</Typography>
//                 </Box>
//                 <Box
//                   sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
//                 >
//                   <AccessTimeIcon />
//                   <Typography>No Time Limit</Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ padding: "1rem" }}>
//                 <Typography>
//                   Discover your areas of interest based on the work activities
//                   that you find most interesting and enjoyable.
//                 </Typography>
//               </Box>

//               <Box sx={{ textAlign: "center" }}>
//                 <GeneralButton text="Start Assessment" onClick={handleClick} />
//               </Box>
//             </Box>
//             <Box
//               sx={{
//                 width: "40%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <img
//                 src={InterestProfileHeroImage}
//                 alt="Interest Profile"
//                 width={"100%"}
//               />
//             </Box>
//           </Box>
//         </Box>

//         <Box>
//           <Typography
//             sx={{
//               fontSize: "1.5rem",
//               fontWeight: "bold",
//               textAlign: "center",
//               marginTop: "5rem",
//             }}
//           >
//             Good To Know
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-around",
//               flexWrap: "wrap",
//               marginTop: "2rem",
//             }}
//           >
//             {goodToKnow.map((e, index) => (
//               <ActionAreaCard
//                 key={`e.title ${index}`}
//                 title={e.title}
//                 description={e.description}
//               />
//             ))}
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AssessmentCenter;

// function ActionAreaCard({ title, description }) {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {title}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {description}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { assessmentCardBg, assessmentHeaderImg, assessmentHeroImg } from "../assets/assest.js";
import { selectAuthenticated } from "../redux/slices/authSlice.js";
import assessmentStyle from "../styles/AssessmentCenter.module.css";
import commonStyle from "../styles/Common.module.css";

const AssessmentCenter = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectAuthenticated);
  const cardItems = [
    {
      heading: "Think about what you like",
      content:
        "Try not think about how qualified you are to do the work or how much you would earn doing this work.",
    },
    {
      heading: "Don’t feel guilty",
      content:
        "Try not to guilt-trip yourself into choosing one activity over another based on perceived expectations or what’s socially acceptable.",
    },
    {
      heading: "Don’t worry about failing",
      content:
        "There are no right or wrong answers. Each person is different with unique strengths, interests and personality.",
    },
    {
      heading: "Keep an Open mind",
      content:
        "Be open to Career Directions you may never have previously considered. It’s likely that you may be nest suited to careers you have never thought about",
    },
    {
      heading: "No time limit",
      content:
        "Don’t feel rushed. It should not take you longer than 30 minutes but don’t worry if it takes a little longer.",
    },
  ];

  const handleAssessmentClick = () => {
    if (isAuthenticated) {
      navigate("/interest-profiler");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className={assessmentStyle["container"]}>
        <section
          className={assessmentStyle["header"]}
          style={{ backgroundImage: `url(${assessmentHeaderImg})` }}
        >
          <h2>Our Assessments</h2>
        </section>
        <section className={assessmentStyle["main"]}>
          <div className={assessmentStyle["left"]}>
            <img src={assessmentHeroImg} alt="hero Image" />
          </div>
          <div className={assessmentStyle["right"]}>
            <p className={commonStyle["yellowText"]}>Introduction</p>
            <h3>Assessment Center</h3>
            <p>
              <span>
                We have developed our Career Assessment to give you insights to your strengths, interests and
                personality. We combine the use of a broad range of tried and tested instruments with
                Artificial Intelligence to provide you with targeted information on career pathways that are
                most suited to your personality and which you are most likely to be successful in.
              </span>
              <span>
                Use the downloadable Career Directions Report to have meaningful discussions with your friends
                and family, then Explore further with selected Colleges and Universities to make the best
                Educational and Career pathway decisions.
              </span>
              <span>
                After completing all sections of the Assessment, you get a taster of your 3 Best-fit Career
                Pathway options for free.
              </span>
              <b>
                The full Career Directions Report with online links and references is for the introductory
                price of $49.
              </b>
            </p>
            {/* <button className={commonStyle["navButton"]}> */}
            {/* <button className={commonStyle["navButton"]} height="3rem">
              Start Assessment
              <span>
                <MdArrowOutward />
              </span>
            </button> */}
            <button
              className={commonStyle["navButton"]}
              style={{ height: "3rem", display: "flex", alignItems: "center" }}
              onClick={handleAssessmentClick}
            >
              Start Assessment
              <span style={{ marginLeft: "0.5rem" }}>
                <MdArrowOutward size={"1.5rem"} />
              </span>
            </button>
          </div>
        </section>
        <section className={assessmentStyle["assessment-format"]}>
          <h3>Assessment Format</h3>
          <p>
            The Assessment is in 2 parts – Part A and Part B. Part A has 30 questions and Part B 24 questions,
            After you complete Parts A and B there are a few more educational questions that allow us to fine
            tune your results.
          </p>
          <div className={assessmentStyle["good-to-know"]}>
            <div></div>
            <h4>Good to know</h4>
            <div></div>
          </div>
          <ul className={assessmentStyle["cardsList"]}>
            {cardItems.map(({ heading, content }, index) => (
              <li key={index} style={{ backgroundImage: `url(${assessmentCardBg})` }}>
                <h5>{heading}</h5>
                <p>{content}</p>
              </li>
            ))}
          </ul>
          <button className={commonStyle["navButton"]}>
            Let's Go{" "}
            <span>
              <MdArrowOutward />
            </span>
          </button>
        </section>
      </div>
    </>
  );
};
export default AssessmentCenter;
