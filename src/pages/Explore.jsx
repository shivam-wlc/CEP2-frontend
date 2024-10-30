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
// import Headers from "../components/Headers";
// import VideoCard from "../components/VideoCard";
// import { categories, tags } from "../utility/category";
// import {
//   allvideos,
//   selectAllVideosData,
//   videoFilter,
//   resetState,
// } from "../redux/slices/creatorSlice";
// import GeneralButton from "../components/general/GeneralButton";
// import { fonts } from "../utility/fonts.js";

// const Explore = () => {
//   const dispatchToRedux = useDispatch();
//   const allVideosData = useSelector(selectAllVideosData);
//   const [searchValue, setSearchValue] = useState("");
//   const [tag, setTag] = useState("");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatchToRedux(allvideos({ page }));
//   }, [page]);

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
//   return (
//     <Box>
//       <Headers />

//       <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             overflowX: "auto",
//             overflowY: "hidden",
//             maxWidth: "100%",
//             padding: "1rem 0",
//           }}
//         >
//           {categories.map((category, index) => (
//             <Button
//               key={`${category}-index-${index}`}
//               onClick={() => handleCategorySelection(category)}
//               variant="contained"
//               sx={{
//                 borderRadius: "20px",
//                 padding: "0.5rem 1.2rem",
//                 fontFamily: fonts.sans,
//                 margin: "0 0.5rem",
//                 textTransform: "none",
//                 backgroundColor: "black",
//                 color: "white",
//                 fontWeight: "bold",
//                 whiteSpace: "nowrap",
//                 minWidth: "fit-content",
//                 "&:hover": {
//                   backgroundColor: "black",
//                 },
//               }}
//             >
//               {category}
//             </Button>
//           ))}
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//             margin: "auto",
//             marginBottom: "1rem",
//             padding: "1rem 0",
//           }}
//         >
//           <TextField
//             label="Search"
//             variant="outlined"
//             sx={{ marginRight: "10px", flexGrow: 1 }}
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//           />
//           <TextField
//             select
//             label="Filtered By Tags"
//             variant="outlined"
//             sx={{ marginRight: "10px", width: "200px" }}
//             value={tag}
//             onChange={(e) => setTag(e.target.value)}
//           >
//             {tags.map((tag) => (
//               <MenuItem key={tag.option} value={tag.option}>
//                 {tag.option}
//               </MenuItem>
//             ))}
//           </TextField>
//           <Box sx={{ display: "flex", gap: "10px" }}>
//             <GeneralButton onClick={handleSearchClick} text="Apply" />
//             <GeneralButton onClick={handleReset} text="Reset" />
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: "repeat(4, 1fr)",
//             gap: "2rem",
//             margin: "auto",
//             marginTop: "5rem",
//           }}
//         >
//           {allVideosData?.videos?.length === 0 ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "30vh",
//                 width: "95vw",
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{ fontFamily: fonts.sans, fontWeight: "600" }}
//               >
//                 No Video Found
//               </Typography>
//             </Box>
//           ) : (
//             allVideosData?.videos?.map((video) => (
//               <VideoCard key={video._id} video={video} />
//             ))
//           )}
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "5rem",
//             padding: "1rem",
//           }}
//         >
//           <Pagination
//             count={allVideosData?.totalPages}
//             size="large"
//             onChange={handlePageChange}
//           />
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Explore;

// import React, { useCallback, useEffect, useState } from "react";
// import { Box, Button, Container, MenuItem, Pagination, TextField, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import exploreStyles from "../styles/Explore.module.css";
// import VideoCard from "../components/VideoCard";
// import { categories, tags } from "../utility/category";
// import { allvideos, selectAllVideosData, videoFilter, resetState } from "../redux/slices/creatorSlice";
// import GeneralButton from "../components/general/GeneralButton";
// import { fonts } from "../utility/fonts.js";

// const Explore = () => {
//   const dispatchToRedux = useDispatch();
//   let allVideosData = useSelector(selectAllVideosData);
//   allVideosData = [
//     {
//       _id: "66b37c7c6f15606f4047729e",
//       creatorId: "66b0bbec7034f8bd5fe19f04",
//       videoLink: "https://youtu.be/F4Zu5ZZAG7I?si=kYqWC4iKZSdyiOjN",
//       title: "7 Ways to Make a Conversation With Anyone | Malavika Varadan | TEDxBITSPilaniDubai",
//       description: "7 Ways to Make a Conversation With Anyone | Malavika Varadan | TEDxBITSPilaniDubai",
//       tags: ["literature"],
//       language: "Aymara",
//       youtubeLink: true,
//       youtubeVideoId: "F4Zu5ZZAG7I",
//       category: "Career Planning",
//       averageRating: 0,
//       createdAt: new Date("2024-08-07T13:54:04.020Z"),
//       updatedAt: new Date("2024-08-07T13:54:04.020Z"),
//     },
//     {
//       _id: "66b37c7c6f15606f4047729f",
//       creatorId: "66b0bbec7034f8bd5fe19f05",
//       videoLink: "https://youtu.be/abc123",
//       title: "The Power of Positive Thinking",
//       description: "A talk on how positive thinking can change your life.",
//       tags: ["self-help"],
//       language: "English",
//       youtubeLink: true,
//       youtubeVideoId: "abc123",
//       category: "Personal Development",
//       averageRating: 4.5,
//       createdAt: new Date("2024-08-01T10:24:04.020Z"),
//       updatedAt: new Date("2024-08-01T10:24:04.020Z"),
//     },
//     {
//       _id: "66b37c7c6f15606f404772a0",
//       creatorId: "66b0bbec7034f8bd5fe19f06",
//       videoLink: "https://youtu.be/xyz456",
//       title: "Understanding Quantum Physics",
//       description: "An introductory lecture on quantum physics.",
//       tags: ["science", "physics"],
//       language: "Spanish",
//       youtubeLink: true,
//       youtubeVideoId: "xyz456",
//       category: "Education",
//       averageRating: 4.8,
//       createdAt: new Date("2024-08-10T15:14:04.020Z"),
//       updatedAt: new Date("2024-08-10T15:14:04.020Z"),
//     },
//     {
//       _id: "66b37c7c6f15606f404772a1",
//       creatorId: "66b0bbec7034f8bd5fe19f07",
//       videoLink: "https://youtu.be/pqr789",
//       title: "Healthy Eating Habits",
//       description: "Tips and tricks for a balanced diet.",
//       tags: ["health", "nutrition"],
//       language: "French",
//       youtubeLink: true,
//       youtubeVideoId: "pqr789",
//       category: "Health & Wellness",
//       averageRating: 4.2,
//       createdAt: new Date("2024-08-15T09:34:04.020Z"),
//       updatedAt: new Date("2024-08-15T09:34:04.020Z"),
//     },
//     {
//       _id: "66b37c7c6f15606f404772a2",
//       creatorId: "66b0bbec7034f8bd5fe19f08",
//       videoLink: "https://youtu.be/mno012",
//       title: "Mastering Public Speaking",
//       description: "How to become a confident public speaker.",
//       tags: ["communication", "public speaking"],
//       language: "German",
//       youtubeLink: true,
//       youtubeVideoId: "mno012",
//       category: "Career Development",
//       averageRating: 4.9,
//       createdAt: new Date("2024-08-18T11:04:04.020Z"),
//       updatedAt: new Date("2024-08-18T11:04:04.020Z"),
//     },
//     {
//       _id: "66b37c7c6f15606f404772a3",
//       creatorId: "66b0bbec7034f8bd5fe19f09",
//       videoLink: "https://youtu.be/ghi345",
//       title: "The Art of Minimalism",
//       description: "Living more with less.",
//       tags: ["lifestyle", "minimalism"],
//       language: "Japanese",
//       youtubeLink: true,
//       youtubeVideoId: "ghi345",
//       category: "Lifestyle",
//       averageRating: 4.3,
//       createdAt: new Date("2024-08-20T13:24:04.020Z"),
//       updatedAt: new Date("2024-08-20T13:24:04.020Z"),
//     },
//     {
//       _id: "66b37c7c6f15606f404772a4",
//       creatorId: "66b0bbec7034f8bd5fe19f10",
//       videoLink: "https://youtu.be/def678",
//       title: "Yoga for Beginners",
//       description: "A beginner’s guide to yoga.",
//       tags: ["fitness", "yoga"],
//       language: "Hindi",
//       youtubeLink: true,
//       youtubeVideoId: "def678",
//       category: "Health & Wellness",
//       averageRating: 4.7,
//       createdAt: new Date("2024-08-22T16:34:04.020Z"),
//       updatedAt: new Date("2024-08-22T16:34:04.020Z"),
//     },
//     {
//       _id: "66b37c7c6f15606f404772a5",
//       creatorId: "66b0bbec7034f8bd5fe19f11",
//       videoLink: "https://youtu.be/jkl901",
//       title: "Introduction to Meditation",
//       description: "Basic meditation techniques for relaxation.",
//       tags: ["mindfulness", "meditation"],
//       language: "Mandarin",
//       youtubeLink: true,
//       youtubeVideoId: "jkl901",
//       category: "Spirituality",
//       averageRating: 4.6,
//       createdAt: new Date("2024-08-25T08:14:04.020Z"),
//       updatedAt: new Date("2024-08-25T08:14:04.020Z"),
//     },
//     {
//       _id: "66b37c7c6f15606f404772a6",
//       creatorId: "66b0bbec7034f8bd5fe19f12",
//       videoLink: "https://youtu.be/nop234",
//       title: "The Future of Technology",
//       description: "An insight into upcoming technological trends.",
//       tags: ["technology", "innovation"],
//       language: "Korean",
//       youtubeLink: true,
//       youtubeVideoId: "nop234",
//       category: "Technology",
//       averageRating: 4.8,
//       createdAt: new Date("2024-08-28T18:44:04.020Z"),
//       updatedAt: new Date("2024-08-28T18:44:04.020Z"),
//     },
//     {
//       _id: "66b37c7c6f15606f404772a7",
//       creatorId: "66b0bbec7034f8bd5fe19f13",
//       videoLink: "https://youtu.be/qrs567",
//       title: "Creative Writing Tips",
//       description: "How to enhance your creative writing skills.",
//       tags: ["writing", "creativity"],
//       language: "Russian",
//       youtubeLink: true,
//       youtubeVideoId: "qrs567",
//       category: "Education",
//       averageRating: 4.4,
//       createdAt: new Date("2024-08-30T12:24:04.020Z"),
//       updatedAt: new Date("2024-08-30T12:24:04.020Z"),
//     },
//   ];

//   console.log("MAi kha kaise hai aap log", allVideosData);

//   const [searchValue, setSearchValue] = useState("");
//   const [tag, setTag] = useState("");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatchToRedux(allvideos({ page }));
//   }, [page]);
//   const [selectedCatagory, setSelectedCatagory] = useState("");
//   const handleCategorySelection = useCallback(
//     (category) => {
//       dispatchToRedux(videoFilter({ category }));
//     },
//     [dispatchToRedux],
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
//   return (
//     <Box sx={{ backgroundColor: "#ffffff", mt: "8.5rem", border: 1 }}>
//       <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             overflowX: "auto",
//             overflowY: "hidden",
//             maxWidth: "100%",
//             padding: "1rem 0",
//           }}
//         >
//           {" "}
//           <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//             Suggested:
//           </Typography>
//           {categories.map((category, index) => (
//             <Button
//               key={`${category}-index-${index}`}
//               onClick={() => {
//                 handleCategorySelection(category);
//                 setSelectedCatagory(category);
//               }}
//               variant="contained"
//               sx={{
//                 borderRadius: "20px",
//                 padding: "0.5rem 1.2rem",
//                 fontFamily: fonts.sans,
//                 margin: "0 0.5rem",
//                 textTransform: "none",
//                 backgroundColor: selectedCatagory === category ? "#FF8A00" : "#ff880033",
//                 color: selectedCatagory === category ? "white" : "#FF8A00",
//                 fontWeight: "bold",
//                 whiteSpace: "nowrap",
//                 minWidth: "fit-content",
//                 "&:hover": {
//                   backgroundColor: "#FF8A00",
//                   color: "white",
//                 },
//               }}
//             >
//               {category}
//             </Button>
//           ))}
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//             margin: "auto",
//             marginBottom: "1rem",
//             padding: "1rem 0",
//           }}
//           className={exploreStyles["filters"]}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//               margin: "auto",
//               marginBottom: "1rem",
//               padding: "1rem 0",
//             }}
//           >
//             <TextField
//               label="Search"
//               variant="outlined"
//               sx={{ marginRight: "10px", flexGrow: 1 }}
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//             />
//             <TextField
//               select
//               label="Filtered By Tags"
//               variant="outlined"
//               sx={{ marginRight: "10px", width: "200px" }}
//               value={tag}
//               onChange={(e) => setTag(e.target.value)}
//             >
//               {tags.map((tag) => (
//                 <MenuItem key={tag.option} value={tag.option}>
//                   {tag.option}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Box>
//           <Box sx={{ display: "flex", gap: "10px" }}>
//             <GeneralButton onClick={handleSearchClick} text="Apply" />
//             <GeneralButton onClick={handleReset} text="Reset" />
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "repeat(2, 1fr)",
//               lg: "repeat(4, 1fr)",
//             },
//             gap: "2rem",
//             margin: "auto",
//             marginTop: "5rem",
//             // height: '12rem'
//           }}
//         >
//           {allVideosData?.length === 0 ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 // height: "30vh",
//                 width: "100vw",
//               }}
//             >
//               <Typography variant="h5" sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
//                 No Video Found
//               </Typography>
//             </Box>
//           ) : (
//             allVideosData?.map((video) => <VideoCard key={video._id} video={video} />)
//           )}
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "5rem",
//             padding: "1rem",
//           }}
//         >
//           <Pagination count={allVideosData?.totalPages} size="large" onChange={handlePageChange} />
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Explore;

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Container, MenuItem, Pagination, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeneralButton from "../components/general/GeneralButton";
import VideoCard from "../components/VideoCard";
import { allvideos, resetState, selectAllVideosData, videoFilter } from "../redux/slices/creatorSlice";
import { getAllVideos, selectAllVideos } from "../redux/slices/exploreSlice.js";
import exploreStyles from "../styles/Explore.module.css";
import { categories, tags } from "../utility/category";
import { fonts } from "../utility/fonts.js";

const Explore = () => {
  const dispatchToRedux = useDispatch();
  let allVideosData = useSelector(selectAllVideos);
  // allVideosData = [
  //   {
  //     _id: "66b37c7c6f15606f4047729e",
  //     creatorId: "66b0bbec7034f8bd5fe19f04",
  //     videoLink: "https://youtu.be/F4Zu5ZZAG7I?si=kYqWC4iKZSdyiOjN",
  //     title: "7 Ways to Make a Conversation With Anyone | Malavika Varadan | TEDxBITSPilaniDubai",
  //     description: "7 Ways to Make a Conversation With Anyone | Malavika Varadan | TEDxBITSPilaniDubai",
  //     tags: ["literature"],
  //     language: "Aymara",
  //     youtubeLink: true,
  //     youtubeVideoId: "F4Zu5ZZAG7I",
  //     category: "Career Planning",
  //     averageRating: 2,
  //     createdAt: new Date("2024-08-07T13:54:04.020Z"),
  //     updatedAt: new Date("2024-08-07T13:54:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  //   {
  //     _id: "66b37c7c6f15606f4047729f",
  //     creatorId: "66b0bbec7034f8bd5fe19f05",
  //     videoLink: "https://youtu.be/abc123",
  //     title: "The Power of Positive Thinking",
  //     description: "A talk on how positive thinking can change your life.",
  //     tags: ["self-help"],
  //     language: "English",
  //     youtubeLink: true,
  //     youtubeVideoId: "abc123",
  //     category: "Personal Development",
  //     averageRating: 4.5,
  //     createdAt: new Date("2024-08-01T10:24:04.020Z"),
  //     updatedAt: new Date("2024-08-01T10:24:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  //   {
  //     _id: "66b37c7c6f15606f404772a0",
  //     creatorId: "66b0bbec7034f8bd5fe19f06",
  //     videoLink: "https://youtu.be/xyz456",
  //     title: "Understanding Quantum Physics",
  //     description: "An introductory lecture on quantum physics.",
  //     tags: ["science", "physics"],
  //     language: "Spanish",
  //     youtubeLink: true,
  //     youtubeVideoId: "xyz456",
  //     category: "Education",
  //     averageRating: 4.8,
  //     createdAt: new Date("2024-08-10T15:14:04.020Z"),
  //     updatedAt: new Date("2024-08-10T15:14:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  //   {
  //     _id: "66b37c7c6f15606f404772a1",
  //     creatorId: "66b0bbec7034f8bd5fe19f07",
  //     videoLink: "https://youtu.be/pqr789",
  //     title: "Healthy Eating Habits",
  //     description: "Tips and tricks for a balanced diet.",
  //     tags: ["health", "nutrition"],
  //     language: "French",
  //     youtubeLink: true,
  //     youtubeVideoId: "pqr789",
  //     category: "Health & Wellness",
  //     averageRating: 4.2,
  //     createdAt: new Date("2024-08-15T09:34:04.020Z"),
  //     updatedAt: new Date("2024-08-15T09:34:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  //   {
  //     _id: "66b37c7c6f15606f404772a2",
  //     creatorId: "66b0bbec7034f8bd5fe19f08",
  //     videoLink: "https://youtu.be/mno012",
  //     title: "Mastering Public Speaking",
  //     description: "How to become a confident public speaker.",
  //     tags: ["communication", "public speaking"],
  //     language: "German",
  //     youtubeLink: true,
  //     youtubeVideoId: "mno012",
  //     category: "Career Development",
  //     averageRating: 4.9,
  //     createdAt: new Date("2024-08-18T11:04:04.020Z"),
  //     updatedAt: new Date("2024-08-18T11:04:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  //   {
  //     _id: "66b37c7c6f15606f404772a3",
  //     creatorId: "66b0bbec7034f8bd5fe19f09",
  //     videoLink: "https://youtu.be/ghi345",
  //     title: "The Art of Minimalism",
  //     description: "Living more with less.",
  //     tags: ["lifestyle", "minimalism"],
  //     language: "Japanese",
  //     youtubeLink: true,
  //     youtubeVideoId: "ghi345",
  //     category: "Lifestyle",
  //     averageRating: 4.3,
  //     createdAt: new Date("2024-08-20T13:24:04.020Z"),
  //     updatedAt: new Date("2024-08-20T13:24:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  //   {
  //     _id: "66b37c7c6f15606f404772a4",
  //     creatorId: "66b0bbec7034f8bd5fe19f10",
  //     videoLink: "https://youtu.be/def678",
  //     title: "Yoga for Beginners",
  //     description: "A beginner’s guide to yoga.",
  //     tags: ["fitness", "yoga"],
  //     language: "Hindi",
  //     youtubeLink: true,
  //     youtubeVideoId: "def678",
  //     category: "Health & Wellness",
  //     averageRating: 4.7,
  //     createdAt: new Date("2024-08-22T16:34:04.020Z"),
  //     updatedAt: new Date("2024-08-22T16:34:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  //   {
  //     _id: "66b37c7c6f15606f404772a5",
  //     creatorId: "66b0bbec7034f8bd5fe19f11",
  //     videoLink: "https://youtu.be/jkl901",
  //     title: "Introduction to Meditation",
  //     description: "Basic meditation techniques for relaxation.",
  //     tags: ["mindfulness", "meditation"],
  //     language: "Mandarin",
  //     youtubeLink: true,
  //     youtubeVideoId: "jkl901",
  //     category: "Spirituality",
  //     averageRating: 4.6,
  //     createdAt: new Date("2024-08-25T08:14:04.020Z"),
  //     updatedAt: new Date("2024-08-25T08:14:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  //   {
  //     _id: "66b37c7c6f15606f404772a6",
  //     creatorId: "66b0bbec7034f8bd5fe19f12",
  //     videoLink: "https://youtu.be/nop234",
  //     title: "The Future of Technology",
  //     description: "An insight into upcoming technological trends.",
  //     tags: ["technology", "innovation"],
  //     language: "Korean",
  //     youtubeLink: true,
  //     youtubeVideoId: "nop234",
  //     category: "Technology",
  //     averageRating: 4.8,
  //     createdAt: new Date("2024-08-28T18:44:04.020Z"),
  //     updatedAt: new Date("2024-08-28T18:44:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  //   {
  //     _id: "66b37c7c6f15606f404772a7",
  //     creatorId: "66b0bbec7034f8bd5fe19f13",
  //     videoLink: "https://youtu.be/qrs567",
  //     title: "Creative Writing Tips",
  //     description: "How to enhance your creative writing skills.",
  //     tags: ["writing", "creativity"],
  //     language: "Russian",
  //     youtubeLink: true,
  //     youtubeVideoId: "qrs567",
  //     category: "Education",
  //     averageRating: 4.4,
  //     createdAt: new Date("2024-08-30T12:24:04.020Z"),
  //     updatedAt: new Date("2024-08-30T12:24:04.020Z"),
  //     creatorName: "Shivam Chaudhary",
  //     views: "10",
  //     rating: "4",
  //   },
  // ];

  const [searchValue, setSearchValue] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatchToRedux(getAllVideos({ page }));
  }, [page]);

  const [selectedCatagory, setSelectedCatagory] = useState("");
  const handleCategorySelection = useCallback(
    (category) => {
      dispatchToRedux(videoFilter({ category }));
    },
    [dispatchToRedux],
  );

  const handleSearchClick = useCallback(() => {
    if (tag) {
      dispatchToRedux(videoFilter({ tags: [tag] }));
    }
    if (searchValue) {
      dispatchToRedux(videoFilter({ search: searchValue }));
    }
  }, [searchValue, tag, dispatchToRedux]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  useEffect(() => {}, [allVideosData, dispatchToRedux]);

  const handleReset = () => {
    dispatchToRedux(resetState());
    dispatchToRedux(allvideos({ page }));
  };
  return (
    <Box sx={{ mt: "8.5rem" }}>
      <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "2px 2px 10px #a7a7a764",
            width: "80rem",
            maxWidth: "100%",
            margin: "auto",
            borderRadius: "19px",
          }}
        >
          <Box
            sx={{
              // width: "100%",
              display: "flex",
              alignItems: "center",
              overflowX: "auto",
              overflowY: "hidden",
              maxWidth: "100%",
              padding: "10px 0",
              margin: "0px 30.79px",
            }}
          >
            {" "}
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "15px" }}>
              Suggested:
            </Typography>
            {categories.map((category, index) => (
              <Button
                key={`${category}-index-${index}`}
                onClick={() => {
                  handleCategorySelection(category);
                  setSelectedCatagory(category);
                }}
                variant="contained"
                sx={{
                  minWidth: "fit-content",
                  borderRadius: "90px",
                  padding: "6px 10px",
                  fontFamily: fonts.sans,
                  margin: "0 10px",
                  textTransform: "none",
                  backgroundColor: selectedCatagory === category ? "#FF8A00" : "#ff880033",
                  color: selectedCatagory === category ? "white" : "#FF8A00",
                  fontWeight: "bold",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  // width: "90px",
                  "&:hover": {
                    backgroundColor: "#FF8A00",
                    color: "white",
                  },
                }}
              >
                {category}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              margin: "auto",
            }}
            className={exploreStyles["filters"]}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "auto",
                padding: "15px 30px",
              }}
            >
              <input
                placeholder="Search"
                variant="outlined"
                style={{
                  marginRight: "10px",
                  flexGrow: 1,
                  width: "23.6875rem",
                  height: "3rem",
                  outline: "none",
                  border: "1px solid #dddddd",
                  borderRadius: "90px",
                  padding: "12px 15px",
                }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Box>
            <div className={exploreStyles["select-and-buttons"]}>
              <TextField
                select
                variant="outlined"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className={exploreStyles["select"]}
                displayEmpty
                sx={{
                  marginRight: "10px",
                  width: "169px",
                  maxWidth: "100%",
                  height: "48px",
                  backgroundColor: "#F6F6F6",
                  color: "#545454",
                  borderRadius: "90px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-icon": {
                    color: "#720361",
                  },
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center", // Center content vertically
                    height: "100%", // Ensure full height for alignment
                  },
                }}
                SelectProps={{
                  IconComponent: KeyboardArrowDownIcon,
                }}
                renderValue={(value) => (value === "" ? "Filtered By Tags" : value)}
              >
                <MenuItem disabled value="">
                  <em>Filtered By Tags</em>
                </MenuItem>

                {tags.map((tag) => (
                  <MenuItem key={tag.option} value={tag.option}>
                    {tag.option}
                  </MenuItem>
                ))}
              </TextField>
              <Box sx={{ display: "flex", gap: "10px" }} className={exploreStyles["buttons"]}>
                {/* <GeneralButton  text="Apply" /> */}
                <button onClick={handleSearchClick} className={exploreStyles["applyBtn"]}>
                  Apply
                </button>
                {/* <GeneralButton onClick={handleReset} text="Reset" /> */}
                <button
                  // style={{ marginRight: "30px" }}
                  onClick={handleReset}
                  className={exploreStyles["resetBtn"]}
                >
                  Reset
                </button>
              </Box>
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: "30px",
            margin: "auto",
            marginTop: "30px",
            // border: "1px solid",
            width: "1280px",
            maxWidth: "100%",
            // height: '12rem'
          }}
        >
          {allVideosData?.videos?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40vh",
                width: "90vw",
                margin: "auto",
                // border: "1px solid black",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: fonts.sans, fontWeight: "600", textAlign: "center" }}
              >
                No Videos Found
              </Typography>
            </Box>
          ) : (
            allVideosData?.videos?.map((video) => <VideoCard key={video._id} video={video} />)
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
            padding: "1rem",
          }}
        >
          <Pagination count={allVideosData?.totalPages} size="large" onChange={handlePageChange} />
        </Box>
      </Container>
    </Box>
  );
};

export default Explore;
