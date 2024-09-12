import React, { useEffect, useState } from "react";
import dashboardStyles from "../../styles/ResumeDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import commonStyle from "../../styles/Common.module.css";

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
  TextField,
  Typography,
  Box,
  IconButton,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import ViewResume from "./sections/ViewResume.jsx";
import { updatedResumeStatus } from "../../redux/slices/unifiedRecordSlice.js";
import TopSubCard from "./TopSubCard.jsx";
import { countryList } from "../../utility/countryList.js";

const ResumeDashboard = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const resume = useSelector(selectResume);
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("Personal Information");
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      userName: "",
      gender: "",
      birthdate: "",
      nationality: "",
      email: "",
      mobile: "",
      telephone: "",
      linkedIn: "",
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
    // if (!isAuthenticated) {
    //   navigate("/login"); // Redirect to login if not authenticated
    // }
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
    console.log("hello");

    // Implement the save functionality here, dispatch an action to save the specific section
    const currentSectionIndex = sectionList.indexOf(section);
    const nextSection = sectionList[currentSectionIndex + 1];
    console.log(nextSection);
    setActiveSection(nextSection);

    console.log("Form data:", formData, token, userId, "hell");

    dispatchToRedux(updateResume({ token, userId, formData }));
  };

  const inputBoxStyle = {
    "& .MuiFilledInput-root": {
      borderRadius: "25px", // Adjust the value as per your needs
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "none", // Remove underline in non-focus state
    },
    "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none", // Remove underline on hover
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: "none", // Remove underline in focus state
    },
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "Personal Information":
        return (
          <Grid container spacing={2}>
            {/* first name */}
            {/* <Grid item xs={12} sm={6} lg={4}>
              <TextField
                variant="filled"
                label="First Name"
                fullWidth
                value={formData.personalInfo.firstName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "firstName", e)
                }
                sx={{
                  "& .MuiFilledInput-root": {
                    borderRadius: "25px", // Adjust the value as per your needs
                  },
                }}
              />
            </Grid> */}
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                variant="filled"
                label="First Name"
                fullWidth
                value={formData.personalInfo.firstName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "firstName", e)
                }
                sx={inputBoxStyle}
              />
            </Grid>

            {/* middle name */}
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                variant="filled"
                label="Middle Name"
                fullWidth
                value={formData.personalInfo.middleName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "middleName", e)
                }
                sx={inputBoxStyle}
              />
            </Grid>
            {/* last name */}
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                variant="filled"
                label="Last Name"
                fullWidth
                value={formData.personalInfo.lastName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "lastName", e)
                }
                sx={inputBoxStyle}
              />
            </Grid>
            {/* user name */}
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                variant="filled"
                label="User Name"
                fullWidth
                value={formData.personalInfo.userName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "userName", e)
                }
                sx={inputBoxStyle}
              />
            </Grid>
            {/* gender */}
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                variant="filled"
                label="Gender"
                select
                fullWidth
                value={formData.personalInfo.gender}
                onChange={(e) => handleInputChange("personalInfo", "gender", e)}
                sx={inputBoxStyle}
              >
                {/* Define the options */}
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            {/* Birthdate */}
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                variant="filled"
                label="Birthdate"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.personalInfo.birthdate}
                onChange={(e) =>
                  handleInputChange("personalInfo", "birthdate", e)
                }
                sx={inputBoxStyle}
              />
            </Grid>
            {/* Nationality*/}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                label="Nationality"
                select
                fullWidth
                value={formData.personalInfo.nationality}
                onChange={(e) =>
                  handleInputChange("personalInfo", "nationality", e)
                }
                sx={inputBoxStyle}
              >
                {countryList.map((country) => (
                  <MenuItem key={country.name} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* email */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                label="Email"
                fullWidth
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange("personalInfo", "email", e)}
                sx={inputBoxStyle}
              />
            </Grid>
            {/* mobile */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                label="Mobile"
                fullWidth
                value={formData.personalInfo.mobile}
                onChange={(e) => handleInputChange("personalInfo", "mobile", e)}
                sx={inputBoxStyle}
              />
            </Grid>
            {/* tele */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                label="Telephone"
                fullWidth
                value={formData.personalInfo.telephone}
                onChange={(e) =>
                  handleInputChange("personalInfo", "telephone", e)
                }
                sx={inputBoxStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                label="Personal Website URL"
                fullWidth
                value={formData.personalInfo.website}
                onChange={(e) =>
                  handleInputChange("personalInfo", "website", e)
                }
                sx={inputBoxStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                label="Linkdin URL"
                fullWidth
                value={formData.personalInfo.linkedIn}
                onChange={(e) =>
                  handleInputChange("personalInfo", "linkedIn", e)
                }
                sx={inputBoxStyle}
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
                sx={{ ...inputBoxStyle, backgroundColor: "#F2F2F2" }}
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
                {" "}
                {/* to be remove */}
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    label="Your current school/educational institution"
                    fullWidth
                    value={edu.degree}
                    onChange={(e) =>
                      handleInputChange("education", "institute", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    label="Website URL of school/education institution "
                    fullWidth
                    value={edu.institution}
                    onChange={(e) =>
                      handleInputChange("education", "websiteurl", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <button
                className={commonStyle["navButton"]}
                onClick={handleAddEducation}
              >
                + Add Education
              </button>
            </Grid>
          </Grid>
        );

      case "Experience":
        return (
          <Grid container spacing={2}>
            {formData.experience.map((exp, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    label="Job Title"
                    fullWidth
                    value={exp.jobTitle}
                    onChange={(e) =>
                      handleInputChange("experience", "jobTitle", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="Company"
                    fullWidth
                    value={exp.company}
                    onChange={(e) =>
                      handleInputChange("experience", "company", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="Location"
                    fullWidth
                    value={exp.location}
                    onChange={(e) =>
                      handleInputChange("experience", "location", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="Start Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={exp.startDate}
                    onChange={(e) =>
                      handleInputChange("experience", "startDate", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="End Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={exp.endDate}
                    onChange={(e) =>
                      handleInputChange("experience", "endDate", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
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
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    label="Achievements"
                    fullWidth
                    value={exp.achievements}
                    onChange={(e) =>
                      handleInputChange("experience", "achievements", e, index)
                    }
                    sx={inputBoxStyle}
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
              <button
                className={commonStyle["navButton"]}
                onClick={handleAddExperience}
              >
                + Add Experience
              </button>
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
                      variant="filled"
                      label={`${type.charAt(0).toUpperCase() + type.slice(1)} Skill`}
                      fullWidth
                      value={skill}
                      onChange={(e) =>
                        handleInputChange("skills", type, e, index)
                      }
                      sx={inputBoxStyle}
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
                  <button
                    className={commonStyle.navButton}
                    onClick={() => handleAddSkill(type)}
                  >
                    + Add {type.charAt(0).toUpperCase() + type.slice(1)} Skill
                  </button>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="Certification Name"
                    fullWidth
                    value={cert.name}
                    onChange={(e) =>
                      handleInputChange("certifications", "name", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
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
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    label="Link"
                    fullWidth
                    value={cert.link}
                    onChange={(e) =>
                      handleInputChange("certifications", "link", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="Issue Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={cert.issueDate}
                    onChange={(e) =>
                      handleInputChange("certifications", "issueDate", e, index)
                    }
                    sx={inputBoxStyle}
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
              <button
                className={commonStyle.navButton}
                onClick={handleAddCertification}
              >
                + Add Certification
              </button>
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
                    variant="filled"
                    label="Project Title"
                    fullWidth
                    value={project.title}
                    onChange={(e) =>
                      handleInputChange("projects", "title", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
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
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    label="Description"
                    fullWidth
                    value={project.description}
                    onChange={(e) =>
                      handleInputChange("projects", "description", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="Start Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={project.startDate}
                    onChange={(e) =>
                      handleInputChange("projects", "startDate", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="End Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={project.endDate}
                    onChange={(e) =>
                      handleInputChange("projects", "endDate", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    label="Project Link"
                    fullWidth
                    value={project.link}
                    onChange={(e) =>
                      handleInputChange("projects", "link", e, index)
                    }
                    sx={inputBoxStyle}
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
              <button
                className={commonStyle.navButton}
                onClick={handleAddProject}
              >
                + Add Project
              </button>
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
                    variant="filled"
                    label="Language"
                    fullWidth
                    value={language.name}
                    onChange={(e) =>
                      handleInputChange("languages", "name", e, index)
                    }
                    sx={inputBoxStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="Proficiency"
                    fullWidth
                    value={language.proficiency}
                    onChange={(e) =>
                      handleInputChange("languages", "proficiency", e, index)
                    }
                    sx={inputBoxStyle}
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
              <button
                className={commonStyle.navButton}
                onClick={handleAddLanguage}
              >
                + Add Language
              </button>
            </Grid>
          </Grid>
        );

      case "Hobbies & Interests":
        return (
          <Grid container spacing={2}>
            {formData.hobbies.map((hobby, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    label="Your Hobbies & Interests"
                    fullWidth
                    value={hobby}
                    onChange={(e) =>
                      handleInputChange("hobbies", "hobby", e, index)
                    }
                    sx={inputBoxStyle}
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
              <button
                className={commonStyle.navButton}
                onClick={handleAddHobby}
              >
                + Add Hobby
              </button>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  const handleGenerateClick = () => {
    console.log("Mai kha namaste ji");

    setIsGenerated(false);

    try {
      dispatchToRedux(updatedResumeStatus({ userId, token }));
    } catch (error) {
      console.log(error);
    }
  };

  const sectionList = [
    "Personal Information",
    "Summary",
    "Education",
    "Experience",
    "Skills",
    "Projects",
    "Certifications",
    "Languages",
    "Hobbies & Interests",
  ];

  return (
    <div className={dashboardStyles["container"]}>
      {isGenerated ? (
        <Box
          sx={{
            mx: "5rem",
            mt: "5rem",
          }}
        >
          <TopSubCard currentSection={sectionList.indexOf(activeSection) + 1} />
          <Box>
            <Box
              sx={{
                // my: 5,
                mt: -2.5,
                backgroundColor: "#ffff",
                p: 3,
                // borderRadius: "1.25rem",
                borderRadius: "0 0 1.25rem 1.25rem",
              }}
            >
              <Container maxWidth="lg" sx={{ mt: 7 }}>
                <Grid container spacing={1}>
                  {/* left */}
                  <Grid item xs={12} sm={4}>
                    <List sx={{ width: "85%" }}>
                      {sectionList.map((section, index) => (
                        <ListItem
                          key={index}
                          button
                          onClick={() => setActiveSection(section)}
                          className={
                            activeSection === section
                              ? `${dashboardStyles["active-section"]} ${dashboardStyles["section"]}`
                              : dashboardStyles["section"]
                          }
                        >
                          <ListItemText primary={section} />
                        </ListItem>
                      ))}
                      {/* Add more sections as needed */}
                    </List>
                  </Grid>
                  {/* right */}
                  <Grid item xs={12} sm={8}>
                    <Box p={3}>
                      <Typography variant="h6" fontWeight="bold">{activeSection}</Typography>
                      <Divider sx={{ my: "1rem" }} />
                      {renderSectionContent()}
                      <Box
                        mt={3}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className={commonStyle.navButton}
                          onClick={() => {
                            sectionList.indexOf(activeSection) ===
                            sectionList.length - 1
                              ? handleGenerateClick()
                              : handleSaveSection(activeSection);
                          }}
                        >
                          {sectionList.indexOf(activeSection) ===
                          sectionList.length - 1
                            ? `Generate Resume`
                            : `Save & Next`}
                        </button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            {/* <Box sx={{ width: "30%", m: "auto" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateClick}
                fullWidth
              >
                Generate Resume
              </Button>
            </Box> */}
          </Box>
        </Box>
      ) : (
        <ViewResume resume={resume} setIsGenerated={setIsGenerated} />
      )}

      {/* Resume Builder */}
    </div>
  );
};

export default ResumeDashboard;
