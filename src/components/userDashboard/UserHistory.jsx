import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, selectHistory } from "../../redux/slices/userSlice.js";
import { fonts } from "../../utility/fonts.js";
import {
  selectAuthenticated,
  selectToken,
  selectUserId,
} from "../../redux/slices/authSlice.js";
import { Box, Typography } from "@mui/material";
import UserDashboardVideoCard from "../UserDashboardVideoCard.jsx";

const UserHistory = () => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const videoHistory = useSelector(selectHistory);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (videoHistory.length === 0) {
      dispatchToRedux(getHistory({ userId, token }));
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          margin: "auto",
          marginTop: "5rem",
          backgroundColor: "white",
        }}
      >
        {videoHistory?.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              width: "430%",
              margin: "auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: fonts.sans, fontWeight: "600" }}
            >
              No History Found
            </Typography>
          </Box>
        ) : (
          videoHistory?.map((video) => (
            <UserDashboardVideoCard key={video._id} video={video.videoId} />
          ))
        )}
      </Box>
    </>
  );
};

export default UserHistory;
