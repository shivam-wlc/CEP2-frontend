import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserProfile,
  updatePaymentStatus,
} from "../redux/slices/profileSlice.js";
import { selectUserId, selectToken } from "../redux/slices/authSlice.js";
import Headers from "../components/Headers.jsx";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        navigate(
          `/interest-profiler/result?answers=${userData?.assessment30?.answers}`
        );
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
