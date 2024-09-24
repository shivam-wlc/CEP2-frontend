// import React, { useState } from "react";
// import { Box, Button, CircularProgress, Typography } from "@mui/material";
// import { Logo } from "../assets/assest.js";
// import AuthIcon1 from "../assets/icons/AuthIcon1.png";
// import AuthIcon2 from "../assets/icons/AuthIcon2.png";
// import AuthIcon3 from "../assets/icons/AuthIcon3.png";
// import FormField from "../components/FormField";
// import { Link } from "react-router-dom";
// import { isValidEmail } from "../utility/validate";
// import { useDispatch } from "react-redux";
// import { forgetPass } from "../redux/slices/authSlice";
// import { notify } from "../redux/slices/alertSlice.js";
// import { colors } from "../utility/color.js";
// const ForgetPassword = () => {
//   const dispatchToRedux = useDispatch();
//   const [isButtonLoading, setIsButtonLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     // Your form submission logic here
//     e.preventDefault();
//     try {
//       if (!formData.email) {
//         dispatchToRedux(
//           notify({ type: "warning", message: "Please enter your email" })
//         );
//         return;
//       }
//       if (!isValidEmail(formData.email)) {
//         dispatchToRedux(
//           notify({ type: "warning", message: "Please enter valid email" })
//         );
//         return;
//       }

//       const email = formData.email;
//       setIsButtonLoading(true);
//       await dispatchToRedux(forgetPass({ email })).unwrap();
//       setIsButtonLoading(false);
//     } catch (error) {
//       setIsButtonLoading(false);
//       dispatchToRedux(
//         notify({
//           type: "error",
//           message: "Something went wrong, Please Try Again",
//         })
//       );
//     }
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           //   border: "1px solid black",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Logo  */}
//         <Box
//           sx={{
//             position: "relative",
//             // border: "1px solid black",
//             marginBottom: "20px",
//             padding: "2rem",
//             // overflow: "hidden",
//             overflowZ: "hidden",
//           }}
//         >
//           <Link to="/">
//             <img src={Logo} alt="Logo" width={"13%"} />
//           </Link>

//           {/* Icons  */}
//           {/* Icons1  */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: "350%",
//               left: "60%",
//               transform: "translate(-50%, -50%)",
//               zIndex: -1,
//             }}
//           >
//             <img src={AuthIcon1} alt="Auth Icon 1" width={"40%"} />
//           </Box>

//           {/* Icons2  */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: "500%",
//               left: "35%",
//               transform: "translate(50%, 50%)",
//               rotate: "180deg",
//               zIndex: 1,
//             }}
//           >
//             <img src={AuthIcon2} alt="Auth Icon 2" width={"50%"} />
//           </Box>

//           {/* Icons3  */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: "570%",
//               left: "10%",
//               //   transform: "translate(-50%, -50%)",
//               zIndex: 1,
//             }}
//           >
//             <img src={AuthIcon3} alt="Auth Icon 3" width={"40%"} />
//           </Box>

//           {/* Icons4  */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: "300%",
//               left: "-1%",
//               //   transform: "translate(-50%, -50%)",
//               zIndex: 1,
//             }}
//           >
//             <img src={AuthIcon1} alt="Auth Icon 1" width={"25%"} />
//           </Box>

//           {/* Icons5  */}

//           <Box
//             sx={{
//               position: "absolute",
//               bottom: "-15%",
//               right: "0%",
//               zIndex: 1,
//             }}
//           >
//             <img src={AuthIcon2} alt="Auth Icon 2" width={"60%"} />
//           </Box>
//           {/* Icons6  */}

//           <Box
//             sx={{
//               position: "absolute",
//               top: "-40%",
//               left: "45%",
//               zIndex: 1,
//             }}
//           >
//             <img src={AuthIcon1} alt="Auth Icon 1" width={"20%"} />
//           </Box>
//         </Box>
//         {/* Left and Right */}
//         <Box sx={{ display: "flex", width: "100%" }}>
//           {/* Left  */}
//           <Box
//             sx={{
//               //   border: "1px solid black",
//               flex: "1",
//               marginRight: "10px",
//               // height: "80vh",
//             }}
//           >
//             <Box
//               sx={{
//                 padding: "1.5rem",
//                 // border: "1px solid blue",
//                 width: "60%",
//                 marginLeft: "9rem",
//               }}
//             >
//               <Typography
//                 variant="h2"
//                 sx={{
//                   fontWeight: "bold",
//                   letterSpacing: "0.5px",
//                   lineHeight: "4rem",
//                 }}
//               >
//                 Forgot Your Password
//               </Typography>
//               <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
//                 <Typography variant="body1" sx={{ color: "gray" }}>
//                   Don&apos;t worry, we&apos;ve got you covered!
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{ border: "2px solid black", marginTop: "1.5rem" }}
//               ></Box>
//             </Box>
//           </Box>

//           {/* Right */}
//           <Box
//             sx={{
//               //   border: "1px solid black",
//               flex: "1",
//             }}
//           >
//             <Box
//               sx={{
//                 backgroundColor: "#EDEDED",
//                 width: "75%",
//                 margin: "auto",
//                 marginTop: "-2rem",
//                 borderRadius: "2rem",
//               }}
//             >
//               <Box
//                 sx={
//                   {
//                     //   border: "1px solid blue",
//                     // width: "100%",
//                   }
//                 }
//               >
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     paddingTop: "2rem",
//                     width: "70%",
//                     margin: "auto",
//                     letterSpacing: "0.5px",
//                     lineHeight: "1.2rem",
//                   }}
//                 >
//                   Please enter the email address you used to create your
//                   CareerExplorer account to reset your password.
//                 </Typography>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "0.4rem",
//                     padding: "2rem",
//                   }}
//                 >
//                   <FormField
//                     label="EMAIL"
//                     name="email"
//                     type="email"
//                     onChange={handleChange}
//                   />

//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       // width: "100%",
//                       marginTop: "1rem",
//                     }}
//                   >
//                     {isButtonLoading ? (
//                       <Button
//                         variant="contained"
//                         sx={{
//                           backgroundColor: colors.buttonBackground,
//                           width: "50%",
//                           "&:hover": {
//                             backgroundColor: colors.buttonBackground,
//                           },
//                           borderRadius: "2rem",
//                           padding: "10px 0px",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         <CircularProgress size={25} color="inherit" />
//                       </Button>
//                     ) : (
//                       <Button
//                         onClick={handleSubmit}
//                         variant="contained"
//                         sx={{
//                           backgroundColor: colors.buttonBackground,
//                           width: "50%",
//                           "&:hover": {
//                             backgroundColor: colors.buttonBackground,
//                           },
//                           borderRadius: "2rem",
//                           padding: "10px 0px",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         Send Link
//                       </Button>
//                     )}
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//           {/* Icons */}
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default ForgetPassword;
import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Logo, background, leftPannelAuth } from "../assets/assest.js";
import AuthIcon1 from "../assets/icons/AuthIcon1.png";
import AuthIcon2 from "../assets/icons/AuthIcon2.png";
import AuthIcon3 from "../assets/icons/AuthIcon3.png";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import { isValidEmail } from "../utility/validate";
import { useDispatch } from "react-redux";
import { forgetPass } from "../redux/slices/authSlice";
import { notify } from "../redux/slices/alertSlice.js";
import { colors } from "../utility/color.js";
import { margin } from "@mui/system";
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
        dispatchToRedux(
          notify({ type: "warning", message: "Please enter your email" })
        );
        return;
      }
      if (!isValidEmail(formData.email)) {
        dispatchToRedux(
          notify({ type: "warning", message: "Please enter valid email" })
        );
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
        })
      );
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
        <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
          {/* Left  */}
          <Box
            sx={{
              height: "100%",
              width: "50%",
              marginRight: "5rem",
              marginLeft: "2rem",
            }}
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
          >
            <Link to="/">
              <img src={Logo} alt="Logo" width={"300rem"} />
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
              <Box
                sx={
                  {
                    //   border: "1px solid blue",
                    // width: "100%",
                  }
                }
              >
                <Box>
                  <h3
                    style={{
                      fontWeight: "bold",
                      margin: "auto",
                      marginTop: "3rem",
                      fontSize: "2.5rem",
                      width: "fit-content",
                    }}
                  >
                    Forgot Password
                  </h3>
                  <p
                    style={{
                      margin: "auto",
                      marginTop: "1rem",
                      color: "gray",
                      fontSize: "1.2rem",
                      width: "fit-content",
                    }}
                  >
                    Don't worry, we've got you covered!
                  </p>
                  <p
                    style={{
                      margin: "auto",
                      marginTop: ".8rem",
                      color: "gray",
                      fontSize: "1.2rem",
                      width: "80%",
                      textAlign: "center",
                    }}
                  >
                    Please enter the email address you used to create your
                    CareerExplorer account to reset your password.
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
                  <FormField
                    label="EMAIL"
                    name="email"
                    type="email"
                    width="100%"
                    onChange={handleChange}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      // width: "100%",
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
                        Send Link
                      </Button>
                    )}
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

export default ForgetPassword;
