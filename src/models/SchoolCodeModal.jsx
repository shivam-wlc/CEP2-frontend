import React, { useState } from "react";

import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";

import { fonts } from "../utility/fonts.js";

const SchoolCodeModal = ({ open, onClose }) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleProceed = () => {
    console.log("Proceeding to payment...");
  };

  const handleCancel = () => {
    onClose();
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
          If you have a School Code please enter it in the COUPON box and the Payment due will be adjusted on
          Checkout.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleCancel}
            sx={{
              fontFamily: "Poppins, sans-serif",
              borderColor: "#720361",
              color: "#720361",
              padding: "0.5rem 1.5rem",
              borderRadius: "90px",
              "&:hover": {
                borderColor: "#bf2f75",
                color: "#bf2f75",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleProceed}
            sx={{
              fontFamily: "Poppins, sans-serif",
              background: "linear-gradient(to right, #720361, #bf2f75)",
              color: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "90px",
              "&:hover": {
                background: "linear-gradient(to right, #720361, #bf2f75)",
              },
            }}
          >
            {isButtonLoading ? <CircularProgress color="inherit" size={24} /> : "Proceed"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SchoolCodeModal;
