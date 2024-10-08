// CreatorVideos.jsx
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  Pagination,
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

const CreatorVideos = () => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const authorVideos = useSelector(selectAuthorVideos);

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
    color: colors.darkGray,
    textAlign: "left",
  };

  const tableData = {
    fontFamily: fonts.sans,
    fontSize: "14px",
    color: colors.darkGray,
    textAlign: "left",
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

  console.log("authorVideos", authorVideos);
  return (
    <>
      <Box
        sx={{
          backgroundColor: colors.white,
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: fonts.poppins, fontWeight: "600", padding: "1rem" }}>
          Manage Your Videos
        </Typography>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchValue}
            sx={{ width: "70%" }}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <GeneralButton onClick={handleSearchClick} text="Search" />
        </Box>
      </Box>
      <Box sx={{ backgroundColor: colors.white }}>
        <TableContainer sx={{ width: "100%" }}>
          <Table
            size="large"
            arial-label="a dense table"
            sx={{
              boxShadow: "none",
              "& .MuiTableCell-root": { padding: "15px 0px" },
            }}
            // stickyHeader
          >
            <TableHead
              sx={{
                height: "50px",
              }}
            >
              <TableRow>
                <TableCell sx={{ ...tableHead, textAlign: "center" }}>Video</TableCell>
                <TableCell sx={tableHead}>Title</TableCell>
                <TableCell sx={tableHead}>Likes</TableCell>
                <TableCell sx={tableHead}>Comments</TableCell>
                <TableCell sx={tableHead}>Publish Date</TableCell>
                <TableCell sx={tableHead}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authorVideos?.videos?.map((video) => (
                <TableRow
                  key={video._id}
                  sx={{
                    "&:hover": { backgroundColor: "lightgray" },
                    cursor: "pointer",
                    "& .MuiTableCell-root": { padding: "15px 0px" },
                  }}
                >
                  <TableCell sx={{ ...tableData, textAlign: "center" }}>
                    {video.youtubeLink ? (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeVideoId}/0.jpg`}
                          alt="thumbnail"
                          style={{ width: "160px", height: "90px" }}
                        />
                      </>
                    ) : (
                      <img src={video.thumbnail} alt="thumbnail" style={{ width: "160px", height: "90px" }} />
                    )}
                  </TableCell>
                  <TableCell sx={tableData}>{video.title}</TableCell>
                  {/* <TableCell sx={tableData}>{video?.likes.length}</TableCell> */}
                  {/* <TableCell sx={tableData}>{video?.comments.length}</TableCell> */}
                  <TableCell sx={tableData}>{convertUTCDateToLocalDate(video.createdAt)}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" onClick={() => handleVideoEdit(video)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleVideoDelete(video._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
