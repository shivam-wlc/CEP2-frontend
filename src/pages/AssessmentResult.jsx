import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { assessmentResult, assessmentResultbottom } from "../assets/assest.js";
import Footer from "../components/Footer.jsx";
import Headers from "../components/Headers.jsx";
import { config } from "../config/config.js";
import { selectToken, selectUserId } from "../redux/slices/authSlice.js";
import { getInterests, selectInterests } from "../redux/slices/interestSlice.js";
import assessmentStyles from "../styles/AssessmentResult.module.css";
import commonStyles from "../styles/Common.module.css";

const AssessmentResult = () => {
  const dispatchToRedux = useDispatch();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  const interestsProfile = useSelector(selectInterests);
  const [activePathCard, setActivePathCard] = useState(1);

  useEffect(() => {
    dispatchToRedux(getInterests({ userId, token }));
  }, []);

  const handleButtonClick = async () => {
    const response = await fetch(`${config.api}/api/payment/createpayment/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        price: 500,
        productName: "Test product",
      }),
    });
    if (response.ok) {
      const redirectUrl = await response.json();
      console.log(redirectUrl);

      window.location.href = redirectUrl.url;
    }
  };

  console.log("interestsProfile", interestsProfile);

  const pathListItems = [
    { heading: "Graphic Designer", subheading: "Great to fit" },
    { heading: "Actor", subheading: "Best to fit" },
    { heading: "Interior designer", subheading: "Best to fit" },
  ];

  const graphicDesigner = [
    {
      statement: "Pay $49 now to review and download the Full Career Directions Report",
      button: "Pay Now",
      slug: "#",
    },
    {
      statement:
        "If your School has paid on your behalf, please input your School Access Code here to get your Career Directions Report  ",
      button: "School Code",
      slug: "#",
    },
    {
      statement:
        "If you want your School to pay on your behalf please provide School details here and our Schools team will contact your School",
      button: "Contact School",
      slug: "#",
    },
  ];
  const actor = [
    { statement: "da Full Career Directions Report", button: "Pay Now", slug: "#" },
    {
      statement: "sabehalf, please input your School Access Code here to get your Career Directions Report  ",
      button: "School Code",
      slug: "#",
    },
    {
      statement:
        "say on your behalf please provide School details here and our Schools team will contact your School",
      button: "Contact School",
      slug: "#",
    },
  ];
  const interierDesigner = [
    { statement: "dsas Report", button: "Pay Now", slug: "#" },
    {
      statement: "sabasss Code here to get your Career Directions Report  ",
      button: "School Code",
      slug: "#",
    },
    { statement: "saysa and our Schools team will contact your School", button: "Contact School", slug: "#" },
  ];

  return (
    <div>
      <Headers />
      <div className={assessmentStyles["container"]}>
        <section className={assessmentStyles["result"]}>
          <img src={assessmentResult} alt="ass. result" />
          <div>
            <h3>Assessment Results</h3>
            <p>
              Great, you’ve completed our Career Assessment. You will now have a shortlist of 20 suitable
              career pathways that are a best fit for you. This is your starting point to begin a more focused
              exploration journey to see which careers might be most interesting for you. 
            </p>
            <p>
              As a <b>‘thank you’</b> for spending the time to do the assessment, here are 3 of your Career
              Pathway options FREE to give you a taster of the directions you can consider. 
            </p>
          </div>
        </section>
        <section className={assessmentStyles["career-paths"]}>
          <div>
            <p>Based on your Assessment. </p>
            <p>
              <b>3 Career</b> Pathways to consider....
            </p>
          </div>

          <div className={assessmentStyles.cards}>
            <ul className={assessmentStyles["paths-list"]}>
              {/* {pathListItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActivePathCard(index + 1)}
                  className={activePathCard == index + 1 ? assessmentStyles["activePathCard"] : ""}
                >
                  <h6>{item.heading}</h6>
                  <p>{item.subheading}</p>
                </li>
              ))} */}
              {interestsProfile?.careers?.career.slice(0, 3).map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActivePathCard(index + 1)}
                  className={activePathCard == index + 1 ? assessmentStyles["activePathCard"] : ""}
                >
                  <h6>{item.title}</h6>
                  <p>{item.fit}</p>
                </li>
              ))}
            </ul>
            <div>
              {
                <ul className={assessmentStyles["pathItemCardsList"]}>
                  {graphicDesigner.map((item, index) => (
                    <li key={index} className={assessmentStyles["pathItemCard"]}>
                      <p>{item.statement}</p>
                      <button className={assessmentStyles["navButton"]} onClick={handleButtonClick}>
                        {item.button}
                      </button>
                    </li>
                  ))}
                </ul>
              }
              {/* {activePathCard == 2 && (
                <ul className={assessmentStyles["pathItemCardsList"]}>
                  {actor.map((item, index) => (
                    <li key={index} className={assessmentStyles["pathItemCard"]}>
                      <p>{item.statement}</p>
                      <button className={assessmentStyles["navButton"]} onClick={()=>navigate(item.slug)}>{item.button}</button>
                    </li>
                  ))}
                </ul>
              )}
              {activePathCard == 3 && (
                <ul className={assessmentStyles["pathItemCardsList"]}>
                  {interierDesigner.map((item, index) => (
                    <li key={index} className={assessmentStyles["pathItemCard"]}>
                      <p>{item.statement}</p>
                      <button className={assessmentStyles["navButton"]} onClick={()=>navigate(item.slug)}>{item.button}</button>
                    </li>
                  ))}
                </ul>
              )} */}
            </div>
          </div>
        </section>
        <section className={assessmentStyles["bottom"]}>
          <div>
            <p>
              There’s more. You get upto <b>3 attempts…</b>
            </p>
            <div>
              <p>
                As time goes by and you continue in your education and build new experiences and skills, your
                focus may change and you may want to look at alternative careers. This is very healthy and is
                a sign of maturity. You are now evaluating different options and engaging your mind towards
                new opportunities for you. You may now feel the need to re-assess yourself and check which
                career pathways now constitute your best-fit.
              </p>
              <p>
                Once you feel ready to take the assessment again, go to your personal workspace and hit the{" "}
                <b>RE-ASSESS</b> button to retake. 
              </p>
              <p>
                We advise you to spread your 3 attempts over one or two years to reflect the changes in your
                interests and attitudes 
              </p>
            </div>
          </div>
          <img src={assessmentResultbottom} alt="" />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AssessmentResult;
