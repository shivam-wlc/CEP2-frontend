import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ImageIcon1 from "../../assets/icons/H1E1.1.png";
import ImageIcon2 from "../../assets/icons/H1E1.2.png";
import ImageIcon3 from "../../assets/icons/H1E1.3.png";
import ImageIcon4 from "../../assets/icons/H1E1.4.png";
import ImageIcon5 from "../../assets/icons/H1E1.5.png";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const HomeSubpage1 = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // border: "1px solid red",
          width: "100%",
          // height: "92vh",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <img
          src={ImageIcon1}
          alt="ImageIcon1"
          style={{
            position: "absolute",
            top: "20rem",
            left: "-15rem",
            zIndex: -1,
          }}
        />
        <img
          src={ImageIcon2}
          alt="ImageIcon2"
          style={{
            position: "absolute",
            top: "35rem",
            left: "12rem",
            zIndex: -1,
          }}
        />
        <img
          src={ImageIcon3}
          alt="ImageIcon3"
          style={{
            position: "absolute",
            top: "7rem",
            left: "38rem",
            zIndex: -1,
          }}
        />
        <img
          src={ImageIcon4}
          alt="ImageIcon4"
          style={{
            position: "absolute",
            top: "8rem",
            left: "80rem",
            zIndex: -1,
          }}
        />
        <img
          src={ImageIcon5}
          alt="ImageIcon5"
          style={{
            position: "absolute",
            top: "25rem",
            left: "80rem",
            zIndex: -1,
          }}
        />
        <Typography
          // variant="h1"
          sx={{
            zIndex: 1,
            // border: "1px solid red",
            width: "60%",
            fontSize: "70px",
            letterSpacing: "2px",
            lineHeight: "80px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Where ideas become tangible.
          <br />
          <Button
            sx={{
              backgroundColor: "#4E1A3D",
              color: "#fff",
              borderRadius: 5,
              padding: "5px 0 5px 20px",
              fontWeight: "bold",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#4E1A3D",
              },
              fontSize: "16px",
            }}
          >
            Learn More
            <ArrowCircleRightIcon
              sx={{
                ml: "60px",
                fontSize: "40px",
                marginY: "-5px",
                marginX: "-8px",
                paddingX: "10px",
              }}
            />
          </Button>
        </Typography>
      </Box>
    </>
  );
};

export default HomeSubpage1;
