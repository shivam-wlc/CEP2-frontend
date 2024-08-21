import React, { useEffect, useState } from "react";
import Headers from "../Headers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAuthenticated,
  selectToken,
  selectUserId,
} from "../../redux/slices/authSlice";
import {
  getResume,
  selectResume,
  updateResume,
} from "../../redux/slices/resumeSlice.js";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import ViewResume from "./sections/ViewResume.jsx";
import { updatedResumeStatus } from "../../redux/slices/unifiedRecordSlice.js";

const ResumeDashboard = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const resume = useSelector(selectResume);
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("Personal Info");
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
      linkedIn: "",
      github: "",
      website: "",
    },
    summary: "",
    // You can initialize other sections similarly
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        grade: "",
      },
    ],
    experience: [
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
        achievements: "",
      },
    ],
    skills: {
      technical: [""],
      soft: [""],
    },
    projects: [
      {
        title: "",
        description: "",
        technologies: [""],
        startDate: "",
        endDate: "",
        link: "",
      },
    ],
    certifications: [
      {
        name: "",
        institution: "",
        link: "",
        issueDate: "",
      },
    ],
    languages: [
      {
        name: "",
        proficiency: "",
      },
    ],
    hobbies: [""],
  });

  const [isGenerated, setIsGenerated] = useState(true);
  console.log("resume", resume);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (token && userId) {
      dispatchToRedux(getResume({ token, userId }));
    }
  }, [token, userId, dispatchToRedux]);

  useEffect(() => {
    if (resume) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        personalInfo: resume.personalInfo || prevFormData.personalInfo,
        // Load other sections similarly
        summary: resume.summary || prevFormData.summary,
        education: resume.education?.length
          ? resume?.education
          : prevFormData.education,
        experience: resume.experience?.length
          ? resume?.experience
          : prevFormData.experience,
        skills: resume.skills || prevFormData.skills,
        projects: resume.projects || prevFormData.projects,
        certifications: resume.certifications || prevFormData.certifications,
        languages: resume.languages || prevFormData.languages,
        hobbies: resume.hobbies || prevFormData.hobbies,
      }));
    }
  }, [resume]);

  // const handleInputChange = (section, field, event, index) => {
  //   const value = event.target.value;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [section]:
  //       section === "skills"
  //         ? {
  //             ...prev.skills,
  //             [field]: prev.skills[field].map((skill, i) =>
  //               i === index ? value : skill
  //             ),
  //           }
  //         : section === "summary"
  //           ? value
  //           : section === "education" || section === "experience"
  //             ? prev[section].map((item, i) =>
  //                 i === index ? { ...item, [field]: value } : item
  //               )
  //             : section === "certifications"
  //               ? prev[section].map((cert, i) =>
  //                   i === index ? { ...cert, [field]: value } : cert
  //                 )
  //               : section === "projects"
  //                 ? prev.projects.map((project, i) =>
  //                     i === index ? { ...project, [field]: value } : project
  //                   )
  //                 : { ...prev[section], [field]: value },
  //   }));
  // };

  // const handleInputChange = (section, field, event, index) => {
  //   const value = event.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [section]:
  //       section === "skills"
  //         ? {
  //             ...prev.skills,
  //             [field]: prev.skills[field].map((skill, i) =>
  //               i === index ? value : skill
  //             ),
  //           }
  //         : section === "summary"
  //           ? value
  //           : section === "education" || section === "experience"
  //             ? prev[section].map((item, i) =>
  //                 i === index ? { ...item, [field]: value } : item
  //               )
  //             : section === "certifications"
  //               ? prev[section].map((cert, i) =>
  //                   i === index ? { ...cert, [field]: value } : cert
  //                 )
  //               : section === "languages"
  //                 ? prev.languages.map((lang, i) =>
  //                     i === index ? { ...lang, [field]: value } : lang
  //                   )
  //                 : section === "hobbies"
  //                   ? prev.hobbies.map((hobby, i) =>
  //                       i === index ? value : hobby
  //                     )
  //                   : { ...prev[section], [field]: value },
  //   }));
  // };

  const handleInputChange = (section, field, event, index) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [section]:
        section === "skills"
          ? {
              ...prev.skills,
              [field]: prev.skills[field].map((skill, i) =>
                i === index ? value : skill
              ),
            }
          : section === "summary"
            ? value
            : section === "education" || section === "experience"
              ? prev[section].map((item, i) =>
                  i === index ? { ...item, [field]: value } : item
                )
              : section === "certifications"
                ? prev[section].map((cert, i) =>
                    i === index ? { ...cert, [field]: value } : cert
                  )
                : section === "languages"
                  ? prev.languages.map((lang, i) =>
                      i === index ? { ...lang, [field]: value } : lang
                    )
                  : section === "hobbies"
                    ? prev.hobbies?.map((hobby, i) =>
                        i === index ? value : hobby
                      )
                    : section === "projects"
                      ? prev.projects.map((project, i) =>
                          i === index ? { ...project, [field]: value } : project
                        )
                      : { ...prev[section], [field]: value },
    }));
  };

  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", startDate: "", endDate: "", grade: "" },
      ],
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          responsibilities: [""],
          achievements: "",
        },
      ],
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleAddSkill = (type) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: [...prev.skills[type], ""],
      },
    }));
  };

  const handleRemoveSkill = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: prev.skills[type].filter((_, i) => i !== index),
      },
    }));
  };

  const handleAddCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: "", institution: "", issueDate: "", link: "" },
      ],
    }));
  };

  const handleRemoveCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          technologies: [""],
          startDate: "",
          endDate: "",
          link: "",
        },
      ],
    }));
  };

  const handleRemoveProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  //langugaes
  const handleAddLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          name: "",
          proficiency: "",
        },
      ],
    }));
  };

  const handleRemoveLanguage = (index) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const handleAddHobby = () => {
    setFormData((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, ""],
    }));
  };

  const handleRemoveHobby = (index) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index),
    }));
  };

  const handleSaveSection = (section) => {
    // Implement the save functionality here, dispatch an action to save the specific section
    console.log("Form data:", formData);
    dispatchToRedux(updateResume({ token, userId, formData }));
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "Personal Info":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                value={formData.personalInfo.firstName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "firstName", e)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={formData.personalInfo.lastName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "lastName", e)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange("personalInfo", "email", e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile"
                fullWidth
                value={formData.personalInfo.mobile}
                onChange={(e) => handleInputChange("personalInfo", "mobile", e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                fullWidth
                value={formData.personalInfo.address}
                onChange={(e) =>
                  handleInputChange("personalInfo", "address", e)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="LinkedIn"
                fullWidth
                value={formData.personalInfo.linkedIn}
                onChange={(e) =>
                  handleInputChange("personalInfo", "linkedIn", e)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="GitHub"
                fullWidth
                value={formData.personalInfo.github}
                onChange={(e) => handleInputChange("personalInfo", "github", e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                fullWidth
                value={formData.personalInfo.website}
                onChange={(e) =>
                  handleInputChange("personalInfo", "website", e)
                }
              />
            </Grid>
          </Grid>
        );
      // Implement other sections similarly...
      case "Summary":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Professional Summary"
                fullWidth
                multiline
                rows={4}
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", null, e)}
              />
            </Grid>
          </Grid>
        );

      case "Education":
        return (
          <Grid container spacing={2}>
            {formData.education.map((edu, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Degree"
                    fullWidth
                    value={edu.degree}
                    onChange={(e) =>
                      handleInputChange("education", "degree", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Institution"
                    fullWidth
                    value={edu.institution}
                    onChange={(e) =>
                      handleInputChange("education", "institution", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Start Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={edu.startDate}
                    onChange={(e) =>
                      handleInputChange("education", "startDate", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={edu.endDate}
                    onChange={(e) =>
                      handleInputChange("education", "endDate", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Grade"
                    fullWidth
                    value={edu.grade}
                    onChange={(e) =>
                      handleInputChange("education", "grade", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveEducation(index)}
                    disabled={formData.education.length === 1} // Disable remove button if there's only one education entry
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddEducation}
              >
                Add Education
              </Button>
            </Grid>
          </Grid>
        );

      case "Experience":
        return (
          <Grid container spacing={2}>
            {formData.experience.map((exp, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Job Title"
                    fullWidth
                    value={exp.jobTitle}
                    onChange={(e) =>
                      handleInputChange("experience", "jobTitle", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company"
                    fullWidth
                    value={exp.company}
                    onChange={(e) =>
                      handleInputChange("experience", "company", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Location"
                    fullWidth
                    value={exp.location}
                    onChange={(e) =>
                      handleInputChange("experience", "location", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Start Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={exp.startDate}
                    onChange={(e) =>
                      handleInputChange("experience", "startDate", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={exp.endDate}
                    onChange={(e) =>
                      handleInputChange("experience", "endDate", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Responsibilities"
                    fullWidth
                    multiline
                    rows={4}
                    value={exp.responsibilities.join(", ")}
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
                        "responsibilities",
                        { target: { value: e.target.value.split(", ") } },
                        index
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Achievements"
                    fullWidth
                    value={exp.achievements}
                    onChange={(e) =>
                      handleInputChange("experience", "achievements", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveExperience(index)}
                    disabled={formData.experience.length === 1} // Disable remove button if there's only one experience entry
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddExperience}
              >
                Add Experience
              </Button>
            </Grid>
          </Grid>
        );

      case "Skills":
        return (
          <Grid container spacing={2}>
            {["technical", "soft"].map((type) => (
              <React.Fragment key={type}>
                {formData.skills[type].map((skill, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <TextField
                      label={`${type.charAt(0).toUpperCase() + type.slice(1)} Skill`}
                      fullWidth
                      value={skill}
                      onChange={(e) =>
                        handleInputChange("skills", type, e, index)
                      }
                    />
                    <IconButton
                      color="secondary"
                      onClick={() => handleRemoveSkill(type, index)}
                      disabled={formData.skills[type].length === 1}
                    >
                      <Remove />
                    </IconButton>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => handleAddSkill(type)}
                  >
                    Add {type.charAt(0).toUpperCase() + type.slice(1)} Skill
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        );

      case "Certifications":
        return (
          <Grid container spacing={2}>
            {formData.certifications.map((cert, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Certification Name"
                    fullWidth
                    value={cert.name}
                    onChange={(e) =>
                      handleInputChange("certifications", "name", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Institution"
                    fullWidth
                    value={cert.institution}
                    onChange={(e) =>
                      handleInputChange(
                        "certifications",
                        "institution",
                        e,
                        index
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Link"
                    fullWidth
                    value={cert.link}
                    onChange={(e) =>
                      handleInputChange("certifications", "link", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Issue Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={cert.issueDate}
                    onChange={(e) =>
                      handleInputChange("certifications", "issueDate", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveCertification(index)}
                    disabled={formData.certifications.length === 1}
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddCertification}
              >
                Add Certification
              </Button>
            </Grid>
          </Grid>
        );
      // Add cases for other sections

      case "Projects":
        return (
          <Grid container spacing={2}>
            {formData?.projects?.map((project, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Project Title"
                    fullWidth
                    value={project.title}
                    onChange={(e) =>
                      handleInputChange("projects", "title", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Description"
                    fullWidth
                    value={project.description}
                    onChange={(e) =>
                      handleInputChange("projects", "description", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Technologies"
                    fullWidth
                    value={project.technologies.join(", ")}
                    onChange={(e) =>
                      handleInputChange(
                        "projects",
                        "technologies",
                        { target: { value: e.target.value.split(", ") } },
                        index
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Start Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={project.startDate}
                    onChange={(e) =>
                      handleInputChange("projects", "startDate", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={project.endDate}
                    onChange={(e) =>
                      handleInputChange("projects", "endDate", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Project Link"
                    fullWidth
                    value={project.link}
                    onChange={(e) =>
                      handleInputChange("projects", "link", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveProject(index)}
                    disabled={formData.projects.length === 1}
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddProject}
              >
                Add Project
              </Button>
            </Grid>
          </Grid>
        );

      // Add cases for other sections

      case "Languages":
        return (
          <Grid container spacing={2}>
            {formData.languages.map((language, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Language"
                    fullWidth
                    value={language.name}
                    onChange={(e) =>
                      handleInputChange("languages", "name", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Proficiency"
                    fullWidth
                    value={language.proficiency}
                    onChange={(e) =>
                      handleInputChange("languages", "proficiency", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveLanguage(index)}
                    disabled={formData.languages.length === 1}
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddLanguage}
              >
                Add Language
              </Button>
            </Grid>
          </Grid>
        );

      case "Hobbies":
        return (
          <Grid container spacing={2}>
            {formData.hobbies.map((hobby, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <TextField
                    label="Hobby"
                    fullWidth
                    value={hobby}
                    onChange={(e) =>
                      handleInputChange("hobbies", "hobby", e, index)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveHobby(index)}
                    disabled={formData.hobbies.length === 1}
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddHobby}
              >
                Add Hobby
              </Button>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  const handleGenerateClick = () => {
    setIsGenerated(false);

    try {
      dispatchToRedux(updatedResumeStatus({ userId, token }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Headers />
      {isGenerated ? (
        <Box>
          <Box sx={{ my: 5 }}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Paper>
                    <List>
                      <ListItem
                        button
                        onClick={() => setActiveSection("Personal Info")}
                      >
                        <ListItemText primary="Personal Info" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => setActiveSection("Summary")}
                      >
                        <ListItemText primary="Summary" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => setActiveSection("Education")}
                      >
                        <ListItemText primary="Education" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => setActiveSection("Experience")}
                      >
                        <ListItemText primary="Experience" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => setActiveSection("Skills")}
                      >
                        <ListItemText primary="Skills" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => setActiveSection("Projects")}
                      >
                        <ListItemText primary="Projects" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => setActiveSection("Certifications")}
                      >
                        <ListItemText primary="Certifications" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => setActiveSection("Languages")}
                      >
                        <ListItemText primary="Languages" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => setActiveSection("Hobbies")}
                      >
                        <ListItemText primary="Hobbies" />
                      </ListItem>
                      {/* Add more sections as needed */}
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Paper>
                    <Box p={3}>
                      <Typography variant="h6">{activeSection}</Typography>
                      {renderSectionContent()}
                      <Box mt={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleSaveSection(activeSection)}
                        >
                          Save {activeSection}
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>

          <Box sx={{ width: "30%", m: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateClick}
              fullWidth
            >
              Generate Resume
            </Button>
          </Box>
        </Box>
      ) : (
        <ViewResume resume={resume} setIsGenerated={setIsGenerated} />
      )}

      {/* Resume Builder */}
    </>
  );
};

export default ResumeDashboard;
