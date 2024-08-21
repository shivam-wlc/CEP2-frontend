import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/system";
import { fonts } from "../utility/fonts.js";
import { colors } from "../utility/color.js";
import {
  selectAuthenticated,
  selectUserId,
  selectToken,
} from "../redux/slices/authSlice.js";
import { addHistory } from "../redux/slices/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SharingVideoModal from "../models/SharingVideoModal.jsx";
import ShareIcon from "@mui/icons-material/Share";

const VideoCard = ({ video }) => {
  const authenticated = useSelector(selectAuthenticated);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleVideoClick = (videoId) => {
    if (authenticated) {
      dispatchToRedux(addHistory({ userId, videoId, token }));
    }
    navigate(`/video/${videoId}`);
  };

  return (
    <Card sx={{ maxWidth: 300, margin: "auto", cursor: "pointer" }}>
      <CardMedia
        onClick={() => handleVideoClick(video._id)}
        component="img"
        alt="green iguana"
        image={
          video.youtubeLink
            ? `https://img.youtube.com/vi/${video.youtubeVideoId}/maxresdefault.jpg`
            : video.thumbnail
        }
        sx={{ width: "300px", height: "169px" }}
      />

      <Box
        sx={{
          width: "100%",
          textAlign: "right",
          marginTop: "-25px",
        }}
      >
        <IconButton
          sx={{
            border: "1px solid red",
            backgroundColor: "red",
            textAlign: "center",
            marginRight: "10px",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          <FavoriteIcon sx={{ color: "white", fontSize: "30px" }} size={55} />
        </IconButton>
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: fonts.sans,
          }}
        >
          {video.title}
        </Typography>
        <Typography
          variant="body2"
          color={colors.darkGray}
          sx={{ fontFamily: fonts.sans, textAlign: "center" }}
        >
          by:{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate(`/profile/${video.creatorId._id}`)}
          >
            {video.creatorId.name}
          </span>
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-20px",
        }}
      >
        <Rating
          name="size-large"
          readOnly
          defaultValue={video?.averageRating}
          size="large"
        />
        {`(${video?.ratings?.length || "0"})`}
        <IconButton onClick={handleOpenModal}>
          <ShareIcon />
        </IconButton>
      </CardActions>

      <SharingVideoModal
        open={openModal}
        handleClose={handleCloseModal}
        videoUrl={`https://example.com/video/${video._id}`} // Replace with your actual video URL
      />
    </Card>
  );
};

export default VideoCard;
