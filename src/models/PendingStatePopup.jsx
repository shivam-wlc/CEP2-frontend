import React, { useState } from "react";
import { Box, Typography, Backdrop, Divider } from "@mui/material";
import { fonts } from "../utility/fonts.js";
import GeneralButton from "../components/general/GeneralButton.jsx";
import { useNavigate } from "react-router-dom";

const PendingStatePopup = () => {
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpenBackdrop(false);
    navigate("/");
  };

  return (
    <div>
      <div>
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
          open={openBackdrop}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "20px",
            width: "40%",
            textAlign: "center",
            borderRadius: 5,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontFamily: fonts.sans, fontWeight: "600" }}
            >
              Your Creator Account is in Pending State
            </Typography>
          </Box>
          <Divider sx={{ width: "70%", margin: "10px 0" }} />

          <Typography
            variant="body1"
            sx={{ padding: "10px", margin: "10px 0" }}
          >
            Click Below to go to Home page
          </Typography>
          <GeneralButton onClick={handleClick} text="Home" />
        </Box>
      </div>
    </div>
  );
};

export default PendingStatePopup;
