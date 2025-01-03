import PreviewIcon from "@mui/icons-material/Preview";
import {
  Box,
  Button,
  IconButton,
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
import { selectToken } from "../../redux/slices/authSlice.js";
import {
  getAllUnifiedRecordData,
  getUnifiedRecordDataOfUser,
  selectAllUnifiedData,
  selectUserUnified,
} from "../../redux/slices/unifiedRecordSlice.js";
import { fonts } from "../../utility/fonts.js";
import UserUnifiedModal from "./UserUnifiedModal.jsx";
import { inputFieldStyle, tableHeadStyle, tableBodyStyle, buttonStyle } from "../../utility/commonStyle.js";
import { notify } from "../../redux/slices/alertSlice.js";

const UnifiedRecord = () => {
  // State for pagination and search query
  const dispatchToRedux = useDispatch();
  const token = useSelector(selectToken);
  const allData = useSelector(selectAllUnifiedData);
  const userUnified = useSelector(selectUserUnified);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [searchQuery, setSearchQuery] = useState("");
  // modal
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatchToRedux(getAllUnifiedRecordData({ token, page: page + 1, limit: rowsPerPage }));
  }, [page, rowsPerPage, dispatchToRedux, token]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchClick = () => {
    if (searchQuery === "") {
      dispatchToRedux(notify({ type: "warning", message: "Please enter a search query" }));
      return;
    }
    setPage(0);
    dispatchToRedux(
      getAllUnifiedRecordData({
        token,
        page: 1,
        limit: rowsPerPage,
        search: searchQuery,
      }),
    );
  };

  // const handleViewClick = (id) => {
  //   console.log("Unified id", id);
  // };

  const handleViewClick = async (id) => {
    const response = await dispatchToRedux(getUnifiedRecordDataOfUser({ token, unifiedId: id }));
    setModalData(response.payload);
    setOpenModal(true);
  };

  // // TableHead styling
  // const tableHeadStyle = {
  //   fontWeight: "600",
  //   fontFamily: fonts.poppins,
  //   color: "#717f8c",
  // };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

  return (
    <>
      <Box>
        <Box sx={{ ml: 2, mt: 2 }}>
          <Typography variant="h5" fontWeight="600" sx={{ fontFamily: fonts.poppins }}>
            Unified Student Record
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
            sx={{ ...inputFieldStyle, flex: 1 }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Button variant="contained" sx={buttonStyle} onClick={handleSearchClick}>
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
                <TableCell sx={tableHeadStyle}>Student Id</TableCell>
                <TableCell sx={tableHeadStyle}>Student Name</TableCell>
                <TableCell sx={tableHeadStyle}>Interest Profile</TableCell>
                <TableCell sx={tableHeadStyle}>Disc Profile</TableCell>
                <TableCell sx={tableHeadStyle}>Survey</TableCell>
                <TableCell sx={tableHeadStyle}>Resume</TableCell>
                <TableCell sx={tableHeadStyle}>Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData?.unifiedRecordData?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    cursor: "pointer",
                  }}
                >
                  <TableCell sx={{ ...tableBodyStyle, color: "black" }}>{row?.unique_id}</TableCell>
                  <TableCell sx={{ ...tableBodyStyle, fontWeight: "500", color: "black" }}>
                    {row.userId.firstName + " " + row.userId.lastName}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableBodyStyle,
                      color: row.interestProfile.isTaken ? "green" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {row.interestProfile.isTaken ? "Complete" : "Incomplete"}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableBodyStyle,
                      color: row.discProfile.isTaken ? "green" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {row.discProfile.isTaken ? "Complete" : "Incomplete"}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableBodyStyle,
                      color: row.survey.isTaken ? "green" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {row.survey.isTaken ? "Complete" : "Incomplete"}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableBodyStyle,
                      color: row.resume?.isCompleted ? "green" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {row.resume?.isCompleted ? "Complete" : "Incomplete"}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleViewClick(row._id)}
                      // variant="contained"
                      // color="#720361"
                      // startIcon={<PreviewIcon />}
                      startIcon={<PreviewIcon sx={{ color: "#720361" }} />}
                      sx={{ color: "#720361", fontWeight: "bold" }}
                    >
                      View
                    </Button>
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
        count={Number.isInteger(allData?.totalRecords) ? allData?.totalRecords : 0} // Set total number of rows
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UserUnifiedModal open={openModal} onClose={handleCloseModal} data={modalData} />
    </>
  );
};

export default UnifiedRecord;
