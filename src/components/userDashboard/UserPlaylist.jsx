// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getUserPlaylists,
//   selectPlaylist,
//   removeVideoFromPlaylist,
//   deletePlaylist,
// } from "../../redux/slices/userSlice.js";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { fonts } from "../../utility/fonts.js";
// import {
//   Button,
//   Typography,
//   Box,
//   Container,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import GeneralButton from "../general/GeneralButton.jsx";
// import {
//   selectUserId,
//   selectAuthenticated,
//   selectToken,
// } from "../../redux/slices/authSlice.js";
// import CreatePlaylistModal from "../../models/CreatePlaylistModal.jsx";
// import { notify } from "../../redux/slices/alertSlice.js";
// import { useNavigate } from "react-router-dom";

// const UserPlaylist = () => {
//   const navigate = useNavigate();
//   const dispatchToRedux = useDispatch();
//   const userId = useSelector(selectUserId);
//   const token = useSelector(selectToken);
//   const playlist = useSelector(selectPlaylist);
//   const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useState(false);

//   useEffect(() => {
//     if (!playlist.length) {
//       dispatchToRedux(getUserPlaylists({ userId, token }));
//     }
//   }, [userId]);

//   const handleCreatePlaylist = () => {
//     setOpenCreatePlaylistModal(true);
//   };
//   const handleCloseModal = () => {
//     setOpenCreatePlaylistModal(false);
//   };

//   const handleDeletePlaylist = async (playlistId) => {
//     try {
//       await dispatchToRedux(deletePlaylist({ userId, playlistId, token }));
//       dispatchToRedux(notify({ type: "success", message: "Playlist deleted" }));
//     } catch (error) {
//       console.error("Error deleting playlist:", error);
//     }
//   };

//   const handleRemoveVideo = async (playlistId, videoId) => {
//     try {
//       await dispatchToRedux(
//         removeVideoFromPlaylist({ userId, playlistId, videoId, token })
//       );
//       dispatchToRedux(notify({ type: "success", message: "Video removed" }));
//     } catch (error) {
//       console.error("Error removing video from playlist:", error);
//     }
//   };

//   return (
//     <>
//       <Container
//         maxWidth="lg"
//         sx={{
//           backgroundColor: "white",
//           height: "100vh",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             padding: "1rem 0",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: "600",
//               fontFamily: fonts.sans,
//             }}
//           >
//             My Playlist
//           </Typography>
//           <GeneralButton
//             onClick={handleCreatePlaylist}
//             text="Create Playlist"
//           />
//         </Box>

//         <Box
//           sx={{
//             height: "30vh",
//             width: "100%",
//             marginTop: "1rem",
//           }}
//         >
//           {playlist?.length === 0 ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100%",
//                 width: "100%",
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{ fontFamily: fonts.sans, fontWeight: "600" }}
//               >
//                 No Playlist Found
//               </Typography>
//             </Box>
//           ) : (
//             playlist?.map((playlist) => (
//               <Accordion key={playlist._id} sx={{ backgroundColor: "#FDFBFA" }}>
//                 <AccordionSummary
//                   expandIcon={
//                     <ExpandMoreIcon sx={{ color: "black", fontSize: "35px" }} />
//                   }
//                 >
//                   <Typography
//                     sx={{
//                       fontFamily: fonts.sans,
//                       fontSize: "16px",
//                       fontWeight: "bold",
//                       marginRight: "1rem",
//                       width: "30%",
//                     }}
//                   >
//                     {playlist.name}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       fontFamily: fonts.sans,
//                       fontSize: "16px",
//                       fontWeight: "bold",
//                       marginRight: "1rem",
//                       width: "30%",
//                       textAlign: "center",
//                     }}
//                   >
//                     ({playlist.videos.length} videos)
//                   </Typography>
//                   <IconButton
//                     sx={{
//                       fontFamily: fonts.sans,
//                       fontSize: "16px",
//                       fontWeight: "bold",
//                       marginRight: "1rem",
//                       width: "20%",
//                     }}
//                     onClick={() => handleDeletePlaylist(playlist._id)}
//                     aria-label="delete"
//                   >
//                     <DeleteIcon sx={{ color: "black" }} />
//                   </IconButton>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Box>
//                     {playlist.videos.map((video, index) => (
//                       <Box
//                         key={video._id}
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           marginBottom: "0.5rem",
//                         }}
//                       >
//                         <Typography
//                           onClick={() => navigate(`/video/${video._id}`)}
//                           sx={{
//                             fontFamily: fonts.sans,
//                             marginRight: "3rem",
//                             width: "90%",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             whiteSpace: "nowrap",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {`${index + 1}. ${video.title} `}
//                         </Typography>
//                         <IconButton
//                           onClick={() =>
//                             handleRemoveVideo(playlist._id, video._id)
//                           }
//                           aria-label="remove"
//                         >
//                           <CloseIcon sx={{ color: "red" }} />
//                         </IconButton>
//                       </Box>
//                     ))}
//                   </Box>
//                 </AccordionDetails>
//               </Accordion>
//             ))
//           )}
//         </Box>
//       </Container>
//       <CreatePlaylistModal
//         open={openCreatePlaylistModal}
//         onClose={handleCloseModal}
//         userId={userId}
//         token={token}
//       />
//     </>
//   );
// };

// export default UserPlaylist;

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CreatePlaylistModal from "../../models/CreatePlaylistModal.jsx";
import { notify } from "../../redux/slices/alertSlice.js";
import { selectAuthenticated, selectToken, selectUserId } from "../../redux/slices/authSlice.js";

import { fonts } from "../../utility/fonts.js";
import GeneralButton from "../general/GeneralButton.jsx";
import {
  getUserPlaylist,
  selectAllPlaylistName,
  selectPlayListData,
  removeVideoFromPlaylist,
} from "../../redux/slices/playlistSlice.js";
const UserPlaylist = () => {
  const navigate = useNavigate();
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const playlistData = useSelector(selectPlayListData);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [selectedPlaylistVideos, setSelectedPlaylistVideos] = useState([]);

  const handleChange = (event) => {
    setSelectedPlaylist(event.target.value);

    for (let i = 0; i < playlistData.length; i++) {
      if (playlistData[i]._id === event.target.value) {
        setSelectedPlaylistVideos(playlistData[i].videoId);
      }
    }
  };

  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useState(false);

  useEffect(() => {
    dispatchToRedux(getUserPlaylist({ userId, token }));
  }, [userId, dispatchToRedux]);

  console.log("playlistData", playlistData);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#E1E1E1" }}>
          ★
        </span>,
      );
    }
    return <>{stars}</>;
  };

  const handleCreatePlaylist = () => {
    setOpenCreatePlaylistModal(true);
  };
  const handleCloseModal = () => {
    setOpenCreatePlaylistModal(false);
  };

  const handleDeletePlaylist = async (playlistId) => {
    // try {
    //   await dispatchToRedux(deletePlaylist({ userId, playlistId, token }));
    //   dispatchToRedux(notify({ type: "success", message: "Playlist deleted" }));
    // } catch (error) {
    //   console.error("Error deleting playlist:", error);
    // }
  };

  const handleRemoveVideo = async (videoId) => {
    console.log("playlistId", selectedPlaylist, "videoId", videoId);
    try {
      await dispatchToRedux(
        removeVideoFromPlaylist({ userId, playlistId: selectedPlaylist, videoId, token }),
      );
      dispatchToRedux(notify({ type: "success", message: "Video removed from playlist" }));
    } catch (error) {
      console.error("Error removing video from playlist:", error);
    }
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 0",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              fontFamily: fonts.sans,
            }}
          >
            All Playlists
          </Typography>
          {/* <GeneralButton onClick={handleCreatePlaylist} text="Create Playlist" />
           */}
          <button
            style={{
              backgroundImage: "linear-gradient(to top left, #720361, #bf2f75)", // Fix: Use camelCase and string for gradient
              border: "none", // Fix: Add quotes around values
              padding: "0.6rem 1rem",
              borderRadius: "90px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
              fontSize: "1.125rem",
              gap: "0.875rem",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleCreatePlaylist}
          >
            Create Playlist
          </button>
        </Box>

        <Box sx={{ width: "100%", padding: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="playlist-select-label">Select Playlist</InputLabel>
            <Select
              labelId="playlist-select-label"
              id="playlist-select"
              value={selectedPlaylist}
              onChange={handleChange}
              label="Select Playlist"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "pink", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "pink", // Border color when focused
                  },
                },
                "& .MuiSelect-icon": {
                  color: "pink", // Pink icon color
                },
                "&:hover .MuiSelect-icon": {
                  color: "darkpink", // Darker pink icon color on hover
                },
                "& .MuiFormHelperText-root": {
                  color: "pink", // Helper text color
                },
              }}
            >
              {playlistData?.map((playlist) => (
                <MenuItem
                  key={playlist._id}
                  // value={playlist.videoId}
                  value={playlist._id}
                  // value={playlist.videoId.length > 0 ? playlist.videoId : null}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 182, 193, 0.5)", // Light pink hover effect
                    },
                  }}
                >
                  {playlist.playlistName}
                </MenuItem>
              ))}
            </Select>
            {/* Optional: You can display a helper text or error message */}
            <FormHelperText>Select a playlist from the list</FormHelperText>
          </FormControl>
        </Box>

        <Box
          sx={{
            height: "30vh",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          {selectedPlaylistVideos?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Typography variant="h5" sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
                No Video Found in selected playlist
              </Typography>
            </Box>
          ) : (
            <Box sx={{ padding: "2rem" }}>
              <Grid container spacing={3}>
                {selectedPlaylistVideos?.map((video) => (
                  <Grid item xs={12} sm={6} md={4} key={video._id}>
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        padding: "1rem",
                        position: "relative",
                        height: "22rem",
                      }}
                    >
                      <img
                        // src={video.thumbnailUrl}
                        src={
                          video.youtubeLink
                            ? `https://img.youtube.com/vi/${video.youtubeVideoId}/maxresdefault.jpg`
                            : video.thumbnail
                        }
                        alt={video.title}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />

                      <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                        {/* {video.title}
                         */}
                        {video.title.length > 17 ? video.title.slice(0, 17) + "..." : video.title}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {renderStars(video.averageRating)}
                        <Typography variant="body2" sx={{ marginLeft: "0.5rem" }}>
                          ({video.totalRatings})
                        </Typography>
                      </Box>

                      <Typography variant="body2" sx={{ color: "#777", marginTop: "0.5rem" }}>
                        Shared with: {video.totalShares} users
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: "0.5rem",
                          marginTop: "1rem",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: video.watched ? "#720361" : "#f8f8f8",
                            color: video.watched ? "white" : "black",
                            textTransform: "none",
                          }}
                        >
                          {video.watched ? "Viewed" : "Not Viewed"}
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: video.rated ? "#720361" : "#f8f8f8",
                            color: video.rated ? "white" : "black",
                            textTransform: "none",
                          }}
                        >
                          Rated
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: video.liked ? "#720361" : "#f8f8f8",
                            color: video.liked ? "white" : "black",
                            textTransform: "none",
                          }}
                        >
                          Liked
                        </Button>
                      </Box>

                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: "8rem",
                          right: "1rem",
                          color: "#FF4D4D",
                        }}
                        onClick={() => handleRemoveVideo(video._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
      <CreatePlaylistModal
        open={openCreatePlaylistModal}
        onClose={handleCloseModal}
        userId={userId}
        token={token}
      />
    </>
  );
};

export default UserPlaylist;
