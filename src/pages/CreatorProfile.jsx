import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Link, Pagination, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { socialMediaIcons } from "../assets/assest.js";
import GeneralButton from "../components/general/GeneralButton.jsx";
import Headers from "../components/Headers.jsx";
import VideoCard from "../components/VideoCard.jsx";
import { getCreatorProfile, selectCreatorProfile } from "../redux/slices/creatorSlice.js";
import { getAuthorVideos, selectAuthorVideos } from "../redux/slices/creatorSlice.js";
import { colors } from "../utility/color.js";
import { convertUTCtoMonthAndYear } from "../utility/convertTimeToUTC.js";
import { fonts } from "../utility/fonts.js";

const CreatorProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userData = useSelector(selectCreatorProfile);
  const creatorVideos = useSelector(selectAuthorVideos);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (userId) {
      dispatch(getCreatorProfile({ userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getAuthorVideos({ page, userId }));
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const SocialMediaLinks = ({ socialMediaLinks }) => (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        // border: "1px solid blue",
        padding: 1,
        textAlign: "center",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "70%",
        margin: "auto",
      }}
    >
      {socialMediaLinks?.map((link) => (
        <React.Fragment key={link._id}>
          {socialMediaIcons.find((icon) => icon.name === link.name)?.icon && ( // Check if icon exists in socialMediaIcons
            <Link href={link.link} target="_blank" underline="none">
              <img
                src={socialMediaIcons.find((icon) => icon.name === link.name).icon}
                alt={link.name}
                style={{ width: "32px", height: "32px" }} // Adjust width and height as needed
              />
            </Link>
          )}
        </React.Fragment>
      ))}
    </Box>
  );

  return (
    <>
      <Headers />
      <Container maxWidth="lg" sx={{}}>
        <Box
          sx={{
            padding: "1rem",
            backgroundColor: "rgba(128, 128, 128, 0.04)",
            borderRadius: "5px",
            // border: "1px solid green",
            marginTop: "2rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Box sx={{ flex: "1", maxWidth: "30%" }}>
              <Avatar
                src={userData?.profilePicture}
                alt="Creator Profile"
                sx={{
                  height: "250px",
                  width: "250px",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box
              sx={{
                flex: "2",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                // border: "1px solid blue",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  // border: "1px solid green",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: fonts.sans,
                    fontWeight: "bold",
                    mb: "0.5rem",
                  }}
                >
                  {userData?.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.sans,
                    color: "#808080",
                    fontStyle: "italic",
                  }}
                >
                  (member since {convertUTCtoMonthAndYear(userData?.createdAt)})
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  // border: "1px solid green",
                  gap: "2rem",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: fonts.sans,
                  // color: "#808080",
                  textTransform: "none",
                  padding: "0.5rem",
                  color: colors.midGray,
                }}
              >
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  {userData?.location && <LocationOnIcon />}
                  <Typography sx={{ fontFamily: fonts.sans }}>{userData?.location}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <PhoneIcon />
                  <Link href={`tel:${userData?.mobile}`} color="inherit">
                    {userData?.mobile}
                  </Link>
                </Box>

                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <MailOutlineIcon />
                  <Link href={`mailto:${userData?.email}`} color="inherit">
                    {userData?.email}
                  </Link>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  // border: "1px solid red",
                  padding: "0.5rem",
                  fontFamily: fonts.sans,
                  color: colors.darkGray,
                  // textTransform: "none",
                }}
              >
                <Typography variant="body1">{userData?.bio}</Typography>
              </Box>

              {/* <Box sx={{ display: "flex", gap: "0.5rem" }}>
                {userData?.socialMediaLinks.map((link) => (
                  <Link key={link._id} href={link.link} target="_blank">
                    {link.name}
                  </Link>
                ))}
              </Box> */}
              <Box>
                <SocialMediaLinks socialMediaLinks={userData?.socialMediaLinks} />
              </Box>

              <Box sx={{ padding: "1.5rem", textAlign: "right" }}>
                {/* <GeneralButton text="Follow" /> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            margin: "auto",
            marginTop: "5rem",
          }}
        >
          {creatorVideos?.videos?.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </Box>
      </Container>

      <Box sx={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
        <Pagination count={creatorVideos?.totalPages} size="large" onChange={handlePageChange} />
      </Box>
    </>
  );
};

export default CreatorProfile;
