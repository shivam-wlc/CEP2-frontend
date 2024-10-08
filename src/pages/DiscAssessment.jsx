import "../styles/Question.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { discHero, discLogo } from "../assets/assest.js";
import QuestionCard from "../components/disc/QuestionCard.jsx";
import { selectToken, selectUserId } from "../redux/slices/authSlice.js";
import { getDiscQuestions, selectQuestions } from "../redux/slices/discSlice.js";

const DiscAssessment = () => {
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const dispatchToRedux = useDispatch();
  const discQuestions = useSelector(selectQuestions);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [overallAnswers, setOverallAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const actionResult = await dispatchToRedux(getDiscQuestions({ userId, token })).unwrap();
        setQuestions(actionResult.questions || []);
      } catch (error) {
        console.error("Failed to fetch questions: ", error);
      }
    };

    fetchQuestions();
  }, [dispatchToRedux, userId, token]);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const actionResult = await dispatchToRedux(
  //         getDiscQuestions({ userId, token })
  //       ).unwrap();

  //       const questions = actionResult.questions || [];

  //       // Sort questions based on questionNumber
  //       const sortedQuestions = questions.sort((a, b) => {
  //         return parseInt(a.questionNumber) - parseInt(b.questionNumber);
  //       });

  //       // Set sorted questions to state
  //       setQuestions(sortedQuestions);
  //     } catch (error) {
  //       console.error("Failed to fetch questions: ", error);
  //     }
  //   };

  //   fetchQuestions();
  // }, [dispatchToRedux, userId, token]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div id="mainContainer">
      <div id="left">
        <img src={discHero} alt="heroImage" id="heroImage" />
      </div>
      <div id="right">
        <img src={discLogo} alt="logo" width={"200px"} />
        {questions.length > 0 && (
          <QuestionCard
            questionNumber={questions[currentQuestionIndex].questionNumber}
            questionStatements={questions[currentQuestionIndex].statements}
            totalQuestions={questions.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            isFirstQuestion={currentQuestionIndex === 0}
            overallAnswers={overallAnswers}
            setOverallAnswers={setOverallAnswers}
          />
        )}
      </div>
    </div>
  );
};

export default DiscAssessment;
