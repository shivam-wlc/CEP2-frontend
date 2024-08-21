import React, { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { fonts } from "../../utility/fonts.js";

const styles = {
  button: {
    backgroundColor: "#4E1A3D",
    padding: "10px",
    display: "flex",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "30px",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      //   backgroundColor: '#A99985',
      //   transition: 'background-color 0.5s',
    },
  },
  buttonHeading: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "500",
    fontFamily: fonts.sans,
  },
  buttonSubHeading: {
    color: "#F5F1ED",
    fontWeight: "400",
    fontFamily: fonts.poppins,
  },
};

const listItems = [
  "1. Discover your unique interests and preferences to find a career that truly aligns with your passions.",
  "2. Gain insights into potential career paths that match your strengths and inclinations.",
  "3. Explore new opportunities and industries you may not have considered before.",
  "4. Make informed decisions about your future career direction based on your personalized results.",
];

export default function PreTest({ hadnleChooseOption }) {
  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        width: "70%",
        height: "90%",
        borderRadius: "20px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#252323",
            fontSize: "30px",
            marginBottom: "20px",
            fontFamily: fonts.authPage,
            fontWeight: 600,
          }}
        >
          Discover Your Passion: Interest Profiler Assessment
        </Typography>
        <Typography
          sx={{
            color: "#70798C",
            fontFamily: fonts.ntr,
            fontWeight: 500,
            fontSize: "20px",
          }}
        >
          Uncover Your Ideal Career Path with Our Interest Profiler assessment
          and Find Your Passion Today!
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "40%",
        }}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            {/* <Box
              sx={styles.button}
              onClick={() => {
                setLoading(true);
                hadnleChooseOption('questions');
              }}
            >
              <Typography sx={styles.buttonHeading}>Career Dive</Typography>
              <Typography sx={styles.buttonSubHeading}>Contains 60 Questions</Typography>
            </Box> */}
            <Box
              sx={styles.button}
              onClick={() => {
                setLoading(true);
                hadnleChooseOption("questions_30");
              }}
            >
              <Typography sx={styles.buttonHeading}>Career Peek</Typography>
              <Typography sx={styles.buttonSubHeading}>
                Contains 30 Questions
              </Typography>
            </Box>
          </>
        )}
        <Typography
          sx={{
            color: "#FAFAFA",
            marginTop: "10px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <u>Read Instructions</u>
        </Typography>
      </Box>
      <Box
        sx={{
          //   boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          padding: "10px",
          //   backdropFilter: 'blur(60px)',
          marginTop: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#252323",
            fontFamily: fonts.authPage,
            textAlign: "center",
            margin: "10px 0",
          }}
        >
          Why take this test?
        </Typography>
        <List component="ol">
          {listItems.map((item, index) => (
            <ListItem
              sx={{
                color: "#70798C",
                fontFamily: fonts.ntr,
              }}
              key={index}
              component="li"
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
