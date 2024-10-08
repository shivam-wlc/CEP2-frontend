import { Box, Typography } from "@mui/material";
import React from "react";

import { colors } from "../utility/color.js";
import { fonts } from "../utility/fonts.js";

const FirstView = ({ icon, numbers, title }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "150px",
        backgroundColor: "white",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        p: 1,
        "& img": {
          width: "80px",
          height: "80px",
          "@media (max-width:600px)": {
            width: "50px",
            height: "50px",
          },
        },
        "& h6": {
          fontFamily: fonts.poppins,
          fontWeight: "600",
          margin: 0,
        },
        "& p": {
          fontFamily: fonts.poppins,
          fontWeight: "600",
          color: colors.midGray,
          margin: 0,
        },
      }}
    >
      <img src={icon} alt="users" />
      <Box>
        <Typography variant="h6">{numbers}</Typography>
        <Typography variant="body1">{title}</Typography>
      </Box>
    </Box>
  );
};

export default FirstView;
