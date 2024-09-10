import React, { useEffect } from "react";
import SurveyForm1 from "../models/SurveyForm1.jsx";

const SurveyPage = () => {
  const [surveyModalOpen, setSurveyModalOpen] = React.useState(false);

  useEffect(() => {
    setSurveyModalOpen(true);
  }, []);

  const handleSurveyFormSubmit = () => {
    setSurveyModalOpen(false); // Close the survey modal after submission
    // navigate;
  };
  return (
    <div>
      {" "}
      <SurveyForm1
        open={surveyModalOpen}
        onClose={() => setSurveyModalOpen(false)}
        onSubmit={handleSurveyFormSubmit}
      />
    </div>
  );
};

export default SurveyPage;
