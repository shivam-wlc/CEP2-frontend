// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   CircularProgress,
//   TextField,
//   Typography,
//   Button,
// } from "@mui/material";

// import { fonts } from "../../utility/fonts.js";
// import { colors } from "../../utility/color.js";
// import GeneralButton from "../general/GeneralButton.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { selectUserId, selectToken } from "../../redux/slices/authSlice.js";
// import { notify } from "../../redux/slices/alertSlice.js";
// import { socialMediaIcons } from "../../assets/assest.js";
// import {
//   socialMediaLink,
//   selectSocialMediaData,
// } from "../../redux/slices/userDetailsSlice.js";
// import { selectUserProfile } from "../../redux/slices/profileSlice.js";

// const CreatorSocialMedia = () => {
//   const dispatchToRedux = useDispatch();
//   const userId = useSelector(selectUserId);
//   const token = useSelector(selectToken);
//   const socialMediaData = useSelector(selectSocialMediaData);
//   const [socialMediaLinks, setSocialMediaLinks] = useState(() => {
//     return socialMediaIcons.map((socialMedia) => {
//       const existingLink = socialMediaData?.socialMediaLinks.find(
//         (link) => link.name === socialMedia.name
//       );
//       return {
//         ...socialMedia,
//         link: existingLink ? existingLink.link : "",
//         isLoading: false,
//       };
//     });
//   });

//   useEffect(() => {
//     dispatchToRedux(socialMediaLink({ userId, token }));
//   }, []);
//   console.log("socialMediaData", socialMediaData);

//   const handleSave = async (index) => {
//     const formData = {
//       name: socialMediaLinks[index].name,
//       link: socialMediaLinks[index].link,
//     };

//     try {
//       const link = socialMediaLinks[index];
//       setSocialMediaLinks((prevLinks) => {
//         const updatedLinks = [...prevLinks];
//         updatedLinks[index] = { ...link, isLoading: true };
//         return updatedLinks;
//       });

//       await dispatchToRedux(socialMediaLink({ userId, formData, token }));

//       setSocialMediaLinks((prevLinks) => {
//         const updatedLinks = [...prevLinks];
//         updatedLinks[index] = { ...link, isLoading: false };
//         return updatedLinks;
//       });

//       dispatchToRedux(
//         notify({ type: "success", message: "Link Saved Successfully" })
//       );
//     } catch (error) {
//       setSocialMediaLinks((prevLinks) => {
//         const updatedLinks = [...prevLinks];
//         updatedLinks[index] = { ...link, isLoading: false };
//         return updatedLinks;
//       });

//       dispatchToRedux(
//         notify({ type: "error", message: "Something went wrong" })
//       );
//     }
//   };

//   const handleInputChange = (index, e) => {
//     const newLinks = [...socialMediaLinks];
//     newLinks[index].link = e.target.value;
//     setSocialMediaLinks(newLinks);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: colors.white,
//           marginBottom: "1rem",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "1rem",
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: "600", padding: "1rem" }}>
//           Social Media Links
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           // border: "1px solid red",
//           backgroundColor: colors.white,
//           padding: "1rem",
//           display: "flex",
//           flexDirection: "column",
//           width: "80%",
//           margin: "auto",
//         }}
//       >
//         {socialMediaLinks.map((socialMedia, index) => (
//           <Box
//             key={index}
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: "1rem",
//               marginBottom: "1rem",
//             }}
//           >
//             <img
//               src={socialMedia.icon}
//               alt="Social Link"
//               width="50px"
//               height="50px"
//             />
//             <TextField
//               fullWidth
//               placeholder={`https://www.${socialMedia.name.toLowerCase()}.com/username`}
//               label={socialMedia.name}
//               name="link"
//               sx={{
//                 backgroundColor: "#f5f5f5",
//                 border: "none",
//                 marginBottom: "1rem",
//                 fontFamily: fonts.sans,
//               }}
//               value={socialMediaLinks[index].link}
//               onChange={(e) => handleInputChange(index, e)}
//             />
//             {socialMedia.isLoading ? (
//               <Button
//                 variant="contained"
//                 sx={{
//                   fontFamily: "Poppins, sans-serif",
//                   backgroundColor: "black",
//                   color: "white",
//                   padding: "0.5rem 1.5rem",
//                   borderRadius: "0.5rem",
//                   "&:hover": {
//                     backgroundColor: "black",
//                   },
//                 }}
//               >
//                 <CircularProgress size={25} color="inherit" />
//               </Button>
//             ) : (
//               <GeneralButton text="Save" onClick={() => handleSave(index)} />
//             )}
//           </Box>
//         ))}
//       </Box>
//     </>
//   );
// };

// export default CreatorSocialMedia;

import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { socialMediaIcons } from "../../assets/assest.js";
import { notify } from "../../redux/slices/alertSlice.js";
import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import { selectSocialMediaData, socialMediaLink } from "../../redux/slices/userDetailsSlice.js";
import { colors } from "../../utility/color.js";
import { fonts } from "../../utility/fonts.js";
import GeneralButton from "../general/GeneralButton.jsx";

const CreatorSocialMedia = () => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const socialMediaDataInfo = useSelector(selectSocialMediaData);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  let socialMediaData = socialMediaDataInfo?.socialMediaLinks;
  console.log("Czhecking social media data", socialMediaData);

  // Initialize social media links from the fetched data
  // useEffect(() => {
  //   if (socialMediaData.length > 0) {
  //     const links = socialMediaIcons.map((socialMedia) => {
  //       const existingLink = socialMediaData.find(
  //         (link) => link.name === socialMedia.name
  //       );
  //       return {
  //         ...socialMedia,
  //         link: existingLink ? existingLink.link : "",
  //         isLoading: false,
  //       };
  //     });
  //     setSocialMediaLinks(links);
  //   }
  // }, [socialMediaData]);

  console.log("Czhecking social media links5555555", socialMediaDataInfo?.socialMediaLinks);

  useEffect(() => {
    dispatchToRedux(socialMediaLink({ userId, token }));
  }, [dispatchToRedux, userId, token]);

  const handleSave = async (index) => {
    const formData = {
      name: socialMediaLinks[index].name,
      link: socialMediaLinks[index].link,
    };

    try {
      setSocialMediaLinks((prevLinks) => {
        const updatedLinks = [...prevLinks];
        updatedLinks[index] = { ...updatedLinks[index], isLoading: true };
        return updatedLinks;
      });

      await dispatchToRedux(socialMediaLink({ userId, formData, token }));

      setSocialMediaLinks((prevLinks) => {
        const updatedLinks = [...prevLinks];
        updatedLinks[index] = { ...updatedLinks[index], isLoading: false };
        return updatedLinks;
      });

      dispatchToRedux(notify({ type: "success", message: "Link Saved Successfully" }));
    } catch (error) {
      setSocialMediaLinks((prevLinks) => {
        const updatedLinks = [...prevLinks];
        updatedLinks[index] = { ...updatedLinks[index], isLoading: false };
        return updatedLinks;
      });

      dispatchToRedux(notify({ type: "error", message: "Something went wrong" }));
    }
  };

  const handleInputChange = (index, e) => {
    const newLinks = [...socialMediaLinks];
    newLinks[index].link = e.target.value;
    setSocialMediaLinks(newLinks);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: colors.white,
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "600", padding: "1rem" }}>
          Social Media Links
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.white,
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "auto",
        }}
      >
        {socialMediaLinks.map((socialMedia, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <img src={socialMedia.icon} alt="Social Link" width="50px" height="50px" />
            <TextField
              fullWidth
              placeholder={`https://www.${socialMedia.name.toLowerCase()}.com/username`}
              label={socialMedia.name}
              name="link"
              sx={{
                backgroundColor: "#f5f5f5",
                border: "none",
                marginBottom: "1rem",
                fontFamily: fonts.sans,
              }}
              value={socialMedia.link}
              onChange={(e) => handleInputChange(index, e)}
            />
            {socialMedia.isLoading ? (
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "black",
                  color: "white",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "0.5rem",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                <CircularProgress size={25} color="inherit" />
              </Button>
            ) : (
              <GeneralButton text="Save" onClick={() => handleSave(index)} />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default CreatorSocialMedia;
