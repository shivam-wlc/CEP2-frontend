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
import { selectAuthenticated } from "../redux/slices/authSlice.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserDashboardVideoCard = ({ video }) => {
  const authenticated = useSelector(selectAuthenticated);
  const navigate = useNavigate();
  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 270,

        margin: "auto",
        cursor: "pointer",

      }}
    >
      <CardMedia
        onClick={() => handleVideoClick(video._id)}
        component="img"
        alt="green iguana"
        image={
          video?.youtubeLink
            ? `https://img.youtube.com/vi/${video?.youtubeVideoId}/maxresdefault.jpg`
            : video?.thumbnail
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
            marginTop: "-20px",
          }}
        >
          {video?.title}
        </Typography>
        <Typography
          variant="body2"
          color={colors.darkGray}
          sx={{ fontFamily: fonts.sans, textAlign: "center", marginTop: "-10px", }}
        >
          by:{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate(`/profile/${video?.creatorId._id}`)}
          >
            {video?.creatorId.name}
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
      </CardActions>
    </Card>
  );
};

export default UserDashboardVideoCard;
