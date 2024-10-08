import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { interestHero, interestLogo } from "../../assets/assest.js";
import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import { getQuestions, getResultAndJob, selectOnet } from "../../redux/slices/onetSlice.js";
import globalStyle from "./Common.module.css";
import InterestQuestionCard from "./InterestQuestionCard.jsx";

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

  const handleChooseOption = async () => {
    await dispatchToRedux(getQuestions({ resource: "questions_30", start: 1, end: 60, token }));
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
    await dispatchToRedux(getResultAndJob({ answers: overallAnswers.join(""), token, userId }));
    navigate("/disc");
  };

  return (
    <div className={globalStyle["container"]}>
      <div className={globalStyle["left"]}>
        <img src={interestHero} alt="heroImage" />
      </div>
      <div className={globalStyle["right"]}>
        <img src={interestLogo} alt="logo" width={250} />
        {onet?.questions?.length > 0 && (
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
          />
        )}
      </div>
    </div>
  );
}
