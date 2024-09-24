import React, { useState, useEffect } from "react";
import SurveyQuestionCards from "../components/SurveyQuestionCards.jsx";
import globalStyle from "../styles/Questions.module.css";
import { interestLogo, surevyHero } from "../assets/assest.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectToken } from "../redux/slices/authSlice.js";
import {
  getSurveyQuestions,
  saveSurveyData,
  selectSurveyQuestions,
  getCareerClusterOptions,
  selectClusterData,
} from "../redux/slices/surveySlice.js";

const SurveyPage = () => {
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const clusterData = useSelector(selectClusterData);
  const surveyQuestions = useSelector(selectSurveyQuestions);

  const [questions, setQuestions] = useState([
    {
      question: "What is your current level of education?",
      key: "educationLevel",
      isMutiple: false,
      options: [
        { value: "High School Grade 10", label: "High School Grade 10" },
        { value: "High School Grade 11", label: "High School Grade 11" },
        { value: "High School Grade 12", label: "High School Grade 12" },
        { value: "High School Grade 13", label: "High School Grade 13" },
        {
          value: "Further or Higher Education, Year 1",
          label: "Further or Higher Education, Year 1",
        },
        {
          value: "Further or Higher Education, Year 2",
          label: "Further or Higher Education, Year 2",
        },
        {
          value: "Further or Higher Education, Year 3",
          label: "Further or Higher Education, Year 3",
        },
        {
          value: "Further or Higher Education, Year 4",
          label: "Further or Higher Education, Year 4",
        },
        { value: "Post graduate Education", label: "Post graduate Education" },
        {
          value: "Recent graduate looking for Employment",
          label: "Recent graduate looking for Employment",
        },
      ],
    },
    {
      question:
        "What is the letter grade that best represents your current overall Grade Point Average (GPA)?",
      key: "gradePoints",
      isMutiple: false,
      options: [
        {
          value: "(A- to A) GPA of 3.5 or above",
          label: "(A- to A) GPA of 3.5 or above",
        },
        {
          value: "(B to B+) GPA of 3.0 to 3.4",
          label: "(B to B+) GPA of 3.0 to 3.4",
        },
        {
          value: "(B to B-) GPA of 2.5 to 2.9",
          label: "(B to B-) GPA of 2.5 to 2.9",
        },
        {
          value: "(C to B-) GPA of 2.0 to 2.4",
          label: "(C to B-) GPA of 2.0 to 2.4",
        },
        {
          value: "(C- to C) GPA of 1.5 to 1.9",
          label: "(C- to C) GPA of 1.5 to 1.9",
        },
        {
          value: "(D to C-) GPA of 1.0 to 1.4",
          label: "(D to C-) GPA of 1.0 to 1.4",
        },
        {
          value: "(D- to D) GPA of 09 and below",
          label: "(D- to D) GPA of 09 and below",
        },
      ],
    },
    {
      question: "Where do you consider your next career step to be?",
      key: "nextCareerStep",
      isMutiple: false,
      options: [
        {
          value: "Further Education or Technical College",
          label: "Further Education or Technical College",
        },
        { value: "University", label: "University" },
        { value: "Corporate job", label: "Corporate job" },
        {
          value: "Entrepreneurship or Self employment",
          label: "Entrepreneurship or Self employment",
        },
        {
          value: "Apprenticeship or Traineeship",
          label: "Apprenticeship or Traineeship",
        },
      ],
    },
    {
      question:
        "Do you have a preference for a geographic location where you would like to study and/or work?",
      key: "preferredLocation",
      isMutiple: true,
      options: [
        { value: "US", label: "US" },
        { value: "Canada", label: "Canada" },
        { value: "UK", label: "UK" },
        { value: "Europe", label: "Europe" },
        { value: "Australia", label: "Australia" },
        { value: "New Zealand", label: "New Zealand" },
        { value: "Indian subcontinent", label: "Indian subcontinent" },
        { value: "China", label: "China" },
        { value: "Middle East", label: "Middle East" },
        { value: "Far East", label: "Far East" },
        { value: "Africa", label: "Africa" },
        { value: "South America", label: "South America" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      question:
        "What are the top 3 things that you care about most when considering your future education?",
      key: "top3thingsForFuture",
      isMutiple: true,
      options: [
        { value: "Affordability", label: "Affordability" },
        {
          value: "Academic ranking and reputation",
          label: "Academic ranking and reputation",
        },
        {
          value:
            "Academic environment (small class sizes, student/faculty ratio)",
          label:
            "Academic environment (small class sizes, student/faculty ratio)",
        },
        {
          value: "Flexibility of delivery (online, classroom, hybrid learning)",
          label: "Flexibility of delivery (online, classroom, hybrid learning)",
        },
        { value: "Career preparation", label: "Career preparation" },
        { value: "Social environment", label: "Social environment" },
        { value: "Physical environment", label: "Physical environment" },
      ],
    },
    {
      question: "What is your current Nationality?",
      key: "nationality",
      isMutiple: false,
      options: [
        { value: "India", label: "India" },
        { value: "Pakistan", label: "Pakistan" },
        { value: "America", label: "America" },
        { value: "Sri Lanka", label: "Sri Lanka" },
      ],
    },
    {
      question:
        "At this point in your career journey, which Career Cluster most appeal to you?",
      key: "mostappealCarrer",
      isMutiple: false,
      options: [
        {
          value: "Agriculture, Food & Natural Resources",
          label: "Agriculture, Food & Natural Resources",
        },
        {
          value: "Architecture & Construction",
          label: "Architecture & Construction",
        },
        {
          value: "Arts, Media & Communication",
          label: "Arts, Media & Communication",
        },
        {
          value: "Business Management & Administration",
          label: "Business Management & Administration",
        },
        { value: "Education & Training", label: "Education & Training" },
        { value: "Finance", label: "Finance" },
        {
          value: "Government & Public Administration",
          label: "Government & Public Administration",
        },
        { value: "Health Sciences", label: "Health Sciences" },
        { value: "Hospitality & Tourism", label: "Hospitality & Tourism" },
        {
          value: "Community Care & Human Services",
          label: "Community Care & Human Services",
        },
        { value: "Information Technology", label: "Information Technology" },
        {
          value: "Law, Public Safety & Security",
          label: "Law, Public Safety & Security",
        },
        { value: "Manufacturing", label: "Manufacturing" },
        { value: "Sales & Marketing", label: "Sales & Marketing" },
        {
          value: "Science, Technology, Engineering & Mathematics",
          label: "Science, Technology, Engineering & Mathematics",
        },
        {
          value: "Transportation, Distribution & Logistics",
          label: "Transportation, Distribution & Logistics",
        },
      ],
    },
    {
      question: "Fake",
      key: "fake",
      isMutiple: true,
      options: [
        {
          value: "Agriculture, Food & Natural Resources",
          label: "Agriculture, Food & Natural Resources",
        },
        {
          value: "Architecture & Construction",
          label: "Architecture & Construction",
        },
        {
          value: "Arts, Media & Communication",
          label: "Arts, Media & Communication",
        },
        {
          value: "Business Management & Administration",
          label: "Business Management & Administration",
        },
        { value: "Education & Training", label: "Education & Training" },
        { value: "Finance", label: "Finance" },
        {
          value: "Government & Public Administration",
          label: "Government & Public Administration",
        },
        { value: "Health Sciences", label: "Health Sciences" },
        { value: "Hospitality & Tourism", label: "Hospitality & Tourism" },
        {
          value: "Community Care & Human Services",
          label: "Community Care & Human Services",
        },
        { value: "Information Technology", label: "Information Technology" },
        {
          value: "Law, Public Safety & Security",
          label: "Law, Public Safety & Security",
        },
        { value: "Manufacturing", label: "Manufacturing" },
        { value: "Sales & Marketing", label: "Sales & Marketing" },
        {
          value: "Science, Technology, Engineering & Mathematics",
          label: "Science, Technology, Engineering & Mathematics",
        },
        {
          value: "Transportation, Distribution & Logistics",
          label: "Transportation, Distribution & Logistics",
        },
      ],
    },
  ]);

  const [answerKey, setAnswerKeys] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [overallAnswers, setOverallAnswers] = useState([]);

  useEffect(() => {
    dispatchToRedux(getSurveyQuestions({ token }));
    dispatchToRedux(getCareerClusterOptions({ token }));
  }, []);

  console.log("surveyQuestions ui", surveyQuestions);
  // for most appeloing career and it's options choose this rest of 6 choose above
  console.log("clusterData ui", clusterData);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    console.log("Next");
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    console.log("Previous");
  };

  return (
    <div>
      <div className={globalStyle["container"]}>
        <div className={globalStyle["left"]}>
          <img src={surevyHero} alt="heroImage" />
        </div>
        <div className={globalStyle["right"]}>
          <img src={interestLogo} alt="logo" width={250} />
          {questions.length > 0 && (
            <SurveyQuestionCards
              questionNumber={currentQuestionIndex + 1}
              questionStatment={questions[currentQuestionIndex]["question"]}
              questionOptions={questions[currentQuestionIndex]["options"]}
              isMultiple={questions[currentQuestionIndex]["isMutiple"]}
              answerKey={questions[currentQuestionIndex]["key"]}
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
    </div>
  );
};

export default SurveyPage;
