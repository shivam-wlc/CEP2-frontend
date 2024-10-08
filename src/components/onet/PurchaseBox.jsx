import { Box, Button, Typography } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

import { config } from "../../config/config.js";
import { selectUserId } from "../../redux/slices/authSlice.js";
import { fonts } from "../../utility/fonts.js";

const PurchaseBox = () => {
  const userId = useSelector(selectUserId);
  const product = {
    id: "assessment30",
    productName: "Interest Profiler",
    description: "Unlock Your Full Results",
    price: 25,
    currency: "USD",
  };

  const handlePurchase = () => {
    console.log("puchase click");
    // makePayment();
    handlePayment();
  };

  const handlePayment = () => {
    window.location.href = "https://buy.stripe.com/test_6oE6pifFZ08d58c4gh";
  };

  //   const makePayment = async () => {
  //     const stripe = await loadStripe(
  //       "pk_test_51PBCWbSAamJ9jNQR1kt1RpifetEjgGfBeekWx56KhYFqUTv3Ua2hXrpQj6rd1PE5QW7FruBCUeeMhXgyeVO88Za6002BC8PQ4P"
  //     );

  //     const response = await fetch(
  //       `${config.api}/api/stripe/create-checkout-session`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ product, userId }),
  //       }
  //     );

  //     const session = await response.json();
  //     console.log(session);
  //     const final = stripe.redirectToCheckout({ sessionId: session.id });

  //     if (final.error) {
  //       console.log(final.error);
  //     }
  //   };

  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: fonts.sans,
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Unlock Your Full Results!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: fonts.sans,
          color: "text.secondary",
          fontSize: "16px",
          marginBottom: "1rem",
        }}
      >
        Discover your complete career profile and get personalized insights into your ideal career paths.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: fonts.sans,
          color: "text.secondary",
          fontSize: "16px",
          marginBottom: "1rem",
        }}
      >
        To see your full results, purchase now for just $25!
      </Typography>
      <Button
        onClick={handlePurchase}
        variant="contained"
        color="primary"
        sx={{ textTransform: "none", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Purchase Now
      </Button>
    </Box>
  );
};

export default PurchaseBox;
