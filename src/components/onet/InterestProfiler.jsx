import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { interestHero, interestLogo, background } from "../../assets/assest.js";
import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import { getQuestions, getResultAndJob, selectOnet } from "../../redux/slices/onetSlice.js";
import globalStyle from "./Common.module.css";
import InterestQuestionCard from "./InterestQuestionCard.jsx";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  containerStyle: {
    backgroundColor: "white",
    height: "101vh",
    width: "101vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(100px)",
    color: "#fff",
    marginLeft: "-10px",
  },
};

export default function InterestProfiler() {
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const onet = useSelector(selectOnet);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [overallAnswers, setOverallAnswers] = useState(new Array(30).fill("?"));
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleChooseOption = async () => {
    try {
      setLoading(true);
      await dispatchToRedux(getQuestions({ resource: "questions_30", start: 1, end: 60, token }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleChooseOption();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < onet?.questions?.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    if (currentQuestionIndex === onet?.questions?.length - 1) {
      handleSubmitButton();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitButton = async () => {
    const finalAnswer = overallAnswers[overallAnswers.length - 1];
    if (finalAnswer === "?") {
      console.log("Please select an answer for the last question.");
      return;
    }

    try {
      setIsButtonLoading(true);
      await dispatchToRedux(getResultAndJob({ answers: overallAnswers.join(""), token, userId }));
      navigate("/disc");
      setIsButtonLoading(false);
    } catch (error) {
      console.error("Error submitting answers:", error);
      setIsButtonLoading(false);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${background})`, zIndex: "-1" }}>
      <div className={globalStyle["container"]}>
        <div className={globalStyle["left"]}>
          <div
            style={{
              // border: "1px solid #cecece",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <img src={interestHero} alt="heroImage" height={"76.67px"} width={"248px"} />
          </div>
        </div>
        <div className={globalStyle["right"]}>
          <Link to="/">
            {" "}
            <img src={interestLogo} alt="logo" width={250} />
          </Link>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
              <CircularProgress color="inherit" />
            </div>
          ) : (
            onet?.questions?.length > 0 && (
              <InterestQuestionCard
                questionNumber={currentQuestionIndex + 1}
                questionStatment={onet?.questions[currentQuestionIndex]["text"]}
                totalQuestions={onet?.questions?.length}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isLastQuestion={currentQuestionIndex === onet?.questions?.length - 1}
                isFirstQuestion={currentQuestionIndex === 0}
                overallAnswers={overallAnswers}
                setOverallAnswers={setOverallAnswers}
                handleSubmitButton={handleSubmitButton}
                isButtonLoading={isButtonLoading}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
