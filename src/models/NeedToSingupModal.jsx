import { Divider, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

import GeneralButton from "../components/general/GeneralButton";
import { fonts } from "../utility/fonts";

const NeedToSingupModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const handleSingup = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="auth-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: fonts.sans,
              fontWeight: "600",
              textAlign: "center",
              paddingBottom: "1rem",
            }}
          >
            Authentication Required
            <Divider />
          </Typography>

          <Typography
            id="auth-modal-description"
            variant="body1"
            gutterBottom
            sx={{
              fontFamily: fonts.sans,
              textAlign: "center",
              paddingBottom: "1rem",
            }}
          >
            To access this content, please sign up or log in.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <GeneralButton onClick={handleSingup} text="Signup" />
            <GeneralButton onClick={handleLogin} text="Login" />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NeedToSingupModal;
