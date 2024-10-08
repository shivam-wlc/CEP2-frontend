import { Button } from "@mui/material";
import React from "react";

const GeneralButton = ({ onClick, text }) => {
  return (
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
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default GeneralButton;
