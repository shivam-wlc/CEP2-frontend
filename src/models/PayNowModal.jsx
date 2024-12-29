import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { fonts } from "../utility/fonts.js";

const PayNowModal = ({ open, onClose }) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleProceed = () => {
    // Add your logic for Proceed button here
    console.log("Proceeding to payment...");
  };

  const handleCancel = () => {
    onClose(); // Close the modal when Cancel is clicked
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "10px",
          p: 3,
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
          Please click below to be directed to the Payment page. If you have a School Code please enter it in
          the COUPON box and the Payment due will be adjusted on Checkout.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleProceed}
            sx={{
              fontFamily: "Poppins, sans-serif",
              background: "linear-gradient(to right, #720361, #bf2f75)",
              color: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.5rem",
              "&:hover": {
                background: "linear-gradient(to right, #720361, #bf2f75)",
              },
            }}
          >
            {isButtonLoading ? <CircularProgress color="inherit" size={24} /> : "Proceed"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleCancel}
            sx={{
              fontFamily: "Poppins, sans-serif",
              borderColor: "#720361",
              color: "#720361",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.5rem",
              "&:hover": {
                borderColor: "#bf2f75",
                color: "#bf2f75",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PayNowModal;
