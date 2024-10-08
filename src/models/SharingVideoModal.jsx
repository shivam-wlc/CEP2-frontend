import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../assets/assest.js";
import GeneralButton from "../components/general/GeneralButton.jsx";
import { fonts } from "../utility/fonts";

const SharingVideoModal = ({ open, handleClose, videoUrl }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
    } catch (err) {
      console.error("Unable to copy:", err);
    }
  };

  const sharingPlatform = [
    {
      icon: FacebookIcon,
      name: "Facebook",
      url: "https://www.facebook.com/sharer/sharer.php?u=",
    },
    {
      icon: InstagramIcon,
      name: "Instagram",
      url: "https://www.instagram.com/sharer/sharer.php?u=",
    },
    {
      icon: LinkedinIcon,
      name: "Linkedin",
      url: "https://www.linkedin.com/shareArticle?url=",
    },
    {
      icon: TelegramIcon,
      name: "Telegram",
      url: "https://telegram.me/share/url?url=",
    },
    {
      icon: TwitterIcon,
      name: "Twitter",
      url: "https://twitter.com/intent/tweet?url=",
    },
    {
      icon: WhatsappIcon,
      name: "WhatsApp",
      url: "whatsapp://send",
    },
  ];

  const shareOnSocialMedia = (platform) => {
    const platformUrl = sharingPlatform.find((item) => item.name === platform)?.url;

    if (platformUrl) {
      window.open(platformUrl + videoUrl, "_blank");
    } else {
      console.error(`Platform URL not found for ${platform}`);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "50%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: fonts.sans,
            fontWeight: 600,
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Share Video
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <TextField
            fullWidth
            label="Video Link"
            value={videoUrl}
            InputProps={{
              readOnly: true,
              sx: {
                height: "45px",
              },
            }}
          />

          <GeneralButton onClick={() => copyToClipboard(videoUrl)} text={copySuccess ? "Copied!" : "Copy"} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {sharingPlatform.map((platform, index) => (
            <Button
              key={index}
              onClick={() => shareOnSocialMedia(platform.name)}
              style={{ margin: "0 5px", padding: "5px", cursor: "pointer" }}
            >
              <img src={platform.icon} alt={platform.name} width="35" height="35" />
            </Button>
          ))}
        </Box>
        <Box sx={{ textAlign: "right", cursor: "pointer" }}>
          <GeneralButton onClick={handleClose} text="Close" />
        </Box>
      </div>
    </Modal>
  );
};

export default SharingVideoModal;
