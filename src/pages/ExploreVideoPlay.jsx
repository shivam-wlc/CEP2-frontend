import { Avatar, Divider, IconButton, Rating } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Headers from "../components/Headers";
import { selectAuthenticated, selectToken, selectUserId } from "../redux/slices/authSlice";
import { videoDetailById } from "../redux/slices/creatorSlice.js";
import { fonts } from "../utility/fonts.js";
import {
  videoLikeIcon,
  videoLikeIconFilled,
  videoShareIcon,
  videoViewsIcon,
  videoPlaylistIcon,
} from "../assets/assest.js";

const ExploreVideoPlay = () => {
  const navigate = useNavigate();
  const dispatchToRedux = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const token = useSelector(selectToken);
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [ratingValue, setRatingValue] = useState(3);
  const [creatorData, setCreatorData] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await dispatchToRedux(videoDetailById({ videoId }));
        if (response.payload) {
          setVideoData(response.payload.videoDetails);
          setCreatorData(response.payload.creatorDetails);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [dispatchToRedux, videoId, authenticated]);

  const renderVideo = () => {
    if (!videoData) return null;

    if (videoData.youtubeLink) {
      return (
        <iframe
          title="YouTube Video"
          width="1120"
          height="630"
          src={`https://www.youtube.com/embed/${videoData.youtubeVideoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      return (
        <video
          width="1120"
          height="630"
          // controls={videoPlaying}
          // autoPlay={videoPlaying}
          controls
          onPause={() => setVideoPlaying(false)}
        >
          <source src={videoData.videoLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <Box sx={{ height: "200vh", margin: 1 }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "white",
          height: "5rem",
        }}
      >
        <Headers />
      </Box>
      <Container sx={{ paddingTop: "25rem", height: "100vh", padding: "0 2rem", marginTop: "4rem" }}>
        <Box sx={{ px: "1rem" }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: fonts.poppins,
              fontWeight: 600,
              fontSize: "2rem",
              lineHeight: 1.3,
              width: "100%",
            }}
          >
            {videoData?.title}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1, alignItems: "center" }}>
            {/* Category */}
            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.poppins,
                color: "gray",
                fontSize: "0.875rem",
              }}
            >
              Category:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.poppins,
                color: "black",
                fontSize: "0.875rem",
                ml: 0.5,
              }}
            >
              {videoData?.category}
            </Typography>

            {/* Divider */}
            <Typography
              component="span"
              sx={{
                color: "gray",
                mx: 1.25,
                fontSize: "1rem",
              }}
            >
              |
            </Typography>

            {/* Updated On */}
            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.poppins,
                color: "gray",
                fontSize: "0.875rem",
              }}
            >
              Updated on:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.poppins,
                color: "black",
                fontSize: "0.875rem",
                ml: 0.5,
              }}
            >
              {new Date(videoData?.updatedAt).toLocaleDateString()}
            </Typography>

            {/* Divider */}
            <Typography
              component="span"
              sx={{
                color: "gray",
                mx: 1.25,
                fontSize: "1rem",
              }}
            >
              |
            </Typography>

            {/* Language */}
            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.poppins,
                color: "gray",
                fontSize: "0.875rem",
              }}
            >
              Language:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.poppins,
                color: "black",
                fontSize: "0.875rem",
                ml: 0.5,
              }}
            >
              {videoData?.language}
            </Typography>

            {/* Divider */}
            <Typography
              component="span"
              sx={{
                color: "gray",
                mx: 1.25,
                fontSize: "1rem",
              }}
            >
              |
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.poppins,
                color: "gray",
                fontSize: "0.875rem",
              }}
            >
              Rating:
            </Typography>

            <IconButton>
              <Rating sx={{ fontSize: "1rem" }} name="read-only" readOnly value={ratingValue} />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
            marginTop: "1rem",
          }}
        >
          {renderVideo()}
        </Box>
        {/* /* Like, Rating, and Playlist Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
            px: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <img src={videoLikeIcon} alt="Video Like" style={{ width: "40px" }} />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: fonts.poppins,
                  color: "gray",
                  fontSize: "1rem",
                }}
              >
                {videoData?.totalLikes} Likes
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <img src={videoViewsIcon} alt="Video Views" style={{ width: "40px" }} />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: fonts.poppins,
                  color: "gray",
                  fontSize: "1rem",
                }}
              >
                {videoData?.totalViews} Views
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Rating sx={{ fontSize: "1.5rem" }} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Box sx={{ cursor: "pointer" }}>
              <img src={videoShareIcon} alt="Video Share" style={{ width: "40px" }} />
            </Box>

            <Box sx={{ cursor: "pointer" }}>
              <img src={videoPlaylistIcon} alt="video Playlist" style={{ width: "40px" }} />
            </Box>
          </Box>
        </Box>

        {/* Video Description */}
        <Box
          sx={{
            border: "1px solid #cecece",
            backgroundColor: "#f2f2f2",
            borderRadius: "10px",

            px: "1rem",
            width: "95%",
            margin: "auto",
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center", py: "1rem" }}>
            <Avatar alt="Remy Sharp" src={creatorData?.profilePicture} sx={{ width: 80, height: 80 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Typography
                variant="body1"
                sx={{ fontFamily: fonts.poppins, color: "black", fontSize: "1rem", fontWeight: "600" }}
              >
                {creatorData?.firstName + " " + creatorData?.lastName}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: fonts.poppins, color: "gray", fontSize: "0.875rem" }}
              >
                COUNSELLOR
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2, marginBottom: 4 }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: fonts.poppins,
                marginTop: "1rem",
                lineHeight: 1.6,
                fontSize: "1rem",
                color: "text.secondary",
                width: "100%",
                margin: "auto",
              }}
            >
              {videoData?.description}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ExploreVideoPlay;
