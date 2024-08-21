import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { fonts } from "../utility/fonts.js";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  selectUserProfile,
  updatePassword,
  updateUserProfile,
  uploadProfilePicture,
} from "../redux/slices/profileSlice.js";
import {
  selectAuthenticated,
  selectUserId,
  selectToken,
} from "../redux/slices/authSlice.js";
import { notify } from "../redux/slices/alertSlice.js";
import { checkPassStrength } from "../utility/validate.js";
import { convertUTCDateToLocalDate } from "../utility/convertTimeToUTC.js";
import { countryList } from "../utility/countryList.js";

const Profile = () => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const userData = useSelector(selectUserProfile);
  const authenticated = useSelector(selectAuthenticated);
  const token = useSelector(selectToken);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isButtonLoading2, setIsButtonLoading2] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUploadingLoader, setImageUploadingLoader] = useState(false);

  const [formData, setFormData] = useState({
    // name: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    country: "",
    introBio: "",
    mobile: "",
    prevPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (authenticated && !userData) {
      dispatchToRedux(getUserProfile({ userId, token }));
    }
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      mobile: userData?.mobile,
      email: userData?.email,
      country: userData?.country,
      introBio: userData?.introBio,
      dateOfBirth: convertUTCDateToLocalDate(userData?.dateOfBirth),
    });
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tabValue === 0) {
      const {
        password,
        newPassword,
        prevPassword,
        confirmPassword,
        ...updatedData
      } = formData;

      try {
        setIsButtonLoading2(true);
        dispatchToRedux(
          updateUserProfile({ updatedData, userId: userData?._id, token })
        );

        dispatchToRedux(
          notify({
            type: "success",
            message: "Profile updated successfully",
          })
        );
        setIsButtonLoading2(false);
      } catch (error) {
        dispatchToRedux(
          notify({
            type: "error",
            message: "Something went wrong, please try again",
          })
        );
        setIsButtonLoading2(false);
      }
    } else if (tabValue === 1) {
      if (
        !formData.prevPassword ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        dispatchToRedux(
          notify({
            type: "warning",
            message: "Please fill all the required fields",
          })
        );
        return;
      }

      if (!checkPassStrength(formData.newPassword)) {
        dispatchToRedux(
          notify({
            type: "warning",
            message: "Password is too weak",
          })
        );
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        dispatchToRedux(
          notify({
            type: "error",
            message: "New Passwords and Confirm Password do not match",
          })
        );
        return;
      }

      try {
        setIsButtonLoading(true);
        const response = dispatchToRedux(
          updatePassword({ formData, userId, token })
        );
        setIsButtonLoading(false);
        if (response) {
          dispatchToRedux(
            notify({
              type: "success",
              message: "Password Updated Successfully",
            })
          );
        }
      } catch (error) {
        setIsButtonLoading(false);
        dispatchToRedux(
          notify({
            type: "error",
            message: "Something went wrong, Please Try Again",
          })
        );
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // uploading profile image
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageUploadingLoader(true);

    if (!selectedFile) {
      dispatchToRedux(
        notify({
          type: "warning",
          message: "Please select a Profile Picture",
        })
      );
      setImageUploadingLoader(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await dispatchToRedux(uploadProfilePicture({ formData, userId, token }));
      setImageUploadingLoader(false);
      dispatchToRedux(
        notify({
          type: "success",
          message: "Profile Picture Uploaded Successfully",
        })
      );
    } catch (error) {
      setImageUploadingLoader(false);
      dispatchToRedux(
        notify({
          type: "error",
          message: "Something went wrong, Please Try Again",
        })
      );
    }
  };

  console.log("user profile", userData);
  return (
    <Container
      maxWidth="lg"
      sx={{
        // border: "1px solid black",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      <Box textAlign="center" mt={4}>
        <label htmlFor="profile-image-upload">
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <IconButton color="primary" component="span">
            {imageUploadingLoader ? (
              <CircularProgress />
            ) : (
              <Avatar
                src={userData?.profilePicture}
                sx={{
                  width: { xs: 80, sm: 120, md: 160 },
                  height: { xs: 80, sm: 120, md: 160 },
                  fontSize: { xs: 36, sm: 48, md: 64 },
                }}
              >
                <PhotoCameraIcon />
              </Avatar>
            )}
          </IconButton>
        </label>
      </Box>

      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        TabIndicatorProps={{ sx: { display: "none" } }}
        sx={{
          fontFamily: fonts.poppins,
          fontWeight: "500",
        }}
      >
        <Tab
          label="Personal Information"
          sx={{
            "&.Mui-selected": {
              color: "black",
              backgroundColor: "#e5e5e5",
              borderRadius: "1rem",
              fontFamily: fonts.poppins,
              fontWeight: "500",
            },
          }}
        />
        <Tab
          label="Password"
          sx={{
            "&.Mui-selected": {
              color: "black",
              backgroundColor: "#e5e5e5",
              borderRadius: "1rem",
              fontFamily: fonts.poppins,
              fontWeight: "500",
            },
          }}
        />
      </Tabs>
      <Box mt={4} flex={1}>
        {tabValue === 0 && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  variant="outlined"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </Grid> */}

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Country"
                  variant="outlined"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  {countryList.map((country) => (
                    <MenuItem key={country.code} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Short Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  name="introBio"
                  value={formData.introBio}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Box mt={2} textAlign={"right"}>
              {isButtonLoading2 ? (
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: fonts.poppins,
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
                  type="submit"
                  variant="contained"
                  sx={{
                    fontFamily: fonts.poppins,
                    backgroundColor: "black",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "0.5rem",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  Save Changes
                </Button>
              )}
            </Box>
          </form>
        )}
        {tabValue === 1 && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Previous Password"
                  variant="outlined"
                  //   type="password"
                  type={showPassword ? "text" : "password"}
                  name="prevPassword"
                  value={formData.prevPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  variant="outlined"
                  //   type="password"
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  //   type="password"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showPassword}
                      onChange={togglePasswordVisibility}
                      name="showPasswordCheckbox"
                      color="primary"
                    />
                  }
                  label="Show Password"
                />
              </Grid>
            </Grid>
            <Box mt={2} textAlign={"right"}>
              {isButtonLoading ? (
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: fonts.poppins,
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
                  type="submit"
                  variant="contained"
                  sx={{
                    fontFamily: fonts.poppins,
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
          </form>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
