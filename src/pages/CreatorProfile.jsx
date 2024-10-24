// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import PhoneIcon from "@mui/icons-material/Phone";
// import { Avatar, Link, Pagination, Typography } from "@mui/material";
// import { Box, Container } from "@mui/system";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import { socialMediaIcons } from "../assets/assest.js";
// import GeneralButton from "../components/general/GeneralButton.jsx";
// import Headers from "../components/Headers.jsx";
// import VideoCard from "../components/VideoCard.jsx";
// import { getCreatorProfile, selectCreatorProfile } from "../redux/slices/creatorSlice.js";
// import { getAuthorVideos, selectAuthorVideos } from "../redux/slices/creatorSlice.js";
// import { colors } from "../utility/color.js";
// import { convertUTCtoMonthAndYear } from "../utility/convertTimeToUTC.js";
// import { fonts } from "../utility/fonts.js";

// const CreatorProfile = () => {
//   const dispatch = useDispatch();
//   const { userId } = useParams();
//   const userData = useSelector(selectCreatorProfile);
//   const creatorVideos = useSelector(selectAuthorVideos);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     if (userId) {
//       dispatch(getCreatorProfile({ userId }));
//     }
//   }, [dispatch, userId]);

//   useEffect(() => {
//     dispatch(getAuthorVideos({ page, userId }));
//   }, [page]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const SocialMediaLinks = ({ socialMediaLinks }) => (
//     <Box
//       sx={{
//         display: "flex",
//         gap: "1rem",
//         // border: "1px solid blue",
//         padding: 1,
//         textAlign: "center",
//         justifyContent: "space-evenly",
//         alignItems: "center",
//         width: "70%",
//         margin: "auto",
//       }}
//     >
//       {socialMediaLinks?.map((link) => (
//         <React.Fragment key={link._id}>
//           {socialMediaIcons.find((icon) => icon.name === link.name)?.icon && ( // Check if icon exists in socialMediaIcons
//             <Link href={link.link} target="_blank" underline="none">
//               <img
//                 src={socialMediaIcons.find((icon) => icon.name === link.name).icon}
//                 alt={link.name}
//                 style={{ width: "32px", height: "32px" }} // Adjust width and height as needed
//               />
//             </Link>
//           )}
//         </React.Fragment>
//       ))}
//     </Box>
//   );

//   return (
//     <>
//       <Headers />
//       <Container maxWidth="lg" sx={{}}>
//         <Box
//           sx={{
//             padding: "1rem",
//             backgroundColor: "rgba(128, 128, 128, 0.04)",
//             borderRadius: "5px",
//             // border: "1px solid green",
//             marginTop: "2rem",
//           }}
//         >
//           <Box sx={{ display: "flex", gap: "1rem" }}>
//             <Box sx={{ flex: "1", maxWidth: "30%" }}>
//               <Avatar
//                 src={userData?.profilePicture}
//                 alt="Creator Profile"
//                 sx={{
//                   height: "250px",
//                   width: "250px",
//                   borderRadius: "50%",
//                 }}
//               />
//             </Box>
//             <Box
//               sx={{
//                 flex: "2",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "0.5rem",
//                 // border: "1px solid blue",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   // border: "1px solid green",
//                   gap: "1rem",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   variant="h4"
//                   sx={{
//                     fontFamily: fonts.sans,
//                     fontWeight: "bold",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   {userData?.name}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontFamily: fonts.sans,
//                     color: "#808080",
//                     fontStyle: "italic",
//                   }}
//                 >
//                   (member since {convertUTCtoMonthAndYear(userData?.createdAt)})
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   // border: "1px solid green",
//                   gap: "2rem",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontFamily: fonts.sans,
//                   // color: "#808080",
//                   textTransform: "none",
//                   padding: "0.5rem",
//                   color: colors.midGray,
//                 }}
//               >
//                 <Box sx={{ display: "flex", gap: "0.5rem" }}>
//                   {userData?.location && <LocationOnIcon />}
//                   <Typography sx={{ fontFamily: fonts.sans }}>{userData?.location}</Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", gap: "0.5rem" }}>
//                   <PhoneIcon />
//                   <Link href={`tel:${userData?.mobile}`} color="inherit">
//                     {userData?.mobile}
//                   </Link>
//                 </Box>

//                 <Box sx={{ display: "flex", gap: "0.5rem" }}>
//                   <MailOutlineIcon />
//                   <Link href={`mailto:${userData?.email}`} color="inherit">
//                     {userData?.email}
//                   </Link>
//                 </Box>
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: "0.5rem",
//                   // border: "1px solid red",
//                   padding: "0.5rem",
//                   fontFamily: fonts.sans,
//                   color: colors.darkGray,
//                   // textTransform: "none",
//                 }}
//               >
//                 <Typography variant="body1">{userData?.bio}</Typography>
//               </Box>

//               {/* <Box sx={{ display: "flex", gap: "0.5rem" }}>
//                 {userData?.socialMediaLinks.map((link) => (
//                   <Link key={link._id} href={link.link} target="_blank">
//                     {link.name}
//                   </Link>
//                 ))}
//               </Box> */}
//               <Box>
//                 <SocialMediaLinks socialMediaLinks={userData?.socialMediaLinks} />
//               </Box>

//               <Box sx={{ padding: "1.5rem", textAlign: "right" }}>
//                 {/* <GeneralButton text="Follow" /> */}
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Container>

//       <Container maxWidth="lg">
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, 1fr)",
//             gap: "1rem",
//             margin: "auto",
//             marginTop: "5rem",
//           }}
//         >
//           {creatorVideos?.videos?.map((video) => (
//             <VideoCard key={video._id} video={video} />
//           ))}
//         </Box>
//       </Container>

//       <Box sx={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
//         <Pagination count={creatorVideos?.totalPages} size="large" onChange={handlePageChange} />
//       </Box>
//     </>
//   );
// };

// export default CreatorProfile;

import { Avatar, colors, Divider, Rating } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { eyeIcon, infoCircleIcon, likeIcon, profileOilPaint, shareIcon, sms } from "../assets/assest";
import creatorStyle from "../styles/Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  const sampleVideos = [
    {
      _id: "123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "12323",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "123321",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "123312",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "132123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "13123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "131223",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "1232143",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "14123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "14123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      _id: "1412423",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      rating: 4,
      author: "Shivam Chaudhary",
      insights: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ];

  return (
    <div style={{ marginTop: "10rem" }}>
      {/* top */}
      <div
        style={{
          margin: "auto",
          boxShadow: "2px 2px 10px #a8a8a86a",
          width: "80rem",
          height: "22.5rem",
          borderRadius: "1rem",
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <img
          src={profileOilPaint}
          alt="oilPaint"
          style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
        />
        <div style={{ position: "absolute", top: "50px", left: "46px" }}>
          <Avatar sx={{ height: "97px", width: "97px" }} />
          {/* <img src="" alt="" style={{position: "absolute", top: "50px", left: "46px", height: "97px", width: "97px"}}/> */}
          <p style={{ fontWeight: "600", color: "#5e5e5e", marginTop: ".5rem" }}>1.5k Followers</p>{" "}
          {/* change */}
          <button className={creatorStyle["navButton"]} style={{ marginTop: ".5rem" }}>
            Follow
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            left: "177px",
            top: "100px",
            width: "67.875rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>Ronald Valadez</p> {/* change */}
              <p style={{ color: "#818181" }}>(Lorem Ipsum is simply dummy text)</p> {/* change */}
            </div>
            <div
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
              onClick={() => navigate("#")}
            >
              {" "}
              {/* change */}
              <img src={shareIcon} style={{ width: "24px" }} />
              <p>Share Profile</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              alignItems: "center",
              marginTop: ".5rem",
            }}
          >
            <p>Specialization :</p>
            {/* change apply map here */}
            <p
              style={{
                color: "#545454",
                backgroundColor: "#F2F2F2",
                padding: ".3rem",
                borderRadius: "90px",
              }}
            >
              Accounting
            </p>
            <p
              style={{
                color: "#545454",
                backgroundColor: "#F2F2F2",
                padding: ".3rem",
                borderRadius: "90px",
              }}
            >
              Software Engineering
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              alignItems: "center",
              marginTop: ".5rem",
            }}
          >
            <p>Years of experience :</p>
            <p
              style={{
                color: "#545454",
                backgroundColor: "#F2F2F2",
                padding: ".3rem",
                borderRadius: "90px",
              }}
            >
              4 years
            </p>{" "}
            {/* change */}
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginTop: ".5rem",
            }}
          >
            <Information icon={sms} info={"India"} />
            <Dot />
            <Information icon={sms} info={"+1 000 0000 000"} />
            <Dot />
            <Information icon={sms} info={"+1 000 0000 000"} />
            <Dot />
            <Information icon={sms} info={"ronaldjvaladez@dayrep.com"} />
          </div>
          <div
            style={{
              backgroundColor: "#F2F2F2",
              color: "#777777",
              borderRadius: "10px",
              marginTop: "1rem",
              padding: ".5rem",
            }}
          >
            <p style={{ fontWeight: "600", marginBottom: ".5rem" }}>About me</p>
            <Divider />
            <p style={{ marginTop: ".5rem" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          boxShadow: "2px 2px 10px #a8a8a86a",
          width: "80rem",
          borderRadius: "1rem",
          backgroundColor: "white",
          margin: "2rem auto",
          padding: "1.2rem 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            fontSize: "1.1rem",
            fontWeight: "500",
            borderBottom: "1px solid #dedede",
          }}
        >
          <p
            onClick={() => {
              setActiveTab(1);
            }}
            style={{
              color: activeTab === 1 ? "#BC2876" : "#999999",
              padding: ".5rem 2rem",
              fontWeight: activeTab === 1 ? "600" : "",
              borderBottom: activeTab === 1 ? "2px solid #BC2876" : "",
              cursor: "pointer",
            }}
          >
            Reels
          </p>
          <p
            onClick={() => {
              setActiveTab(2);
            }}
            style={{
              color: activeTab === 2 ? "#BC2876" : "#999999",
              padding: ".5rem 2rem",
              fontWeight: activeTab === 2 ? "600" : "",
              borderBottom: activeTab === 2 ? "2px solid #BC2876" : "",
              cursor: "pointer",
            }}
          >
            Articles
          </p>
          <p
            onClick={() => {
              setActiveTab(3);
            }}
            style={{
              color: activeTab === 3 ? "#BC2876" : "#999999",
              padding: ".5rem 2rem",
              fontWeight: activeTab === 3 ? "600" : "",
              borderBottom: activeTab === 3 ? "2px solid #BC2876" : "",
              cursor: "pointer",
            }}
          >
            Podcasts
          </p>
        </div>
        <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {activeTab === 1 &&
            sampleVideos.map(({ _id, title, rating, author, likes, views, insights, thumbnail }) => (
              <Card
                key={_id}
                title={title}
                rating={rating}
                author={author}
                likes={likes}
                views={views}
                insights={insights}
                thumbnail={thumbnail}
                id={_id}
              />
            ))}

          {activeTab === 2 && <p>Comming Soon</p>}
          {activeTab === 3 && <p>Comming Soon</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const Information = ({ icon = { sms }, info }) => (
  <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
    <img src={icon} alt="" />
    <p>{info}</p>
  </div>
);

const Dot = () => (
  <div
    style={{
      height: "5px",
      width: "5px",
      backgroundColor: "#FF8A00",
      borderRadius: "50%",
    }}
  ></div>
);

const Card = ({ id, title, rating, author, likes, views, insights, thumbnail }) => (
  <div
    style={{
      borderRadius: "15px",
      padding: "15px",
      border: "1px solid #cecece",
      height: "31.4375rem",
      backgroundColor: "white",
      width: "38.125rem",
    }}
    onClick={() => navigate(`/video/${id}`)}
  >
    <img
      src={thumbnail}
      alt="thumbnail"
      style={{
        width: "36.25rem",
        height: "20.25rem",
        borderRadius: "8px",
        margin: "auto",
      }}
    />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
      <div>
        <p style={{ marginTop: ".5rem" }}>{title}</p>
        <div style={{ marginTop: ".2rem", display: "flex", alignItems: "center" }}>
          <Rating value={rating} readOnly />
          <p style={{ color: "#898989" }}>{`(${rating})`}</p>
        </div>
        <p style={{ marginTop: ".3rem", color: "#898989" }}>
          by <span style={{ color: "#BC2876" }}>{author}</span>
        </p>
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
          <img src={likeIcon} alt="like" width="24px" />
          <p>{likes} likes</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
          <img src={eyeIcon} alt="eye" width="24px" />
          <p>{views} views</p>
        </div>
      </div>
    </div>
    <div
      style={{
        backgroundColor: "#F2F2F2",
        display: "flex",
        marginTop: "1rem",
        padding: "15px 23px",
        flexWrap: "nowrap",
        alignItems: "center",
        borderRadius: "90px",
      }}
    >
      <p style={{ textWrap: "nowrap", fontSize: "1.2rem" }}>Insights :</p>
      <p style={{ textWrap: "nowrap", fontSize: "1.2rem", color: "#888888" }}>
        {" "}
        &nbsp; {insights.length > 47 ? insights.slice(0, 48) + "..." : insights} &nbsp;
      </p>
      <img src={infoCircleIcon} alt="" width={"24px"} height={"24px"} />
    </div>
  </div>
);
