import React, { useState, useMemo } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  FormControlLabel,
  FormGroup,
  Accordion,
} from "@mui/material";
import {
  levelOfEducation,
  gradePoints,
  nextCareer,
  mostAppealing,
  preferredLocation,
  top3thingsForFuture,
} from "../utility/survey1.js";
import { fonts } from "../utility/fonts.js";
import { saveSurveyData } from "../redux/slices/surveySlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectToken } from "../redux/slices/authSlice.js";
import { notify } from "../redux/slices/alertSlice.js";
import { useNavigate } from "react-router-dom";
import GeneralButton from "../components/general/GeneralButton.jsx";
import { countryList } from "../utility/countryList.js";
import { colors } from "../utility/color.js";

import MultiSelectDropdown from "./MultiSelectDropdown.jsx";

const SurveyForm1 = ({ open, onClose, onSubmit }) => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("");
  const [grade, setGrade] = useState("");
  const [career, setCareer] = useState("");
  const [appealing, setAppealing] = useState(["none"]);
  const [location, setLocation] = useState([]);
  const [thingsForFuture, setThingsForFuture] = useState([]);
  const [nationality, setNationality] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const selectedPathways = useMemo(
    () => selectedOptions.map((item) => item.careerPathway),
    [selectedOptions]
  );

  const handleLevelChange = (event) => setSelectedLevel(event.target.value);
  const handleGradeChange = (event) => setGrade(event.target.value);
  const handleCareerChange = (event) => setCareer(event.target.value);
  const handleAppealingChange = (event) => setAppealing(event.target.value);
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleNationalityChange = (event) => setNationality(event.target.value);
  const handleThingsForFutureChange = (event) =>
    setThingsForFuture(event.target.value);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      educationLevel: selectedLevel,
      mostAppealingField: appealing,
      nextCareerStep: career,
      gradePoints: grade,
      preferredLocation: location,
      top3thingsForFuture: thingsForFuture,
      nationality: nationality,
      selectedPathways: selectedPathways,
    };

    if (
      !formData.educationLevel ||
      !formData.mostAppealingField ||
      !formData.nextCareerStep ||
      !formData.gradePoints ||
      !formData.preferredLocation ||
      !formData.top3thingsForFuture ||
      !formData.nationality
    ) {
      dispatchToRedux(
        notify({ type: "error", message: "Please fill all the fields" })
      );
      return;
    }

    if (!userId) {
      dispatchToRedux(notify({ type: "error", message: "Please login first" }));
      navigate("/login");
      return;
    }

    if (!selectedPathways.length) {
      dispatchToRedux(
        notify({ type: "error", message: "Please select atleast one pathway" })
      );
      return;
    }

    try {
      await dispatchToRedux(saveSurveyData({ formData, userId, token }));
      dispatchToRedux(
        notify({ type: "success", message: "Survey submitted successfully" })
      );

      setSelectedLevel("");
      setGrade("");
      setCareer("");
      setAppealing([]);
      setLocation([]);
      setThingsForFuture([]);
      setSelectedOptions([]);
      setNationality("");

      onSubmit();
      navigate("/careerrexploreranalysis");
    } catch (error) {
      dispatchToRedux(
        notify({ type: "error", message: "Something went wrong" })
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          height: "80vh",
          overflow: "auto",
          borderRadius: "25px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            width: "90%",
            padding: "2rem",
            margin: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: fonts.sans,
              fontWeight: "600",
              fontSize: "28px",
              paddingBottom: "10px",
            }}
          >
            Career Explorer Survey
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: fonts.sans,
              textAlign: "center",
              color: colors.midGray,
              fontSize: "12px",
            }}
          >
            Thank you for your interest in taking a Career Explorer Assessment.
            Our core focus is to assist 16-25 year olds to help make the best
            educational and early employment decisions. In order to give you the
            most relevant Career options tailored to your interests, skills and
            aspirations, we need for you to answer a few quick questions. This
            should not take more than 5 minutes. <br />
            Please be as accurate as possible
          </Typography>
        </Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
            What is your current level of education?{" "}
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            value={selectedLevel}
            onChange={handleLevelChange}
            required
            placeholder="Select your level of education"
            sx={{
              borderRadius: "25px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "25px",
              },
            }}
          >
            {levelOfEducation.map((option) => (
              <MenuItem
                sx={{ fontFamily: fonts.sans }}
                key={option.point}
                value={option.point}
              >
                {option.point}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
            What is the letter grade that best represents your current overall
            Grade Point Average (GPA)? <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            value={grade}
            required
            onChange={handleGradeChange}
            sx={{
              borderRadius: "25px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "25px",
              },
            }}
          >
            {gradePoints.map((option) => (
              <MenuItem key={option.grade} value={option.grade}>
                {option.grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
            Where do you consider your next career step to be?{" "}
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            value={career}
            onChange={handleCareerChange}
            sx={{
              borderRadius: "25px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "25px",
              },
            }}
          >
            {nextCareer.map((option) => (
              <MenuItem key={option.option} value={option.option}>
                {option.option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
            At this point in your career journey, which fields most appeal to
            you? <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            multiple
            value={appealing}
            onChange={handleAppealingChange}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              borderRadius: "25px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "25px",
              },
            }}
          >
            {mostAppealing.map((option) => (
              <MenuItem key={option.option} value={option.option}>
                <Checkbox checked={appealing.indexOf(option.option) > -1} />
                <ListItemText primary={option.option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
            Do you have a preference for a geographic location where you would
            like to study and/or work? <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            multiple
            value={location}
            onChange={handleLocationChange}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              borderRadius: "25px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "25px",
              },
            }}
          >
            {preferredLocation.map((option) => (
              <MenuItem key={option.location} value={option.location}>
                <Checkbox checked={location.includes(option.location)} />
                <ListItemText primary={option.location} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
            What are the top 3 things that you care about most when considering
            your future education? <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            multiple
            value={thingsForFuture}
            onChange={handleThingsForFutureChange}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              borderRadius: "25px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "25px",
              },
            }}
          >
            {top3thingsForFuture.map((option) => (
              <MenuItem key={option.aspect} value={option.aspect}>
                <Checkbox checked={thingsForFuture.includes(option.aspect)} />
                <ListItemText primary={option.aspect} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
            What is your current Nationality?{" "}
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            value={nationality}
            onChange={handleNationalityChange}
            sx={{
              borderRadius: "25px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "25px",
              },
            }}
          >
            {countryList.map((country) => (
              <MenuItem key={country.code} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <MultiSelectDropdown
            fonts={fonts}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "right", gap: "2rem" }}>
          <GeneralButton onClick={handleFormSubmit} text="Submit" />
          <GeneralButton onClick={onClose} text="Cancel" />
        </Box>
      </Box>
      {/* <Box></Box> */}
    </Modal>
  );
};

export default SurveyForm1;
