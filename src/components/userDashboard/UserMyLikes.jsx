import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyLikedVideos,
  selectMyLikedVideos,
} from "../../redux/slices/userSlice.js";
import { fonts } from "../../utility/fonts.js";
import {
  selectAuthenticated,
  selectUserId,
  selectToken,
} from "../../redux/slices/authSlice.js";
import { Box, Typography, Pagination } from "@mui/material";
import UserDashboardVideoCard from "../UserDashboardVideoCard.jsx";

function UserMyLikes() {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const likedVideoData = useSelector(selectMyLikedVideos);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (likedVideoData.length === 0) {
      dispatchToRedux(getMyLikedVideos({ userId, page, token }));
    }
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  console.log("likedVideoData", likedVideoData);
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
        {likedVideoData?.likedVideos?.length === 0 ? (
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
              No Video Found
            </Typography>
          </Box>
        ) : (
          likedVideoData?.likedVideos?.map((video) => (
            <UserDashboardVideoCard key={video._id} video={video.videoId} />
          ))
        )}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Pagination
          count={likedVideoData?.totalPages}
          size="large"
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
}

export default UserMyLikes;
