import { Button, CircularProgress, Container, MenuItem, Modal, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { notify } from "../redux/slices/alertSlice.js";
import { addVideoToPlaylist, getUserPlaylists, selectPlaylist } from "../redux/slices/userSlice.js";
import { fonts } from "../utility/fonts.js";

const AddVideoToPlaylistModal = ({ open, onClose, videoId, userId, authenticated, token }) => {
  const dispatchToRedux = useDispatch();
  const playlists = useSelector(selectPlaylist);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    if (!playlists.length && authenticated) {
      dispatchToRedux(getUserPlaylists({ userId, token }));
    }
  }, [userId]);

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylist) {
      dispatchToRedux(notify({ type: "error", message: "Please select a playlist" }));
      return;
    }

    try {
      setIsButtonLoading(true);
      const addingPlyistResponse = await dispatchToRedux(
        addVideoToPlaylist({
          playlistId: selectedPlaylist,
          videoId,
          userId,
          token,
        }),
      );

      setIsButtonLoading(false);
      onClose();
      if (addingPlyistResponse.payload.message) {
        dispatchToRedux(notify({ type: "success", message: "Video added to playlist" }));
      }
    } catch (error) {
      setIsButtonLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: "10vh",
          padding: "1rem",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: "1rem",
            fontFamily: fonts.sans,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Add to Playlist
        </Typography>
        <Select
          value={selectedPlaylist}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
          fullWidth
          sx={{ marginBottom: "1rem", fontFamily: fonts.sans }}
        >
          {playlists?.map((playlist) => (
            <MenuItem key={playlist._id} value={playlist._id}>
              {playlist.name}
            </MenuItem>
          ))}
        </Select>
        <Button
          fullWidth
          variant="contained"
          sx={{
            fontFamily: "Poppins, sans-serif",
            marginTop: "1rem",
            backgroundColor: "black",
            color: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          onClick={handleAddToPlaylist}
          disabled={!selectedPlaylist}
        >
          {isButtonLoading ? <CircularProgress color="inherit" /> : "Add"}
        </Button>
      </Container>
    </Modal>
  );
};

export default AddVideoToPlaylistModal;
