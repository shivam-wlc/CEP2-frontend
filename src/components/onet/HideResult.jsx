import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ReactEcharts from "echarts-for-react";
import React from "react";

import { fonts } from "../../utility/fonts.js";
import PurchaseBox from "./PurchaseBox.jsx";

const HideResult = ({ option, result }) => {
  const limitedResults = result.slice(0, 4);
  return (
    <>
      <Container maxWidth="lg">
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
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: fonts.sans,
                textAlign: "left",

                marginTop: "5rem",
              }}
              //   ref={targetRef}
            >
              Best Career Matches based on assessement
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
              We assess your preferred fields through RIASEC assessment and present your results based on the
              interests you've provided
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              marginTop: "2rem",
            }}
          >
            {limitedResults?.map((element, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "100px",
                    width: "220px",
                    border: "1px solid black",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                    padding: "20px",
                    borderRadius: "7px",
                    "&:hover": {
                      cursor: "pointer",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                    },
                  }}
                >
                  <Typography sx={{ color: "#70798C" }}>{element.title}</Typography>
                  {element.fit && <Typography sx={{ color: "#A99985" }}>{element.fit} fit</Typography>}
                </Box>
              </Grid>
            ))}
          </Box>
          <PurchaseBox />
        </Box>
      </Container>
    </>
  );
};

export default HideResult;
