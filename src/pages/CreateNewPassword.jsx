import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import { Logo } from "../assets/assest.js";
import AuthIcon1 from "../assets/icons/AuthIcon1.png";
import AuthIcon2 from "../assets/icons/AuthIcon2.png";
import AuthIcon3 from "../assets/icons/AuthIcon3.png";
import FormField from "../components/FormField";
import { notify } from "../redux/slices/alertSlice.js";
import { forgetPassVerify } from "../redux/slices/authSlice";
import { colors } from "../utility/color.js";
import { checkPassStrength } from "../utility/validate";

const CreateNewPassword = () => {
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.newPassword || !formData.confirmNewPassword) {
      return dispatchToRedux(notify({ type: "warning", message: "Please fill all the fields" }));
    }

    if (!checkPassStrength(formData.newPassword)) {
      return dispatchToRedux(notify({ type: "warning", message: "Password is too weak" }));
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      return dispatchToRedux(notify({ type: "warning", message: "Passwords do not match" }));
    }
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get("user");
    const token = searchParams.get("token");

    try {
      setIsButtonLoading(true);
      const response = await dispatchToRedux(
        forgetPassVerify({
          password: formData.newPassword,
          confirmPassword: formData.confirmNewPassword,
          userId: user,
          token,
        }),
      );

      if (response.payload.ok) {
        dispatchToRedux(
          notify({
            type: "success",
            message: "Password reset successfully, login to continue",
          }),
        );
        navigate("/login");
      }
      setIsButtonLoading(false);
    } catch (error) {
      setIsButtonLoading(false);
      dispatchToRedux(notify({ type: "error", message: error.data.message }));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo  */}
        <Box
          component={Link}
          to="/"
          sx={{
            position: "relative",
            marginBottom: "20px",
            padding: "2rem",
            overflowZ: "hidden",
          }}
        >
          <img src={Logo} alt="Logo" width={"13%"} />

          {/* Icons  */}
          {/* Icons1  */}
          <Box
            sx={{
              position: "absolute",
              top: "350%",
              left: "60%",
              transform: "translate(-50%, -50%)",
              zIndex: -1,
            }}
          >
            <img src={AuthIcon1} alt="Auth Icon 1" width={"40%"} />
          </Box>

          {/* Icons2  */}
          <Box
            sx={{
              position: "absolute",
              top: "500%",
              left: "35%",
              transform: "translate(50%, 50%)",
              rotate: "180deg",
              zIndex: 1,
            }}
          >
            <img src={AuthIcon2} alt="Auth Icon 2" width={"50%"} />
          </Box>

          {/* Icons3  */}
          <Box
            sx={{
              position: "absolute",
              top: "570%",
              left: "10%",
              //   transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <img src={AuthIcon3} alt="Auth Icon 3" width={"40%"} />
          </Box>

          {/* Icons4  */}
          <Box
            sx={{
              position: "absolute",
              top: "300%",
              left: "-1%",
              //   transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <img src={AuthIcon1} alt="Auth Icon 1" width={"25%"} />
          </Box>

          {/* Icons5  */}

          <Box
            sx={{
              position: "absolute",
              bottom: "-15%",
              right: "0%",
              zIndex: 1,
            }}
          >
            <img src={AuthIcon2} alt="Auth Icon 2" width={"60%"} />
          </Box>
          {/* Icons6  */}

          <Box
            sx={{
              position: "absolute",
              top: "-40%",
              left: "45%",
              zIndex: 1,
            }}
          >
            <img src={AuthIcon1} alt="Auth Icon 1" width={"20%"} />
          </Box>
        </Box>
        {/* Left and Right */}
        <Box sx={{ display: "flex", width: "100%" }}>
          {/* Left  */}
          <Box
            sx={{
              //   border: "1px solid black",
              flex: "1",
              marginRight: "10px",
              // height: "80vh",
            }}
          >
            <Box
              sx={{
                padding: "1.5rem",
                // border: "1px solid blue",
                width: "60%",
                marginLeft: "9rem",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  lineHeight: "4rem",
                }}
              >
                Forgot Your Password
              </Typography>
              <Box sx={{ border: "2px solid black", marginTop: "1.5rem" }}></Box>
            </Box>
          </Box>

          {/* Right */}
          <Box
            sx={{
              //   border: "1px solid black",
              flex: "1",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#EDEDED",
                width: "75%",
                margin: "auto",
                marginTop: "-2rem",
                borderRadius: "2rem",
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingTop: "2rem",
                    width: "70%",
                    margin: "auto",
                    letterSpacing: "0.5px",
                    lineHeight: "1.2rem",
                  }}
                >
                  Don&apos;t worry, we&apos;ve got you covered!
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                    padding: "2rem",
                  }}
                >
                  <FormField label="EMAIL" name="email" type="email" onChange={handleChange} />
                  <FormField
                    label="NEW PASSWORD"
                    name="newPassword"
                    type="password"
                    onChange={handleChange}
                  />
                  <FormField
                    label="CONFIRM NEW PASSWORD"
                    name="confirmNewPassword"
                    type="password"
                    onChange={handleChange}
                  />

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
                          backgroundColor: colors.buttonBackground,
                          width: "50%",
                          "&:hover": {
                            backgroundColor: colors.buttonBackground,
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
                        sx={{
                          backgroundColor: colors.buttonBackground,
                          width: "50%",
                          "&:hover": {
                            backgroundColor: colors.buttonBackground,
                          },
                          borderRadius: "2rem",
                          padding: "10px 0px",
                          fontWeight: "bold",
                        }}
                      >
                        Send
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

export default CreateNewPassword;
