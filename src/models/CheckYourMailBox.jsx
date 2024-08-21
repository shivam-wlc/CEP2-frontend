import React from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import { fonts } from "../utility/fonts.js";
import { colors } from "../utility/color.js";
import GeneralButton from "../components/general/GeneralButton";
import { useNavigate } from "react-router-dom";

const CheckYourMailBox = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();
  const handleGoToLogin = () => {
    navigate("/login");
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
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
          Check Your Mailbox
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
          We have sent you a link to confirm your email address. Please check
          your mailbox and click the link to verify your email.
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "1rem",
            justifyContent: "space-evenly",
          }}
        >
          <GeneralButton text="Login" onClick={handleGoToLogin} />
          <GeneralButton text="Close" onClick={handleClose} />
        </Box>
      </Box>
    </Modal>
  );
};

export default CheckYourMailBox;
