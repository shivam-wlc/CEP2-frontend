import React, { useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";

import { mayConsider, NotInterested, okay, veryInterested, worthTrying } from "../../assets/assest.js";
import styles from "./QuestionCard.module.css";
import globalStyle from "./Questions.module.css";

const InterestQuestionCard = ({
  questionNumber,
  questionStatment,
  totalQuestions,
  onNext,
  onPrevious,
  isLastQuestion,
  isFirstQuestion,
  overallAnswers,
  setOverallAnswers,
  handleSubmitButton,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [circleValues, setCircleValues] = useState([]);

  const handleNext = () => {
    const updatedOverallAnswer = overallAnswers.map((value, index) => {
      if (index === questionNumber - 1) {
        return selectedValue; // Set the selected value
      } else return value;
    });

    setOverallAnswers(updatedOverallAnswer);
    setSelectedValue(null);

    if (isLastQuestion) {
      handleSubmitButton(); // Call submit if it's the last question
    } else {
      onNext(); // Go to the next question
    }
  };

  const handlePrevious = () => {
    onPrevious();
  };

  useEffect(() => {
    if (questionNumber <= 12) {
      setCircleValues(() => {
        const values = [];
        for (let i = 1; i <= 13; i++) {
          values.push(i);
        }
        values.push("...", 30);
        return values;
      });
    } else if (questionNumber <= 24) {
      setCircleValues(() => {
        const values = [];
        for (let i = 13; i <= 24; i++) {
          values.push(i);
        }
        values.push("...", 30);
        return values;
      });
    } else {
      setCircleValues(() => {
        const values = new Array("...");
        for (let i = 17; i <= 30; i++) {
          values.push(i);
        }
        return values;
      });
    }
  }, [questionNumber]);

  useEffect(() => {
    const currentSelectedOption = overallAnswers[questionNumber - 1];
    if (currentSelectedOption != "?") {
      setSelectedValue(currentSelectedOption);
    }
  }, [questionNumber]);

  return (
    <>
      <div className={globalStyle["questions-container"]}>
        <div className={styles["top-subCard"]}>
          <div className={styles.title}>Part A</div>
          <div className={styles.subtitle}>Please select one response to show your level of interest</div>
          <div className={styles.questionBox}>
            <p className={styles.questionText}>
              {`Q${questionNumber}. `}
              {questionStatment}
            </p>
          </div>
          <ul className={styles.status}>
            {circleValues.map((value, index) => (
              <li
                key={index}
                className={`${styles.circle} ${questionNumber >= value ? styles.circleActive : styles.circleInactive}`}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.optionContainer}>
          <div
            className={`${styles.option} ${selectedValue === "1" ? styles.optionActive : styles.optionInactive}`}
            onClick={() => setSelectedValue("1")}
          >
            <img src={NotInterested} className="w-[48px] h-[48px]" alt="Not Interested" />
            <p
              className={`${styles.optionText} ${selectedValue === "1" ? styles.optionActive : styles.optionInactive}`}
            >
              Not Interested
            </p>
          </div>
          <div
            className={`${styles.option} ${selectedValue === "2" ? styles.optionActive : styles.optionInactive}`}
            onClick={() => setSelectedValue("2")}
          >
            <img src={mayConsider} className="w-[48px] h-[48px]" alt="May Consider" />
            <p
              className={`${styles.optionText} ${selectedValue === "2" ? styles.optionActive : styles.optionInactive}`}
            >
              May Consider
            </p>
          </div>
          <div
            className={`${styles.option} ${selectedValue === "3" ? styles.optionActive : styles.optionInactive}`}
            onClick={() => setSelectedValue("3")}
          >
            <img src={okay} className="w-[48px] h-[48px]" alt="Okay" />
            <p
              className={`${styles.optionText} ${selectedValue === "3" ? styles.optionActive : styles.optionInactive}`}
            >
              Okay
            </p>
          </div>
          <div
            className={`${styles.option} ${selectedValue === "4" ? styles.optionActive : styles.optionInactive}`}
            onClick={() => setSelectedValue("4")}
          >
            <img src={worthTrying} className="w-[48px] h-[48px]" alt="Worth Trying Out" />
            <p
              className={`${styles.optionText} ${selectedValue === "4" ? styles.optionActive : styles.optionInactive}`}
            >
              Worth Trying Out
            </p>
          </div>
          <div
            className={`${styles.option} ${selectedValue === "5" ? styles.optionActive : styles.optionInactive}`}
            onClick={() => setSelectedValue("5")}
          >
            <img src={veryInterested} className="w-[48px] h-[48px]" alt="Very Interested" />
            <p
              className={`${styles.optionText} ${selectedValue === "5" ? styles.optionActive : styles.optionInactive}`}
            >
              Very Interested
            </p>
          </div>
        </div>
      </div>
      <div className={globalStyle["navButtonContainer"]}>
        <button className={globalStyle["navButton"]} onClick={handlePrevious} disabled={isFirstQuestion}>
          <span>
            <IoMdArrowRoundBack />
          </span>
          Previous
        </button>
        <button className={globalStyle["navButton"]} onClick={handleNext} disabled={!selectedValue}>
          {isLastQuestion ? "Save and move on to Part B" : "Next"}
          <span>
            <GrLinkNext />
          </span>
        </button>
      </div>
    </>
  );
};

export default InterestQuestionCard;
