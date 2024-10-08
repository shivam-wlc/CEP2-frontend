import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const SingleResultPage = () => {
  // Dummy DISC scores
  const discScores = {
    most: {
      D: 9,
      I: 6,
      S: 3,
      C: 1,
      B: 5,
    },
    least: {
      D: 5,
      I: 2,
      S: 5,
      C: 7,
      B: 5,
    },
    difference: {
      D: 4,
      I: 4,
      S: -2,
      C: -6,
      B: 0,
    },
  };

  const interestScores = [
    { area: "Realistic", score: 4 },
    { area: "Investigative", score: 5 },
    { area: "Artistic", score: 5 },
    { area: "Social", score: 4 },
    { area: "Enterprising", score: 5 },
    { area: "Conventional", score: 8 },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Results
      </Typography>

      {/* DISC Profile Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          DISC Profile Scores
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Score Type</strong>
                </TableCell>
                {Object.keys(discScores.most).map((type) => (
                  <TableCell key={type} align="center">
                    <strong>{type}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Most</strong>
                </TableCell>
                {Object.keys(discScores.most).map((type) => (
                  <TableCell key={type} align="center">
                    {discScores.most[type]}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Least</strong>
                </TableCell>
                {Object.keys(discScores.least).map((type) => (
                  <TableCell key={type} align="center">
                    {discScores.least[type]}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Difference</strong>
                </TableCell>
                {Object.keys(discScores.difference).map((type) => (
                  <TableCell key={type} align="center">
                    {discScores.difference[type]}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Interest Profile Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Interest Profile Scores
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Interest Area</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Score</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interestScores.map((interest) => (
                <TableRow key={interest.area}>
                  <TableCell>{interest.area}</TableCell>
                  <TableCell align="center">{interest.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SingleResultPage;
