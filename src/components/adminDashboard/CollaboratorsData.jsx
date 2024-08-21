import React, { useEffect, useState } from "react";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCreators,
  selectCreatorsData,
  updateActiveStatus,
} from "../../redux/slices/adminSlice.js";
import StatusUpdateModal from "../../models/StatusUpdateModal.jsx";
import { notify } from "../../redux/slices/alertSlice.js";
import { selectToken } from "../../redux/slices/authSlice.js";
import { fonts } from "../../utility/fonts.js";

const CollaboratorsData = () => {
  const dispatchToRedux = useDispatch();
  const creatorsInfo = useSelector(selectCreatorsData);
  const token = useSelector(selectToken);

  // State variables
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // GET REQUEST
  useEffect(() => {
    dispatchToRedux(getAllCreators({ token, page: page + 1, limit: rowsPerPage }));
  }, [dispatchToRedux, token, page, rowsPerPage]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setPage(0);
    dispatchToRedux(
      getAllCreators({
        token,
        page: 1,
        limit: rowsPerPage,
        search: searchQuery,
      })
    );
  };

  // Event handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleStatusClick = (userId) => {
    setSelectedUserId(userId);
    setIsStatusModalOpen(true);
  };

  const handleStatusSubmit = async (status) => {
    if (!selectedUserId || !status) {
      dispatchToRedux(
        notify({
          type: "error",
          message: "Please select a valid status.",
        })
      );
      return;
    }

    try {
      setIsButtonLoading(true);
      await dispatchToRedux(
        updateActiveStatus({ userId: selectedUserId, status, token })
      );
      dispatchToRedux(
        notify({ type: "success", message: "Status updated successfully" })
      );
    } catch (error) {
      dispatchToRedux(
        notify({
          type: "error",
          message: "Something went wrong, Please try again",
        })
      );
    } finally {
      setIsButtonLoading(false);
      setIsStatusModalOpen(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div>
      {/* Search Box */}
      <Box sx={{ ml: 2, mt: 2 }}>
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{ fontFamily: fonts.poppins }}
        >
          Creators
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
          sx={{ flex: 1 }}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Button variant="contained" onClick={handleSearchClick}>
          Search
        </Button>
      </Box>

      {/* Table of Collaborators */}
      <TableContainer
        sx={{
          mt: 2,
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Table size="medium" aria-label="collaborators table">
          <TableHead sx={{ backgroundColor: "transparent" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "600",
                  fontFamily: fonts.poppins,
                  color: "#717f8c",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "600",
                  fontFamily: fonts.poppins,
                  color: "#717f8c",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "600",
                  fontFamily: fonts.poppins,
                  color: "#717f8c",
                }}
              >
                Mobile No.
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "600",
                  fontFamily: fonts.poppins,
                  color: "#717f8c",
                }}
              >
                Gender
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "600",
                  fontFamily: fonts.poppins,
                  color: "#717f8c",
                }}
              >
                Status
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creatorsInfo?.creators?.map((collaborator) => (
              <TableRow
                key={collaborator.id}
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
                  <Avatar src={collaborator.profilePicture} alt="Profile" />{" "}
                  {collaborator.firstName + " " + collaborator.lastName}
                </TableCell>
                <TableCell sx={{ fontFamily: fonts.poppins, color: "#717f8c" }}>
                  {collaborator.email}
                </TableCell>
                <TableCell sx={{ fontFamily: fonts.poppins, color: "#717f8c" }}>
                  {collaborator.mobile}
                </TableCell>
                <TableCell sx={{ fontFamily: fonts.poppins, color: "#717f8c" }}>
                  {collaborator.gender}
                </TableCell>
                <TableCell
                  onClick={() => handleStatusClick(collaborator._id)}
                  sx={{
                    color:
                      collaborator.status === "active"
                        ? "green"
                        : collaborator.status === "banned"
                          ? "red"
                          : collaborator.status === "pending"
                            ? "orange"
                            : "black",
                    fontFamily: fonts.poppins,
                    fontWeight: "600",
                  }}
                >
                  {collaborator.status}
                </TableCell>
                <TableCell>
                  <IconButton aria-label="more" onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      sx={{ fontFamily: fonts.poppins, color: "#717f8c" }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      sx={{ fontFamily: fonts.poppins, color: "#717f8c" }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={creatorsInfo?.totalCreators || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Status Update Modal */}
      <StatusUpdateModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onSubmit={handleStatusSubmit}
        isButtonLoading={isButtonLoading}
      />
    </div>
  );
};

export default CollaboratorsData;
