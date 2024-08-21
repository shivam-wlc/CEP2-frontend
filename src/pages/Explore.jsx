import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Headers from "../components/Headers";
import VideoCard from "../components/VideoCard";
import { categories, tags } from "../utility/category";
import {
  allvideos,
  selectAllVideosData,
  videoFilter,
  resetState,
} from "../redux/slices/creatorSlice";
import GeneralButton from "../components/general/GeneralButton";
import { fonts } from "../utility/fonts.js";

const Explore = () => {
  const dispatchToRedux = useDispatch();
  const allVideosData = useSelector(selectAllVideosData);
  const [searchValue, setSearchValue] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatchToRedux(allvideos({ page }));
  }, [page]);

  const handleCategorySelection = useCallback(
    (category) => {
      dispatchToRedux(videoFilter({ category }));
    },
    [dispatchToRedux]
  );

  const handleSearchClick = useCallback(() => {
    if (tag) {
      dispatchToRedux(videoFilter({ tags: [tag] }));
    }
    if (searchValue) {
      dispatchToRedux(videoFilter({ search: searchValue }));
    }
  }, [searchValue, tag, dispatchToRedux]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  useEffect(() => {}, [allVideosData, dispatchToRedux]);

  const handleReset = () => {
    dispatchToRedux(resetState());
    dispatchToRedux(allvideos({ page }));
  };
  return (
    <Box>
      <Headers />

      <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            maxWidth: "100%",
            padding: "1rem 0",
          }}
        >
          {categories.map((category, index) => (
            <Button
              key={`${category}-index-${index}`}
              onClick={() => handleCategorySelection(category)}
              variant="contained"
              sx={{
                borderRadius: "20px",
                padding: "0.5rem 1.2rem",
                fontFamily: fonts.sans,
                margin: "0 0.5rem",
                textTransform: "none",
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                minWidth: "fit-content",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              {category}
            </Button>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            margin: "auto",
            marginBottom: "1rem",
            padding: "1rem 0",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            sx={{ marginRight: "10px", flexGrow: 1 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <TextField
            select
            label="Filtered By Tags"
            variant="outlined"
            sx={{ marginRight: "10px", width: "200px" }}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.option} value={tag.option}>
                {tag.option}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <GeneralButton onClick={handleSearchClick} text="Apply" />
            <GeneralButton onClick={handleReset} text="Reset" />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            margin: "auto",
            marginTop: "5rem",
          }}
        >
          {allVideosData?.videos?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
                width: "95vw",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: fonts.sans, fontWeight: "600" }}
              >
                No Video Found
              </Typography>
            </Box>
          ) : (
            allVideosData?.videos?.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
            padding: "1rem",
          }}
        >
          <Pagination
            count={allVideosData?.totalPages}
            size="large"
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Explore;
