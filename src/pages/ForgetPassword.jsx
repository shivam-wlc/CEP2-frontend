import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { background, leftPannelAuth, Logo } from "../assets/assest.js";
import FormField from "../components/FormField";
import { notify } from "../redux/slices/alertSlice.js";
import { forgetPass } from "../redux/slices/authSlice";
import { isValidEmail } from "../utility/validate";
import loginStyles from "../styles/Login.module.css";

const ForgetPassword = () => {
  const dispatchToRedux = useDispatch();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // Your form submission logic here
    e.preventDefault();
    try {
      if (!formData.email) {
        dispatchToRedux(notify({ type: "warning", message: "Please enter your email" }));
        return;
      }
      if (!isValidEmail(formData.email)) {
        dispatchToRedux(notify({ type: "warning", message: "Please enter valid email" }));
        return;
      }

      const email = formData.email;
      setIsButtonLoading(true);
      await dispatchToRedux(forgetPass({ email })).unwrap();
      setIsButtonLoading(false);
    } catch (error) {
      setIsButtonLoading(false);
      dispatchToRedux(
        notify({
          type: "error",
          message: "Something went wrong, Please Try Again",
        }),
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: { xs: "90vh", md: "100vh" },
          backgroundImage: `url(${background})`,
        }}
      >
        {/* Left and Right */}
        <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
          {/* Left  */}
          <Box
            sx={{
              height: "100vh",
              width: "50%",
              marginLeft: "5rem",
              display: { xs: "none", md: "block" },
            }}
          >
            <img src={leftPannelAuth} alt="Forget Password ?" height={"100%"} />
          </Box>
          {/* Right */}
          <Box
            sx={{
              width: { xs: "100%", md: "476px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto", // Center the box horizontally
              boxSizing: "border-box",
              marginBottom: { xs: "3rem", md: "0" },
            }}
            className={loginStyles.right}
          >
            <Link to="/">
              <Box marginBottom={"1rem"}>
                <img src={Logo} alt="Logo" width={"210px"} className={loginStyles.logo} />
              </Box>
            </Link>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                width: { xs: "90%", md: "476px" },
                borderRadius: "29px",
                alignItems: "center",
                boxShadow: "0px 14px 44px 0px #0000001A",
                paddingBottom: "2rem",
                paddingTop: "1rem",
              }}
            >
              <Box>
                <Box>
                  <h3
                    style={{
                      fontWeight: "bold",
                      margin: "auto",
                      fontSize: "35px",
                      width: "fit-content",
                    }}
                  >
                    Forgot Password
                  </h3>
                  <p
                    style={{
                      margin: "auto",

                      color: "#787878",
                      fontSize: "16px",
                      width: "fit-content",
                    }}
                  >
                    Don't worry, we've got you covered!
                  </p>
                  <p
                    style={{
                      margin: "auto",
                      marginTop: ".8rem",
                      color: "#787878",
                      fontSize: "16px",
                      width: "80%",
                      textAlign: "center",
                    }}
                  >
                    Please enter the email address you used to create your CareerExplorer account to reset
                    your password.
                  </p>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                    padding: "2rem",
                  }}
                >
                  <FormField label="Email" name="email" type="email" width="100%" onChange={handleChange} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    {isButtonLoading ? (
                      <Button
                        variant="contained"
                        sx={{
                          background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
                          width: "50%",
                          "&:hover": {
                            background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
                          },
                          borderRadius: "2rem",
                          padding: "10px 0px",
                          fontWeight: "bold",
                        }}
                      >
                        <CircularProgress size={25} color="inherit" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={isButtonLoading}
                        sx={{
                          background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
                          width: "50%",
                          "&:hover": {
                            background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
                          },
                          borderRadius: "2rem",
                          padding: "10px 0px",
                          fontWeight: "bold",
                        }}
                      >
                        Send Link
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
