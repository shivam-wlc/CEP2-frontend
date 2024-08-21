import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Divider,
  Grid,
  Avatar,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fonts } from "../../utility/fonts.js";

const UserUnifiedModal = ({ open, onClose, data }) => {
  if (!open) return null;

  const fixedQuestions = [
    "What is your current level of education?",
    "What is the letter grade that best represents your current overall Grade Point Average (GPA)?",
    "Where do you consider your next career step to be?",
    "Do you have a preference for a geographic location where you would like to study and/or work?",
    "What are the top 3 things that you care about most when considering your future education?",
    "What is your current Nationality?",
    "At this point in your career journey, which Career Cluster most appealing to you?",
  ];

  const surveyAnswers = [
    data?.survey?.educationLevel,
    data?.survey?.gradePoints,
    data?.survey?.nextCareerStep,
    data?.survey?.preferredLocation.join(", "),
    data?.survey?.top3thingsForFuture.join(", "),
    data?.survey?.nationality,
    data?.survey?.selectedPathways.join(", "),
  ];

  const commonTypography = {
    fontFamily: fonts.poppins,
    mb: 1,
  };

  console.log("resumedata data", data);

  return (
    <Paper
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: "#fff",
        backgroundColor: "#f7f7f7",

        zIndex: 1200,
        overflowY: "auto",
        p: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 15,
          right: 15,
          color: "#000",
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" fontWeight="600" sx={commonTypography}>
        Unified Record Details
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        {/* Profile Picture and Basic Info */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Avatar
            src={data?.user?.profilePicture}
            alt="Profile Picture"
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />
          <Typography variant="h6" fontWeight="600" sx={commonTypography}>
            {data?.user?.firstName} {data?.user?.lastName}
          </Typography>
          <Typography sx={{ color: "#555" }}>{data?.user?.email}</Typography>
          <Typography sx={{ color: "#555" }}>{data?.user?.mobile}</Typography>
        </Grid>

        {/* User Details */}
        <Grid item xs={12} md={8}>
          <Box mb={2}>
            <Typography variant="h5" fontWeight="600" sx={commonTypography}>
              User Details
            </Typography>
            <Typography>
              <strong>Date of Birth:</strong>{" "}
              {new Date(data?.user?.dateOfBirth).toLocaleDateString()}
            </Typography>
            <Typography>
              <strong>Country:</strong> {data?.user?.country}
            </Typography>
            <Typography>
              <strong>Gender:</strong> {data?.user?.gender}
            </Typography>
            <Typography>
              <strong>Status:</strong> {data?.user?.status}
            </Typography>
            <Typography>
              <strong>Role:</strong> {data?.user?.role.join(", ")}
            </Typography>
            <Typography>
              <strong>Intro Bio:</strong> {data?.user?.introBio}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {data?.unifiedRecord?.interestProfile?.isTaken ? (
        <Box mb={2}>
          <Typography variant="h5" fontWeight="600" sx={commonTypography}>
            Interest Profile
          </Typography>
          <Typography>
            <strong>Payment Status:</strong>{" "}
            {data?.interestProfile.payment.isPaid ? "Paid" : "Not Paid"}
          </Typography>

          <Box mt={2}>
            <Typography variant="h6" fontWeight="600" sx={commonTypography}>
              Results
            </Typography>
            {data?.interestProfile.results.result.map((item) => (
              <Box key={item.area} mb={1}>
                <Typography>
                  <strong>{item.area}:</strong> {item.score}
                </Typography>
                <Typography sx={{ color: "#555" }}>
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box mt={2}>
            <Typography variant="h6" fontWeight="600" sx={commonTypography}>
              Career Options
            </Typography>
            {data?.interestProfile.careers.career.map((career) => (
              <Typography key={career.code}>
                <Link href={career.href} target="_blank" rel="noopener">
                  {career.title}
                </Link>
              </Typography>
            ))}
          </Box>
        </Box>
      ) : (
        <Box mb={2}>
          <Typography variant="h5" fontWeight="600" sx={commonTypography}>
            Interest Profile
          </Typography>
          <Typography>
            <strong>Status:</strong>{" "}
            {data?.interestProfile?.isTaken ? "Complete" : "Incomplete"}
          </Typography>
          <Typography>
            <strong>Details:</strong> {data?.interestProfile?.details || "N/A"}
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      <Box mb={2}>
        <Typography variant="h5" fontWeight="600" sx={commonTypography}>
          Disc Profile
        </Typography>
        <Typography>
          <strong>Status:</strong>{" "}
          {data?.discProfile?.isTaken ? "Complete" : "Incomplete"}
        </Typography>
        <Typography>
          <strong>Details:</strong> {data?.discProfile?.details || "N/A"}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {data?.unifiedRecord?.survey?.isTaken ? (
        <Box mb={2}>
          <Typography variant="h5" fontWeight="600" sx={commonTypography}>
            Survey
          </Typography>
          {fixedQuestions.map((question, index) => (
            <Box key={index} mb={1}>
              <Typography>
                <strong>Question:</strong> {question}
              </Typography>
              <Typography>
                <strong>Answer:</strong> {surveyAnswers[index] || "N/A"}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box mb={2}>
          <Typography variant="h5" fontWeight="600" sx={commonTypography}>
            Survey
          </Typography>
          <Typography>
            <strong>Status:</strong>{" "}
            {data?.survey?.isTaken ? "Complete" : "Incomplete"}
          </Typography>
          <Typography>
            <strong>Details:</strong> {data?.survey?.details || "N/A"}
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {data?.unifiedRecord?.resume?.isCompleted ? (
        <>
          <Box mb={2}>
            <Typography variant="h5" fontWeight="600" sx={commonTypography}>
              Resume
            </Typography>
          </Box>
        </>
      ) : (
        <Box mb={2}>
          <Typography variant="h5" fontWeight="600" sx={commonTypography}>
            Resume
          </Typography>
          <Typography>
            <strong>Status:</strong>{" "}
            {data?.resume?.isCompleted ? "Complete" : "Incomplete"}
          </Typography>
          <Typography>
            <strong>Details:</strong> {data?.resume?.details || "N/A"}
          </Typography>
        </Box>
      )}

      <Box mt={2} sx={{ textAlign: "right" }}>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Paper>
  );
};

export default UserUnifiedModal;
