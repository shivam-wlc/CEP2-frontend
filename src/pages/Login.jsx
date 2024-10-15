import React, { useState } from "react";
import { Box, Button, Checkbox, CircularProgress, Typography } from "@mui/material";
import { background, leftPannelAuth, Logo } from "../assets/assest.js";
import loginStyles from "../styles/Login.module.css";
import FormField from "../components/FormField.jsx";
import { fonts } from "../utility/fonts.js";
import { colors } from "../utility/color.js";
import { isValidEmail } from "../utility/validate.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice.js";
import { notify } from "../redux/slices/alertSlice.js";
import { getUserProfile } from "../redux/slices/profileSlice.js";

const Login = () => {
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    console.log("Hello ji");

    if (!formData.email || !formData.password) {
      return dispatchToRedux(notify({ type: "warning", message: "Please fill all the fields" }));
    }

    if (!isValidEmail(formData.email)) {
      return dispatchToRedux(notify({ type: "warning", message: "Please enter valid email" }));
    }

    try {
      setIsButtonLoading(true);
      const resultAction = await dispatchToRedux(login(formData));
      const userId = resultAction?.payload?.userId;
      const token = resultAction?.payload?.token;
      console.log(resultAction, "result");

      if (userId) {
        const gettingProfile = await dispatchToRedux(getUserProfile({ userId, token }));
        if (gettingProfile.meta.requestStatus === "fulfilled") {
          dispatchToRedux(notify({ type: "success", message: "Login Successful" }));
          setIsButtonLoading(false);
          navigate(`/workspace/${userId}`);
        }
      }
    } catch (error) {
      setIsButtonLoading(false);
      dispatchToRedux(notify({ type: "error", message: error?.message }));
    }
  };

  return (
    <>
      <Box
        sx={{
          //   border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundImage: `url(${background})`,
        }}
      >
        {/* Left and Right */}
        <Box sx={{ display: "flex", width: "100%", height: "100%" }} className={loginStyles.container}>
          <Box
            sx={{
              height: "100%",
              width: "50%",
              marginRight: "5rem",
              marginLeft: "2rem",
            }}
            className={loginStyles.left}
          >
            <img src={leftPannelAuth} alt="" height={"100%"} width={"100%"} />
          </Box>
          {/* Right */}
          <Box
            sx={{
              width: "45%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={loginStyles.right}
          >
            <Link to="/">
              <img src={Logo} alt="Logo" width={"300rem"} className={loginStyles.logo} />
            </Link>
            <Box
              sx={{
                backgroundColor: "#EDEDED",
                width: "75%",
                borderRadius: "2rem",
                alignItems: "center",
                boxShadow: "1px 1px 10px gray",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: "2rem",
                }}
              >
                Welcome back!
              </Typography>
              <Typography
                variant="p"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Please login to your account.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  padding: "2rem",
                }}
                className={loginStyles.formPadding}
              >
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  width="100%"
                  onChange={handleChange}
                  style={{ color: "#720361", background: "red" }}
                />
                <FormField
                  label="Passsword"
                  name="password"
                  type="password"
                  width="100%"
                  onChange={handleChange}
                  style={{ color: "#720361", background: "red" }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className={loginStyles.keepMeLoginSection}
                >
                  <Typography className={loginStyles.keepMeLoginText}>
                    <Checkbox /> Keep me logged In
                  </Typography>
                  <Link to="/forget-password" style={{ textDecoration: "none" }}>
                    <Typography
                      // align="right"
                      sx={{
                        // padding: 3,
                        color: "#FF8A00",
                        // marginRight: "25px",
                      }}
                    >
                      Forgot your password?
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {isButtonLoading ? (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundImage: "linear-gradient(to top left, #720361, #BF2F75)",
                        width: "50%",
                        "&:hover": {
                          backgroundImage: "linear-gradient(to top left, #740262, #d83b87)",
                        },
                        borderRadius: "2rem",
                        padding: "10px 0px",
                        fontWeight: "bold",
                        marginTop: "1rem",
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
                        backgroundImage: "linear-gradient(to top left, #720361, #BF2F75)",
                        width: "50%",
                        "&:hover": {
                          backgroundImage: "linear-gradient(to top left, #740262, #d83b87)",
                        },
                        borderRadius: "2rem",
                        padding: "10px 0px",
                        fontWeight: "bold",
                        marginTop: "1rem",
                      }}
                    >
                      Login
                    </Button>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    // width: "100%",
                    marginTop: "1rem",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Don&apos;t have an account?</Typography>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "#FF8A00",
                          fontFamily: fonts.authPage,
                        }}
                      >
                        Sign Up
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Icons */}
        </Box>
      </Box>
    </>
  );
};

export default Login;
