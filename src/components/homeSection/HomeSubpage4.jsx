import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ImageIcon4 from "../../assets/icons/H4E1.png";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const HomeSubpage4 = () => {
  return (
    <Box
      sx={{
        // border: "2px solid red",
        height: "100vh",
        display: "flex",
        // justifyContent: "space-between",
        // width:"100%"
      }}
    >
      <Box
        sx={{
          // border: "1px solid black",
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "2rem",
        }}
      >
        <img src={ImageIcon4} alt="Image icon 4" width={"60%"} />
      </Box>
      <Box
        sx={{
          // border: "1px solid black",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <Box
          sx={{
            // border: "1px solid green ",
            width: "60%",
            marginTop: 25,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", lineHeight: "3.7rem" }}
          >
            Does your <span style={{ color: "#85031F" }}>SKILLS</span> match
            your employer’s{" "}
            <span style={{ color: "#85031F" }}>EXPECTATION</span>?
          </Typography>
          <Button
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.3rem",
              mt: 5,
              backgroundColor: "#4E1A3D",
              padding: "0px 0px",
              paddingLeft: "1rem",
              borderRadius: 8,
              "&:hover": {
                backgroundColor: "#4E1A3D",
              },
              textTransform: "none",
            }}
          >
            Start the career test
            <ArrowCircleRightIcon
              sx={{ fontSize: "3.5rem", marginLeft: "8px" }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeSubpage4;
