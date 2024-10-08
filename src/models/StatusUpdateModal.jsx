import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { fonts } from "../utility/fonts.js";

const StatusUpdateModal = ({ isOpen, onClose, onSubmit, isButtonLoading }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSubmit = () => {
    onSubmit(selectedStatus);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          p: 2,
          textAlign: "center",
          margin: "auto",
        }}
      >
        <Typography variant="h6" component="h2">
          Update Status
        </Typography>
        <TextField
          select
          label="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="blocked">Blocked</MenuItem>
        </TextField>
        {isButtonLoading ? (
          <Button
            variant="contained"
            sx={{
              fontFamily: fonts.poppins,
              mt: 2,
              backgroundColor: "black",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.5rem",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            <CircularProgress color="inherit" size={25} />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              fontFamily: fonts.poppins,
              mt: 2,
              backgroundColor: "black",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.5rem",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Submit
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default StatusUpdateModal;
