import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/slices/authSlice.js";
import { fonts } from "../../utility/fonts.js";
import { getschoolcontactform, selectSchoolContact } from "../../redux/slices/schoolContactSlice.js";
import { notify } from "../../redux/slices/alertSlice.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  Box,
  TablePagination,
  TextField,
  Button,
} from "@mui/material";
import { inputFieldStyle, tableHeadStyle, tableBodyStyle, buttonStyle } from "../../utility/commonStyle.js";

const SchoolDirectory = () => {
  const dispatchToRedux = useDispatch();
  const token = useSelector(selectToken);
  const schoolContactData = useSelector(selectSchoolContact);

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatchToRedux(getschoolcontactform({ token }));
  }, [token]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchClick = () => {
    if (searchQuery === "") {
      dispatchToRedux(notify({ type: "warning", message: "Please enter a search query" }));
      return;
    }
    setPage(0);
    dispatchToRedux(getschoolcontactform({ token, page: 1, limit: rowsPerPage, search: searchQuery }));
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Box>
        <Box sx={{ ml: 2, mt: 2 }}>
          <Typography variant="h5" fontWeight="600" sx={{ fontFamily: fonts.poppins }}>
            School Contact Information
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
          <Button
            variant="contained"
            sx={{ ...buttonStyle, borderRadius: "90px" }}
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </Box>
        {/* <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: "20px auto", padding: 2 }}> */}
        <TableContainer
          sx={{
            mt: 2,
            borderRadius: "0px 0px 10px 10px",
          }}
        >
          {/* <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              marginBottom: 2,
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            School Contact Information
          </Typography> */}
          <Table size="medium" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "transparent" }}>
              <TableRow>
                <TableCell sx={tableHeadStyle}>School Name</TableCell>
                <TableCell sx={tableHeadStyle}>Website</TableCell>
                <TableCell sx={tableHeadStyle}>Address</TableCell>
                <TableCell sx={tableHeadStyle}>Contact Person 1</TableCell>
                <TableCell sx={tableHeadStyle}>Contact Person 2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schoolContactData?.schoolData?.map((school) => (
                <TableRow
                  key={school._id}
                  hover
                  sx={{
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    cursor: "pointer",
                  }}
                >
                  <TableCell sx={tableBodyStyle}>{school.schoolDetails.schoolName}</TableCell>
                  <TableCell>
                    <Link
                      href={school.schoolDetails.website}
                      target="_blank"
                      rel="noopener"
                      sx={{ color: "primary.main", textDecoration: "none" }}
                    >
                      {school.schoolDetails.website}
                    </Link>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    {`${school.schoolDetails.addressLine1}, ${school.schoolDetails.addressLine2}, ${school.schoolDetails.city}, ${school.schoolDetails.postalCode}, ${school.schoolDetails.country}`}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    {`${school.contactPerson1.firstName} ${school.contactPerson1.middleName} ${school.contactPerson1.lastName}`}
                    <br />
                    {school.contactPerson1.position}
                    <br />
                    Email: {school.contactPerson1.email}
                    <br />
                    Phone: {school.contactPerson1.phoneNumber}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    {`${school.contactPerson2.firstName} ${school.contactPerson2.middleName} ${school.contactPerson2.lastName}`}
                    <br />
                    {school.contactPerson2.position}
                    <br />
                    Email: {school.contactPerson2.email}
                    <br />
                    Phone: {school.contactPerson2.phoneNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Number.isInteger(schoolContactData?.totalRecords) ? schoolContactData?.totalRecords : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default SchoolDirectory;
