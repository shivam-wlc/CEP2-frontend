import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { config } from "../config/config.js";

const EmailVerification = () => {
  //   let { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  let token;
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    token = searchParams.get("token");
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${config.api}/api/auth/verify-email?token=${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setVerificationStatus(data.message);
          setIsLoading(false);
          // Redirect to login page after successful verification
          setTimeout(() => {
            navigate("/login");
          }, 3000); // Redirect after 3 seconds (adjust as needed)
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Email verification error:", error.message);
        setVerificationStatus("Error verifying email");
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box
          p={2}
          sx={{
            height: "200px",
            width: "500px",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Account Verification
          </Typography>
          <Typography variant="h5" gutterBottom>
            Email Verification Status
          </Typography>
          <Typography variant="body2">{verificationStatus}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default EmailVerification;
