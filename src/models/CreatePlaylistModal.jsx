import { Box, Button, CircularProgress, Container, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import GeneralButton from "../components/general/GeneralButton.jsx";
import { notify } from "../redux/slices/alertSlice.js";
// import { createPlaylist } from "../redux/slices/userSlice.js";
import { createPlaylist } from "../redux/slices/playlistSlice.js";
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
      await dispatchToRedux(createPlaylist({ playlistName, userId, token }));

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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "#F9FAFB", // Light gray background for better contrast
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
          borderRadius: "20px",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: "1.5rem",
              fontFamily: fonts.sans,
              fontWeight: "bold",
              textAlign: "center",
              color: "#333", // Darker text for readability
            }}
          >
            CREATE PLAYLIST
          </Typography>
          <TextField
            label="Playlist Name"
            variant="outlined"
            fullWidth
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            sx={{
              marginBottom: "1.5rem",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#bf2f75", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#720361", // Hover effect
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#720361", // Focused state
                },
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1.5rem",
            }}
          >
            {isButtonLoading ? (
              <Button
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "#720361",
                  color: "white",
                  padding: "0.7rem 1.5rem",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#bf2f75",
                  },
                }}
              >
                <CircularProgress color="inherit" size={25} />
              </Button>
            ) : (
              <Button
                onClick={handleCreatePlaylist}
                sx={{
                  background: "linear-gradient(to right, #720361, #bf2f75)",
                  color: "white",
                  padding: "0.7rem 2rem",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1rem",
                  "&:hover": {
                    background: "linear-gradient(to right, #bf2f75, #720361)",
                  },
                }}
              >
                Create
              </Button>
            )}
            <Button
              onClick={onClose}
              sx={{
                background: "linear-gradient(to right, #720361, #bf2f75)",
                color: "white",
                padding: "0.7rem 2rem",
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  background: "linear-gradient(to right, #bf2f75, #720361)",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};

export default CreatePlaylistModal;
