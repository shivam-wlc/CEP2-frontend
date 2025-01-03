import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
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

import StatusUpdateModal from "../../models/StatusUpdateModal.jsx";
import { getAllUsers, selectUsersData, updateActiveStatus } from "../../redux/slices/adminSlice.js";
import { notify } from "../../redux/slices/alertSlice.js";
import { selectToken } from "../../redux/slices/authSlice.js";
import { fonts } from "../../utility/fonts.js";
import { inputFieldStyle, tableHeadStyle, tableBodyStyle, buttonStyle } from "../../utility/commonStyle.js";

const UsersData = () => {
  const dispatchToRedux = useDispatch();
  const usersInfo = useSelector(selectUsersData);
  const token = useSelector(selectToken);
  // State for anchorEl of menu and pagination
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  let users = usersInfo?.users || [];

  useEffect(() => {
    dispatchToRedux(getAllUsers({ token, page: page + 1, limit: rowsPerPage }));
  }, [dispatchToRedux, token, page, rowsPerPage]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery === "") {
      dispatchToRedux(notify({ type: "warning", message: "Please enter a search query" }));
      return;
    }
    setPage(0);
    dispatchToRedux(getAllUsers({ token, page: 1, limit: rowsPerPage, search: searchQuery }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //TableHead

  // Function to handle menu click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStausClick = (userId) => {
    setSelectedUserId(userId);
    setIsStatusModalOpen(true);
  };

  const handleStatusSubmit = async (status) => {
    if (!selectedUserId) {
      dispatchToRedux(
        notify({
          type: "error",
          message: "Something went wrong, Please try again",
        }),
      );
      return;
    }

    if (!status) {
      dispatchToRedux(
        notify({
          type: "error",
          message: "Please select a status",
        }),
      );
      return;
    }

    try {
      setIsButtonLoading(true);
      await dispatchToRedux(updateActiveStatus({ userId: selectedUserId, status, token }));
      setIsButtonLoading(false);
      dispatchToRedux(notify({ type: "success", message: "Status updated successfully" }));
    } catch (error) {
      setIsButtonLoading(false);
      dispatchToRedux(
        notify({
          type: "error",
          message: "Something went wrong, Please try again",
        }),
      );
    }

    // Close the modal
    setIsStatusModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <>
      <Box sx={{}}>
        <Box sx={{ ml: 2, mt: 2 }}>
          <Typography variant="h5" fontWeight="600" sx={{ fontFamily: fonts.poppins }}>
            Users
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            mt: 2,
            backgroundColor: "white",
            borderRadius: "10px 10px 0px 0px",
            display: "flex",
            alignItems: "center",
            gap: 2, // Add gap between TextField and Button
          }}
        >
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchInputChange}
            sx={{ ...inputFieldStyle, flex: 1 }}
          />
          <Button sx={buttonStyle} onClick={handleSearchClick}>
            Search
          </Button>
        </Box>

        {/* Table of Users */}
        <TableContainer
          sx={{
            mt: 2,
            borderRadius: "0px 0px 10px 10px",
          }}
        >
          <Table size="medium" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "transparent" }}>
              <TableRow>
                <TableCell sx={tableHeadStyle}>Name</TableCell>
                <TableCell sx={tableHeadStyle}>Email</TableCell>
                <TableCell sx={tableHeadStyle}>Mobile No.</TableCell>
                <TableCell sx={tableHeadStyle}>Gender</TableCell>
                <TableCell sx={tableHeadStyle}>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    cursor: "pointer",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: fonts.poppins,
                      fontWeight: "600",
                    }}
                  >
                    <Avatar src={user.profilePicture} alt="no" /> {user?.firstName + " " + user?.lastName}
                  </TableCell>

                  <TableCell sx={tableBodyStyle}>
                    {user.email}
                    {user.isEmailVerified && (
                      <span
                        style={{
                          color: "blue",
                          marginLeft: "5px",
                          fontSize: "25px",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>{user.mobile}</TableCell>
                  <TableCell sx={tableBodyStyle}>{user.gender}</TableCell>
                  <TableCell
                    onClick={() => handleStausClick(user._id)}
                    style={{
                      color:
                        user.status === "active"
                          ? "green"
                          : user.status === "banned"
                            ? "red"
                            : user.status === "pending"
                              ? "orange"
                              : "black",
                      fontFamily: fonts.poppins,
                      fontWeight: "600",
                    }}
                  >
                    {user.status}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="more" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      onClick={handleClose}
                    >
                      <MenuItem sx={tableBodyStyle}>Edit</MenuItem>
                      <MenuItem sx={tableBodyStyle}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Number.isInteger(usersInfo?.totalUsers) ? usersInfo?.totalUsers : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <StatusUpdateModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onSubmit={handleStatusSubmit}
        isButtonLoading={isButtonLoading}
      />
    </>
  );
};

export default UsersData;
