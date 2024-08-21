import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { fonts } from "../../utility/fonts.js";
import GeneralButton from "../general/GeneralButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserId,
  selectAuthenticated,
  selectToken,
} from "../../redux/slices/authSlice.js";
import {
  getUserProfile,
  selectUserProfile,
} from "../../redux/slices/profileSlice.js";
import { useNavigate } from "react-router-dom";
import { fontSize } from "@mui/system";

const UserMyAssessment = () => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const userData = useSelector(selectUserProfile);
  const authenticated = useSelector(selectAuthenticated);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated && !userData) {
      dispatchToRedux(getUserProfile({ userId, token }));
    }
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const assessments = [
    {
      name: "Interest Profiler",
      date: formatDate(userData?.assessment30?.attemptDate),
      payment: userData?.assessment30?.payment ? "Paid" : "Unpaid",
      answers: userData?.assessment30?.answers,
    },

    // {
    //   name: "DISC Profiler (Sample)",
    //   date: formatDate(userData?.assessment30?.attemptDate),
    //   payment: userData?.assessment30?.payment ? "Paid" : "Unpaid",
    //   answers: userData?.assessment30?.answers,
    // },
  ];

  const handleReseltView = (answer) => {
    console.log("hello", answer);
    navigate(`/interest-profiler/result?answers=${answer}`);
  };

  const handleTakeAssessment = () => {
    navigate("/assessment");
  };

  const tableHeadStyle = {
    fontWeight: "600",
    fontFamily: fonts.poppins,
    color: "#717f8c",
    fontSize: "16px",
  };

  const tableBodyStyle = {
    fontFamily: fonts.sans,

    alignItems: "center",
    gap: "0.5rem",
    fontWeight: "600",
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 0",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              fontFamily: fonts.sans,
            }}
          >
            Assessment Records
          </Typography>
        </Box>
        {userData?.assessment30?.answers ? (
          <Box>
            <TableContainer
              sx={{
                mt: 2,

                borderRadius: "0px 0px 10px 10px",
              }}
            >
              <Table size="medium" aria-label="assessments table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHeadStyle}>Assessment</TableCell>
                    <TableCell sx={tableHeadStyle}>Date</TableCell>
                    <TableCell sx={tableHeadStyle}>Payment Details</TableCell>
                    <TableCell sx={tableHeadStyle}>Result</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assessments.map((assessment, index) => (
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
                      <TableCell
                        sx={{
                          alignItems: "center",
                          gap: "0.5rem",
                          fontFamily: fonts.poppins,
                          fontWeight: "600",
                        }}
                      >
                        {assessment.name}
                      </TableCell>
                      <TableCell sx={tableBodyStyle}>
                        {assessment.date}
                      </TableCell>
                      <TableCell sx={tableBodyStyle}>
                        {assessment.payment}
                      </TableCell>
                      <TableCell>
                        <GeneralButton
                          onClick={() => handleReseltView(assessment.answers)}
                          text="View"
                        />
                      </TableCell>
                      <TableCell>
                        <GeneralButton text="Download" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box
            sx={{
              mt: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: fonts.sans }}>
              Please take the Assessment to view your results.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <GeneralButton
                onClick={handleTakeAssessment}
                text="Take Assessment"
              />
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};

export default UserMyAssessment;
