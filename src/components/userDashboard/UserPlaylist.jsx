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
  const playlist = useSelector(selectPlaylist);
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useState(false);

  useEffect(() => {
    if (!playlist.length) {
      dispatchToRedux(getUserPlaylists({ userId, token }));
    }
  }, [userId]);

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
            playlist?.map((playlist) => (
              <Accordion key={playlist._id} sx={{ backgroundColor: "#FDFBFA" }}>
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: "black", fontSize: "35px" }} />
                  }
                >
                  <Typography
                    sx={{
                      fontFamily: fonts.sans,
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginRight: "1rem",
                      width: "30%",
                    }}
                  >
                    {playlist.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fonts.sans,
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginRight: "1rem",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    ({playlist.videos.length} videos)
                  </Typography>
                  <IconButton
                    sx={{
                      fontFamily: fonts.sans,
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginRight: "1rem",
                      width: "20%",
                    }}
                    onClick={() => handleDeletePlaylist(playlist._id)}
                    aria-label="delete"
                  >
                    <DeleteIcon sx={{ color: "black" }} />
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {playlist.videos.map((video, index) => (
                      <Box
                        key={video._id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <Typography
                          onClick={() => navigate(`/video/${video._id}`)}
                          sx={{
                            fontFamily: fonts.sans,
                            marginRight: "3rem",
                            width: "90%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                          }}
                        >
                          {`${index + 1}. ${video.title} `}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            handleRemoveVideo(playlist._id, video._id)
                          }
                          aria-label="remove"
                        >
                          <CloseIcon sx={{ color: "red" }} />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))
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
