// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import IconButton from "@mui/material/IconButton";
// import Rating from "@mui/material/Rating";
// import Typography from "@mui/material/Typography";
// import { Box } from "@mui/system";
// import * as React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import SharingVideoModal from "../models/SharingVideoModal.jsx";
// import { selectAuthenticated, selectToken, selectUserId } from "../redux/slices/authSlice.js";
// import { addHistory } from "../redux/slices/userSlice.js";
// import { colors } from "../utility/color.js";
// import { fonts } from "../utility/fonts.js";

// const VideoCard = ({ video }) => {
//   const authenticated = useSelector(selectAuthenticated);
//   const userId = useSelector(selectUserId);
//   const token = useSelector(selectToken);
//   const dispatchToRedux = useDispatch();
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = React.useState(false);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleVideoClick = (videoId) => {
//     if (authenticated) {
//       dispatchToRedux(addHistory({ userId, videoId, token }));
//     }
//     navigate(`/video/${videoId}`);
//   };

//   return (
//     <Card sx={{ maxWidth: 300, margin: "auto", cursor: "pointer" }}>
//       <CardMedia
//         onClick={() => handleVideoClick(video._id)}
//         component="img"
//         alt="green iguana"
//         image={
//           video.youtubeLink
//             ? `https://img.youtube.com/vi/${video.youtubeVideoId}/maxresdefault.jpg`
//             : video.thumbnail
//         }
//         sx={{ width: "300px", height: "169px" }}
//       />

//       <Box
//         sx={{
//           width: "100%",
//           textAlign: "right",
//           marginTop: "-25px",
//         }}
//       >
//         <IconButton
//           sx={{
//             border: "1px solid red",
//             backgroundColor: "red",
//             textAlign: "center",
//             marginRight: "10px",
//             "&:hover": {
//               backgroundColor: "red",
//             },
//           }}
//         >
//           <FavoriteIcon sx={{ color: "white", fontSize: "30px" }} size={55} />
//         </IconButton>
//       </Box>
//       <CardContent>
//         <Typography
//           gutterBottom
//           variant="h6"
//           component="div"
//           sx={{
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             fontFamily: fonts.sans,
//           }}
//         >
//           {video.title}
//         </Typography>
//         <Typography
//           variant="body2"
//           color={colors.darkGray}
//           sx={{ fontFamily: fonts.sans, textAlign: "center" }}
//         >
//           by:{" "}
//           <span
//             style={{ color: "blue", cursor: "pointer" }}
//             onClick={() => navigate(`/profile/${video.creatorId._id}`)}
//           >
//             {video.creatorId.name}
//           </span>
//         </Typography>
//       </CardContent>
//       <CardActions
//         sx={{
//           alignItems: "center",
//           justifyContent: "center",
//           marginTop: "-20px",
//         }}
//       >
//         <Rating name="size-large" readOnly defaultValue={video?.averageRating} size="large" />
//         {`(${video?.ratings?.length || "0"})`}
//         <IconButton onClick={handleOpenModal}>
//           <ShareIcon />
//         </IconButton>
//       </CardActions>

//       <SharingVideoModal
//         open={openModal}
//         handleClose={handleCloseModal}
//         videoUrl={`https://example.com/video/${video._id}`} // Replace with your actual video URL
//       />
//     </Card>
//   );
// };

// export default VideoCard;

import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import SharingVideoModal from "../models/SharingVideoModal.jsx";
import { selectAuthenticated, selectToken, selectUserId } from "../redux/slices/authSlice.js";
import { addHistory } from "../redux/slices/userSlice.js";

const VideoCard = ({ video }) => {
  console.log(video);

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
    <div
      style={{
        borderRadius: "15px",
        padding: "15px",
        border: "1px solid #cecece",
        height: "14.125rem",
        backgroundColor: "white",
        width: "18.59375rem",
        cursor: "pointer",
        boxShadow: "2px 2px 10px #a7a7a764",
      }}
      onClick={() => handleVideoClick(video._id)}
    >
      <img
        src={
          video.youtubeLink
            ? `https://img.youtube.com/vi/${video.youtubeVideoId}/maxresdefault.jpg`
            : video.thumbnail
        }
        alt="thumbnail"
        style={{
          width: "16.71875rem",
          height: "7.6875rem",
          borderRadius: "8px",
          margin: "auto",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div>
          <p style={{ marginTop: ".5rem" }}>
            {video.title.length > 17 ? video.title.slice(0, 17) + "..." : video.title}
          </p>
          <div style={{ marginTop: ".2rem", display: "flex", alignItems: "center" }}>
            <Rating value={video?.averageRating} readOnly size="small" />
            <p style={{ color: "#898989" }}>{`(${video?.rating || "0"})`}</p>
          </div>
          <p style={{ marginTop: ".3rem", color: "#898989" }}>
            by{" "}
            <span style={{ color: "#BC2876" }} onClick={() => navigate(`/profile/${video.creatorId._id}`)}>
              {video.creatorName}
            </span>
          </p>
        </div>
        <div>
          <p style={{ textWrap: "nowrap", color: "#737373" }}>{video?.views || 0} views</p>
        </div>
      </div>
      {/* <div style={{ backgroundColor: "#F2F2F2", display: "flex", marginTop: "1rem", padding: "15px 23px", flexWrap: "nowrap", alignItems: "center", borderRadius: "90px" }}>
      <p style={{textWrap: "nowrap", fontSize: "1.2rem"}}>Insights :</p>
      <p style={{textWrap: "nowrap", fontSize: "1.2rem", color: "#888888"}}> &nbsp; {insights.length > 47 ? insights.slice(0, 48)+ "..." : insights} &nbsp;</p>
      <img src={infoCircleIcon} alt=""  width={"24px"} height={"24px"}/>
    </div> */}
    </div>
  );
};

export default VideoCard;
