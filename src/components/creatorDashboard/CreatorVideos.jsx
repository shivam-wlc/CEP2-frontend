// // CreatorVideos.jsx
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import {
//   Box,
//   IconButton,
//   Pagination,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import DeleteModal from "../../models/DeleteModal.jsx";
// import EditVideoModal from "../../models/EditVideoModal.jsx";
// import { notify } from "../../redux/slices/alertSlice.js";
// import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
// import {
//   deleteVideo,
//   getAuthorVideos,
//   searchVideosByTitle,
//   selectAuthorVideos,
//   updateVideo,
// } from "../../redux/slices/creatorSlice.js";
// import { colors } from "../../utility/color.js";
// import { convertUTCDateToLocalDate } from "../../utility/convertTimeToUTC.js";
// import { fonts } from "../../utility/fonts.js";
// import GeneralButton from "../general/GeneralButton.jsx";

// const CreatorVideos = () => {
//   const dispatchToRedux = useDispatch();
//   const userId = useSelector(selectUserId);
//   const token = useSelector(selectToken);
//   const authorVideos = useSelector(selectAuthorVideos);

//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [videoIdToDelete, setVideoIdToDelete] = useState(null);
//   const [isButtonLoading, setIsButtonLoading] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [videoToEdit, setVideoToEdit] = useState(null);

//   // pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
//   const [searchValue, setSearchValue] = useState("");

//   const tableHead = {
//     fontFamily: fonts.sans,
//     fontWeight: "bold",
//     fontSize: "16px",
//     color: colors.darkGray,
//     textAlign: "left",
//   };

//   const tableData = {
//     fontFamily: fonts.sans,
//     fontSize: "14px",
//     color: colors.darkGray,
//     textAlign: "left",
//   };

//   useEffect(() => {
//     dispatchToRedux(getAuthorVideos({ userId, page: page + 1, limit: rowsPerPage }));
//   }, [page, rowsPerPage]);

//   const handleSearchClick = () => {
//     setPage(0);
//     dispatchToRedux(
//       getAuthorVideos({
//         userId,
//         page: 1,
//         limit: rowsPerPage,
//         search: searchValue,
//       }),
//     );
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   //EDIT

//   const handleVideoEdit = (video) => {
//     setEditModalOpen(true);
//     setVideoToEdit(video);
//   };

//   const handleEditClose = () => {
//     setEditModalOpen(false);
//     setVideoToEdit(null);
//   };

//   const handleUpdateVideo = async (updatedVideo) => {
//     try {
//       setIsButtonLoading(true);
//       await dispatchToRedux(
//         updateVideo({
//           userId,
//           videoId: updatedVideo._id,
//           formData: updatedVideo,
//           token,
//         }),
//       );
//       setIsButtonLoading(false);
//       setVideoToEdit(null);
//       setEditModalOpen(false);
//       dispatchToRedux(notify({ type: "success", message: "Video updated successfully" }));
//     } catch (error) {
//       setIsButtonLoading(false);
//       dispatchToRedux(
//         notify({
//           type: "error",
//           message: "Something went wrong, please try again",
//         }),
//       );
//     }
//   };

//   // DELETE VIDEO

//   const handleVideoDelete = (videoId) => {
//     setVideoIdToDelete(videoId);
//     setDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       setIsButtonLoading(true);
//       await dispatchToRedux(deleteVideo({ userId, videoId: videoIdToDelete, token }));
//       dispatchToRedux(notify({ type: "success", message: "Video deleted successfully" }));
//       setIsButtonLoading(false);
//       setDeleteModalOpen(false);
//       setVideoIdToDelete(null);
//     } catch (error) {
//       setIsButtonLoading(false);
//       setVideoIdToDelete(null);
//       dispatchToRedux(
//         notify({
//           type: "error",
//           message: "Something went wrong, please try again",
//         }),
//       );
//     }
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   console.log("authorVideos", authorVideos);
//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: colors.white,
//           marginBottom: "1rem",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h5" sx={{ fontFamily: fonts.poppins, fontWeight: "600", padding: "1rem" }}>
//           Manage Your Videos
//         </Typography>
//         <Box
//           sx={{
//             width: "50%",
//             display: "flex",
//             justifyContent: "flex-end",
//             gap: "1rem",
//           }}
//         >
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchValue}
//             sx={{ width: "70%" }}
//             onChange={(e) => setSearchValue(e.target.value)}
//           />
//           <GeneralButton onClick={handleSearchClick} text="Search" />
//         </Box>
//       </Box>
//       <Box sx={{ backgroundColor: colors.white }}>
//         <TableContainer sx={{ width: "100%" }}>
//           <Table
//             size="large"
//             arial-label="a dense table"
//             sx={{
//               boxShadow: "none",
//               "& .MuiTableCell-root": { padding: "15px 0px" },
//             }}
//             // stickyHeader
//           >
//             <TableHead
//               sx={{
//                 height: "50px",
//               }}
//             >
//               <TableRow>
//                 <TableCell sx={{ ...tableHead, textAlign: "center" }}>Video</TableCell>
//                 <TableCell sx={tableHead}>Title</TableCell>
//                 <TableCell sx={tableHead}>Likes</TableCell>
//                 <TableCell sx={tableHead}>Comments</TableCell>
//                 <TableCell sx={tableHead}>Publish Date</TableCell>
//                 <TableCell sx={tableHead}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {authorVideos?.videos?.map((video) => (
//                 <TableRow
//                   key={video._id}
//                   sx={{
//                     "&:hover": { backgroundColor: "lightgray" },
//                     cursor: "pointer",
//                     "& .MuiTableCell-root": { padding: "15px 0px" },
//                   }}
//                 >
//                   <TableCell sx={{ ...tableData, textAlign: "center" }}>
//                     {video.youtubeLink ? (
//                       <>
//                         <img
//                           src={`https://img.youtube.com/vi/${video.youtubeVideoId}/0.jpg`}
//                           alt="thumbnail"
//                           style={{ width: "160px", height: "90px" }}
//                         />
//                       </>
//                     ) : (
//                       <img src={video.thumbnail} alt="thumbnail" style={{ width: "160px", height: "90px" }} />
//                     )}
//                   </TableCell>
//                   <TableCell sx={tableData}>{video.title}</TableCell>
//                   {/* <TableCell sx={tableData}>{video?.likes.length}</TableCell> */}
//                   {/* <TableCell sx={tableData}>{video?.comments.length}</TableCell> */}
//                   <TableCell sx={tableData}>{convertUTCDateToLocalDate(video.createdAt)}</TableCell>
//                   <TableCell>
//                     <IconButton aria-label="edit" onClick={() => handleVideoEdit(video)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton aria-label="delete" onClick={() => handleVideoDelete(video._id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             margin: "1rem",
//             gap: "1rem",
//             padding: "1rem",
//           }}
//         >
//           {/* <Pagination
//             count={authorVideos?.totalPages}
//             size="large"
//             onChange={handlePageChange}
//           /> */}
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={authorVideos?.totalVideos || 0}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           ></TablePagination>
//         </Box>
//         <DeleteModal
//           open={deleteModalOpen}
//           onClose={() => setDeleteModalOpen(false)}
//           onDelete={handleConfirmDelete}
//           title="Confirm Delete?"
//           text="Are you sure you want to delete this video?"
//           fonts={fonts}
//           colors={colors}
//           isButtonLoading={isButtonLoading}
//         />
//         <EditVideoModal
//           open={editModalOpen}
//           onClose={handleEditClose}
//           video={videoToEdit}
//           onUpdate={handleUpdateVideo}
//           isButtonLoading={isButtonLoading}
//         />
//       </Box>
//     </>
//   );
// };

// export default CreatorVideos;
// CreatorVideos.jsx
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import creatorStyles from "../../styles/CreatorVideo.module.css";
import {
  Box,
  IconButton,
  Pagination,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeleteModal from "../../models/DeleteModal.jsx";
import EditVideoModal from "../../models/EditVideoModal.jsx";
import { notify } from "../../redux/slices/alertSlice.js";
import { selectToken, selectUserId } from "../../redux/slices/authSlice.js";
import {
  deleteVideo,
  getAuthorVideos,
  searchVideosByTitle,
  selectAuthorVideos,
  updateVideo,
} from "../../redux/slices/creatorSlice.js";
import { colors } from "../../utility/color.js";
import { convertUTCDateToLocalDate } from "../../utility/convertTimeToUTC.js";
import { fonts } from "../../utility/fonts.js";
import GeneralButton from "../general/GeneralButton.jsx";
import { edit, search, trash } from "../../assets/assest.js";

const CreatorVideos = () => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoIdToDelete, setVideoIdToDelete] = useState(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [searchValue, setSearchValue] = useState("");

  const tableHead = {
    fontFamily: fonts.sans,
    fontWeight: "bold",
    fontSize: "16px",
    color: colors.white,
  };

  const tableData = {
    fontFamily: fonts.sans,
    fontSize: "14px",
    color: colors.darkGray,
  };

  useEffect(() => {
    dispatchToRedux(getAuthorVideos({ userId, page: page + 1, limit: rowsPerPage }));
  }, [page, rowsPerPage]);

  const handleSearchClick = () => {
    setPage(0);
    dispatchToRedux(
      getAuthorVideos({
        userId,
        page: 1,
        limit: rowsPerPage,
        search: searchValue,
      }),
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //EDIT

  const handleVideoEdit = (video) => {
    setEditModalOpen(true);
    setVideoToEdit(video);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setVideoToEdit(null);
  };

  const handleUpdateVideo = async (updatedVideo) => {
    try {
      setIsButtonLoading(true);
      await dispatchToRedux(
        updateVideo({
          userId,
          videoId: updatedVideo._id,
          formData: updatedVideo,
          token,
        }),
      );
      setIsButtonLoading(false);
      setVideoToEdit(null);
      setEditModalOpen(false);
      dispatchToRedux(notify({ type: "success", message: "Video updated successfully" }));
    } catch (error) {
      setIsButtonLoading(false);
      dispatchToRedux(
        notify({
          type: "error",
          message: "Something went wrong, please try again",
        }),
      );
    }
  };

  // DELETE VIDEO

  const handleVideoDelete = (videoId) => {
    setVideoIdToDelete(videoId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsButtonLoading(true);
      await dispatchToRedux(deleteVideo({ userId, videoId: videoIdToDelete, token }));
      dispatchToRedux(notify({ type: "success", message: "Video deleted successfully" }));
      setIsButtonLoading(false);
      setDeleteModalOpen(false);
      setVideoIdToDelete(null);
    } catch (error) {
      setIsButtonLoading(false);
      setVideoIdToDelete(null);
      dispatchToRedux(
        notify({
          type: "error",
          message: "Something went wrong, please try again",
        }),
      );
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // console.log("authorVideos", authorVideos);

  // Note check functions I am taken them as example
  // const authorVideos = useSelector(selectAuthorVideos);

  const authorVideos = [
    {
      _id: "123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "12323",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "123321",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "123312",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "132123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "13123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "131223",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "1232143",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "14123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "14123",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
    {
      _id: "1412423",
      date: "16/08/2024",
      thumbnail: "https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg",
      title: "Create your own",
      views: "120",
      likes: "212",
      shares: "233",
      rating: 4,
      action: { edit: (id) => {}, delete: (id) => {} },
    },
  ];

  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Box
        sx={{
          // backgroundColor: colors.white,
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: fonts.poppins, fontWeight: "600", padding: "1rem" }}>
          Manage Your Content
        </Typography>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "2.5rem",
              position: "relative",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <input
              placeholder="Search"
              value={searchValue}
              style={{
                width: "70%",
                height: "2.5rem",
                backgroundColor: "white",
                paddingLeft: "1rem",
                outline: "none",
                border: "1.5px solid #a9a9a9",
                borderRadius: "1.2rem",
                backgroundColor: "white",
              }}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <img
              src={search}
              alt=""
              style={{
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                top: "16%",
                right: "3%",
              }}
            />
          </div>
          <button
            onClick={handleSearchClick}
            style={{ fontWeight: "600" }}
            className={creatorStyles["navButton"]}
          >
            Search
          </button>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: colors.white,
          padding: "1.5rem",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "4rem",
            fontSize: "1.1rem",
            fontWeight: "500",
            borderBottom: "1px solid #dedede",
            marginBottom: "1.3rem",
          }}
        >
          <p
            onClick={() => {
              setActiveTab(1);
            }}
            style={{
              color: activeTab === 1 ? "#BC2876" : colors.lightGray,
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
              color: activeTab === 2 ? "#BC2876" : colors.lightGray,
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
              color: activeTab === 3 ? "#BC2876" : colors.lightGray,
              padding: ".5rem 2rem",
              fontWeight: activeTab === 3 ? "600" : "",
              borderBottom: activeTab === 3 ? "2px solid #BC2876" : "",
              cursor: "pointer",
            }}
          >
            Podcasts
          </p>
        </div>
        <TableContainer sx={{ width: "100%" }}>
          {activeTab === 1 && (
            <Table
              size="large"
              arial-label="a dense table"
              sx={{
                boxShadow: "none",
                "& .MuiTableCell-root": {
                  padding: "15px 0px",
                  border: "1px solid #dddddd65",
                },
              }}
              // stickyHeader
            >
              <TableHead
                sx={{
                  height: "50px",
                }}
              >
                <TableRow sx={{ backgroundColor: "#720361" }}>
                  <TableCell sx={tableHead}>Date published</TableCell>
                  <TableCell sx={tableHead}>Thumbnail</TableCell>
                  <TableCell sx={tableHead}>Title</TableCell>
                  <TableCell sx={tableHead}>Views</TableCell>
                  <TableCell sx={tableHead}>Likes</TableCell>
                  <TableCell sx={tableHead}>Shares</TableCell>
                  <TableCell sx={tableHead}>Rating</TableCell>
                  <TableCell sx={tableHead}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {authorVideos?.map((video) => (
                  <TableRow
                    key={video._id}
                    sx={{
                      "&:hover": { backgroundColor: "lightgray" },
                      cursor: "pointer",
                      "& .MuiTableCell-root": { padding: "10px 0px" },
                    }}
                  >
                    <TableCell sx={{ ...tableData, marginLeft: "10px !important"  }}>{video.date}</TableCell>
                    <TableCell sx={{ ...tableData, textAlign: "center" }}>
                      {video?.youtubeLink ? (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${video.youtubeVideoId}/0.jpg`}
                            alt="thumbnail"
                            style={{ width: "160px", height: "90px" }}
                          />
                        </>
                      ) : (
                        <img
                          src={video.thumbnail}
                          alt="thumbnail"
                          style={{ width: "160px", height: "90px" }}
                        />
                      )}
                    </TableCell>
                    <TableCell sx={tableData}>{video.title}</TableCell>
                    <TableCell sx={tableData}>{video.views}</TableCell>
                    <TableCell sx={tableData}>{video.likes}</TableCell>
                    <TableCell sx={tableData}>{video.shares}</TableCell>
                    {/* <TableCell sx={tableData}>{video?.likes.length}</TableCell> */}
                    {/* <TableCell sx={tableData}>{video?.comments.length}</TableCell> */}
                    <TableCell sx={{ ...tableData, border: "1px solid #ddd" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Rating value={video.rating} readOnly />
                        <p style={{ color: "#a1a1a1", fontSize: "1rem" }}>&nbsp;({video.rating})</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          justifyContent: "center",
                        }}
                      >
                        <div onClick={() => handleVideoEdit(video)}>
                          <img src={edit} alt="edit" />
                        </div>
                        <div onClick={() => handleVideoDelete(video._id)}>
                          <img src={trash} alt="delete" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {activeTab === 2 && <div>Comming Soon</div>}
          {activeTab === 3 && <div>Comming Soon</div>}
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {/* <Pagination
            count={authorVideos?.totalPages}
            size="large"
            onChange={handlePageChange}
          /> */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={authorVideos?.totalVideos || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          ></TablePagination>
        </Box>
        <DeleteModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleConfirmDelete}
          title="Confirm Delete?"
          text="Are you sure you want to delete this video?"
          fonts={fonts}
          colors={colors}
          isButtonLoading={isButtonLoading}
        />
        <EditVideoModal
          open={editModalOpen}
          onClose={handleEditClose}
          video={videoToEdit}
          onUpdate={handleUpdateVideo}
          isButtonLoading={isButtonLoading}
        />
      </Box>
    </>
  );
};

export default CreatorVideos;
