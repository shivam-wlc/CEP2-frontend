import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { linkedin, socialMediaIcons } from "../../assets/assest.js";
import { notify } from "../../redux/slices/alertSlice.js";
import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import { selectSocialMediaData, socialMediaLink } from "../../redux/slices/userDetailsSlice.js";
import { colors } from "../../utility/color.js";
import { fonts } from "../../utility/fonts.js";
import GeneralButton from "../general/GeneralButton.jsx";
import creatorStyle from "../../styles/CreatorVideo.module.css";

const CreatorSocialMedia = () => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const socialMediaDataInfo = useSelector(selectSocialMediaData);

  const sampleData = [
    { icon: linkedin, name: "Linkedin Url", link: "", isLoading: false },
    { icon: linkedin, name: "Facebook Url", link: "", isLoading: false },
    { icon: linkedin, name: "Instagram Url", link: "", isLoading: false },
    { icon: linkedin, name: "TikTok Url", link: "", isLoading: false },
    { icon: linkedin, name: "Twitter Url", link: "", isLoading: false },
    { icon: linkedin, name: "YouTube Url", link: "", isLoading: false },
    { icon: linkedin, name: "Telegram Url", link: "", isLoading: false },
  ];

  const [socialMediaLinks, setSocialMediaLinks] = useState(sampleData);

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
          // backgroundColor: colors.white,
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "600", padding: "0", fontWeight: "600" }}>
          Social Channels
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.white,
          padding: "2rem 2rem 0",
          display: "flex",
          flexDirection: "column",
          // width: "90%",
          margin: "auto",
          borderRadius: "1rem",
          boxShadow: "2px 2px 10px #77777732",
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
            <Box
              sx={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                // marginBottom: "1rem",
                padding: "0 .8rem",
                height: "3.75rem",
                borderRadius: "2rem",
                width: "100%",
                backgroundColor: "#F2F2F2",
              }}
            >
              <img src={socialMedia.icon} alt="Social Link" width="30px" height="30px" />
              <TextField
                fullWidth
                variant="standard"
                // placeholder={`https://www.${socialMedia.name.toLowerCase()}.com/username`}
                placeholder={socialMedia.name}
                // label={socialMedia.name}
                name="link"
                value={socialMedia.link}
                onChange={(e) => handleInputChange(index, e)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    paddingBottom: "0rem",
                    height: "3.75rem",
                    width: "55rem",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "inherit",
                  },
                }}
                sx={{
                  backgroundColor: "transparent",
                  fontFamily: fonts.sans,
                }}
              />
            </Box>
            {socialMedia.isLoading ? (
              <button
                style={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "black",
                  color: "white",
                  width: "6.875rem",
                  height: "3rem",
                  padding: "0.4rem 1.1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                }}
                className={creatorStyle["navButton"]}
              >
                <CircularProgress size={20} color="inherit" />
              </button>
            ) : (
              <button
                style={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "black",
                  color: "white",
                  width: "6.875rem",
                  height: "2.7rem",
                  padding: "0.4rem 1.1rem",
                  borderRadius: "2.3rem",
                  border: "none",
                }}
                className={creatorStyle["navButton"]}
                onClick={() => handleSave(index)}
              >
                Save
              </button>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default CreatorSocialMedia;
