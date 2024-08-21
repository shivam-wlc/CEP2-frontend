import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  MobileStepper,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { useSelector } from "react-redux";
import { selectOnet } from "../../redux/slices/onetSlice";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/assest.js";

const styles = {
  loader: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "conic-gradient(#0000 10%, #766DF4)",
    WebkitMask:
      "radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)",
    animation: "rotateAnimation 1s infinite linear",
    "@keyframes rotateAnimation": {
      to: {
        transform: "rotate(1turn)",
      },
    },
  },
};

function Questions() {
  const navigate = useNavigate();
  const onet = useSelector(selectOnet);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState(
    new Array(onet?.questions?.length).fill("")
  );
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = onet?.questions?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRadioChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[activeStep] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const getAnswerForQuestion = (index) => {
    return answers[index];
  };
  const handleSubmit = async () => {
    setLoading(true);
    navigate(`/interest-profiler/result?answers=${answers.join("")}`);
    // setLoading(false);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",

          width: "100%",
          marginTop: "2rem",
        }}
      >
        <Toolbar>
          <img src={Logo} alt="Career Explorer" width={200} />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: "50%",
          height: "70%",
          // borderRadius: "20px",
          background: "rgba(255,255,255,0.25)",
          // -webkit-backdrop-filter: blur(16px);
          // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          backdropFilter: "blur(16px)",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "gray",
        }}
      >
        <span style={{ fontSize: "20px" }}>
          {onet.questions.length && onet.questions[activeStep].index}/{maxSteps}
        </span>
        <Box sx={{ padding: "0.5rem" }}>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={activeStep}
            sx={{
              backgroundColor: "transparent",
              "& .MuiMobileStepper-dot": {
                backgroundColor: "white", // Default dot color
                margin: "0 4px", // Adds gap between dots
              },
              "& .MuiMobileStepper-dotActive": {
                backgroundColor: "orange", // Active dot color
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginBottom: "10px", marginTop: "-5px" }}>
            Please select the most appropriate answer
          </Typography>
          <Typography
            sx={{
              fontSize: "23px",
              fontWeight: "600",
              // color: "#70798C",
              color: "white",
              marginTop: "1rem",
            }}
          >
            Q{onet.questions.length && onet.questions[activeStep].index}.{" "}
            {onet.questions.length && onet.questions[activeStep].text}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "90%",
            width: "100%",
          }}
        >
          {/* <Button
            sx={{
              color: "#fff",
              // backgroundColor: "#A99985",
              backgroundColor: "#333333",
              "&:hover": { backgroundColor: "#DAD2BC" },
            }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <ArrowBackIosOutlined sx={{ color: "white" }} />
          </Button> */}
          <Box
            sx={{
              width: "70%",
              // height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // border:"1px solid red",
              // padding:"1rem",
              marginTop: "1rem",
              paddingLeft: "3rem",
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={getAnswerForQuestion(activeStep)}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "orange",
                        },
                      }}
                    />
                  }
                  label="Not interested"
                />
                <FormControlLabel
                  value="2"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "orange",
                        },
                      }}
                    />
                  }
                  label="May consider"
                />
                <FormControlLabel
                  value="3"
                  control={
                    <Radio
                      // size="large"
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "orange",
                        },
                      }}
                    />
                  }
                  label="Okay"
                />
                <FormControlLabel
                  value="4"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "orange",
                        },
                      }}
                    />
                  }
                  label="Worth trying out"
                />
                <FormControlLabel
                  value="5"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        // color: "orange",
                        "&.Mui-checked": {
                          color: "orange",
                        },
                      }}
                    />
                  }
                  label="Highly interested"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            // border: "1px solid white",
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button
            sx={{
              color: "white",
              // backgroundColor: "#A99985",
              height: "40px",
              width: "100px",
              borderRadius: 0,
              textAlign: "center",
              paddingLeft: "5px",
              paddingRight: "5px",
              fontWeight: "bold",
              backgroundColor: "orange",
              "&:hover": { backgroundColor: "#DAD2BC" },
            }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {/* <ArrowBackIosOutlined sx={{ color: "white" }} /> */}
            <WestIcon sx={{ marginRight: "5px" }} />
            PREV
          </Button>

          {!(activeStep === maxSteps - 1) && (
            <Button
              sx={{
                color: "white",
                // backgroundColor: "#A99985",
                height: "40px",
                width: "100px",
                borderRadius: 0,
                textAlign: "center",
                paddingLeft: "5px",
                paddingRight: "5px",
                fontWeight: "bold",
                backgroundColor: "#26cc00",
                "&:hover": { backgroundColor: "#DAD2BC" },
              }}
              onClick={handleNext}
              disabled={!getAnswerForQuestion(activeStep)}
            >
              NEXT
              <EastIcon sx={{ marginLeft: "5px" }} />
            </Button>
          )}
        </Box>
        {activeStep === maxSteps - 1 &&
          getAnswerForQuestion(activeStep) &&
          (loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "black",
                color: "white",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.5rem",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              Submit
            </Button>
          ))}
      </Box>
    </>
  );
}

export default Questions;
