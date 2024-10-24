import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { interestLogo, surevyHero } from "../assets/assest.js";
import SurveyQuestionCards from "../components/SurveyQuestionCards.jsx";
import { selectToken, selectUserId } from "../redux/slices/authSlice.js";
import {
  getCareerClusterOptions,
  getSurveyQuestions,
  saveSurveyData,
  selectClusterData,
  selectSurveyQuestions,
} from "../redux/slices/surveySlice.js";
import globalStyle from "../styles/Questions.module.css";

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
      question: "What are the top 3 things that you care about most when considering your future education?",
      key: "top3thingsForFuture",
      isMutiple: true,
      options: [
        { value: "Affordability", label: "Affordability" },
        {
          value: "Academic ranking and reputation",
          label: "Academic ranking and reputation",
        },
        {
          value: "Academic environment (small class sizes, student/faculty ratio)",
          label: "Academic environment (small class sizes, student/faculty ratio)",
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
        { value: "Afghanistan", label: "Afghanistan" },
        { value: "Albania", label: "Albania" },
        { value: "Andorra", label: "Andorra" },
        { value: "Angola", label: "Angola" },
        { value: "Anguilla", label: "Anguilla" },
        { value: "Antarctica", label: "Antarctica" },
        { value: "Antigua & Barbuda", label: "Antigua & Barbuda" },
        { value: "Argentina", label: "Argentina" },
        { value: "Armenia", label: "Armenia" },
        { value: "Aruba", label: "Aruba" },
        { value: "Australia", label: "Australia" },
        { value: "Austria", label: "Austria" },
        { value: "Azerbaijan", label: "Azerbaijan" },
        { value: "Bahamas", label: "Bahamas" },
        { value: "Bahrain", label: "Bahrain" },
        { value: "Bangladesh", label: "Bangladesh" },
        { value: "Barbados", label: "Barbados" },
        { value: "Belarus", label: "Belarus" },
        { value: "Belgium", label: "Belgium" },
        { value: "Belize", label: "Belize" },
        { value: "Benin", label: "Benin" },
        { value: "Bermuda", label: "Bermuda" },
        { value: "Bhutan", label: "Bhutan" },
        { value: "Bolivia", label: "Bolivia" },
        { value: "Bosnia & Herzegovina", label: "Bosnia & Herzegovina" },
        { value: "Botswana", label: "Botswana" },
        { value: "Brazil", label: "Brazil" },
        { value: "Brunei", label: "Brunei" },
        { value: "Bulgaria", label: "Bulgaria" },
        { value: "Burkina Faso", label: "Burkina Faso" },
        { value: "Burundi", label: "Burundi" },
        { value: "Cabo Verde", label: "Cabo Verde" },
        { value: "Cambodia", label: "Cambodia" },
        { value: "Cameroon", label: "Cameroon" },
        { value: "Canada", label: "Canada" },
        { value: "Cayman Islands", label: "Cayman Islands" },
        {
          value: "Central African Republic",
          label: "Central African Republic",
        },
        { value: "Chad", label: "Chad" },
        { value: "Chile", label: "Chile" },
        { value: "China", label: "China" },
        { value: "Colombia", label: "Colombia" },
        { value: "Comoros", label: "Comoros" },
        { value: "Congo - Brazzaville", label: "Congo - Brazzaville" },
        { value: "Congo - Kinshasa", label: "Congo - Kinshasa" },
        { value: "Cook Islands", label: "Cook Islands" },
        { value: "Costa Rica", label: "Costa Rica" },
        { value: "Croatia", label: "Croatia" },
        { value: "Cuba", label: "Cuba" },
        { value: "Curaçao", label: "Curaçao" },
        { value: "Cyprus", label: "Cyprus" },
        { value: "Czechia", label: "Czechia" },
        { value: "Côte d’Ivoire", label: "Côte d’Ivoire" },
        { value: "Denmark", label: "Denmark" },
        { value: "Djibouti", label: "Djibouti" },
        { value: "Dominica", label: "Dominica" },
        { value: "Dominican Republic", label: "Dominican Republic" },
        { value: "Ecuador", label: "Ecuador" },
        { value: "Egypt", label: "Egypt" },
        { value: "El Salvador", label: "El Salvador" },
        { value: "Equatorial Guinea", label: "Equatorial Guinea" },
        { value: "Eritrea", label: "Eritrea" },
        { value: "Estonia", label: "Estonia" },
        { value: "Eswatini", label: "Eswatini" },
        { value: "Ethiopia", label: "Ethiopia" },
        { value: "Falkland Islands", label: "Falkland Islands" },
        { value: "Faroe Islands", label: "Faroe Islands" },
        { value: "Fiji", label: "Fiji" },
        { value: "Finland", label: "Finland" },
        { value: "France", label: "France" },
        { value: "French Guiana", label: "French Guiana" },
        { value: "French Polynesia", label: "French Polynesia" },
        { value: "Gabon", label: "Gabon" },
        { value: "Gambia", label: "Gambia" },
        { value: "Georgia", label: "Georgia" },
        { value: "Germany", label: "Germany" },
        { value: "Ghana", label: "Ghana" },
        { value: "Gibraltar", label: "Gibraltar" },
        { value: "Greece", label: "Greece" },
        { value: "Greenland", label: "Greenland" },
        { value: "Grenada", label: "Grenada" },
        { value: "Guadeloupe", label: "Guadeloupe" },
        { value: "Guam", label: "Guam" },
        { value: "Guatemala", label: "Guatemala" },
        { value: "Guernsey", label: "Guernsey" },
        { value: "Guinea", label: "Guinea" },
        { value: "Guinea-Bissau", label: "Guinea-Bissau" },
        { value: "Guyana", label: "Guyana" },
        { value: "Haiti", label: "Haiti" },
        { value: "Honduras", label: "Honduras" },
        { value: "Hong Kong SAR China", label: "Hong Kong SAR China" },
        { value: "Hungary", label: "Hungary" },
        { value: "Iceland", label: "Iceland" },
        { value: "India", label: "India" },
        { value: "Indonesia", label: "Indonesia" },
        { value: "Iran", label: "Iran" },
        { value: "Iraq", label: "Iraq" },
        { value: "Ireland", label: "Ireland" },
        { value: "Isle of Man", label: "Isle of Man" },
        { value: "Israel", label: "Israel" },
        { value: "Italy", label: "Italy" },
        { value: "Jamaica", label: "Jamaica" },
        { value: "Japan", label: "Japan" },
        { value: "Jersey", label: "Jersey" },
        { value: "Jordan", label: "Jordan" },
        { value: "Kazakhstan", label: "Kazakhstan" },
        { value: "Kenya", label: "Kenya" },
        { value: "Kiribati", label: "Kiribati" },
        { value: "Kosovo", label: "Kosovo" },
        { value: "Kuwait", label: "Kuwait" },
        { value: "Kyrgyzstan", label: "Kyrgyzstan" },
        { value: "Laos", label: "Laos" },
        { value: "Latvia", label: "Latvia" },
        { value: "Lebanon", label: "Lebanon" },
        { value: "Lesotho", label: "Lesotho" },
        { value: "Liberia", label: "Liberia" },
        { value: "Libya", label: "Libya" },
        { value: "Liechtenstein", label: "Liechtenstein" },
        { value: "Lithuania", label: "Lithuania" },
        { value: "Luxembourg", label: "Luxembourg" },
        { value: "Macao SAR China", label: "Macao SAR China" },
        { value: "Madagascar", label: "Madagascar" },
        { value: "Malawi", label: "Malawi" },
        { value: "Malaysia", label: "Malaysia" },
        { value: "Maldives", label: "Maldives" },
        { value: "Mali", label: "Mali" },
        { value: "Malta", label: "Malta" },
        { value: "Marshall Islands", label: "Marshall Islands" },
        { value: "Martinique", label: "Martinique" },
        { value: "Mauritania", label: "Mauritania" },
        { value: "Mauritius", label: "Mauritius" },
        { value: "Mayotte", label: "Mayotte" },
        { value: "Mexico", label: "Mexico" },
        { value: "Micronesia", label: "Micronesia" },
        { value: "Moldova", label: "Moldova" },
        { value: "Monaco", label: "Monaco" },
        { value: "Mongolia", label: "Mongolia" },
        { value: "Montenegro", label: "Montenegro" },
        { value: "Montserrat", label: "Montserrat" },
        { value: "Morocco", label: "Morocco" },
        { value: "Mozambique", label: "Mozambique" },
        { value: "Myanmar (Burma)", label: "Myanmar (Burma)" },
        { value: "Namibia", label: "Namibia" },
        { value: "Nauru", label: "Nauru" },
        { value: "Nepal", label: "Nepal" },
        { value: "Netherlands", label: "Netherlands" },
        { value: "New Caledonia", label: "New Caledonia" },
        { value: "New Zealand", label: "New Zealand" },
        { value: "Nicaragua", label: "Nicaragua" },
        { value: "Niger", label: "Niger" },
        { value: "Nigeria", label: "Nigeria" },
        { value: "Niue", label: "Niue" },
        { value: "Norfolk Island", label: "Norfolk Island" },
        { value: "North Korea", label: "North Korea" },
        {
          value: "Northern Mariana Islands",
          label: "Northern Mariana Islands",
        },
        { value: "Norway", label: "Norway" },
        { value: "Oman", label: "Oman" },
        { value: "Pakistan", label: "Pakistan" },
        { value: "Palau", label: "Palau" },
        {
          value: "Palestinian Territories",
          label: "Palestinian Territories",
        },
        { value: "Panama", label: "Panama" },
        { value: "Papua New Guinea", label: "Papua New Guinea" },
        { value: "Paraguay", label: "Paraguay" },
        { value: "Peru", label: "Peru" },
        { value: "Philippines", label: "Philippines" },
        { value: "Pitcairn Islands", label: "Pitcairn Islands" },
        { value: "Poland", label: "Poland" },
        { value: "Portugal", label: "Portugal" },
        { value: "Puerto Rico", label: "Puerto Rico" },
        { value: "Qatar", label: "Qatar" },
        { value: "Réunion", label: "Réunion" },
        { value: "Romania", label: "Romania" },
        { value: "Russia", label: "Russia" },
        { value: "Rwanda", label: "Rwanda" },
        { value: "Saint Helena", label: "Saint Helena" },
        { value: "Saint Kitts & Nevis", label: "Saint Kitts & Nevis" },
        { value: "Saint Lucia", label: "Saint Lucia" },
        {
          value: "Saint Pierre & Miquelon",
          label: "Saint Pierre & Miquelon",
        },
        { value: "Samoa", label: "Samoa" },
        { value: "San Marino", label: "San Marino" },
        { value: "Sao Tome & Principe", label: "Sao Tome & Principe" },
        { value: "Saudi Arabia", label: "Saudi Arabia" },
        { value: "Senegal", label: "Senegal" },
        { value: "Serbia", label: "Serbia" },
        { value: "Seychelles", label: "Seychelles" },
        { value: "Sierra Leone", label: "Sierra Leone" },
        { value: "Singapore", label: "Singapore" },
        { value: "Sint Maarten", label: "Sint Maarten" },
        { value: "Slovakia", label: "Slovakia" },
        { value: "Slovenia", label: "Slovenia" },
        { value: "Solomon Islands", label: "Solomon Islands" },
        { value: "Somalia", label: "Somalia" },
        { value: "South Africa", label: "South Africa" },
        { value: "South Korea", label: "South Korea" },
        { value: "South Sudan", label: "South Sudan" },
        { value: "Spain", label: "Spain" },
        { value: "Sri Lanka", label: "Sri Lanka" },
        { value: "Sudan", label: "Sudan" },
        { value: "Suriname", label: "Suriname" },
        { value: "Sweden", label: "Sweden" },
        { value: "Switzerland", label: "Switzerland" },
        { value: "Syria", label: "Syria" },
        { value: "Taiwan", label: "Taiwan" },
        { value: "Tajikistan", label: "Tajikistan" },
        { value: "Tanzania", label: "Tanzania" },
        { value: "Thailand", label: "Thailand" },
        { value: "Timor-Leste", label: "Timor-Leste" },
        { value: "Togo", label: "Togo" },
        { value: "Tokelau", label: "Tokelau" },
        { value: "Tonga", label: "Tonga" },
        { value: "Trinidad & Tobago", label: "Trinidad & Tobago" },
        { value: "Tunisia", label: "Tunisia" },
        { value: "Turkey", label: "Turkey" },
        { value: "Turkmenistan", label: "Turkmenistan" },
        { value: "Turks & Caicos Islands", label: "Turks & Caicos Islands" },
        { value: "Tuvalu", label: "Tuvalu" },
        { value: "Uganda", label: "Uganda" },
        { value: "Ukraine", label: "Ukraine" },
        { value: "United Arab Emirates", label: "United Arab Emirates" },
        { value: "United Kingdom", label: "United Kingdom" },
        { value: "United States", label: "United States" },
        { value: "Uruguay", label: "Uruguay" },
        { value: "Uzbekistan", label: "Uzbekistan" },
        { value: "Vanuatu", label: "Vanuatu" },
        { value: "Vatican City", label: "Vatican City" },
        { value: "Venezuela", label: "Venezuela" },
        { value: "Vietnam", label: "Vietnam" },
        { value: "Wallis & Futuna", label: "Wallis & Futuna" },
      ],
    },
    {
      question: "At this point in your career journey, which Career Cluster most appeal to you?",
      key: "mostAppealingField",
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
          value: "Arts, Audio/Video Technology & Communications",

          label: "Arts, Audio/Video Technology & Communications",
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
          value: "Human Services",
          label: "Human Services",
        },
        { value: "Information Technology", label: "Information Technology" },
        {
          value: "Law, Public Safety, Corrections & Security",
          label: "Law, Public Safety, Corrections & Security",
        },
        { value: "Manufacturing", label: "Manufacturing" },
        { value: "Marketing", label: "Marketing" },
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
          value: "Arts, Audio/Video Technology & Communications",

          label: "Arts, Audio/Video Technology & Communications",
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
          value: "Human Services",
          label: "Human Services",
        },
        { value: "Information Technology", label: "Information Technology" },
        {
          value: "Law, Public Safety, Corrections & Security",
          label: "Law, Public Safety, Corrections & Security",
        },
        { value: "Manufacturing", label: "Manufacturing" },
        { value: "Marketing", label: "Marketing" },
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

  // const handleSubmit = async (updatedOverallAnswer) => {

  //   const answers = {};
  //   updatedOverallAnswer.forEach((answer) => {
  //     console.log(answer);

  //     for (let key in answer) {
  //       answers[key] = answer[key];
  //     }
  //   });

  //   await dispatchToRedux(saveSurveyData({ token, formData: answers, userId }));

  //   navigate("/assessment-result");
  // };

  const handleSubmit = async (updatedOverallAnswer) => {
    try {
      // Create a new object to hold the answers
      const answers = updatedOverallAnswer.reduce((acc, answer) => {
        return { ...acc, ...answer };
      }, {});

      // Dispatch the answers to Redux
      await dispatchToRedux(saveSurveyData({ token, formData: answers, userId }));

      // Navigate to the assessment result page
      navigate("/assessment-result");
    } catch (error) {
      console.error("Error submitting the survey:", error);
      // Handle any errors if needed
    }
  };

  const handleNext = (updatedOverallAnswer) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      if (currentQuestionIndex + 1 === 7) {
        const optionSelected = updatedOverallAnswer[currentQuestionIndex].mostAppealingField;
        const lastQuestion = {
          question: "Select Career Pathways",
          key: "selectedPathways",
          isMutiple: true,
          options: optionSelected.map((option) => {
            console.log(clusterData.find((el) => el.CareerClusters === option));
            return {
              label: option,
              options:
                clusterData
                  .find((el) => el.CareerClusters === option)
                  ?.CareerPathways.map((pathway) => {
                    return {
                      value: pathway,
                      label: pathway,
                    };
                  }) || "Null",
            };
          }),
        };
        questions.pop();
        setQuestions([...questions, lastQuestion]);
      }
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
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
