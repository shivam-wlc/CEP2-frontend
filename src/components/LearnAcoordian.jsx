import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { fonts } from "../utility/fonts.js";

const LearnAcoordian = ({ university }) => {
  const defaultLogo = "https://www.medvocation.com/assets/static/images/default-university-logo.png";

  const isValidImageUrl = (url) => {
    const image = new Image();
    image.src = url;
    return image.complete && image.naturalHeight !== 0;
  };

  const handleRedirectToWebsite = (website) => {
    const url =
      website.startsWith("http://") || website.startsWith("https://") ? website : `https://${website}`;
    window.open(url, "_blank");
  };
  return (
    <div>
      <Accordion key={university.Logo} sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <img
            // src={
            //   isValidImageUrl(university?.Logo) ? university?.Logo : defaultLogo
            // }
            src={university?.Logo}
            alt="university-logo"
            style={{ objectFit: "contain", width: "150px", height: "150px" }}
            onError={(e) => {
              e.target.src = defaultLogo; // Set default image if the current image fails to load
            }}
          />

          <Box sx={{ paddingLeft: "1rem" }}>
            <Typography variant="h6" component="h3">
              {university.Name}
            </Typography>
            <Typography variant="subtitle1">
              {university.Location?.State}, {university.Location?.Country}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: "1 1 auto" }}>
              <TableContainer component={Paper} sx={{ boxShadow: "none", width: "90%" }}>
                <Table sx={{ borderCollapse: "collapse", "th, td": { border: 0 } }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          sx={{ display: "flex", color: "#076c7e" }}
                        >
                          <EmojiEventsOutlinedIcon />
                          International Rankings
                        </Typography>
                      </TableCell>
                      <TableCell align="right" color="#076c7e">
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          sx={{ display: "flex", color: "#076c7e" }}
                        >
                          Ranking
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {Object.entries(university.Rank).map(([source, rank]) => (
                      <TableRow
                        key={source}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box>
                            <Typography variant="body1" component="h3">
                              {source}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">{rank}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                onClick={() => handleRedirectToWebsite(university.Website)}
                variant="Text"
                sx={{ color: "#076c7e" }}
              >
                Read more about this university <ArrowRightAltIcon />
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                gap: "10px",
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                maxWidth: "300px",
                margin: "auto",
              }}
            >
              <Typography variant="h6" sx={{ color: "#076c7e", textAlign: "center" }}>
                {university.Name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#888" }}>
                Established: {university.Established}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#888" }}>
                Founder: {university.Founder}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#888" }}>
                President: {university.President}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#888" }}>
                Total Students: {university.Students.Total}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#888" }}>
                Undergraduate Students: {university.Students.Undergraduate}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#888" }}>
                Postgraduate Students: {university.Students.Postgraduate}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default LearnAcoordian;
