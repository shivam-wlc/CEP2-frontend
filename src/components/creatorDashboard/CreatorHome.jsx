import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CommentIcon, creator, LikeIcon, RatingIcon, upload, VideoIcon } from "../../assets/assest.js";
import GeneralButton from "../../components/general/GeneralButton.jsx";
import UploadVideoModal from "../../models/UploadVideoModal.jsx";
import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import { getGeneralVideoData, selectGeneralVideoData } from "../../redux/slices/creatorSlice.js";
import { colors } from "../../utility/color.js";
import { fonts } from "../../utility/fonts.js";
import FirstView from "../FirstView.jsx";
import creatorStyle from "../../styles/CreatorVideo.module.css";

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

  const sampleData = {
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
          <img src={upload} alt="upload" />
          Upload Content
        </button>

        {/* <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <FirstView icon={VideoIcon} numbers={generalVideoData?.totalVideos || 0} title={"Total Videos"} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FirstView icon={LikeIcon} numbers={generalVideoData?.totalLikes || 0} title={"Likes"} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FirstView icon={CommentIcon} numbers={generalVideoData?.totalVideos || 0} title={"Comments"} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FirstView icon={RatingIcon} numbers={generalVideoData?.averageRating || 0} title={"Rating"} />
          </Grid>
        </Grid> */}
      </Box>
      {/* <Box
        sx={{
          marginTop: "1rem",
          backgroundColor: colors.white,
          padding: "1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <GeneralButton onClick={handleUpload} text="Upload Video" />
      </Box> */}

      <Card sampleData={sampleData} titleImage={creator} title={"Reels"} themeColor={"#FF8A0033"} />
      <Card sampleData={sampleData} titleImage={creator} title={"Articles"} themeColor={"#C028AE"} />
      <Card sampleData={sampleData} titleImage={creator} title={"Podcasts"} themeColor={"#21A9B1"} />

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
      <img src={image} alt={name} />
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
      <p style={{ fontWeight: "lighter", color: "#3e3e3e", fontSize: ".9rem" }}>{name}</p>
    </div>
  </div>
);

const Card = ({ sampleData, titleImage, title, themeColor }) => (
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
      <img src={titleImage} alt={title} height={"20rem"} width={"20rem"} />
      <p style={{ color: themeColor, fontWeight: "600", fontSize: "1rem" }}>{sampleData.totalContent}</p>
      <p style={{ color: "#464545cd", fontSize: "1rem" }}>{title}</p>
    </div>
    <div style={{ display: "flex", gap: "1.1rem", alignItems: "center", justifyContent: "center" }}>
      <ChildCard
        count={sampleData.contentLikes}
        name={"Total Likes"}
        image={creator}
        themeColor={themeColor}
      />
      <ChildCard
        count={sampleData.contentShares}
        name={"Total Shared"}
        themeColor={themeColor}
        image={creator}
      />
      <ChildCard
        count={sampleData.contentAvgRating}
        name={"Average Rating"}
        themeColor={themeColor}
        image={creator}
      />
      <ChildCard
        count={sampleData.contentViews}
        name={"Total Views"}
        themeColor={themeColor}
        image={creator}
      />
    </div>
  </div>
);
