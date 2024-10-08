import { Box, Button, Container, Divider, List, ListItem, Paper, Typography } from "@mui/material";
import React from "react";

// Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper component for a single A4 page
const Page = ({ children, onClose }) => (
  <Paper
    elevation={3}
    sx={{
      padding: 4,
      width: "21cm", // A4 width
      height: "29.7cm", // A4 height
      margin: "auto",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Button
      variant="outlined"
      color="secondary"
      onClick={onClose}
      sx={{ position: "absolute", top: 16, right: 16 }}
    >
      Close
    </Button>
    {children}
  </Paper>
);

const ViewResume = ({ resume, setIsGenerated }) => {
  const pages = [];

  // Add content to the first page
  pages.push(
    <Page key="page1" onClose={() => setIsGenerated(true)}>
      <Typography variant="h5" gutterBottom>
        {resume.personalInfo.firstName} {resume.personalInfo.lastName}
      </Typography>
      <Typography variant="body1" paragraph>
        {resume.personalInfo.email} | {resume.personalInfo.mobile}
      </Typography>
      {resume.personalInfo.address && (
        <Typography variant="body1" paragraph>
          {resume.personalInfo.address}
        </Typography>
      )}
      {resume.summary && (
        <Typography variant="body1" paragraph>
          <strong>Summary:</strong> {resume.summary}
        </Typography>
      )}
      {resume.education.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Education
          </Typography>
          {resume.education.map((edu, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="body1" paragraph>
                <strong>{edu.degree}</strong>, {edu.institution} ({formatDate(edu.startDate)} -{" "}
                {formatDate(edu.endDate)})
              </Typography>
              <Typography variant="body2" paragraph>
                Grade: {edu.grade}
              </Typography>
              <Divider />
            </Box>
          ))}
        </>
      )}
      {resume.experience.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Experience
          </Typography>
          {resume.experience.map((exp, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="body1" paragraph>
                <strong>{exp.jobTitle}</strong> at {exp.company} ({formatDate(exp.startDate)} -{" "}
                {formatDate(exp.endDate)})
              </Typography>
              <Typography variant="body2" paragraph>
                Location: {exp.location}
              </Typography>
              <Typography variant="body2" paragraph>
                Responsibilities: {exp.responsibilities.join(", ")}
              </Typography>
              {exp.achievements && (
                <Typography variant="body2" paragraph>
                  Achievements: {exp.achievements}
                </Typography>
              )}
              <Divider />
            </Box>
          ))}
        </>
      )}
      {resume.projects.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Projects
          </Typography>
          {resume.projects.map((project, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="body1" paragraph>
                <strong>{project.title}</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Description: {project.description}
              </Typography>
              <Typography variant="body2" paragraph>
                Technologies: {project.technologies.join(", ")}
              </Typography>
              <Typography variant="body2" paragraph>
                Duration: {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </Typography>
              {project.link && (
                <Typography variant="body2" paragraph>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Project Link
                  </a>
                </Typography>
              )}
              <Divider />
            </Box>
          ))}
        </>
      )}
      {resume.certifications.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Certifications
          </Typography>
          {resume.certifications.map((cert, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="body1" paragraph>
                <strong>{cert.name}</strong>, {cert.institution} ({formatDate(cert.issueDate)})
              </Typography>
              {cert.link && (
                <Typography variant="body2" paragraph>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    Certification Link
                  </a>
                </Typography>
              )}
              <Divider />
            </Box>
          ))}
        </>
      )}
      {resume.languages.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Languages
          </Typography>
          <List>
            {resume.languages.map((lang, index) => (
              <ListItem key={index}>
                <Typography variant="body1">
                  <strong>{lang.name}</strong> - {lang.proficiency}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      )}
      {resume.hobbies.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Hobbies
          </Typography>
          <List>
            {resume.hobbies.map((hobby, index) => (
              <ListItem key={index}>
                <Typography variant="body1">{hobby}</Typography>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      )}
    </Page>,
  );

  // Add content to the second page if needed
  if (
    resume.projects.length > 0 ||
    resume.certifications.length > 0 ||
    resume.languages.length > 0 ||
    resume.hobbies.length > 0
  ) {
    pages.push(
      <Page key="page2" onClose={() => setIsGenerated(false)}>
        <Typography variant="h6" gutterBottom>
          Projects, Certifications, Languages, and Hobbies (continued)
        </Typography>
        {resume.projects.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Projects
            </Typography>
            {resume.projects.map((project, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>{project.title}</strong>
                </Typography>
                <Typography variant="body2" paragraph>
                  Description: {project.description}
                </Typography>
                <Typography variant="body2" paragraph>
                  Technologies: {project.technologies.join(", ")}
                </Typography>
                <Typography variant="body2" paragraph>
                  Duration: {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </Typography>
                {project.link && (
                  <Typography variant="body2" paragraph>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      Project Link
                    </a>
                  </Typography>
                )}
                <Divider />
              </Box>
            ))}
          </>
        )}
        {resume.certifications.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Certifications
            </Typography>
            {resume.certifications.map((cert, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>{cert.name}</strong>, {cert.institution} ({formatDate(cert.issueDate)})
                </Typography>
                {cert.link && (
                  <Typography variant="body2" paragraph>
                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                      Certification Link
                    </a>
                  </Typography>
                )}
                <Divider />
              </Box>
            ))}
          </>
        )}
        {resume.languages.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Languages
            </Typography>
            <List>
              {resume.languages.map((lang, index) => (
                <ListItem key={index}>
                  <Typography variant="body1">
                    <strong>{lang.name}</strong> - {lang.proficiency}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Divider />
          </>
        )}
        {resume.hobbies.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Hobbies
            </Typography>
            <List>
              {resume.hobbies.map((hobby, index) => (
                <ListItem key={index}>
                  <Typography variant="body1">{hobby}</Typography>
                </ListItem>
              ))}
            </List>
            <Divider />
          </>
        )}
      </Page>,
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {pages.map((page) => page)}
    </Container>
  );
};

export default ViewResume;
