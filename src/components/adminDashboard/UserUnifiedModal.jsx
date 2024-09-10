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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fonts } from "../../utility/fonts.js";

const UserUnifiedModal = ({ open, onClose, data }) => {
  if (!open) return null;

  const fixedQuestions = [
    "Education",
    "GPA Grade",
    "Next Career Step",
    "Preferred Location",
    "Top 3 Concerns",
    "Nationality",
    "Career Cluster",
  ];

  const surveyAnswers = [
    data?.survey?.educationLevel || "N/A",
    data?.survey?.gradePoints || "N/A",
    data?.survey?.nextCareerStep || "N/A",
    data?.survey?.preferredLocation.join(", ") || "N/A",
    data?.survey?.top3thingsForFuture.join(", ") || "N/A",
    data?.survey?.nationality || "N/A",
    data?.survey?.selectedPathways.join(", ") || "N/A",
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
        Unified Record
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

      {/* interest profile  */}
      {data?.unifiedRecord?.interestProfile?.isTaken ? (
        <Box mb={2}>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={commonTypography}
            textAlign={"center"}
          >
            Interest Profile
          </Typography>
          <Typography>
            <strong>Payment Status:</strong>{" "}
            {data?.interestProfile.payment.isPaid ? "Paid" : "Not Paid"}
          </Typography>

          <Box mt={2}>
            <Typography variant="h6" fontWeight="600" sx={commonTypography}>
              Interest Profile Results
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {data?.interestProfile.results.result.map((item) => (
                    <TableRow key={item.area}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {item.area}
                      </TableCell>
                      <TableCell align="right">{item.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box mt={2}>
            <Typography variant="h6" fontWeight="600" sx={commonTypography}>
              Career Options
            </Typography>
            {data?.interestProfile.careers.career.map((career, index) => (
              <>
                <Typography key={career.code} sx={{ mb: 1 }}>
                  {index + 1}. {career.title}
                </Typography>
              </>
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

      {data?.unifiedRecord?.discProfile?.isTaken ? (
        <Box>
          {" "}
          <Typography
            variant="h5"
            fontWeight="600"
            sx={commonTypography}
            textAlign={"center"}
          >
            Disc Profile
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">D</TableCell>
                  <TableCell align="center">I</TableCell>
                  <TableCell align="center">S</TableCell>
                  <TableCell align="center">C</TableCell>
                  <TableCell align="center">B</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(data?.discProfile?.scores || {}).map((key) => (
                  <TableRow key={key}>
                    <TableCell sx={{ fontWeight: "bold" }}>{key}</TableCell>
                    <TableCell align="center">
                      {data.discProfile.scores[key].D}
                    </TableCell>
                    <TableCell align="center">
                      {data.discProfile.scores[key].I}
                    </TableCell>
                    <TableCell align="center">
                      {data.discProfile.scores[key].S}
                    </TableCell>
                    <TableCell align="center">
                      {data.discProfile.scores[key].C}
                    </TableCell>
                    <TableCell align="center">
                      {data.discProfile.scores[key].B}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
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
      )}

      <Divider sx={{ my: 2 }} />

      {/* Survey Section */}
      {data?.unifiedRecord?.survey?.isTaken ? (
        <Box mb={2}>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ fontFamily: fonts.poppins, mb: 1 }}
          >
            Survey
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {fixedQuestions.map((question, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {question}
                    </TableCell>
                    <TableCell>{surveyAnswers[index]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box mb={2}>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ fontFamily: fonts.poppins, mb: 1 }}
          >
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

      {/* Resume Section  */}
      {/* Resume Section */}
      {data?.unifiedRecord?.resume?.isCompleted ? (
        <>
          <Box mb={2}>
            <Typography variant="h5" fontWeight="600" sx={commonTypography}>
              Resume
            </Typography>

            {/* Personal Info */}
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell>{`${data?.resume?.personalInfo?.firstName} ${data?.resume?.personalInfo?.lastName}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell>{data?.resume?.personalInfo?.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
                    <TableCell>{data?.resume?.personalInfo?.mobile}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>LinkedIn</TableCell>
                    <TableCell>
                      {data?.resume?.personalInfo?.linkedIn}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>GitHub</TableCell>
                    <TableCell>{data?.resume?.personalInfo?.github}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Website</TableCell>
                    <TableCell>{data?.resume?.personalInfo?.website}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Summary */}
            <Box mb={2}>
              <Typography variant="h6" fontWeight="600" sx={commonTypography}>
                Summary
              </Typography>
              <Typography>{data?.resume?.summary}</Typography>
            </Box>

            {/* Education */}
            <Box mb={2}>
              <Typography variant="h6" fontWeight="600" sx={commonTypography}>
                Education
              </Typography>
              {data?.resume?.education.map((edu) => (
                <Box key={edu._id} mb={1}>
                  <Typography variant="body1">
                    <strong>{edu.degree}</strong> - {edu.institution}
                  </Typography>
                  <Typography variant="body2">
                    {new Date(edu.startDate).toLocaleDateString()} -{" "}
                    {new Date(edu.endDate).toLocaleDateString()} | Grade:{" "}
                    {edu.grade}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Experience */}
            <Box mb={2}>
              <Typography variant="h6" fontWeight="600" sx={commonTypography}>
                Experience
              </Typography>
              {data?.resume?.experience.map((exp) => (
                <Box key={exp._id} mb={1}>
                  <Typography variant="body1">
                    <strong>{exp.jobTitle}</strong> - {exp.company},{" "}
                    {exp.location}
                  </Typography>
                  <Typography variant="body2">
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {new Date(exp.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Responsibilities:</strong>{" "}
                    {exp.responsibilities.join(" ")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Achievements:</strong> {exp.achievements}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Skills */}
            <Box mb={2}>
              <Typography variant="h6" fontWeight="600" sx={commonTypography}>
                Skills
              </Typography>
              <Typography variant="body2">
                <strong>Technical:</strong>{" "}
                {data?.resume?.skills?.technical.join(", ")}
              </Typography>
              <Typography variant="body2">
                <strong>Soft:</strong> {data?.resume?.skills?.soft.join(", ")}
              </Typography>
            </Box>

            {/* Projects */}
            <Box mb={2}>
              <Typography variant="h6" fontWeight="600" sx={commonTypography}>
                Projects
              </Typography>
              {data?.resume?.projects.map((proj) => (
                <Box key={proj._id} mb={1}>
                  <Typography variant="body1">
                    <strong>{proj.title}</strong>
                  </Typography>
                  <Typography variant="body2">{proj.description}</Typography>
                  <Typography variant="body2">
                    <strong>Technologies:</strong>{" "}
                    {proj.technologies.join(", ")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Link:</strong> <a href={proj.link}>{proj.link}</a>
                  </Typography>
                  <Typography variant="body2">
                    {new Date(proj.startDate).toLocaleDateString()} -{" "}
                    {new Date(proj.endDate).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Certifications */}
            <Box mb={2}>
              <Typography variant="h6" fontWeight="600" sx={commonTypography}>
                Certifications
              </Typography>
              {data?.resume?.certifications.map((cert) => (
                <Box key={cert._id} mb={1}>
                  <Typography variant="body1">
                    <strong>{cert.name}</strong> - {cert.institution}
                  </Typography>
                  <Typography variant="body2">
                    Issue Date: {new Date(cert.issueDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Link:</strong> <a href={cert.link}>{cert.link}</a>
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Languages */}
            <Box mb={2}>
              <Typography variant="h6" fontWeight="600" sx={commonTypography}>
                Languages
              </Typography>
              {data?.resume?.languages.map((lang) => (
                <Typography key={lang._id} variant="body2">
                  {lang.name} - {lang.proficiency}
                </Typography>
              ))}
            </Box>

            {/* Hobbies */}
            <Box mb={2}>
              <Typography variant="h6" fontWeight="600" sx={commonTypography}>
                Hobbies
              </Typography>
              <Typography variant="body2">
                {data?.resume?.hobbies.join(", ")}
              </Typography>
            </Box>
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
