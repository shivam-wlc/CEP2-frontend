import React, { useState } from "react";
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
import FormField from "../components/FormField.jsx";
import { background, leftPannelAuth, Logo } from "../assets/assest.js";
import AuthIcon1 from "../assets/icons/AuthIcon1.png";
import AuthIcon2 from "../assets/icons/AuthIcon2.png";
import AuthIcon3 from "../assets/icons/AuthIcon3.png";
import { fonts } from "../utility/fonts.js";
import { countryList } from "../utility/countryList.js";
import { notify } from "../redux/slices/alertSlice.js";
import loginStyles from "../styles/Login.module.css";
import { useDispatch } from "react-redux";
import { isValidEmail, checkPassStrength } from "../utility/validate.js";
import { convertToUTC } from "../utility/convertTimeToUTC.js";
import { signup } from "../redux/slices/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../utility/color.js";
import CheckYourMailBox from "../models/CheckYourMailBox.jsx";

const Register = () => {
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    // dateOfBirth: "",
    password: "",
    countryCode: "",
    role: "",
  });

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Namaste ji");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.gender ||
      // !formData.dateOfBirth ||
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

    // const name = `${formData.firstName} ${formData.lastName}`;
    const mobile = `${formData.countryCode} ${formData.mobile}`;
    // const dateOfBirthUTC = convertToUTC(formData.dateOfBirth);

    const newData = {
      ...formData,
      // name,
      mobile,
      // dateOfBirth: dateOfBirthUTC,
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
          // dateOfBirth: "",
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  padding: "2rem",
                  paddingBottom: "0",
                }}
                className={loginStyles.formPadding}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                  className={loginStyles.nameSignup}
                >
                  <FormField label="FIRST NAME" name="firstName" width="100%" onChange={handleChange} />
                  <FormField label="LAST NAME" name="lastName" width="100%" onChange={handleChange} />
                </Box>
                <FormField label="EMAIL" name="email" type="email" width="100%" onChange={handleChange} />

                <Typography
                  variant="body1"
                  sx={{
                    // marginLeft: "10%",
                    fontSize: "0.8rem",
                  }}
                >
                  MOBILE NO.
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
                      width: "50%",
                      borderRadius: 10,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      backgroundColor: "#BEBEBE",
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
                            borderRadius: 10,
                            backgroundColor: "#BEBEBE",
                          },
                        },
                      },
                    }}
                  >
                    {countryList.map((code) => (
                      <MenuItem key={code.name} value={code.dial_code}>
                        {`${code.name} (${code.dial_code})`}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    variant="standard"
                    sx={{
                      width: "80%",
                      borderRadius: 10,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      backgroundColor: "#BEBEBE",
                      padding: 1.3,
                      paddingLeft: "4%",

                      marginTop: "0.5rem",
                    }}
                    inputlabelprops={{
                      shrink: false,
                    }}
                    inputprops={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    margin="normal"
                    name="mobile"
                    type="text"
                    onChange={handleChange}
                  />
                </Box>

                {/* <FormField
                    label="DATE OF BIRTH"
                    name="dateOfBirth"
                    type="date"
                    onChange={handleChange}
                  /> */}
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
                        // marginLeft: "10%",
                        fontSize: "0.8rem",
                      }}
                    >
                      GENDER
                    </Typography>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      sx={{
                        borderRadius: 10,
                        backgroundColor: "#BEBEBE",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                      displayEmpty
                      inputlabelprops={{
                        shrink: true,
                      }}
                      inputprops={{
                        disableUnderline: true,
                      }}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      sx={{
                        // marginLeft: "10%",
                        fontSize: "0.8rem",
                      }}
                    >
                      ROLE
                    </Typography>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      sx={{
                        borderRadius: 10,
                        backgroundColor: "#BEBEBE",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                      displayEmpty
                      inputlabelprops={{
                        shrink: true,
                      }}
                      inputprops={{
                        disableUnderline: true,
                      }}
                    >
                      <MenuItem value="user">Student</MenuItem>
                      <MenuItem value="creator">Creator</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <FormField
                  label="PASSWORD"
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
                        backgroundImage: "linear-gradient(to top left, #720361, #BF2F75)",
                        width: "50%",
                        "&:hover": {
                          backgroundImage: "linear-gradient(to top left, #740262, #d83b87)",
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
                        backgroundImage: "linear-gradient(to top left, #720361, #BF2F75)",
                        width: "50%",
                        "&:hover": {
                          backgroundImage: "linear-gradient(to top left, #740262, #d83b87)",
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
              <Typography sx={{ fontWeight: "bold" }}>Already Register?</Typography>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: colors.links,
                    fontFamily: fonts.authPage,
                  }}
                >
                  Login
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
    </Box>
  );
};

export default Register;
