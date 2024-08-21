import React, { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOnet,
  selectDetailedCareerData,
  generateDeatiledDataOfCareers,
} from "../../redux/slices/onetSlice.js";
import { selectUserId, selectToken } from "../../redux/slices/authSlice.js";
import {
  selectUserProfile,
  getUserProfile,
} from "../../redux/slices/profileSlice.js";

// images
import {
  Logo,
  InterestProfileHeroImage,
  pdfPhoto,
} from "../../assets/assest.js";

import styles from "./my-style.module.css";

const DetailedPdf = () => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const userData = useSelector(selectUserProfile);
  const onet = useSelector(selectOnet);
  const detailedCareerData = useSelector(selectDetailedCareerData);

  const contentRef = useRef(null);

  useEffect(() => {
    dispatchToRedux(getUserProfile({ userId, token }));
    dispatchToRedux(generateDeatiledDataOfCareers({ userId, token }));
  }, []);

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    let yOffset = 0;

    const contentElements = contentRef.current.children;
    for (let i = 0; i < contentElements.length; i++) {
      const element = contentElements[i];
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // If the element height exceeds the page height, split it
      if (imgHeight > pdfHeight) {
        const pageHeight = pdfHeight - yOffset;
        const numPages = Math.ceil(imgHeight / pageHeight);

        for (let j = 0; j < numPages; j++) {
          const cropCanvas = document.createElement("canvas");
          cropCanvas.width = canvas.width;
          cropCanvas.height = canvas.height / numPages;
          const cropCtx = cropCanvas.getContext("2d");
          cropCtx.drawImage(
            canvas,
            0,
            -j * cropCanvas.height,
            canvas.width,
            canvas.height
          );
          const cropImgData = cropCanvas.toDataURL("image/png");

          if (yOffset + cropCanvas.height > pdfHeight) {
            pdf.addPage();
            yOffset = 0;
          }

          pdf.addImage(
            cropImgData,
            "PNG",
            0,
            yOffset,
            imgWidth,
            (cropCanvas.height * pdfWidth) / canvas.width
          );
          yOffset += (cropCanvas.height * pdfWidth) / canvas.width;
        }
      } else {
        if (yOffset + imgHeight > pdfHeight) {
          pdf.addPage();
          yOffset = 0;
        }

        pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight;
      }
    }

    pdf.save("download.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
      <div id="pdf-content" ref={contentRef} className={styles.pdfContent}>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo" width={50} />
        </div>
        <div className={styles.frontPage}>
          <div className={styles.frontPageImage}>
            <img src={pdfPhoto} alt="InterestProfileHeroImage" />
          </div>
          <div className={styles.frontPageContent}>
            <h3>Confidential</h3>
            <h1>Career Direction Report</h1>
            <h4>{userData?.name}</h4>
            <h6>Generated on {new Date().toLocaleDateString()}</h6>
          </div>
        </div>

        <div className={styles.secondPage}>
          <p className={styles.heading}>Career Direction Report</p>
          <p className={styles.subheading}>About This Report</p>
          <p className={styles.paragraph}>
            The Career Directions Report is derived from well tested and proven
            methodologies that analyze an individuals’ interests using six
            domains – Realistic, Conventional, Enterprising, Social, Artistic
            and Investigative. We call these Interest Spheres and a short
            explanation of each one is shown later. <br /> <br />
            We all have unique personalities and interests that come together to
            define who we are. The weight of influence of each of these Interest
            Spheres is different for each one of us and how they combine gives
            us insights on the career choices we can make. <br />
            <br /> Our predictive algorithms use the responses that you have
            given to present to you different job profiles that you should
            investigate further and consider for your future. Remember your
            future is in your hands to craft as you choose. Initial choices will
            no doubt be refined as you explore the opportunities that are right
            for you. <br />
            <br />
            Share the findings of this report with your friends and family and
            get them to help you assess and fine-tune your career ideas so you
            can visualize the best future for you. <br />
            <br /> The world of work is moving at a tremendous pace. We
            encourage you to use the resources on the CareerExplorer.me platform
            to navigate in the direction that is best for you.
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p className={styles.quote}>
            <i>“The future depends on what you do today.”</i> —Mahatma Gandhi
          </p>
        </div>

        <div className={styles.thirdPage}>
          <p className={styles.paragraph}>
            {userData?.name} this is your Interests Profile Graph derived from
            your responses from the Interest Profiler Assessment. Core elements
            that make up who you are always remain, but as your experiences grow
            some of your interests become more or less pronounced on the graph.
            Your initial focus should be on the combination of your top 3
            Interest Spheres.
          </p>

          <div>
            {userData?.assessment30?.results?.result.map((item) => {
              return (
                <div className={styles.interestSphere} key={item.interest}>
                  <h3 className={styles.interestSphereHeading}>
                    Interest Sphere:
                    <span style={{ color: "green" }}>{item.area}</span>
                  </h3>
                  <div className={styles.interestSphereContent}>
                    <div className={styles.interestSphereParagraph}>
                      <p>{item.description}</p>
                    </div>
                    <div className={styles.interestSphereScoreBox}>
                      <p>Score: {item.score}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPdf;
