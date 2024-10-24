import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CommentIcon,
  creator,
  //Podcast
  GHome,
  GLikes,
  GRating,
  GShared,
  GViews,
  LikeIcon,
  //videos
  OHome,
  OLikes,
  ORating,
  OShared,
  OViews,
  //Articles
  PHome,
  PLikes,
  PRating,
  PShared,
  PViews,
  RatingIcon,
  upload,
  //Counsellors Dashboard Icons
  uploadIcon,
  VideoIcon,
} from "../../assets/assest.js";
import GeneralButton from "../../components/general/GeneralButton.jsx";
import UploadVideoModal from "../../models/UploadVideoModal.jsx";
import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import { getGeneralVideoData, selectGeneralVideoData } from "../../redux/slices/creatorSlice.js";
import creatorStyle from "../../styles/CreatorVideo.module.css";
import { colors } from "../../utility/color.js";
import { fonts } from "../../utility/fonts.js";
import FirstView from "../FirstView.jsx";

const CreatorHome = () => {
  const dispatchToRedux = useDispatch();
  const generalVideoData = useSelector(selectGeneralVideoData);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  useEffect(() => {
    if (generalVideoData === null) {
      dispatchToRedux(getGeneralVideoData({ userId, token }));
    }
  }, []);

  const handleUpload = () => {
    setOpenUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setOpenUploadModal(false);
  };

  const Videos = {
    totalContent: 56,
    contentLikes: 32,
    contentShares: 32,
    contentAvgRating: 32,
    contentViews: 32,
  };
  const Podcast = {
    totalContent: 56,
    contentLikes: 32,
    contentShares: 32,
    contentAvgRating: 32,
    contentViews: 32,
  };
  const Articles = {
    totalContent: 56,
    contentLikes: 32,
    contentShares: 32,
    contentAvgRating: 32,
    contentViews: 32,
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: ".6rem" }}
      >
        <Typography variant="h5" sx={{ fontFamily: fonts.poppins, fontWeight: "800", padding: "1rem" }}>
          Dashboard
        </Typography>

        <button onClick={handleUpload} className={creatorStyle["navButton"]} style={{ height: "2.rem" }}>
          <img src={uploadIcon} alt="upload" style={{ width: "2rem" }} />
          Upload Content
        </button>
      </Box>

      <Card
        sampleData={Videos}
        titleImage={OHome}
        img1={OLikes}
        img2={ORating}
        img3={OShared}
        img4={OViews}
        title={"Videos"}
        themeColor={"#FF8A00"}
      />
      <Card
        sampleData={Articles}
        titleImage={PHome}
        img1={PLikes}
        img2={PRating}
        img3={PShared}
        img4={PViews}
        title={"Articles"}
        themeColor={"#C028AE"}
      />
      <Card
        sampleData={Podcast}
        titleImage={GHome}
        img1={GLikes}
        img2={GRating}
        img3={GShared}
        img4={GViews}
        title={"Podcasts"}
        themeColor={"#21A9B1"}
      />

      <UploadVideoModal open={openUploadModal} handleClose={handleCloseUploadModal} />
    </>
  );
};

export default CreatorHome;

const ChildCard = ({ image = creator, name, count, themeColor }) => (
  <div
    style={{
      display: "flex",
      gap: "1.1rem",
      alignItems: "center",
      padding: "0.9rem 1.1rem",
      backgroundColor: "white",
      boxShadow: "1px 5px 10px #3e3e3e54",
      borderRadius: ".9rem",
      height: "6.0625rem",
      width: "16.125rem",
    }}
  >
    <div>
      <img src={image} alt={name} style={{ width: "4.5rem", height: "4.5rem" }} />
    </div>
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0rem",
        justifyContent: "center",
      }}
    >
      <p style={{ fontWeight: "800", fontSize: "1.3rem" }}>{count}</p>
      <p style={{ color: "#3e3e3e", fontSize: "16px", fontWeight: 400, lineHeight: "24px ", opacity: "0.6" }}>
        {name}
      </p>
    </div>
  </div>
);

const Card = ({ sampleData, titleImage, img1, img2, img3, img4, title, themeColor }) => (
  <div style={{ marginBottom: "1.5rem" }}>
    <div
      style={{
        display: "flex",
        gap: "0.2rem",
        alignItems: "center",
        marginBottom: ".5rem",
        marginLeft: "1rem",
      }}
    >
      <img src={titleImage} alt={title} style={{ width: "2.5rem" }} />
      <p style={{ color: themeColor, fontWeight: "bold", fontSize: "1rem" }}>{sampleData.totalContent}</p>
      <p style={{ color: "#464545cd", fontSize: "1rem", fontWeight: "600" }}>{title}</p>
    </div>
    <div style={{ display: "flex", gap: "1.1rem", alignItems: "center", justifyContent: "center" }}>
      <ChildCard count={sampleData.contentLikes} name={"Total Likes"} image={img1} themeColor={themeColor} />
      <ChildCard
        count={sampleData.contentShares}
        name={"Total Shared"}
        themeColor={themeColor}
        image={img2}
      />
      <ChildCard
        count={sampleData.contentAvgRating}
        name={"Average Rating"}
        themeColor={themeColor}
        image={img3}
      />
      <ChildCard count={sampleData.contentViews} name={"Total Views"} themeColor={themeColor} image={img4} />
    </div>
  </div>
);
