import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notify } from "../redux/slices/alertSlice.js";
import { signup } from "../redux/slices/authSlice.js";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { background, leftPannelAuth, Logo } from "../assets/assest.js";
import FormField from "../components/FormField.jsx";
import { checkPassStrength, isValidEmail } from "../utility/validate.js";
import CheckYourMailBox from "../models/CheckYourMailBox.jsx";
import { countryList } from "../utility/countryList.js";
import { fonts } from "../utility/fonts.js";
import loginStyles from "../styles/Login.module.css";
import TermsAndConditionsModal from "../models/TermsAndConditionsModal.jsx";

const Register = () => {
  const dispatchToRedux = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    countryCode: "",
    role: "",
  });

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSignUpClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAgree = (isChecked) => {
    if (isChecked) {
      handleSubmit();
      handleModalClose();
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleSubmit = async () => {
  //   console.log("Submit");
  // };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    console.log("Namaste ji");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.gender ||
      !formData.password ||
      !formData.countryCode ||
      !formData.role
    ) {
      dispatchToRedux(
        notify({
          type: "warning",
          message: "Please fill all the fields",
        }),
      );
      return;
    }
    if (!isValidEmail(formData.email)) {
      dispatchToRedux(
        notify({
          type: "warning",
          message: "Please enter a valid email address",
        }),
      );
      return;
    }
    if (!checkPassStrength(formData.password)) {
      dispatchToRedux(
        notify({
          type: "warning",
          message:
            "Password must contain at least one uppercase letter, one number, one special character, and minimum 8 characters",
        }),
      );
      return;
    }
    const mobile = `${formData.countryCode} ${formData.mobile}`;

    const newData = {
      ...formData,
      mobile,
    };

    try {
      setIsButtonLoading(true);
      const response = await dispatchToRedux(signup(newData)).unwrap();
      setIsButtonLoading(false);
      if (response.user) {
        dispatchToRedux(
          notify({
            type: "success",
            message: "Account created successfully, please login",
          }),
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          gender: "",
          password: "",
          countryCode: "",
          role: "",
        });
        // navigate("/login");
        setIsEmailSent(true);
      } else {
        dispatchToRedux(
          notify({
            type: "error",
            message: "Failed to create account. Please try again.",
          }),
        );
      }
    } catch (error) {
      setIsButtonLoading(false);
      dispatchToRedux(
        notify({
          type: "error",
          message: "Something went wrong, please try again",
        }),
      );
    }
  };

  return (
    <Box
      sx={{
        //   border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Left and Right */}
      <Box sx={{ display: "flex", width: "100%", height: "100%" }} className={loginStyles.container}>
        {/* Left  */}
        <Box
          sx={{
            height: "100vh",
            width: "50%",
            marginLeft: "5rem",
            display: { xs: "none", md: "block" },
          }}
          className={loginStyles.left}
        >
          <img src={leftPannelAuth} alt="Register Hero Image" height={"100%"} />
        </Box>
        {/* Right */}

        <Box
          sx={{
            width: { xs: "100%", md: "476px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            boxSizing: "border-box",
            marginBottom: { xs: "3rem", md: "0" },
          }}
          className={loginStyles.right}
        >
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              width={"200px"}
              paddingBottom={"1.5rem"}
              className={loginStyles.logo}
            />
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
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: "1rem",
                }}
              >
                Sign Up
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "#787878",
                  fontSize: "16px",
                  fontFamily: fonts.poppins,
                }}
              >
                Please create your account!
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  padding: "2rem",
                  paddingBottom: "0",
                  width: "100%",
                }}
                className={loginStyles.formPadding}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    gap: "11px",
                  }}
                  className={loginStyles.nameSignup}
                >
                  <FormField label="First Name" name="firstName" width="100%" onChange={handleChange} />
                  <FormField label="Last Name" name="lastName" width="100%" onChange={handleChange} />
                </Box>
                <FormField label="Email" name="email" type="email" width="100%" onChange={handleChange} />

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    fontFamily: fonts.poppins,
                  }}
                >
                  Mobile No
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    margin: "auto",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    variant="standard"
                    sx={{
                      width: "40%",
                      borderRadius: "10px",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      backgroundColor: "#F6F6F6",
                      padding: 1.3,
                    }}
                    select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    SelectProps={{
                      displayEmpty: true,
                      MenuProps: {
                        PaperProps: {
                          style: {
                            borderRadius: "10px",
                            backgroundColor: "#F6F6F6",
                          },
                        },
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  >
                    {" "}
                    <MenuItem value="" disabled>
                      +1
                    </MenuItem>
                    {countryList.map((code) => (
                      <MenuItem
                        key={code.name}
                        value={code.dial_code}
                        sx={{ fontFamily: fonts.poppins, backgroundColor: "#fff" }}
                      >
                        {`${code.name} (${code.dial_code})`}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    variant="standard"
                    placeholder="Enter mobile number"
                    sx={{
                      width: "80%",
                      borderRadius: "10px",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      backgroundColor: "#F6F6F6",
                      padding: 1.3,
                      paddingLeft: "4%",
                      fontFamily: fonts.poppins,
                      marginTop: "0.5rem",
                    }}
                    inputlabelprops={{
                      shrink: false,
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontFamily: fonts.poppins,
                        "&::placeholder": {
                          fontFamily: fonts.poppins,
                        },
                      },
                    }}
                    fullWidth
                    margin="normal"
                    name="mobile"
                    type="text"
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    margin: "auto",
                    gap: "10px",
                  }}
                  className={loginStyles.nameSignup}
                >
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "16px",
                        fontFamily: fonts.poppins,
                      }}
                    >
                      Gender
                    </Typography>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      displayEmpty
                      sx={{
                        borderRadius: "10px",
                        backgroundColor: "#F6F6F6",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSelect-placeholder": {
                          color: "#999999",
                        },
                        "&.Mui-focused .MuiSelect-placeholder": {
                          color: "#000",
                        },
                      }}
                      renderValue={(selected) => {
                        if (selected === "") {
                          return <span style={{ color: "#999999" }}>Select Gender</span>;
                        }

                        const genderOptions = {
                          male: "Male",
                          female: "Female",
                          other: "Other",
                        };

                        return genderOptions[selected] || selected;
                      }}
                      inputlabelprops={{
                        shrink: true,
                      }}
                      inputprops={{
                        disableUnderline: true,
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Gender
                      </MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "16px",
                        fontFamily: fonts.poppins,
                      }}
                    >
                      Role
                    </Typography>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      displayEmpty
                      sx={{
                        borderRadius: "10px",
                        backgroundColor: "#F6F6F6",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSelect-placeholder": {
                          color: "#999999", // Make the placeholder gray
                        },
                        "&.Mui-focused .MuiSelect-placeholder": {
                          color: "#000", // Optional: Make it default when focused
                        },
                      }}
                      renderValue={(selected) => {
                        if (selected === "") {
                          return <span style={{ color: "#999999" }}>Select Role</span>;
                        }

                        const roleOptions = {
                          user: "Student",
                          creator: "Counsellor",
                        };

                        return roleOptions[selected] || selected;
                      }}
                      inputlabelprops={{
                        shrink: true,
                      }}
                      inputprops={{
                        disableUnderline: true,
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Role
                      </MenuItem>
                      <MenuItem value="user">Student</MenuItem>
                      <MenuItem value="creator">Counsellor</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  width="100%"
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
                      // onClick={handleSubmit}
                      onClick={handleSignUpClick}
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
                      Sign up
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontFamily: fonts.poppins, color: "#787878" }}>
                Already have an account?
              </Typography>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#FF8A00",
                    fontFamily: fonts.poppins,
                  }}
                >
                  Sign In
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
        <CheckYourMailBox
          isOpen={isEmailSent}
          handleClose={() => {
            setIsEmailSent(false);
          }}
        />
      </Box>
      <TermsAndConditionsModal open={isModalOpen} handleClose={handleModalClose} handleAgree={handleAgree} />
    </Box>
  );
};

export default Register;
