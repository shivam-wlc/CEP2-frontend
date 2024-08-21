import React from "react";
import Headers from "../components/Headers";
import { Box, Container, Button, Typography } from "@mui/material";
import { selectAuthenticated } from "../redux/slices/authSlice.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResumeBuilder = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const navigate = useNavigate();

  console.log("isAuthenticated", isAuthenticated);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/resume-dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Headers />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Title */}
        <Typography variant="h3" gutterBottom textAlign="center">
          Resume Builder
        </Typography>

        {/* Main Content Area */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 5 }}
        >
          {/* Left Box: Description */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 4, md: 0 },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Create Your Professional Resume
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Start building your resume with our easy-to-use builder. Enter
              your personal information, add your experiences, skills, and
              education, and get a beautifully formatted resume in minutes.
            </Typography>

            <Box textAlign="center" sx={{ mt: 10 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleGetStarted}
                sx={{ textTransform: "none" }}
              >
                Get Started
              </Button>
            </Box>
          </Box>

          {/* Right Box: Image */}
          <Box
            component="img"
            src="https://assets.flowcvassets.com/landing/flowcv-hero-image-kim-800.webp"
            alt="Resume Builder"
            sx={{
              width: { xs: "100%", md: "50%" },
              maxWidth: 400,
              height: "auto",
            }}
          />
        </Box>

        {/* Centered Button */}
        {/* <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetStarted}
            sx={{ textTransform: "none" }}
          >
            Get Started
          </Button>
        </Box> */}
      </Container>
    </>
  );
};

export default ResumeBuilder;
