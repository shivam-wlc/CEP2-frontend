import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import React from "react";

import GeneralButton from "../components/general/GeneralButton.jsx";

const DeleteModal = ({ open, onClose, onDelete, title, text, fonts, colors, isButtonLoading }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          padding: "10px",
          width: ["80%", "50%", "35%"],
          borderRadius: "5px",
          gap: "12px",
          position: "relative",
          paddingBottom: "10px",
        }}
      >
        <Typography
          sx={{
            color: colors?.darkGray,
            textAlign: "left",
            fontSize: "20px",
            paddingTop: "20px",
            paddingBottom: "10px",
            fontWeight: "bold",
            fontFamily: fonts?.sans,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "#000",
            fontSize: "18px",
            paddingTop: "0px",
            paddingLeft: "10px",
            paddingBottom: "30px",
            fontFamily: fonts?.sans,
          }}
        >
          {text}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            paddingBottom: "20px",
          }}
        >
          {isButtonLoading ? (
            <>
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "black",
                  color: "white",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "0.5rem",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                <CircularProgress size={25} color="inherit" />
              </Button>
            </>
          ) : (
            <GeneralButton onClick={handleDelete} text="Delete" />
          )}

          <GeneralButton onClick={onClose} text="Cancel" />
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
