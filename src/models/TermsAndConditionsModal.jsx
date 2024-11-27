import React, { useState } from "react";
import { Modal, Typography, Box, Checkbox, FormControlLabel, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const TermsAndConditionsModal = ({ open, handleClose, handleAgree }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          //   border: "2px solid #000",
          boxShadow: 24,
          //   p: 4,
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
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
            Terms & Conditions
          </Typography>
        </Box>
        <Typography sx={{ mt: 2, paddingLeft: "2rem" }}>
          By signing up, you agree to our Terms and Conditions. Please review them carefully before
          proceeding.{" "}
          <Link to="/terms-and-conditions">
            {" "}
            <span style={{ cursor: "pointer", color: "blue", fontSize: "14px" }}> Read more...</span>
          </Link>
        </Typography>

        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
          label="I agree to the Terms and Conditions"
          sx={{ paddingLeft: "2rem" }}
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", p: 4 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
              width: "30%",
              "&:hover": {
                background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
              },
              borderRadius: "2rem",
              padding: "10px 0px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
              width: "40%",
              "&:hover": {
                background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
              },
              borderRadius: "2rem",
              padding: "10px 0px",
              fontWeight: "bold",
              color: "white",
            }}
            onClick={() => handleAgree(isChecked)}
            disabled={!isChecked}
          >
            Agree & Continue
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsAndConditionsModal;
