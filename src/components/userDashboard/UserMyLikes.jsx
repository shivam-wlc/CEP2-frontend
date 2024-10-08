// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getMyLikedVideos,
//   selectMyLikedVideos,
// } from "../../redux/slices/userSlice.js";
// import { fonts } from "../../utility/fonts.js";
// import {
//   selectAuthenticated,
//   selectUserId,
//   selectToken,
// } from "../../redux/slices/authSlice.js";
// import { Box, Typography, Pagination } from "@mui/material";
// import UserDashboardVideoCard from "../UserDashboardVideoCard.jsx";

// function UserMyLikes() {
//   const dispatchToRedux = useDispatch();
//   const userId = useSelector(selectUserId);
//   const token = useSelector(selectToken);
//   const likedVideoData = useSelector(selectMyLikedVideos);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     if (likedVideoData.length === 0) {
//       dispatchToRedux(getMyLikedVideos({ userId, page, token }));
//     }
//   }, []);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   console.log("likedVideoData", likedVideoData);
//   return (
//     <>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: "1rem",
//           margin: "auto",
//           marginTop: "5rem",
//           backgroundColor: "white",
//         }}
//       >
//         {likedVideoData?.likedVideos?.length === 0 ? (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "200px",
//               width: "430%",
//               margin: "auto",
//             }}
//           >
//             <Typography
//               variant="h5"
//               sx={{ fontFamily: fonts.sans, fontWeight: "600" }}
//             >
//               No Video Found
//             </Typography>
//           </Box>
//         ) : (
//           likedVideoData?.likedVideos?.map((video) => (
//             <UserDashboardVideoCard key={video._id} video={video.videoId} />
//           ))
//         )}
//       </Box>
//       <Box
//         sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
//       >
//         <Pagination
//           count={likedVideoData?.totalPages}
//           size="large"
//           onChange={handlePageChange}
//         />
//       </Box>
//     </>
//   );
// }

// export default UserMyLikes;

import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import { getMyLikedVideos, selectMyLikedVideos } from "../../redux/slices/userSlice.js";

function UserMyLikes() {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);

  const dummyLikedVideos = {
    likedVideos: [
      {
        _id: "1",
        videoId: {
          thumbnailUrl:
            "https://marketplace.canva.com/EAFW7JwIojo/2/0/1600w/canva-red-colorful-tips-youtube-thumbnail-FxVVsqyawqY.jpg",
          title: "How to Cook Perfect Pasta",
        },
        rating: 4,
        ratedby: 129,
        notes: "Great recipe for beginners!",
        sharedWith: 125,
        date: "16/08/2024",
      },
      {
        _id: "2",
        videoId: {
          thumbnailUrl: "https://miro.medium.com/v2/resize:fit:1200/1*60RQyL8WeifCvfJX8dQCcQ.jpeg",
          title: "Yoga for Beginners",
        },
        rating: 5,
        ratedby: 219,
        notes: "Very relaxing and easy to follow.",
        sharedWith: 150,
        date: "16/08/2024",
      },
      {
        _id: "3",
        videoId: {
          thumbnailUrl:
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/boost-your-finances-youtube-thumbnail-design-template-6bd3aef9baa293adb41b026f3a2a452e_screen.jpg?ts=1694788258",
          title: "Advanced Makeup Techniques",
        },
        rating: 3,
        ratedby: 229,
        notes: "Some parts were too fast-paced.",
        sharedWith: 90,
        date: "16/08/2024",
      },
    ],
    totalPages: 1,
  };

  let likedVideoData = useSelector(selectMyLikedVideos);

  likedVideoData = dummyLikedVideos;

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatchToRedux(getMyLikedVideos({ userId, page, token }));
  }, [dispatchToRedux, userId, page, token]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const renderStars = (rating) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <span
              key={index}
              style={{
                color: index < rating ? "#FF8A00" : "#ccc",
                fontSize: "20px",
              }}
            >
              ★
            </span>
          ))}
      </Box>
    );
  };

  return (
    <Box sx={{ margin: "auto", marginTop: "5rem", backgroundColor: "white" }}>
      <TableContainer>
        <Table border="1" borderColor="#dbd6db">
          <TableHead>
            <TableRow sx={{ background: "#720361" }}>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>Thumbnail</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>My Rating</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>My Notes</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>Shared with</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {likedVideoData.likedVideos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6">No Video Found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              likedVideoData.likedVideos.map((video) => (
                <TableRow key={video._id}>
                  <TableCell>
                    <img
                      src={video.videoId.thumbnailUrl}
                      alt={video.videoId.title}
                      style={{
                        width: "100%",
                        height: "90px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {renderStars(video.rating)}
                      <Typography variant="body2" sx={{ marginLeft: "0.5rem" }}>
                        ({video.ratedby})
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{video.notes}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography>{video.sharedWith} users</Typography>
                  </TableCell>

                  <TableCell>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <Pagination count={likedVideoData.totalPages} page={page} onChange={handlePageChange} size="large" />
      </Box>
    </Box>
  );
}

export default UserMyLikes;
