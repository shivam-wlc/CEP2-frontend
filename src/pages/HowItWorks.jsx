import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import Headers from "../components/Headers";
import { studentIcon, counselorIcon } from "../assets/assest.js";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <Box>
      <Headers />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            padding: "20px",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              padding: "20px",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Which one best describes you?
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "45%" },
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "20px",
                  marginBottom: "20px",
                  //   border: "1px solid red",
                  //   height: "200px",
                  boxShadow: 1,
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src={studentIcon}
                  alt="Student"
                  width="150px"
                  style={{ marginBottom: "10px" }}
                />
                <Link to="/how-it-works-student">
                  <Button variant="contained" fullWidth>
                    I am Student
                  </Button>
                </Link>
              </Box>

              <Box
                sx={{
                  width: { xs: "100%", md: "45%" },
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "20px",
                  marginBottom: "20px",
                  boxShadow: 1,
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src={counselorIcon}
                  alt="Counselor"
                  width="150px"
                  style={{ marginBottom: "10px" }}
                />
                <Link to="/how-it-works-counsellor">
                  <Button variant="contained" fullWidth>
                    I am Educator
                  </Button>
                </Link>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default HowItWorks;
