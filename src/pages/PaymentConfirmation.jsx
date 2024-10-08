import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Headers from "../components/Headers.jsx";
import { selectToken, selectUserId } from "../redux/slices/authSlice.js";
import { selectUserProfile, updatePaymentStatus } from "../redux/slices/profileSlice.js";

const PaymentConfirmation = () => {
  const dispatchToRedux = useDispatch();
  const userData = useSelector(selectUserProfile);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await dispatchToRedux(updatePaymentStatus({ userId, token }));
      setTimeout(() => {
        navigate(`/interest-profiler/result?answers=${userData?.assessment30?.answers}`);
      }, 3000); // 3000 milliseconds = 3 seconds for demonstration
    };

    fetchData();
  }, [dispatchToRedux, userId, navigate, userData, token]);

  return (
    <Box>
      <Headers />

      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5">
          Payment Completed. You will be redirected to full results shortly.
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentConfirmation;
