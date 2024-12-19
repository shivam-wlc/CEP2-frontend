import React from "react";

import Footer from "../components/Footer";
import Headers from "../components/Headers";

const TermsAndConditons = () => {
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
        {/* <h1>Terms and Conditions</h1>

        <h2>1. Introduction</h2>
        <p>
          Welcome to [Your Website/App Name]. These terms and conditions outline the rules and regulations for
          the use of our website or application. By accessing this website or using our app, we assume you
          accept these terms and conditions in full. Do not continue to use our services if you do not agree
          to all the terms and conditions stated on this page.
        </p>

        <h2>2. Intellectual Property Rights</h2>
        <p>
          Unless otherwise stated, [Your Website/App Name] and/or its licensors own the intellectual property
          rights for all material on the website/app. All intellectual property rights are reserved. You may
          view and/or print pages from our platform for your own personal use, subject to restrictions set in
          these terms and conditions.
        </p>

        <h2>3. User Obligations</h2>
        <p>
          As a user of this website/app, you agree to the following obligations:
          <ul>
            <li>Provide accurate and up-to-date information about yourself.</li>
            <li>Do not engage in any activity that could harm or disrupt the service.</li>
            <li>Do not use our content or services for illegal purposes.</li>
          </ul>
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          [Your Website/App Name] will not be held responsible for any damages that may arise from the use or
          inability to use the website/app, even if we have been advised of the possibility of such damages.
        </p>

        <h2>5. Amendments</h2>
        <p>
          We may revise these terms and conditions from time to time, and any changes will be posted on this
          page. By continuing to use our services, you agree to the updated terms and conditions.
        </p>

        <h2>6. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of [Your
          Country] and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>

        <h2>7. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at [Your Contact Information].</p> */}

        <h1>Terms of Use</h1>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using CareerExplorer.me (the "Website" and "Platform"), you agree to comply with
          and be bound by these Terms of Use. If you do not agree with these terms, please do not use our
          services.
        </p>

        <h2>2. Services Description</h2>
        <p>CareerExplorer.me provides a platform for:</p>
        <ul style={{ marginLeft: 20 }}>
          <li>
            <strong>Students:</strong> Access to career exploration tools, video content, and paid
            assessments.
          </li>
          <li>
            <strong>Independent Career Counselors:</strong> Ability to create profiles and upload career
            guidance content.
          </li>
          <li>
            <strong>Educational Institutions and Organizations:</strong> Options to promote the platform and
            purchase bulk access to assessments.
          </li>
        </ul>

        <h2>3. User Responsibilities</h2>
        <ul style={{ marginLeft: 20 }}>
          <li>
            <strong>Account Registration:</strong> You must provide accurate and complete information during
            registration and keep your account details confidential.
          </li>
          <li>
            <strong>Prohibited Conduct:</strong> You agree not to use the Platform for unlawful purposes or
            upload content that promotes educational or marketing consultancies. Violation may result in
            account termination.
          </li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <ul style={{ marginLeft: 20 }}>
          <li>
            <strong>User Content:</strong> By uploading content, you grant Liberty Insights FZC a perpetual,
            royalty-free right to use, modify, and distribute your content.
          </li>
          <li>
            <strong>Platform Content:</strong> All materials on the Platform are owned by or licensed to
            Liberty Insights FZC and are protected by intellectual property laws.
          </li>
        </ul>

        <h2>5. Payments and Refunds</h2>
        <ul style={{ marginLeft: 20 }}>
          <li>
            <strong>Assessments:</strong> Paid career assessments are available for purchase.
          </li>
          <li>
            <strong>Refund Policy:</strong> No refunds are provided except in cases of technical failure
            rendering services unavailable.
          </li>
        </ul>

        <h2>6. Data Sharing</h2>
        <p>We may share data collected on the Platform with partners on commercial terms.</p>

        <h2>7. Dispute Resolution</h2>
        <ul style={{ marginLeft: 20 }}>
          <li>
            <strong>Alternative Dispute Resolution (ADR):</strong> Parties agree to attempt ADR before
            pursuing legal action.
          </li>
          <li>
            <strong>Governing Law:</strong> These terms are governed by the laws of the UAE, and disputes
            shall be resolved in UAE courts.
          </li>
        </ul>

        <h2>8. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. Changes will be effective upon
          posting on the Website.
        </p>

        <h2>9. Contact Information</h2>
        <p>For any questions regarding these Terms of Use, please contact us at:</p>
        <address>
          Liberty Insights FZC <br />
          [Address]
          <br />
          [Email Address]
          <br />
          [Phone Number]
        </address>

        <p>
          By using CareerExplorer.me, you acknowledge that you have read, understood, and agree to be bound by
          this Privacy Policy and Terms of Use.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditons;
