import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Pagination,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import Headers from "../components/Headers";
import { fonts } from "../utility/fonts.js";
// icons
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { countryList } from "../utility/countryList.js";
// import {
//   getTopUniversity,
//   selectUniversities,
//   getUniversityByName,
//   getUniversityByCountry,
// } from "../redux/slices/zylaSlice.js";
import { useDispatch, useSelector } from "react-redux";
import LearnAcoordian from "../components/LearnAcoordian.jsx";
import InitialLoaders from "../loaders/InitialLoaders.jsx";
import {
  getUniversity,
  selectUniversity,
} from "../redux/slices/universitySlice.js";
// import SurveyForm1 from "../models/SurveyForm1.jsx";

const Learn = () => {
  const dispatchToRedux = useDispatch();
  // const universities = useSelector(selectUniversities);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState("");
  const manualUniversity = useSelector(selectUniversity);

  const handleClickSearch = async () => {
    // await dispatchToRedux(getUniversityByName({ name: searchValue }));
    await dispatchToRedux(getUniversity({ page: 1, name: searchValue }));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (!manualUniversity.length) {
      dispatchToRedux(getUniversity({ page })).then(() => {
        setLoading(false); // Set loading to false after data is fetched
      });
    } else {
      setLoading(false); // Set loading to false if universities are already fetched
    }
  }, [page]);

  const handleCheck = async (event) => {
    const { name } = event.target;
    setChecked(name);

    // await dispatchToRedux(getUniversityByCountry({ page, country: checked }));
    await dispatchToRedux(getUniversity({ page, country: name }));
  };

  return (
    <Box>
      <Headers />
      <Container maxWidth="xl" sx={{}}>
        <Box
          sx={{
            padding: "2.5rem",
            position: "sticky",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: fonts.sans,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Top Universities
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: fonts.sans,
              color: "text.secondary",
              textAlign: "center",
              maxWidth: "800px",
              fontSize: "16px",
              margin: "auto",
              padding: "1rem",
            }}
          >
            Career Explorer provides a valuable tool for students to assess the
            global standing of their preferred institutions, allowing them to
            make informed decisions about their academic journey.
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          {/* filter box  */}
          <Box sx={{ flex: "1 1 0", p: 2 }}>
            {/* Search By University Name  */}
            <Box>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <AccountBalanceOutlinedIcon />
                  <Typography sx={{ marginLeft: 1 }}>University</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    id="search-university"
                    variant="outlined"
                    placeholder="Enter university name"
                    fullWidth
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={handleClickSearch}
                        >
                          <SearchIcon sx={{ cursor: "pointer" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            {/* Search By Country  */}

            <Box sx={{ mt: 2 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <LocationOnIcon />
                  <Typography sx={{ marginLeft: 1 }}>Country</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      maxHeight: 300,
                      overflowY: "auto",
                    }}
                  >
                    <FormGroup>
                      {countryList.map((country) => (
                        <FormControlLabel
                          key={country.name}
                          sx={{}}
                          // control={
                          //   <Checkbox
                          //     checked={checked(country.name)}
                          //     onChange={handleCheck}
                          //     name={country.name}
                          //   />
                          // }
                          control={
                            <Checkbox
                              checked={checked === country.name}
                              onChange={handleCheck}
                              name={country.name}
                            />
                          }
                          label={`${country.name}`}
                        />
                      ))}
                    </FormGroup>
                  </div>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
          {/* university information box  */}

          <Box
            sx={{
              flex: "1 1 auto",
              p: 2,
            }}
          >
            {loading ? (
              <>
                <InitialLoaders />
              </>
            ) : Array.isArray(manualUniversity?.universities) ? (
              manualUniversity?.universities.map((university) => (
                <LearnAcoordian key={university.Logo} university={university} />
              ))
            ) : (
              <Typography variant="body2">
                No universities to display
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
        }}
      >
        <Pagination
          count={manualUniversity?.totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
      {/* <SurveyForm1 open={true}/> */}
    </Box>
  );
};

export default Learn;
