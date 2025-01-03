import React from "react";
import { Box, Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Google, Instagram } from "@mui/icons-material";
import { assessmentHeaderImg } from "../../assets/assest.js";
import resumeBuilderStyles from "../../styles/ResumeBuilder.module.css";
import Headers from "../Headers.jsx";
import Footer from "../Footer.jsx";
import { fonts } from "../../utility/fonts.js";
import { inputFieldStyle, buttonStyle } from "../../utility/commonStyle.js";

const ContactUs = () => {
  return (
    <div>
      <section
        className={resumeBuilderStyles["header"]}
        style={{ backgroundImage: `url(${assessmentHeaderImg})` }}
      >
        <Headers />
        <h2>Get in Touch</h2>
      </section>
      <Box
        sx={{
          //   backgroundColor: "#f5f5f5",
          backgroundColor: "white",

          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "800px",
          margin: "auto",
          mt: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", color: "gray", mb: 4, fontFamily: fonts.poppins }}
        >
          Fill out the form below to get in touch with Admin
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              sx={{ ...inputFieldStyle, width: "100%" }}
              placeholder="Please enter first name..."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              sx={{ ...inputFieldStyle, width: "100%" }}
              placeholder="Please enter last name..."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              sx={{ ...inputFieldStyle, width: "100%" }}
              placeholder="Please enter email..."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              sx={{ ...inputFieldStyle, width: "100%" }}
              placeholder="Please enter phone number..."
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="What do you have in mind?"
              fullWidth
              multiline
              rows={4}
              sx={{
                ...inputFieldStyle,
                width: "100%",
                "& .MuiInputBase-input": {
                  fontFamily: fonts.poppins,
                },
              }}
              placeholder="Please enter query..."
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              ...buttonStyle,
              fontFamily: fonts.poppins,
              mt: 2,
              fontWeight: "bold",
              padding: "0.8rem",
              width: "50%",
            }}
          >
            Submit
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 3,
          }}
        >
          <IconButton>
            <Twitter color="primary" />
          </IconButton>
          <IconButton>
            <Facebook color="primary" />
          </IconButton>
          <IconButton>
            <Google color="error" />
          </IconButton>
          <IconButton>
            <Instagram color="secondary" />
          </IconButton>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default ContactUs;
