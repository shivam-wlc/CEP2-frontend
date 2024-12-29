import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { videoDetailById } from "../redux/slices/creatorSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Box, Rating, Avatar, Divider, DialogTitle } from "@mui/material";
import { fonts } from "../utility/fonts.js";
import { videoLikeIcon, videoShareIcon, videoViewsIcon, videoPlaylistIcon } from "../assets/assest.js";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";

const ExploreVideoPlayPopup = ({ open, onClose, videoId }) => {
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();

  const [averageRatingValue, setAverageRatingValue] = useState(0);
  const [creatorData, setCreatorData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [showRegisterScreen, setShowRegisterScreen] = useState(false);

  useEffect(() => {
    if (open && videoId) {
      const fetchVideoDetails = async () => {
        try {
          const response = await dispatchToRedux(videoDetailById({ videoId }));
          if (response.payload) {
            setVideoData(response.payload.videoDetails);
            setCreatorData(response.payload.creatorDetails);
            setAverageRatingValue(response.payload.videoDetails.averageRating);
          }
        } catch (error) {
          console.error("Error fetching video details:", error);
        }
      };

      fetchVideoDetails();
    }
  }, [dispatchToRedux, videoId, open]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setShowRegisterScreen(true), 1000); // 15 seconds
      return () => clearTimeout(timer); // Cleanup on unmount or close
    }
  }, [open]);

  const handleRedirectToRegister = () => {
    navigate("/register");
    setShowRegisterScreen(false);
  };

  const handleCancelShowRegisterScreen = () => {
    onClose();
    setShowRegisterScreen(false);
  };

  function renderVideo() {
    if (!videoData) return null;

    if (videoData.youtubeLink) {
      return (
        <iframe
          title="YouTube Video"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoData.youtubeVideoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      return (
        <video
          width="560"
          height="315"
          // controls={videoPlaying}
          // autoPlay={videoPlaying}
          controls
          // onPause={() => setVideoPlaying(false)}
        >
          <source src={videoData.videoLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      sx={{ "& .MuiDialog-paper": { width: "600px", maxWidth: "none", borderRadius: "20px" } }}
    >
      {/* this is for video play  */}

      {showRegisterScreen ? (
        // <Box
        //   sx={{
        //     maxWidth: "500px",
        //     margin: "auto",
        //     p: "2rem",
        //     borderRadius: "10px",
        //     textAlign: "center",
        //     backgroundColor: "#fff",
        //     fontFamily: fonts.poppins,
        //   }}
        // >
        //   <Typography
        //     variant="h6"
        //     sx={{
        //       mb: "1.5rem",
        //       fontFamily: "Poppins",
        //       fontWeight: "500",
        //       textAlign: "center",
        //       color: "text.primary",
        //       fontFamily: fonts.poppins,
        //     }}
        //   >
        //     You need to <strong>Register</strong> or <strong>Login</strong> to view the full video!
        //   </Typography>
        //   <Typography
        //     variant="h5"
        //     sx={{ mb: "1rem", fontFamily: "Poppins", fontWeight: "600", fontFamily: fonts.poppins }}
        //   >
        //     Why Register?
        //   </Typography>

        //   <Box sx={{ textAlign: "left", mb: "1.5rem" }}>
        //     {[
        //       { text: "Access Assessment Results", icon: "📊" },
        //       { text: "Career Guidance", icon: "💼" },
        //       { text: "Talk to Counselors", icon: "🧑‍💼" },
        //       { text: "Create and Manage Resumes", icon: "📄" },
        //     ].map((item, index) => (
        //       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: "0.5rem" }}>
        //         <Typography variant="h6" sx={{ mr: "0.5rem" }}>
        //           {item.icon}
        //         </Typography>
        //         <Typography variant="body1" sx={{ fontFamily: "Poppins", color: "gray" }}>
        //           {item.text}
        //         </Typography>
        //       </Box>
        //     ))}
        //   </Box>

        //   <Box sx={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}>
        //     <Button
        //       sx={{
        //         background: "linear-gradient(to right, #720361, #bf2f75)",
        //         color: "white",
        //         padding: "0.5rem 1.5rem",
        //         borderRadius: "15px",
        //         // fontWeight: "bold",
        //         fontSize: "1rem",
        //         "&:hover": {
        //           background: "linear-gradient(to right, #720361, #bf2f75)",
        //         },
        //       }}
        //       onClick={handleCancelShowRegisterScreen}
        //     >
        //       Cancel
        //     </Button>
        //     <Button
        //       sx={{
        //         background: "linear-gradient(to right, #720361, #bf2f75)",
        //         color: "white",
        //         padding: "0.5rem 1.5rem",
        //         borderRadius: "15px",
        //         // fontWeight: "bold",
        //         fontSize: "1rem",
        //         "&:hover": {
        //           background: "linear-gradient(to right, #720361, #bf2f75)",
        //         },
        //       }}
        //       onClick={handleRedirectToRegister}
        //     >
        //       Register
        //     </Button>
        //   </Box>
        // </Box>
        <Box
          sx={{
            maxWidth: "500px",
            margin: "auto",
            p: "2rem",
            borderRadius: "10px",
            textAlign: "center",
            backgroundColor: "#fff",
            fontFamily: fonts.poppins,
            // boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: "1.5rem",
              fontFamily: fonts.poppins,
              fontWeight: "600",
              color: "text.primary",
            }}
          >
            Hey, Career Explorer
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: "1.5rem",
              fontFamily: fonts.poppins,
              fontWeight: "500",
              color: "text.primary",
            }}
          >
            We would love for you to join our community. All FREE when you register as a Student!
          </Typography>

          <Box sx={{ textAlign: "left", mb: "1.5rem" }}>
            {[
              "Your personal Career Planning Dashboard to track career decisions and progress",
              "Resume Builder to create and update your Resume or CV",
              "3 identified Career Pathways when you complete our 30-minute Career Assessment",
              "Create and sort playlists of Career guidance content, rate and share on your favorite social channels",
              "Stay updated on open days and events that we are hosting",
            ].map((text, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: "0.75rem" }}>
                <Typography variant="h6" sx={{ mr: "0.5rem", fontSize: "1.5rem" }}>
                  📌
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "Poppins", color: "gray" }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Button
              sx={{
                background: "linear-gradient(to right, #720361, #bf2f75)",
                color: "white",
                padding: "0.75rem 2rem",
                borderRadius: "15px",
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  background: "linear-gradient(to right, #720361, #bf2f75)",
                },
              }}
              onClick={handleCancelShowRegisterScreen}
            >
              Cancel
            </Button>
            <Button
              sx={{
                background: "linear-gradient(to right, #720361, #bf2f75)",
                color: "white",
                padding: "0.75rem 2rem",
                borderRadius: "15px",
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  background: "linear-gradient(to right, #720361, #bf2f75)",
                },
              }}
              onClick={handleRedirectToRegister}
            >
              Register Now
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ px: "1rem" }}>
            <DialogTitle sx={{ position: "relative" }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: fonts.poppins,
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  lineHeight: 1.3,
                  width: "100%",
                  py: "0.5rem",
                }}
              >
                {videoData?.title}
              </Typography>

              {/* Close Icon */}
              <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                mt: "-2rem",
                // border: "1px solid black",
              }}
            >
              {/* Category */}

              {/* Divider */}
              <Typography
                component="span"
                sx={{
                  color: "gray",
                  mx: 1.25,
                  fontSize: "1rem",
                }}
              ></Typography>

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
                <Rating sx={{ fontSize: "1rem" }} name="read-only" readOnly value={averageRatingValue} />
                <Typography
                  sx={{
                    color: "gray",
                    mx: 0.25,
                    fontSize: "1rem",
                  }}
                >
                  ({videoData?.totalRatings})
                </Typography>
              </IconButton>
            </Box>
          </Box>

          {/* render video  */}
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
              marginTop: "-1.5rem",
              px: "2rem",
              marginBottom: "0.5rem",
              //   border: "1px solid black",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <img src={videoLikeIcon} alt="Video Like" style={{ width: "20px" }} />
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: fonts.poppins,
                    color: "gray",
                    fontSize: "0.9rem",
                  }}
                >
                  {videoData?.totalLikes} Likes
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <img src={videoViewsIcon} alt="Video Views" style={{ width: "20px" }} />
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: fonts.poppins,
                    color: "gray",
                    fontSize: "0.9rem",
                  }}
                >
                  {videoData?.totalViews} Views
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Box sx={{ cursor: "pointer" }}>
                <img src={videoShareIcon} alt="Video Share" style={{ width: "25px" }} />
              </Box>

              <Box sx={{ cursor: "pointer" }}>
                <img src={videoPlaylistIcon} alt="video Playlist" style={{ width: "25px" }} />
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
              marginBottom: "1rem",
            }}
          >
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center", py: "1rem" }}>
              <Avatar alt="Remy Sharp" src={creatorData?.profilePicture} sx={{ width: 50, height: 50 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: fonts.poppins, color: "black", fontSize: "0.9rem", fontWeight: "600" }}
                >
                  {creatorData?.firstName + " " + creatorData?.lastName}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: fonts.poppins, color: "gray", fontSize: "0.675rem", mt: "-0.5rem" }}
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
                  fontSize: "0.7rem",
                  color: "text.secondary",
                  width: "100%",
                  margin: "auto",
                }}
              >
                {videoData?.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default ExploreVideoPlayPopup;
