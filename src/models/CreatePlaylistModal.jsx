import { Box, Button, CircularProgress, Container, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import GeneralButton from "../components/general/GeneralButton.jsx";
import { notify } from "../redux/slices/alertSlice.js";
import { createPlaylist } from "../redux/slices/userSlice.js";
import { fonts } from "../utility/fonts.js";

const CreatePlaylistModal = ({ open, onClose, userId, token }) => {
  const dispatchToRedux = useDispatch();
  const [playlistName, setPlaylistName] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleCreatePlaylist = async () => {
    if (!playlistName) {
      dispatchToRedux(notify({ type: "error", message: "Playlist name is required" }));
      return;
    }

    try {
      setIsButtonLoading(true);
      await dispatchToRedux(createPlaylist({ name: playlistName, userId, token }));

      setIsButtonLoading(false);
      setPlaylistName("");
      onClose();
      dispatchToRedux(notify({ type: "success", message: "Playlist created successfully" }));
    } catch (error) {
      setIsButtonLoading(false);
      setPlaylistName("");
      console.error("Error creating playlist:", error);
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
          Create Playlist
        </Typography>
        <TextField
          label="Playlist Name"
          variant="outlined"
          fullWidth
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          sx={{ marginBottom: "1rem", fontFamily: fonts.sans }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          {isButtonLoading ? (
            <>
              <Button
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
              >
                <CircularProgress color="inherit" size={25} />
              </Button>
            </>
          ) : (
            <GeneralButton onClick={handleCreatePlaylist} text="Create" />
          )}
          <GeneralButton onClick={onClose} text="Close" />
        </Box>
      </Container>
    </Modal>
  );
};

export default CreatePlaylistModal;
