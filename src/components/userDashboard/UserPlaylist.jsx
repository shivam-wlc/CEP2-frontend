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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPlaylists,
  selectPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
} from "../../redux/slices/userSlice.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fonts } from "../../utility/fonts.js";
import {
  Button,
  Typography,
  Box,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import GeneralButton from "../general/GeneralButton.jsx";
import {
  selectUserId,
  selectAuthenticated,
  selectToken,
} from "../../redux/slices/authSlice.js";
import CreatePlaylistModal from "../../models/CreatePlaylistModal.jsx";
import { notify } from "../../redux/slices/alertSlice.js";
import { useNavigate } from "react-router-dom";

const UserPlaylist = () => {
  const navigate = useNavigate();
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  let playlist = useSelector(selectPlaylist);
  const dummyData = [
    {
      _id: "1",
      thumbnailUrl:
        "https://marketplace.canva.com/EAFW7JwIojo/2/0/1600w/canva-red-colorful-tips-youtube-thumbnail-FxVVsqyawqY.jpg",
      title: "MBA/ PGDM Review 2024",
      rating: 4,
      ratedby: 10,
      sharedWith: 152,
      status: { viewed: true, rated: true, liked: true },
    },
    {
      _id: "2",
      thumbnailUrl:
        "https://miro.medium.com/v2/resize:fit:1200/1*60RQyL8WeifCvfJX8dQCcQ.jpeg",
      title: "How to Become a Lawyer",
      rating: 5,
      ratedby: 10,
      sharedWith: 152,
      status: { viewed: false, rated: true, liked: true },
    },
    {
      _id: "3",
      thumbnailUrl:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/boost-your-finances-youtube-thumbnail-design-template-6bd3aef9baa293adb41b026f3a2a452e_screen.jpg?ts=1694788258",
      title: "Taxes, Job Scope & PR",
      rating: 3,
      ratedby: 10,
      sharedWith: 152,
      status: { viewed: true, rated: true, liked: true },
    },
    {
      _id: "4",
      thumbnailUrl:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/boost-your-finances-youtube-thumbnail-design-template-6bd3aef9baa293adb41b026f3a2a452e_screen.jpg?ts=1694788258",
      title: "IIT Bombay Campus Tour",
      rating: 4,
      ratedby: 10,
      sharedWith: 152,
      status: { viewed: true, rated: true, liked: true },
    },
  ];
  playlist = dummyData;
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useState(false);

  useEffect(() => {
    if (!playlist?.length) {
      dispatchToRedux(getUserPlaylists({ userId, token }));
    }
  }, [userId, dispatchToRedux]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#E1E1E1" }}>
          ★
        </span>
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
    try {
      await dispatchToRedux(deletePlaylist({ userId, playlistId, token }));
      dispatchToRedux(notify({ type: "success", message: "Playlist deleted" }));
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const handleRemoveVideo = async (playlistId, videoId) => {
    try {
      await dispatchToRedux(
        removeVideoFromPlaylist({ userId, playlistId, videoId, token })
      );
      dispatchToRedux(notify({ type: "success", message: "Video removed" }));
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
            My Playlist
          </Typography>
          <GeneralButton
            onClick={handleCreatePlaylist}
            text="Create Playlist"
          />
        </Box>

        <Box
          sx={{
            height: "30vh",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          {playlist?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: fonts.sans, fontWeight: "600" }}
              >
                No Playlist Found
              </Typography>
            </Box>
          ) : (
            <Box sx={{ padding: "2rem" }}>
              <Grid container spacing={3}>
                {playlist?.map((video) => (
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
                        src={video.thumbnailUrl}
                        alt={video.title}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />

                      <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                        {video.title}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {renderStars(video.rating)}
                        <Typography
                          variant="body2"
                          sx={{ marginLeft: "0.5rem" }}
                        >
                          ({video.ratedby})
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{ color: "#777", marginTop: "0.5rem" }}
                      >
                        Shared with: {video.sharedWith} users
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
                            backgroundColor: video.status.viewed
                              ? "#720361"
                              : "#f8f8f8",
                            color: video.status.viewed ? "white" : "black",
                            textTransform: "none",
                          }}
                        >
                          {video.status.viewed ? "Viewed" : "Not Viewed"}
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: video.status.rated
                              ? "#720361"
                              : "#f8f8f8",
                            color: video.status.rated ? "white" : "black",
                            textTransform: "none",
                          }}
                        >
                          Rated
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: video.status.liked
                              ? "#720361"
                              : "#f8f8f8",
                            color: video.status.liked ? "white" : "black",
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
                        onClick={() =>
                          handleRemoveVideo(playlist._id, video._id)
                        }
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
