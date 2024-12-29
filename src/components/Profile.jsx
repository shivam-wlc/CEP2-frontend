// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Checkbox,
//   CircularProgress,
//   Container,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   MenuItem,
//   Tab,
//   Tabs,
//   TextField,
// } from "@mui/material";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import { fonts } from "../utility/fonts.js";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getUserProfile,
//   selectUserProfile,
//   updatePassword,
//   updateUserProfile,
//   uploadProfilePicture,
// } from "../redux/slices/profileSlice.js";
// import {
//   selectAuthenticated,
//   selectUserId,
//   selectToken,
// } from "../redux/slices/authSlice.js";
// import { notify } from "../redux/slices/alertSlice.js";
// import { checkPassStrength } from "../utility/validate.js";
// import { convertUTCDateToLocalDate } from "../utility/convertTimeToUTC.js";
// import { countryList } from "../utility/countryList.js";

// const Profile = () => {
//   const dispatchToRedux = useDispatch();
//   const userId = useSelector(selectUserId);
//   const userData = useSelector(selectUserProfile);
//   const authenticated = useSelector(selectAuthenticated);
//   const token = useSelector(selectToken);
//   const [isButtonLoading, setIsButtonLoading] = useState(false);
//   const [isButtonLoading2, setIsButtonLoading2] = useState(false);
//   const [file, setFile] = useState(null);
//   const [imageUploadingLoader, setImageUploadingLoader] = useState(false);

//   const [formData, setFormData] = useState({
//     // name: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     dateOfBirth: "",
//     country: "",
//     introBio: "",
//     mobile: "",
//     prevPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [tabValue, setTabValue] = useState(0);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     if (authenticated && !userData) {
//       dispatchToRedux(getUserProfile({ userId, token }));
//     }
//   }, []);

//   useEffect(() => {
//     setFormData({
//       ...formData,
//       firstName: userData?.firstName,
//       lastName: userData?.lastName,
//       mobile: userData?.mobile,
//       email: userData?.email,
//       country: userData?.country,
//       introBio: userData?.introBio,
//       dateOfBirth: convertUTCDateToLocalDate(userData?.dateOfBirth),
//     });
//   }, [userData]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (tabValue === 0) {
//       const {
//         password,
//         newPassword,
//         prevPassword,
//         confirmPassword,
//         ...updatedData
//       } = formData;

//       try {
//         setIsButtonLoading2(true);
//         dispatchToRedux(
//           updateUserProfile({ updatedData, userId: userData?._id, token })
//         );

//         dispatchToRedux(
//           notify({
//             type: "success",
//             message: "Profile updated successfully",
//           })
//         );
//         setIsButtonLoading2(false);
//       } catch (error) {
//         dispatchToRedux(
//           notify({
//             type: "error",
//             message: "Something went wrong, please try again",
//           })
//         );
//         setIsButtonLoading2(false);
//       }
//     } else if (tabValue === 1) {
//       if (
//         !formData.prevPassword ||
//         !formData.newPassword ||
//         !formData.confirmPassword
//       ) {
//         dispatchToRedux(
//           notify({
//             type: "warning",
//             message: "Please fill all the required fields",
//           })
//         );
//         return;
//       }

//       if (!checkPassStrength(formData.newPassword)) {
//         dispatchToRedux(
//           notify({
//             type: "warning",
//             message: "Password is too weak",
//           })
//         );
//         return;
//       }

//       if (formData.newPassword !== formData.confirmPassword) {
//         dispatchToRedux(
//           notify({
//             type: "error",
//             message: "New Passwords and Confirm Password do not match",
//           })
//         );
//         return;
//       }

//       try {
//         setIsButtonLoading(true);
//         const response = dispatchToRedux(
//           updatePassword({ formData, userId, token })
//         );
//         setIsButtonLoading(false);
//         if (response) {
//           dispatchToRedux(
//             notify({
//               type: "success",
//               message: "Password Updated Successfully",
//             })
//           );
//         }
//       } catch (error) {
//         setIsButtonLoading(false);
//         dispatchToRedux(
//           notify({
//             type: "error",
//             message: "Something went wrong, Please Try Again",
//           })
//         );
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // uploading profile image
//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setImageUploadingLoader(true);

//     if (!selectedFile) {
//       dispatchToRedux(
//         notify({
//           type: "warning",
//           message: "Please select a Profile Picture",
//         })
//       );
//       setImageUploadingLoader(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       await dispatchToRedux(uploadProfilePicture({ formData, userId, token }));
//       setImageUploadingLoader(false);
//       dispatchToRedux(
//         notify({
//           type: "success",
//           message: "Profile Picture Uploaded Successfully",
//         })
//       );
//     } catch (error) {
//       setImageUploadingLoader(false);
//       dispatchToRedux(
//         notify({
//           type: "error",
//           message: "Something went wrong, Please Try Again",
//         })
//       );
//     }
//   };

//   console.log("user profile", userData);
//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         // border: "1px solid black",
//         backgroundColor: "white",
//         borderRadius: "10px",
//         padding: "1rem",
//       }}
//     >
//       <Box textAlign="center" mt={4}>
//         <label htmlFor="profile-image-upload">
//           <input
//             id="profile-image-upload"
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//           />
//           <IconButton color="primary" component="span">
//             {imageUploadingLoader ? (
//               <CircularProgress />
//             ) : (
//               <Avatar
//                 src={userData?.profilePicture}
//                 sx={{
//                   width: { xs: 80, sm: 120, md: 160 },
//                   height: { xs: 80, sm: 120, md: 160 },
//                   fontSize: { xs: 36, sm: 48, md: 64 },
//                 }}
//               >
//                 <PhotoCameraIcon />
//               </Avatar>
//             )}
//           </IconButton>
//         </label>
//       </Box>

//       <Tabs
//         value={tabValue}
//         onChange={(e, newValue) => setTabValue(newValue)}
//         TabIndicatorProps={{ sx: { display: "none" } }}
//         sx={{
//           fontFamily: fonts.poppins,
//           fontWeight: "500",
//         }}
//       >
//         <Tab
//           label="Personal Information"
//           sx={{
//             "&.Mui-selected": {
//               color: "black",
//               backgroundColor: "#e5e5e5",
//               borderRadius: "1rem",
//               fontFamily: fonts.poppins,
//               fontWeight: "500",
//             },
//           }}
//         />
//         <Tab
//           label="Password"
//           sx={{
//             "&.Mui-selected": {
//               color: "black",
//               backgroundColor: "#e5e5e5",
//               borderRadius: "1rem",
//               fontFamily: fonts.poppins,
//               fontWeight: "500",
//             },
//           }}
//         />
//       </Tabs>
//       <Box mt={4} flex={1}>
//         {tabValue === 0 && (
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   variant="outlined"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   variant="outlined"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   variant="outlined"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   disabled
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Date of Birth"
//                   variant="outlined"
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleInputChange}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Mobile Number"
//                   variant="outlined"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               {/* <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Location"
//                   variant="outlined"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                 />
//               </Grid> */}

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   select
//                   label="Country"
//                   variant="outlined"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                 >
//                   {countryList.map((country) => (
//                     <MenuItem key={country.code} value={country.name}>
//                       {country.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Short Description"
//                   variant="outlined"
//                   multiline
//                   rows={3}
//                   name="introBio"
//                   value={formData.introBio}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//             </Grid>
//             <Box mt={2} textAlign={"right"}>
//               {isButtonLoading2 ? (
//                 <Button
//                   variant="contained"
//                   sx={{
//                     fontFamily: fonts.poppins,
//                     backgroundColor: "black",
//                     padding: "0.5rem 1.5rem",
//                     borderRadius: "0.5rem",
//                     "&:hover": {
//                       backgroundColor: "black",
//                     },
//                   }}
//                 >
//                   <CircularProgress color="inherit" size={25} />
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     fontFamily: fonts.poppins,
//                     backgroundColor: "black",
//                     padding: "0.5rem 1.5rem",
//                     borderRadius: "0.5rem",
//                     "&:hover": {
//                       backgroundColor: "black",
//                     },
//                   }}
//                 >
//                   Save Changes
//                 </Button>
//               )}
//             </Box>
//           </form>
//         )}
//         {tabValue === 1 && (
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Previous Password"
//                   variant="outlined"
//                   //   type="password"
//                   type={showPassword ? "text" : "password"}
//                   name="prevPassword"
//                   value={formData.prevPassword}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="New Password"
//                   variant="outlined"
//                   //   type="password"
//                   type={showPassword ? "text" : "password"}
//                   name="newPassword"
//                   value={formData.newPassword}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Confirm Password"
//                   variant="outlined"
//                   //   type="password"
//                   type={showPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={showPassword}
//                       onChange={togglePasswordVisibility}
//                       name="showPasswordCheckbox"
//                       color="primary"
//                     />
//                   }
//                   label="Show Password"
//                 />
//               </Grid>
//             </Grid>
//             <Box mt={2} textAlign={"right"}>
//               {isButtonLoading ? (
//                 <Button
//                   variant="contained"
//                   sx={{
//                     fontFamily: fonts.poppins,
//                     backgroundColor: "black",
//                     padding: "0.5rem 1.5rem",
//                     borderRadius: "0.5rem",
//                     "&:hover": {
//                       backgroundColor: "black",
//                     },
//                   }}
//                 >
//                   <CircularProgress color="inherit" size={25} />
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     fontFamily: fonts.poppins,
//                     backgroundColor: "black",
//                     padding: "0.5rem 1.5rem",
//                     borderRadius: "0.5rem",
//                     "&:hover": {
//                       backgroundColor: "black",
//                     },
//                   }}
//                 >
//                   Submit
//                 </Button>
//               )}
//             </Box>
//           </form>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default Profile;

import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  // TikTok as TikTokIcon,
  Language as WebsiteIcon,
  LinkedIn as LinkedInIcon,
  Telegram as TelegramIcon,
} from "@mui/icons-material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { notify } from "../redux/slices/alertSlice.js";
import { selectAuthenticated, selectToken, selectUserId } from "../redux/slices/authSlice.js";
import {
  getUserProfile,
  selectUserProfile,
  updatePassword,
  updateUserProfile,
  uploadProfilePicture,
} from "../redux/slices/profileSlice.js";
import { convertUTCDateToLocalDate } from "../utility/convertTimeToUTC.js";
import { countryList } from "../utility/countryList.js";
import { fonts } from "../utility/fonts.js";
import { checkPassStrength } from "../utility/validate.js";

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

  console.log("userData", userData);
  // userData.activeDashboard === "activeDashboard";

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    country: "",
    phoneExtension: "",
    // Mobile Number
    mobile: "",
    //Whatsaap Number
    telephone: "",
    introBio: "",
    personalWebsite: "",
    prevPassword: "",
    newPassword: "",
    confirmPassword: "",
    // Social accounts
    linkedIn: "",
    facebook: "",
    instagram: "",
    // tiktok: "",
    telegram: "",
    otherUrl: "",
    // Education
    school: "",
    schoolWebsite: "",
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
      middleName: userData?.middleName,
      lastName: userData?.lastName,
      username: userData?.username,
      mobile: userData?.mobile,
      phoneExtension: userData?.phoneExtension,
      phoneNumber: userData?.phoneNumber,
      telephone: userData?.telephone,
      email: userData?.email,
      gender: userData?.gender,
      nationality: userData?.nationality,
      country: userData?.country,
      introBio: userData?.introBio,
      personalWebsite: userData?.personalWebsite,
      experience: userData?.experience,
      specialization: userData?.specialization,
      dateOfBirth: convertUTCDateToLocalDate(userData?.dateOfBirth),
    });
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tabValue === 0) {
      const { password, newPassword, prevPassword, confirmPassword, ...updatedData } = formData;

      try {
        setIsButtonLoading2(true);
        dispatchToRedux(updateUserProfile({ updatedData, userId: userData?._id, token }));

        dispatchToRedux(
          notify({
            type: "success",
            message: "Profile updated successfully",
          }),
        );
        setIsButtonLoading2(false);
      } catch (error) {
        dispatchToRedux(
          notify({
            type: "error",
            message: "Something went wrong, please try again",
          }),
        );
        setIsButtonLoading2(false);
      }
    } else if (tabValue === 1) {
      if (!formData.prevPassword || !formData.newPassword || !formData.confirmPassword) {
        dispatchToRedux(
          notify({
            type: "warning",
            message: "Please fill all the required fields",
          }),
        );
        return;
      }

      if (!checkPassStrength(formData.newPassword)) {
        dispatchToRedux(
          notify({
            type: "warning",
            message: "Password is too weak",
          }),
        );
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        dispatchToRedux(
          notify({
            type: "error",
            message: "New Passwords and Confirm Password do not match",
          }),
        );
        return;
      }

      try {
        setIsButtonLoading(true);
        const response = dispatchToRedux(updatePassword({ formData, userId, token }));
        setIsButtonLoading(false);
        if (response) {
          dispatchToRedux(
            notify({
              type: "success",
              message: "Password Updated Successfully",
            }),
          );
        }
      } catch (error) {
        setIsButtonLoading(false);
        dispatchToRedux(
          notify({
            type: "error",
            message: "Something went wrong, Please Try Again",
          }),
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

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUploadingLoader(true);

      const formData = new FormData();
      formData.append("file", selectedFile);
      dispatchToRedux(
        uploadProfilePicture({
          formData,
          userId: userData?._id,
          token,
        }),
      )
        .then(() => {
          dispatchToRedux(
            notify({
              type: "success",
              message: "Profile picture uploaded successfully",
            }),
          );
          setImageUploadingLoader(false);
        })
        .catch(() => {
          dispatchToRedux(
            notify({
              type: "error",
              message: "Failed to upload profile picture",
            }),
          );
          setImageUploadingLoader(false);
        });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
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
        {userData?.activeDashboard !== "creator" && (
          <>
            <Tab
              label="Social Accounts"
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
              label="Education"
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
          </>
        )}
      </Tabs>

      <Box mt={4} flex={1}>
        {tabValue === 0 && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              {userData?.activeDashboard !== "creator" && (
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    variant="outlined"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              {userData?.activeDashboard !== "creator" && (
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
              {
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    variant="outlined"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
              }
              {userData?.activeDashboard !== "creator" && (
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    variant="outlined"
                    name="dateOfBirth"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Location"
                  variant="outlined"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                >
                  {countryList.map(({ name: country }) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* Phone Extension */}
              {/* <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="Phone Ext"
                  variant="outlined"
                  name="phoneExtension"
                  value={formData.phoneExtension}
                  onChange={handleInputChange}
                />
              </Grid> */}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Whatsapp Number"
                  variant="outlined"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                />
              </Grid>

              {userData?.activeDashboard === "creator" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Specialization"
                      variant="outlined"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Years Of Experience"
                      variant="outlined"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </>
              )}

              {userData?.activeDashboard !== "creator" && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Personal Website"
                    variant="outlined"
                    name="personalWebsite"
                    value={formData.personalWebsite}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              {userData?.activeDashboard === "creator" && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Short Description"
                    variant="outlined"
                    name="introBio"
                    value={formData.introBio}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
            </Grid>
            <Button
              // variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1,
                fontWeight: "bold",
                textTransform: "none",
                backgroundImage: "linear-gradient(to top left, #720361, #BF2F75)",
                borderRadius: "2rem",
                color: "white",
              }}
              type="submit"
              // color="primary"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
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
                  name="prevPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.prevPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  variant="outlined"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  variant="outlined"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={showPassword} onChange={togglePasswordVisibility} />}
                  label="Show Passwords"
                />
              </Grid>
            </Grid>
            <Button
              // variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1,
                fontWeight: "bold",
                textTransform: "none",
                backgroundImage: "linear-gradient(to top left, #720361, #BF2F75)",
                borderRadius: "2rem",
                color: "white",
              }}
              type="submit"
              // color="primary"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </form>
        )}
        {tabValue === 2 && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="LinkedIn"
                  variant="outlined"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <LinkedInIcon sx={{ marginRight: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Facebook"
                  variant="outlined"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <FacebookIcon sx={{ marginRight: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Instagram"
                  variant="outlined"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <InstagramIcon sx={{ marginRight: 1 }} />,
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="TikTok"
                  variant="outlined"
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <TikTokIcon sx={{ marginRight: 1 }} />,
                  }}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telegram"
                  variant="outlined"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <TelegramIcon sx={{ marginRight: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Other URL"
                  variant="outlined"
                  name="otherUrl"
                  value={formData.otherUrl}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <WebsiteIcon sx={{ marginRight: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              // variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1,
                fontWeight: "bold",
                textTransform: "none",
                backgroundImage: "linear-gradient(to top left, #720361, #BF2F75)",
                borderRadius: "2rem",
                color: "white",
              }}
              type="submit"
              // color="primary"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </form>
        )}

        {tabValue === 3 && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current School / Educational Institution"
                  variant="outlined"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website URL of School / Educational Institution"
                  variant="outlined"
                  name="schoolWebsite"
                  value={formData.schoolWebsite}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              // variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1,
                fontWeight: "bold",
                textTransform: "none",
                backgroundImage: "linear-gradient(to top left, #720361, #BF2F75)",
                borderRadius: "2rem",
                color: "white",
              }}
              type="submit"
              // color="primary"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
