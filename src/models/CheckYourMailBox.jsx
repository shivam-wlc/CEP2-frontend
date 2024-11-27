import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fonts } from "../utility/fonts.js";

const CheckYourMailBox = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();
  const handleGoToLogin = () => {
    navigate("/login");
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          // p: 4,
          borderRadius: "25px",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(to top left, #720361, #bf2f75)",
            p: 3,
            borderRadius: "25px 25px 0 0",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              fontSize: "20px",
              fontFamily: fonts?.poppins,
            }}
          >
            Check Your Mailbox
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#787878",
            fontSize: "18px",
            fontFamily: fonts?.poppins,
            p: 3,
            fontsize: "1.5rem",
          }}
        >
          We have sent you a link to confirm your email address. Please check your mailbox and click the link
          to verify your email.
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "1rem",
            justifyContent: "space-evenly",
            p: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
              width: "25%",
              "&:hover": {
                background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
              },
              borderRadius: "2rem",
              padding: "10px 0px",
              fontWeight: "bold",
              color: "white",
            }}
            onClick={handleGoToLogin}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
              width: "25%",
              "&:hover": {
                background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
              },
              borderRadius: "2rem",
              padding: "10px 0px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CheckYourMailBox;
