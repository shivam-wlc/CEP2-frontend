// import { Box } from "@mui/material";
// import React from "react";
// import Headers from "../components/Headers";
// import HomeSubpage1 from "../components/homeSection/HomeSubpage1";
// import HomeSubpage2 from "../components/homeSection/HomeSubpage2";
// import HomeSubpage3 from "../components/homeSection/HomeSubpage3";
// import HomeSubpage4 from "../components/homeSection/HomeSubpage4";

// const Home = () => {
//   return (
//     <Box>
//       <Headers />
//       {/* <HomeSubpage1 />
//       <HomeSubpage2 />
//       <HomeSubpage3 />
//       <HomeSubpage4 /> */}
//     </Box>
//   );
// };

// export default Home;
// import { Box, Typography, Grid, Container, Button } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import Headers from "../components/Headers";
// import { GoldFish } from "../assets/assest";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   allvideos,
//   selectAllVideosData,
//   videoFilter,
//   resetState,
// } from "../redux/slices/creatorSlice";
// import { fonts } from "../utility/fonts.js";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Home = () => {
//   const dispatchToRedux = useDispatch();
//   const allVideosData = useSelector(selectAllVideosData);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatchToRedux(allvideos({ page }));
//   }, [page]);

//   console.log("allVideosData", allVideosData);
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <Box>
//       <Headers />

//       <Container>
//         {/* Main Section */}
//         <Box sx={{ textAlign: "center", my: 4 }}>
//           <Typography variant="h4" gutterBottom>
//             Turning possibility to reality
//           </Typography>
//           <Typography variant="h6" gutterBottom>
//             Plan for success
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Box>
//               <Typography variant="body1" sx={{ mt: 2 }}>
//                 CareerExplorer.me seeks to help High School and Higher Education
//                 students to plan their career journey, research and explore
//                 opportunities for education and early career employment. Our
//                 career guides from all over the world provide content to give
//                 you the insights that will open your mind to new possibilities.
//                 The Assessment Centre will take you through short quizzes that
//                 will show career options for you to consider. The world of work
//                 is constantly changing. Let us help you make the best decisions
//                 for your future.
//               </Typography>
//             </Box>
//             <Box>
//               <img
//                 src={GoldFish}
//                 alt="GoldFish"
//                 style={{ width: "500px", marginTop: "20px" }}
//               />
//             </Box>
//           </Box>
//         </Box>

//         <Box sx={{ my: 4 }}>
//           <Typography variant="h5" gutterBottom>
//             Explore
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Widen your horizons. Time to explore content from Career guidance
//             counsellors sharing their wisdom and experiences, so you can make
//             the best choices.
//           </Typography>
//           <Grid container spacing={2}>
//             {[1, 2, 3, 4].map((_, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Box
//                   sx={{
//                     width: "100%",
//                     height: 150,
//                     backgroundColor: "#e0e0e0",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   Image {index + 1}
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <Box sx={{ my: 4 }}>
//           <Typography variant="h5" gutterBottom>
//             Learn
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Universities, Colleges, Professional and Technical Institutions from
//             all over the world. Which one is right for you? Which course should
//             you choose?
//           </Typography>
//           <Grid container spacing={2}>
//             {[1, 2, 3, 4].map((_, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Box
//                   sx={{
//                     width: "100%",
//                     height: 150,
//                     backgroundColor: "#e0e0e0",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   Image {index + 1}
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         {/* Quote Section */}
//         <Box sx={{ textAlign: "center", my: 4 }}>
//           <Typography variant="h6" gutterBottom>
//             “Opportunities don’t happen, you create them.” —Chris Grosser
//           </Typography>
//         </Box>
//       </Container>
//       <Box sx={{ height: "100vh", backgroundColor: "#14A2B8" }}>
//         <Container maxWidth="xl" sx={{ height: "100%" }}>
//           <Box
//             sx={{
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Grid
//               container
//               spacing={2}
//               sx={{ height: "100%", alignItems: "center" }}
//             >
//               <Grid item xs={12} md={6}>
//                 <Box sx={{ padding: 2, textAlign: "center" }}>
//                   <Typography
//                     variant="h2"
//                     component="h1"
//                     sx={{ fontWeight: "bold", color: "white" }}
//                   >
//                     Turning possibility to reality
//                   </Typography>
//                   <Typography
//                     variant="h4"
//                     component="h2"
//                     sx={{ marginTop: 2, color: "white" }}
//                   >
//                     Plan for success
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     sx={{ marginTop: 2, color: "white" }}
//                   >
//                     CareerExplorer.me seeks to help High School and Higher
//                     Education students to plan their career journey, research
//                     and explore opportunities for education and early career
//                     employment. Our career guides from all over the world
//                     provide content to give you the insights that will open your
//                     mind to new possibilities. The Assessment Centre will take
//                     you through short quizzes that will show career options for
//                     you to consider. The world of work is constantly changing.
//                     Let us help you make the best decisions for your future.
//                   </Typography>
//                 </Box>
//                 <Box sx={{ textAlign: "center", marginTop: 2 }}>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       padding: "15px 25px",
//                       borderRadius: "23px",
//                       fontWeight: "bold",
//                       color: "white",
//                       backgroundColor: "#01394F",
//                       "&:hover": {
//                         backgroundColor: "#01394F",
//                       },
//                     }}
//                   >
//                     Start your career journey
//                   </Button>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "100%",
//                   }}
//                 >
//                   <img
//                     src="https://images.pexels.com/photos/4254618/pexels-photo-4254618.jpeg"
//                     alt="Description"
//                     style={{ maxWidth: "80%", maxHeight: "80%" }}
//                   />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>

//           <Box sx={{ marginTop: 4 }}>
//             <Typography
//               variant="h3"
//               component="h2"
//               sx={{ textAlign: "center", marginBottom: 4, color: "Black " }}
//             >
//               Explore
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 marginTop: 2,
//                 color: "black",
//                 width: "50%",
//                 margin: "auto",
//                 textAlign: "center",
//                 marginBottom: 4,
//               }}
//             >
//               Widen your horizons. Time to explore content from Career guidance
//               counsellors sharing their wisdom and experiences, so you can make
//               the best choices
//             </Typography>
//             <Slider {...settings}>
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <Box key={index} sx={{ padding: 1 }}>
//                   <Box
//                     sx={{
//                       height: 200,
//                       backgroundColor: "#ccc",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Typography variant="h5" component="div">
//                       Image {index + 1}
//                     </Typography>
//                   </Box>
//                 </Box>
//               ))}
//             </Slider>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Home;

import { Box, Typography, Grid, Container, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import { useDispatch, useSelector } from "react-redux";
import { allvideos, selectAllVideosData } from "../redux/slices/creatorSlice";
import {
  getUniversity,
  selectUniversity,
} from "../redux/slices/universitySlice.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homePageHero } from "../assets/assest.js";

const Home = () => {
  const dispatchToRedux = useDispatch();
  const allVideosData = useSelector(selectAllVideosData);
  const manualUniversity = useSelector(selectUniversity);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatchToRedux(allvideos({ page }));
    dispatchToRedux(getUniversity({ page }));
  }, [page]);

  console.log("allVideosData", allVideosData);
  console.log("manualUniversity", manualUniversity);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const logoSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getThumbnailUrl = (video) => {
    // console.log("sss", video.videoLink);
    if (video.youtubeLink) {
      // Assuming videoLink contains the YouTube video ID
      return `https://img.youtube.com/vi/${video.youtubeVideoId}/maxresdefault.jpg`;
    } else {
      return video.thumbnail;
    }
  };

  const renderThumbnails = () => {
    return (allVideosData?.videos || []).slice(0, 8).map((video, index) => (
      <Box key={index} sx={{}}>
        <Box
          sx={{
            height: 300,
            // width: "100%",
            // backgroundColor: "#ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "1px solid red",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <img
            src={getThumbnailUrl(video)}
            alt={`Thumbnail ${index + 1}`}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Box>
    ));
  };
  const renderUniversityLogos = () => {
    return (manualUniversity?.universities || []).map((Logo, index) => (
      <Box key={index} sx={{ padding: "0 10px" }}>
        <Box
          sx={{
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "1px solid blue",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <img
            src={Logo.Logo}
            alt={`University Logo ${index + 1}`}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Box>
    ));
  };
  return (
    <Box>
      <Headers />
      <Box sx={{ height: "100vh", backgroundColor: "#14A2B8" }}>
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ height: "100%", alignItems: "center" }}
            >
              <Grid item xs={12} md={6}>
                <Box sx={{ padding: 2, textAlign: "center" }}>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Turning possibility to reality
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{ marginTop: 2, color: "white" }}
                  >
                    Plan for success
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 2, color: "white" }}
                  >
                    CareerExplorer.me seeks to help High School and Higher
                    Education students to plan their career journey, research
                    and explore opportunities for education and early career
                    employment. Our career guides from all over the world
                    provide content to give you the insights that will open your
                    mind to new possibilities. The Assessment Centre will take
                    you through short quizzes that will show career options for
                    you to consider. The world of work is constantly changing.
                    Let us help you make the best decisions for your future.
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center", marginTop: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      padding: "15px 25px",
                      borderRadius: "23px",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#01394F",
                      "&:hover": {
                        backgroundColor: "#01394F", // Same color on hover
                      },
                    }}
                  >
                    Start your career journey
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <img
                    src={homePageHero}
                    alt="Description"
                    style={{ maxWidth: "80%", maxHeight: "80%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* carousel */}
          <Box sx={{ marginTop: 4 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ textAlign: "center", marginBottom: 4, color: "Black" }}
            >
              Explore
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
                color: "black",
                width: "50%",
                margin: "auto",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Widen your horizons. Time to explore content from Career guidance
              counsellors sharing their wisdom and experiences, so you can make
              the best choices
            </Typography>
            <Slider {...settings}>{renderThumbnails()}</Slider>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <Button
              variant="contained"
              sx={{
                padding: "15px 25px",
                borderRadius: "23px",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#01394F",
                "&:hover": {
                  backgroundColor: "#01394F", // Same color on hover
                },
              }}
            >
              Go to Explore
            </Button>
          </Box>

          {/* Learn  */}
          <Box sx={{ marginTop: 4 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ textAlign: "center", marginBottom: 4, color: "Black" }}
            >
              Learn
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
                color: "black",
                width: "50%",
                margin: "auto",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Universities, Colleges, Professional and Technical Institutions
              from all over the world. Which one is right for you? Which course
              should you choose?
            </Typography>
            <Slider {...logoSettings}>{renderUniversityLogos()}</Slider>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <Button
              variant="contained"
              sx={{
                padding: "15px 25px",
                borderRadius: "23px",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#01394F",
                "&:hover": {
                  backgroundColor: "#01394F", // Same color on hover
                },
              }}
            >
              Go to Explore
            </Button>
          </Box>

          {/* Opportunity  */}
          <Box sx={{ marginTop: 4 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ textAlign: "center", marginBottom: 4, color: "black" }}
            >
              Opportunity
            </Typography>
            <Grid container spacing={4} justifyContent="space-between">
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "20px",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    To Work
                  </Typography>
                  <ul style={{ marginTop: "10px", lineHeight: "1.6" }}>
                    <li>Internships</li>
                    <li>Apprenticeships</li>
                    <li>Traineeships</li>
                    <li>Micro-internships</li>
                    <li>Virtual Internships</li>
                    <li>Graduate Training</li>
                  </ul>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "20px",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    To Upskill
                  </Typography>
                  <ul style={{ marginTop: "10px", lineHeight: "1.6" }}>
                    <li>Micro-credentials</li>
                    <li>Certifications</li>
                    <li>Simulations</li>
                  </ul>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "20px",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    To Serve
                  </Typography>
                  <ul style={{ marginTop: "10px", lineHeight: "1.6" }}>
                    <li>Volunteering</li>
                  </ul>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <Button
              variant="contained"
              sx={{
                padding: "15px 25px",
                borderRadius: "23px",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#01394F",
                "&:hover": {
                  backgroundColor: "#01394F", // Same color on hover
                },
              }}
            >
              Coming Soon...
            </Button>
          </Box>
          <Box sx={{ marginTop: "200px", marginBottom: "200px" }}>
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
                color: "black",
                width: "50%",
                margin: "auto",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              <i>“Opportunities don’t happen, you create them.”</i>
              —Chris Grosser
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
