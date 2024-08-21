import React from "react";
import { TextField, Typography } from "@mui/material";

const FormField = ({ label, name, type = "text", onChange }) => {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          marginLeft: "10%",
          fontSize: "0.8rem",
        }}
      >
        {label}
      </Typography>
      <TextField
        variant="standard"
        sx={{
          width: "80%",
          margin: "auto",
          borderRadius: 10,
          backgroundColor: "#BEBEBE",
          padding: 1.3,
          paddingLeft: "4%",
        
        }}
        InputLabelProps={{
          shrink: false,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        fullWidth
        margin="normal"
        name={name}
        type={type}
        onChange={onChange}
      />
    </>
  );
};

export default FormField;
