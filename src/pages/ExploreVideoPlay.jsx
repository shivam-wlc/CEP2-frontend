import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IconButton, Rating, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import GeneralButton from "../components/general/GeneralButton.jsx";
import Headers from "../components/Headers";
import AddVideoToPlaylistModal from "../models/AddVideoToPlaylistModal.jsx";
import NeedToSingupModal from "../models/NeedToSingupModal.jsx";
import { notify } from "../redux/slices/alertSlice.js";
import { selectAuthenticated, selectToken, selectUserId } from "../redux/slices/authSlice";
import {
  addComment,
  addRating,
  getAllComments,
  getLikeStatus,
  getUserRatingOfVideo,
  selectAllComments,
  toggleLike,
  videoDetailById,
} from "../redux/slices/creatorSlice.js";
import { fonts } from "../utility/fonts.js";

const ExploreVideoPlay = () => {
  const dispatchToRedux = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const userId = useSelector(selectUserId);
  const comments = useSelector(selectAllComments);

  const token = useSelector(selectToken);

  const navigate = useNavigate();
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [writeCommnet, setWriteComment] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  //playlist
  const [openAddVideoToPlaylistModal, setOpenAddVideoToPlaylistModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");

  const [needToSingupOpen, setNeedToSingupOpen] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await dispatchToRedux(videoDetailById({ videoId }));
        if (response.payload) {
          setVideoData(response.payload.videoDetails);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }

      try {
        await dispatchToRedux(getAllComments({ videoId }));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchVideoDetails();

    const popupTimer = setTimeout(() => {
      if (!authenticated) {
        setShowPopup(true);
        setVideoPlaying(false);
      }
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(popupTimer);
    };
  }, [dispatchToRedux, videoId, authenticated]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (authenticated) {
        try {
          const response = await dispatchToRedux(getLikeStatus({ videoId, userId }));
          setLiked(response.payload.isLiked);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchLikeStatus();
  }, [dispatchToRedux, videoId, userId]);

  const handleLike = async (videoId) => {
    if (!authenticated) {
      setShowPopup(true);
      setVideoPlaying(false);
      return;
    }

    try {
      const toggleLikeResponse = await dispatchToRedux(toggleLike({ videoId, userId, token }));

      try {
        const likeStatusResponse = await dispatchToRedux(getLikeStatus({ videoId, userId }));
        setLiked(likeStatusResponse.payload.isLiked);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }

      dispatchToRedux(
        notify({
          type: "success",
          message: toggleLikeResponse.payload.message,
        }),
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleAddComment = async () => {
    if (!authenticated) {
      setShowPopup(true);
      setVideoPlaying(false);
      return;
    }

    try {
      setIsButtonLoading(true);
      await dispatchToRedux(addComment({ userId, videoId, comment: writeCommnet, token }));
      setWriteComment("");
      setIsButtonLoading(false);
      dispatchToRedux(notify({ type: "success", message: "Comment added successfully" }));
    } catch (error) {
      setIsButtonLoading(false);
      console.error("Error adding comment:", error);
    }
  };
  const handleSignupClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (authenticated) {
        const getRatingResponse = await dispatchToRedux(getUserRatingOfVideo({ videoId, userId }));

        if (getRatingResponse.payload.userRating) {
          setRatingValue(getRatingResponse.payload.userRating);
        }
      }
    };

    fetchData();
  }, []);

  const handleRatingChange = (event, newValue) => {
    if (!authenticated) {
      setShowPopup(true);
      setVideoPlaying(false);
      return;
    }

    setRatingValue(newValue);
    dispatchToRedux(addRating({ videoId, userId, rating: newValue, token }));
  };

  const handleOpenAddVideoToPlaylistModal = (videoId) => {
    if (!authenticated) {
      setShowPopup(true);
      setVideoPlaying(false);
      return;
    }
    setSelectedVideoId(videoId);
    setOpenAddVideoToPlaylistModal(true);
  };

  const handleCloseAddVideoToPlaylistModal = () => {
    setOpenAddVideoToPlaylistModal(false);
  };

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
    <>
      <Headers />
      <Container sx={{ paddingTop: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>{renderVideo()}</Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            width: "95%",
            padding: "0px 20px",
            margin: "auto",
            marginTop: "1rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              // width: "50%",
              fontFamily: fonts.sans,
            }}
          >
            Likes: <span style={{ fontWeight: "600" }}>{videoData?.likes.length}</span>
          </Typography>
          <IconButton>
            <Rating
              sx={{ fontSize: "3rem" }}
              name="simple-controlled"
              // precision={0.5}
              value={ratingValue}
              onChange={handleRatingChange}
            />
          </IconButton>
          <Box>
            <IconButton onClick={() => handleLike(videoData?._id)}>
              {liked ? (
                <>
                  <FavoriteIcon sx={{ fontSize: "3rem", color: "red" }} />
                </>
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: "3rem", color: "red" }} />
              )}
            </IconButton>
            <IconButton onClick={() => handleOpenAddVideoToPlaylistModal(videoData._id)}>
              <PlaylistAddIcon sx={{ fontSize: "3rem", color: "gray" }} />
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant="h5"
          sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
            fontFamily: fonts.sans,
            fontWeight: "600",
          }}
        >
          {videoData?.title}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: fonts.sans, width: "100%", margin: "auto" }}>
          {videoData?.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <TextField
            fullWidth
            label="Comment"
            variant="outlined"
            size="small"
            sx={{ flex: 1 }}
            value={writeCommnet}
            onChange={(e) => setWriteComment(e.target.value)}
          />
          <GeneralButton text="Add Comment" onClick={() => handleAddComment(videoData._id)} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              fontFamily: fonts.sans,
              fontWeight: "600",
            }}
          >
            Comments
          </Typography>
          {comments?.length > 0 ? (
            comments?.map((comment, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  width: "80%",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "600", fontFamily: fonts.sans }}>
                  {comment?.username}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: fonts.sans }}>
                  {comment?.comment}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No comments found.</Typography>
          )}
        </Box>
      </Container>

      <AddVideoToPlaylistModal
        open={openAddVideoToPlaylistModal}
        onClose={handleCloseAddVideoToPlaylistModal}
        videoId={selectedVideoId}
        userId={userId}
        authenticated={authenticated}
        token={token}
      />
      <NeedToSingupModal open={showPopup} onClose={false} />
    </>
  );
};

export default ExploreVideoPlay;
