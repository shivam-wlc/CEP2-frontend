// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import { Logo } from "../assets/assest.js";
// import AuthIcon1 from "../assets/icons/AuthIcon1.png";
// import AuthIcon2 from "../assets/icons/AuthIcon2.png";
// import AuthIcon3 from "../assets/icons/AuthIcon3.png";
// import FormField from "../components/FormField.jsx";
// import { fonts } from "../utility/fonts.js";
// import { colors } from "../utility/color.js";
// import { isValidEmail } from "../utility/validate.js";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../redux/slices/authSlice.js";
// import { notify } from "../redux/slices/alertSlice.js";
// import { getUserProfile } from "../redux/slices/profileSlice.js";

// const Login = () => {
//   const dispatchToRedux = useDispatch();
//   const navigate = useNavigate();
//   const [isButtonLoading, setIsButtonLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
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

//     if (!formData.email || !formData.password) {
//       return dispatchToRedux(
//         notify({ type: "warning", message: "Please fill all the fields" })
//       );
//     }

//     if (!isValidEmail(formData.email)) {
//       return dispatchToRedux(
//         notify({ type: "warning", message: "Please enter valid email" })
//       );
//     }

//     try {
//       setIsButtonLoading(true);
//       const resultAction = await dispatchToRedux(login(formData));
//       const userId = resultAction.payload.userId;
//       const token = resultAction.payload.token;

//       if (userId) {
//         const gettingProfile = await dispatchToRedux(
//           getUserProfile({ userId, token })
//         );
//         if (gettingProfile.meta.requestStatus === "fulfilled") {
//           dispatchToRedux(
//             notify({ type: "success", message: "Login Successful" })
//           );
//           setIsButtonLoading(false);
//           navigate(`/workspace/${userId}`);
//         }
//       }
//     } catch (error) {
//       setIsButtonLoading(false);
//       dispatchToRedux(notify({ type: "error", message: error.data.message }));
//     }
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Logo  */}
//         <Box
//           sx={{
//             position: "relative",
//             marginBottom: "20px",
//             padding: "2rem",
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
//               flex: "1",
//               marginRight: "10px",
//             }}
//           >
//             <Box
//               sx={{
//                 padding: "1.5rem",
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
//                 Login
//               </Typography>
//               <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
//                 <Typography sx={{ fontWeight: "bold" }}>
//                   Don&apos;t have an account?
//                 </Typography>
//                 <Link to="/register" style={{ textDecoration: "none" }}>
//                   <Typography
//                     sx={{
//                       fontWeight: "bold",
//                       color: colors.links,
//                       fontFamily: fonts.authPage,
//                     }}
//                   >
//                     Register Here
//                   </Typography>
//                 </Link>
//               </Box>
//               <Box
//                 sx={{ border: "2px solid black", marginTop: "1.5rem" }}
//               ></Box>
//             </Box>
//           </Box>

//           {/* Right */}
//           <Box
//             sx={{
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
//               <Box>
//                 <Typography
//                   variant="h4"
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     paddingTop: "2rem",
//                   }}
//                 >
//                   Welcome back!
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
//                   <FormField
//                     label="PASSWORD"
//                     name="password"
//                     type="password"
//                     onChange={handleChange}
//                   />

//                   <Box>
//                     <Link
//                       to="/forget-password"
//                       style={{ textDecoration: "none" }}
//                     >
//                       <Typography
//                         align="right"
//                         sx={{
//                           padding: 3,
//                           color: colors.red,
//                           marginRight: "25px",
//                         }}
//                       >
//                         Forgot your password?
//                       </Typography>
//                     </Link>
//                     <Typography align="left" sx={{ marginLeft: "30px" }}>
//                       <Checkbox /> Keep me logged In
//                     </Typography>
//                   </Box>
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
//                         Login
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

// export default Login;

import { Box, Button, Checkbox, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { background, leftPannelAuth, Logo } from "../assets/assest.js";
import AuthIcon1 from "../assets/icons/AuthIcon1.png";
import AuthIcon2 from "../assets/icons/AuthIcon2.png";
import AuthIcon3 from "../assets/icons/AuthIcon3.png";
import FormField from "../components/FormField.jsx";
import { notify } from "../redux/slices/alertSlice.js";
import { login } from "../redux/slices/authSlice.js";
import { getUserProfile } from "../redux/slices/profileSlice.js";
import { colors } from "../utility/color.js";
import { fonts } from "../utility/fonts.js";
import { isValidEmail } from "../utility/validate.js";

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
        <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
          {/* Left  */}
          {/* <Box
            sx={{
              flex: "1",
              marginRight: "10px",
            }}
          >
            <Box
              sx={{
                padding: "1.5rem",
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
                Login
              </Typography>
              
              <Box
                sx={{ border: "2px solid black", marginTop: "1.5rem" }}
              ></Box>
            </Box>
          </Box> */}
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
          {/* <Box
            sx={{
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
              
            </Box>
          </Box> */}

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

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  padding: "2rem",
                }}
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
                >
                  <Typography>
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
