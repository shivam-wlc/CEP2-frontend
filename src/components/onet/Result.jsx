import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ReactEcharts from "echarts-for-react";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Headers from "../../components/Headers.jsx";
import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import {
  generateDeatiledDataOfCareers,
  getCareerByPrepration,
  getResultAndJob,
  selectDetailedCareerData,
  selectOnet,
} from "../../redux/slices/onetSlice.js";
import { selectUserProfile } from "../../redux/slices/profileSlice.js";
import { getUnifiedRecordData, selectUnifiedRecord } from "../../redux/slices/unifiedRecordSlice.js";
import { fonts } from "../../utility/fonts.js";
import HideResult from "./HideResult.jsx";
import PDFResult from "./PDFResult.jsx";

const styles = {
  sectionHeading: {
    color: "#252323",
    fontSize: "30px",
    marginBottom: "20px",
    fontFamily: fonts.authPage,
    fontWeight: 600,
  },
  sectionSubHeading: {
    color: "#70798C",
    fontFamily: fonts.ntr,
    fontWeight: 500,
    fontSize: "20px",
  },
  heading: {
    fontFamily: fonts.sans,
    fontSize: "21px",
    fontWeight: "500",
    color: "#252323",
  },
  subHeading: {
    fontFamily: fonts.poppins,
    fontSize: "18px",
    fontWeight: "400",
    color: "#A99985",
  },
  text: {
    fontFamily: fonts.ntr,
    fontSize: "18px",
  },
  card: {
    marginBottom: "25px",
    boxShadow:
      "rgba(236, 239, 241, 0.4) 5px 5px, rgba(236, 239, 241, 0.3) 10px 10px, rgba(236, 239, 241, 0.2) 15px 15px, rgba(236, 239, 241, 0.1) 20px 20px, rgba(236, 239, 241, 0.05) 25px 25px",
    padding: "10px 25px",
  },
};

export default function Result() {
  const navigate = useNavigate();
  const dispatchToRedux = useDispatch();
  const location = useLocation();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const userData = useSelector(selectUserProfile);
  const onet = useSelector(selectOnet);
  const targetRef = useRef(null);
  const [loading, setLoading] = useState({ result: false, jobZone: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [activejobZone, setActiveJobZone] = useState({
    code: "0",
    title: "results",
    loopThrough: "jobSuggestionBasedOnResult",
  });
  const detailedCareerData = useSelector(selectDetailedCareerData);
  const contentRef = useRef(null);
  const [chart, setChart] = useState(null); // State to hold chart image data
  const [isReady, setIsReady] = useState(false);

  const unifiedRecord = useSelector(selectUnifiedRecord);

  useEffect(() => {
    dispatchToRedux(getUnifiedRecordData({ userId, token }));
  }, []);

  console.log("unifiedRecord", unifiedRecord);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 15000); // 10000 milliseconds = 10 seconds

    // Cleanup the timer if the component unmounts before the timer completes
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const answersParam = queryParams.get("answers");

    if (answersParam) {
      setLoading({ result: true, jobZone: true });
      (async () => {
        await dispatchToRedux(
          getResultAndJob({
            resource: "results",
            answers: answersParam,
            userId,
            token,
          }),
        );
        setLoading({ result: false, jobZone: false });
      })();
    }
  }, [location.search]);

  useEffect(() => {}, [onet]);

  useEffect(() => {
    dispatchToRedux(generateDeatiledDataOfCareers({ userId, token }));
  }, []);

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: ["60%", "90%"],
        center: ["50%", "70%"],
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: onet?.result[0]?.score || 0, name: "Realistic" },
          { value: onet?.result[1]?.score || 0, name: "Investigative" },
          { value: onet?.result[2]?.score || 0, name: "Artistic" },
          { value: onet?.result[3]?.score || 0, name: "Social" },
          { value: onet?.result[4]?.score || 0, name: "Enterprising" },
          { value: onet?.result[5]?.score || 0, name: "Conventional" },
        ],
      },
    ],
  };

  const handlePageChange = async (event, page) => {
    setLoading({ result: false, jobZone: true });
    setCurrentPage(page);
    const resultsPerPage = 20;
    await dispatchToRedux(
      getCareerByPrepration({
        jobZone: activejobZone.code,
        start: (page - 1) * resultsPerPage + 1,
        end: page * resultsPerPage,
        token,
      }),
    );
    setLoading({ result: false, jobZone: false });
  };

  const handlePayment = () => {
    window.location.href = "https://buy.stripe.com/test_6oE6pifFZ08d58c4gh";
  };

  let userName = userData?.name || "User";
  const contentElements = contentRef.current;
  console.log(contentElements, "contentElements");

  const handleDownloadChart = async () => {
    try {
      const chartInstance = contentRef.current.getEchartsInstance();
      const chartCanvas = chartInstance.getDom();

      // Check if chartCanvas exists and is attached to the document
      if (!chartCanvas || !document.body.contains(chartCanvas)) {
        console.error("Chart canvas element is not attached to the document.");
        return;
      }

      // Wait for the chart to be fully rendered using a setTimeout approach
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Adjust delay as needed

      const canvas = await html2canvas(chartCanvas);
      const imgData = canvas.toDataURL("image/png");
      setChart(imgData);

      // Create a temporary link element to download the image
      // const link = document.createElement("a");
      // link.href = imgData;
      // link.download = "chart.png";
      // link.style.display = "none";
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating chart image:", error);
    }
  };

  useEffect(() => {
    // Generate chart image when 'onet' changes
    if (onet) {
      // generateChartImage();
      handleDownloadChart();
    }
  }, [onet]);

  return (
    <>
      <Headers />
      {/* {userData?.assessment30?.payment ? ( */}
      {unifiedRecord?.interestProfile?.isPaid ? (
        <Box>
          <Box
            sx={{
              padding: "2.5rem",
              position: "sticky",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: fonts.sans,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Interest Profiler Result
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.sans,
                color: "text.secondary",
                textAlign: "center",
                maxWidth: "800px",
                fontSize: "16px",
                margin: "auto",
                padding: "1rem",
              }}
            >
              Thank for for taking our assessement you are one step closer to finding your ideal career.
            </Typography>
          </Box>

          <Box sx={{ width: "90%", margin: "auto" }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: fonts.sans,
                textAlign: "left",
                marginBottom: "1rem",
              }}
            >
              About this assessment
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.sans,
                color: "text.secondary",
                textAlign: "left",
                fontSize: "16px",
                margin: "auto",
              }}
            >
              The Interest Profiler Test is designed to reveal your key areas of interest based on the work
              activities that you find most compelling and enjoyable. Using the personalized insights in this
              report, you’ll gain a better understanding of what type of work best aligns with your passions —
              and what doesn’t — so you can make a better-informed career decision.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontFamily: fonts.sans,
                textAlign: "left",
                marginBottom: "1rem",
                marginTop: "1rem",
                alignItems: "left",
              }}
            >
              {/* Career Compass: Navigating Your Interests */}
              How you scored
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.sans,
                color: "text.secondary",
                textAlign: "left",
                fontSize: "16px",
                margin: "auto",
              }}
            >
              We Evaluate your answers against 30 areas of interest.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(100px)",
              padding: "30px 0",
              // border: "1px solid red",
            }}
          >
            <Box
              sx={{
                width: "80%",
                // border: "1px solid red",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  // border: "1px solid red",
                }}
              >
                {/* <PDFViewer style={{ width: "100%", height: "1000px" }}>
                  <PDFResult
                    resultData={onet}
                    userName={userName}
                    detailedCareerData={detailedCareerData}
                    chart={chart}
                  />
                </PDFViewer> */}
                {isReady && (
                  <PDFDownloadLink
                    fileName="career_direction_report.pdf"
                    style={{
                      textDecoration: "none",
                      padding: "10px 20px",
                      backgroundColor: "#252323",
                      color: "#ffffff",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center", // Center vertically
                      justifyContent: "center", // Center horizontally
                    }}
                    document={
                      <PDFResult
                        resultData={onet}
                        userName={userName}
                        chart={chart}
                        detailedCareerData={detailedCareerData}
                      />
                    }
                  >
                    {({ blob, url, loading: pdfLoading, error }) => (
                      <>
                        {pdfLoading ? "Loading document..." : "DOWNLOAD"}
                        <DownloadIcon sx={{ marginLeft: "5px" }} />
                      </>
                    )}
                  </PDFDownloadLink>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                }}
              ></Box>
              {/* {userData?.assessment30?.payment ? ( */}
              {unifiedRecord?.interestProfile?.isPaid ? (
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "25rem",
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {loading.result ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <Box
                      style={{
                        width: "100%",
                        padding: "20px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "white",
                          width: "100%",
                          height: "600px",
                        }}
                      >
                        <ReactEcharts
                          ref={contentRef}
                          option={option}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}

                          // theme="dark"
                          // style={{ width: "100%", height: "100%" }}
                        />
                      </Box>

                      {onet.result.map((element, i) => (
                        <Box key={i} sx={styles.card}>
                          <Typography sx={styles.heading}>
                            Interest Sphere: <span style={styles.subHeading}>{element.area}</span>
                          </Typography>
                          <Typography sx={styles.heading}>
                            Score: <span style={styles.subHeading}>{element.score}</span>
                          </Typography>
                          <Typography sx={styles.text}>{element.description}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      width: "100%",
                      height: "600px",
                    }}
                  >
                    <ReactEcharts option={option} style={{ width: "100%", height: "100%" }} />
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  marginTop: "7rem",
                  padding: "30px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                <Typography sx={{ ...styles.sectionSubHeading, fontSize: "30px" }}>What's Next?</Typography>
                <Typography sx={{ fontFamily: fonts.ntr, fontSize: "20px" }}>
                  Think of your interests as work you like to do.
                </Typography>
                <Typography sx={{ fontFamily: fonts.ntr, fontSize: "20px" }}>
                  Your interests can help you find careers you might like to explore. The more a career meets
                  your interests, the more likely it will be satisfying and rewarding to you.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: "90%", margin: "auto" }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: fonts.sans,
                  textAlign: "left",

                  marginTop: "5rem",
                }}
                ref={targetRef}
              >
                {activejobZone.title === "results"
                  ? "  Best Career Matches based on assessement"
                  : ` Best Career Matches aligned with ${activejobZone.title}`}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: fonts.sans,
                  color: "text.secondary",
                  textAlign: "left",
                  // maxWidth: "800px",
                  fontSize: "16px",
                  margin: "auto",
                  // padding: "1rem",
                }}
              >
                {activejobZone.title === "results"
                  ? " We assess your preferred fields through RIASEC assessment and present your results based on the interests you've provided"
                  : `You can find more job options based on the job zone ${activejobZone.title}`}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
                padding: "30px 0",
                minHeight: "70vh",
                // border: "1px solid green",
              }}
            >
              <Grid container spacing={3} justifyContent="center">
                {loading.jobZone ? (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress color="inherit" />
                  </Grid>
                ) : (
                  onet[activejobZone.loopThrough]?.map((element, i) => (
                    <Grid key={i} item xs={12} sm={6} md={3}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",

                          textAlign: "center",
                          height: "100px",
                          // border: "1px solid black",
                          boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                          padding: "20px",
                          borderRadius: "7px",
                          "&:hover": {
                            cursor: "pointer",
                            boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                          },
                        }}
                        onClick={() => navigate(`/career?careercode=${element.code}`)}
                      >
                        <Typography sx={{ color: "#70798C" }}>{element.title}</Typography>
                        {element.fit && <Typography sx={{ color: "#A99985" }}>{element.fit} fit</Typography>}
                      </Box>
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
            {onet.counts.totalPage && activejobZone.code && (
              <Pagination
                sx={{ marginTop: "30px" }}
                page={currentPage}
                onChange={handlePageChange}
                count={onet.counts.totalPage}
                variant="outlined"
                color="primary"
              />
            )}
          </Box>
        </Box>
      ) : (
        <HideResult option={option} result={onet?.jobSuggestionBasedOnResult} />
      )}
    </>
  );
}
