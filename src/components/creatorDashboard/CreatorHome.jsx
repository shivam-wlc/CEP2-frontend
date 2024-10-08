import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CommentIcon, LikeIcon, RatingIcon, VideoIcon } from "../../assets/assest.js";
import GeneralButton from "../../components/general/GeneralButton.jsx";
import UploadVideoModal from "../../models/UploadVideoModal.jsx";
import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import { getGeneralVideoData, selectGeneralVideoData } from "../../redux/slices/creatorSlice.js";
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
  return (
    <>
      <Box sx={{ backgroundColor: colors.white }}>
        <Typography variant="h5" sx={{ fontFamily: fonts.poppins, fontWeight: "600", padding: "1rem" }}>
          Hi, Welcome Back
        </Typography>

        {/* First View  */}
        <Grid container spacing={2}>
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
        </Grid>

        {/* Second View  */}
      </Box>

      <Box
        sx={{
          marginTop: "1rem",
          backgroundColor: colors.white,
          padding: "1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <GeneralButton onClick={handleUpload} text="Upload Video" />
      </Box>
      <UploadVideoModal open={openUploadModal} handleClose={handleCloseUploadModal} />
    </>
  );
};

export default CreatorHome;
