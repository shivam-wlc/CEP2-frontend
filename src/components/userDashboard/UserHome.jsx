// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   MenuItem,
//   Pagination,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { categories, tags } from "../../utility/category.js";
// import { fonts } from "../../utility/fonts.js";
// import {
//   allvideos,
//   selectAllVideosData,
//   videoFilter,
//   resetState,
// } from "../../redux/slices/creatorSlice.js";
// import GeneralButton from "../general/GeneralButton.jsx";
// import UserDashboardVideoCard from "../UserDashboardVideoCard.jsx";
// import { margin } from "@mui/system";
// const UserHome = () => {
//   const dispatchToRedux = useDispatch();
//   const allVideosData = useSelector(selectAllVideosData);
//   const [searchValue, setSearchValue] = useState("");
//   const [tag, setTag] = useState("");
//   const [page, setPage] = useState(1);

//   // useEffect(() => {
//   //   dispatchToRedux(allvideos({ page }));
//   // }, [page]);
//   useEffect(() => {
//     // Fetch data only if allVideosData is an empty array
//     if (allVideosData.length === 0) {
//       dispatchToRedux(allvideos({ page }));
//     }
//   }, [allVideosData, dispatchToRedux, page]);

//   const handleCategorySelection = useCallback(
//     (category) => {
//       dispatchToRedux(videoFilter({ category }));
//     },
//     [dispatchToRedux]
//   );

//   const handleSearchClick = useCallback(() => {
//     if (tag) {
//       dispatchToRedux(videoFilter({ tags: [tag] }));
//     }
//     if (searchValue) {
//       dispatchToRedux(videoFilter({ search: searchValue }));
//     }
//   }, [searchValue, tag, dispatchToRedux]);

//   const handlePageChange = useCallback((event, value) => {
//     setPage(value);
//   }, []);

//   useEffect(() => {}, [allVideosData, dispatchToRedux]);

//   const handleReset = () => {
//     dispatchToRedux(resetState());
//     dispatchToRedux(allvideos({ page }));
//   };

//   console.log("Allvideos", allVideosData);
//   return (
//     <>
//       <Box>
//         <Container maxWidth="xl" sx={{}}>
//           <Box
//             style={{
//               position: "sticky",
//               top: "10%",
//               backgroundColor: "white",
//               zIndex: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 width: "100%",
//                 display: "flex",
//                 overflowX: "auto",
//                 overflowY: "hidden",
//                 maxWidth: "100%",
//                 padding: "1rem 0",
//               }}
//             >
//               {categories.map((category, index) => (
//                 <Button
//                   key={`${category}-index-${index}`}
//                   onClick={() => handleCategorySelection(category)}
//                   variant="contained"
//                   sx={{
//                     borderRadius: "20px",
//                     padding: "0.5rem 1.2rem",
//                     fontFamily: fonts.sans,
//                     margin: "0 0.5rem",
//                     textTransform: "none",
//                     backgroundColor: "black",
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                     minWidth: "fit-content",
//                     "&:hover": {
//                       backgroundColor: "black",
//                     },
//                   }}
//                 >
//                   {category}
//                 </Button>
//               ))}
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 width: "100%",
//                 margin: "auto",
//                 marginBottom: "1rem",
//                 padding: "1rem 0",
//               }}
//             >
//               <TextField
//                 label="Search"
//                 variant="outlined"
//                 sx={{ marginRight: "10px", flexGrow: 1 }}
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//               />
//               <TextField
//                 select
//                 label="Filtered By Tags"
//                 variant="outlined"
//                 sx={{ marginRight: "10px", width: "200px" }}
//                 value={tag}
//                 onChange={(e) => setTag(e.target.value)}
//               >
//                 {tags.map((tag) => (
//                   <MenuItem key={tag.option} value={tag.option}>
//                     {tag.option}
//                   </MenuItem>
//                 ))}
//               </TextField>
//               <Box sx={{ display: "flex", gap: "10px" }}>
//                 <GeneralButton onClick={handleSearchClick} text="Apply" />
//                 <GeneralButton onClick={handleReset} text="Reset" />
//               </Box>
//             </Box>
//           </Box>

//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: "repeat(4, 1fr)",
//               gap: "1rem",
//               margin: "auto",
//               marginTop: "5rem",
//               backgroundColor: "white",
//             }}
//           >
//             {allVideosData?.videos?.length === 0 ||
//             allVideosData.length === 0 ? (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "200px",
//                   width: "430%",
//                   margin: "auto",
//                 }}
//               >
//                 <Typography
//                   variant="h5"
//                   sx={{ fontFamily: fonts.sans, fontWeight: "600" }}
//                 >
//                   No Video Found
//                 </Typography>
//               </Box>
//             ) : (
//               allVideosData?.videos?.map((video) => (
//                 <UserDashboardVideoCard key={video._id} video={video} />
//               ))
//             )}
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               marginTop: "2rem",
//               padding: "1rem",
//               // marginTop: "calc(10% + 5rem)",
//             }}
//           >
//             <Pagination
//               count={allVideosData?.totalPages}
//               size="large"
//               onChange={handlePageChange}
//             />
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default UserHome;

import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import {
  arab,
  asstaken,
  consumed,
  england,
  enrolled,
  followed,
  french,
  german,
  india,
  indonesia,
  italian,
  japan,
  koria,
  liked,
  maleshia,
  resumecreated,
  shared,
} from "../../assets/assest";
const languages = [
  { name: "Arabic", icon: arab },
  { name: "Indonesian", icon: indonesia },
  { name: "Malaysian", icon: maleshia },
  { name: "English", icon: england },
  { name: "French", icon: french },
  { name: "German", icon: german },
  { name: "Hindi", icon: india },
  { name: "Italian", icon: italian },
  { name: "Japanese", icon: japan },
  { name: "Korean", icon: koria },
];

const stats = [
  { label: "Reels consumed", value: 32, img: consumed },
  { label: "Reels liked", value: 32, img: liked },
  { label: "Reels shared", value: 32, img: shared },
  { label: "Career counsellors followed", value: 32, img: followed },
  { label: "Assessments taken", value: 32, img: asstaken },
  { label: "Resumes created", value: 32, img: resumecreated },
  { label: "Short Courses enrolled for", value: 0, img: enrolled },
];

const CareerSummary = () => {
  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#fff",
          backgroundImage: "linear-gradient(to right, white, #800080, #800080, white)",
          p: 2,
        }}
      >
        Here’s a quick summary of your activity on Career Explorer.
      </Typography>

      <Box
        container
        spacing={2}
        sx={{
          justifyContent: "space-around",
          mb: 4,
          display: "flex",
          background: "white",
          borderRadius: "22px",
          boxShadow: "0px 5px 10px #e5e5e5",
          padding: ".5rem",
        }}
      >
        {languages.map((language, index) => (
          <Box key={index}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={language.icon}
                alt={language.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <Typography variant="subtitle1">{language.name}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 2,
                borderRadius: "8px",
                boxShadow: 1,
                display: "flex",
                gap: "2rem",
              }}
            >
              <img src={stat.img} alt={stat.value} />
              <Box sx={{ textAlign: "start" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1">{stat.label}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CareerSummary;
