import React from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";

const PrivacyAndPolicy = () => {
  return (
    <div>
      <Headers />
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: "200px",
          backgroundColor: "#f4f4f4",
        }}
      >
        <h1>Terms and Conditions</h1>

        <h2>1. Introduction</h2>
        <p>
          Welcome to [Your Website/App Name]. These terms and conditions outline
          the rules and regulations for the use of our website or application.
          By accessing this website or using our app, we assume you accept these
          terms and conditions in full. Do not continue to use our services if
          you do not agree to all the terms and conditions stated on this page.
        </p>

        <h2>2. Intellectual Property Rights</h2>
        <p>
          Unless otherwise stated, [Your Website/App Name] and/or its licensors
          own the intellectual property rights for all material on the
          website/app. All intellectual property rights are reserved. You may
          view and/or print pages from our platform for your own personal use,
          subject to restrictions set in these terms and conditions.
        </p>

        <h2>3. User Obligations</h2>
        <p>
          As a user of this website/app, you agree to the following obligations:
          <ul>
            <li>Provide accurate and up-to-date information about yourself.</li>
            <li>
              Do not engage in any activity that could harm or disrupt the
              service.
            </li>
            <li>Do not use our content or services for illegal purposes.</li>
          </ul>
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          [Your Website/App Name] will not be held responsible for any damages
          that may arise from the use or inability to use the website/app, even
          if we have been advised of the possibility of such damages.
        </p>

        <h2>5. Amendments</h2>
        <p>
          We may revise these terms and conditions from time to time, and any
          changes will be posted on this page. By continuing to use our
          services, you agree to the updated terms and conditions.
        </p>

        <h2>6. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of [Your Country] and you irrevocably submit to the
          exclusive jurisdiction of the courts in that location.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at
          [Your Contact Information].
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyAndPolicy;
