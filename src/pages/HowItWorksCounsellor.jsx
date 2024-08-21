// import React from "react";
// import Headers from "../components/Headers";
// import { Typography } from "@mui/material";

// const HowItWorksCounsellor = () => {
//   return (
//     <>
//       <Headers />
//       <Typography
//         sx={{
//           fontWeight: "bold",
//           fontSize: "24px",
//           textAlign: "center",
//           marginTop: "20px",
//         }}
//       >
//         Coming Soon...
//       </Typography>
//     </>
//   );
// };

// export default HowItWorksCounsellor;

import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import Headers from "../components/Headers";

const HowItWorksCounsellor = () => {
  return (
    <>
      <Headers />
      {/* <Box sx={{ backgroundColor: "#f5f5f5", padding: "20px 0" }}> */}
      <Box sx={{ padding: "20px 0" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Counsellor Page
          </Typography>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                EngageMe CRM
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                We recognize the challenges that Schools face in providing an
                easy to use and feature-rich Careers Service to its students.
                CareerExplorer offers EngageMe, a comprehensive Career Services
                Engagement Platform, to Schools and Colleges to allow them to
                seamlessly communicate and guide students through their career
                decision making journeys. Our features include:
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                School Career Counsellors have access to a CRM system along with
                a School dashboard to manage communications with either
                individual or groups of students.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Button variant="contained" href="#" fullWidth>
                Learn More
              </Button>
            </Paper>
          </Box>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Events Management
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                The Events page allows for the School to host Online Events and
                Webinars for groups of students. Physical events can be
                publicized on the School Careers Homepage with students being
                able to sign up to events from here.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Button variant="contained" href="#" fullWidth>
                Learn More
              </Button>
            </Paper>
          </Box>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Careers Homepage
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                Each subscribing School has a School Careers Homepage with
                School logo and colors, on the CareerExplorer.me platform.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Button variant="contained" href="#" fullWidth>
                Learn More
              </Button>
            </Paper>
          </Box>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Careers Hub
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                Our Careers Hub allows School Counsellors to safely store
                documents and presentations (on our secure, backed-up servers),
                for current and future use.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Button variant="contained" href="#" fullWidth>
                Learn More
              </Button>
            </Paper>
          </Box>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Social Sharing
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                Students often use various social channels to receive
                information. We provide a means by which information can be
                shared with students through different social channels.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Button variant="contained" href="#" fullWidth>
                Learn More
              </Button>
            </Paper>
          </Box>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Assessment Centre
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                We provide preferential package rates for registered Schools for
                all our Assessments.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Button variant="contained" href="#" fullWidth>
                Learn More
              </Button>
            </Paper>
          </Box>

          {/* <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginTop: "20px" }}
            >
              Coming Soon...
            </Typography>
          </Box> */}
        </Container>
      </Box>
    </>
  );
};

export default HowItWorksCounsellor;
