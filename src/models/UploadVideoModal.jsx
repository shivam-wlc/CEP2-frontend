import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";

import GeneralButton from "../components/general/GeneralButton.jsx";
import { notify } from "../redux/slices/alertSlice.js";
import { selectToken, selectUserId } from "../redux/slices/authSlice.js";
import {
  selectThumbnailLink,
  selectVideoLink,
  updateVideo,
  uploadThumbnail,
  uploadVideo,
  uploadYoutubeVideo,
} from "../redux/slices/creatorSlice.js";
import { categories, languages, tags } from "../utility/category";
import { colors } from "../utility/color.js";
import { fonts } from "../utility/fonts";

const UploadVideoModal = ({ open, handleClose }) => {
  const dispatchToRedux = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const videoData = useSelector(selectVideoLink);
  const thumbnailLink = useSelector(selectThumbnailLink);
  const [tabValue, setTabValue] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  //loader
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isVideoButtonLoading, setIsVideoButtonLoading] = useState(false);
  const [isThumbnailButtonLoading, setIsThumbnailButtonLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTagChange = (event, value) => {
    setSelectedTags(() => value);
  };

  const handleClick = async () => {
    const formData = {};

    if (tabValue === 0) {
      formData["title"] = title;
      formData["description"] = description;
      formData["tags"] = selectedTags;
      formData["language"] = language;
      formData["category"] = category;
      formData["youtubeLink"] = youtubeLink;

      if (
        !formData.title ||
        !formData.description ||
        !formData.language ||
        !formData.category ||
        !formData.youtubeLink
      ) {
        dispatchToRedux(notify({ type: "error", message: "All fields are required" }));
        return;
      }

      try {
        setIsButtonLoading(true);
        await dispatchToRedux(uploadYoutubeVideo({ userId, formData, token }));
        setIsButtonLoading(false);
        dispatchToRedux(notify({ type: "success", message: "Video uploaded successfully" }));

        // Reset Form
        setTitle("");
        setDescription("");
        setSelectedTags([]);
        setLanguage("");
        setCategory("");
        setYoutubeLink("");
      } catch (error) {
        setIsButtonLoading(false);
        dispatchToRedux(notify({ type: "error", message: error.message }));
      }
    } else {
      formData["title"] = title;
      formData["description"] = description;
      formData["tags"] = selectedTags;
      formData["language"] = language;
      formData["category"] = category;
      formData["thumbnail"] = thumbnailLink;

      if (!title || !description || !language || !category) {
        dispatchToRedux(notify({ type: "error", message: "All fields are required" }));
        return;
      }

      if (!thumbnailLink) {
        dispatchToRedux(notify({ type: "error", message: "Please upload thumbnail first" }));
        return;
      }

      try {
        setIsButtonLoading(true);
        await dispatchToRedux(
          updateVideo({
            userId,
            videoId: videoData?.video?._id,
            formData,
            token,
          }),
        );
        dispatchToRedux(notify({ type: "success", message: "Video updated successfully" }));
        setIsButtonLoading(false);
        // Reset Form
        setTitle("");
        setDescription("");
        setSelectedTags([]);
        setLanguage("");
        setCategory("");
        setVideoFile(null);
      } catch (error) {
        setIsButtonLoading(false);
        dispatchToRedux(notify({ type: "error", message: error.message }));
      }
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    const formData = new FormData();
    formData.append("file", file);

    if (!file) {
      dispatchToRedux(notify({ type: "error", message: "Please upload video first" }));
      return;
    }

    try {
      setIsVideoButtonLoading(true);
      await dispatchToRedux(uploadVideo({ userId, formData, token }));
      setIsVideoButtonLoading(false);
      setVideoFile(null);
    } catch (error) {
      setVideoFile(null);
      setIsVideoButtonLoading(false);
      console.log(error);
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    if (!file || !file.type.startsWith("image/")) {
      dispatchToRedux(notify({ type: "warning", message: "Please upload an image file" }));
      return;
    }

    try {
      setIsThumbnailButtonLoading(true);
      await dispatchToRedux(uploadThumbnail({ userId, formData, token }));
      setIsThumbnailButtonLoading(false);
    } catch (error) {
      setIsThumbnailButtonLoading(false);
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <Box
        sx={{
          padding: "1rem",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "1rem",
            fontWeight: 600,
            textAlign: "center",
            fontFamily: fonts.sans,
            padding: "1rem",
          }}
        >
          Upload Your Video Here
        </Typography>
        <Typography sx={{ marginBottom: "1rem", fontFamily: fonts.sans }}>
          Please adhere to the following rules:
        </Typography>
        <ul>
          <li style={{ fontFamily: fonts.sans }}>
            You can either upload a YouTube link or manually upload a video at a time.
          </li>
          <li style={{ fontFamily: fonts.sans }}>
            Do not refresh the page or navigate away while the video is uploading.
          </li>
          <li style={{ fontFamily: fonts.sans }}>Thumbnail is mandatory for video uploads.</li>
        </ul>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{ sx: { backgroundColor: colors.lightGray } }}
          sx={{ mb: "40px", mt: "20px", borderBottom: "1px solid lightgray" }}
        >
          <Tab
            label="Upload YouTube Link"
            sx={{
              fontFamily: fonts.sans,
              color: "#5a5a5a",
              fontSize: "16px",
              textTransform: "capitalize",
              "&.Mui-selected": {
                color: "#000",
                borderLeft: "1px solid #eee",
                borderRight: "1px solid #eee",
              },
            }}
          />
          <Tab
            label="Upload Video Manually"
            sx={{
              fontFamily: fonts.sans,
              color: "#5a5a5a",
              fontSize: "16px",
              textTransform: "capitalize",
              "&.Mui-selected": {
                color: "#000",
                borderLeft: "1px solid #eee",
                borderRight: "1px solid #eee",
              },
            }}
          />
        </Tabs>

        <Box>
          {tabValue === 0 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  label="YouTube Link"
                  name="youtubeLink"
                  fullWidth
                  sx={{ marginBottom: "1rem" }}
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                />
              </Box>
            </>
          )}
          {tabValue === 1 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  justifyContent: "space-between",
                }}
              >
                {isVideoButtonLoading ? (
                  <>
                    <Button component="span" variant="outlined">
                      <CircularProgress
                        size={25}
                        color="inherit"
                        sx={{ marginLeft: "40px", marginRight: "40px" }}
                      />
                    </Button>
                  </>
                ) : (
                  !videoData && (
                    <>
                      <input
                        id="video-input"
                        type="file"
                        onChange={handleVideoChange}
                        accept="video/*"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="video-input">
                        <Button component="span" variant="outlined">
                          Upload Video
                        </Button>
                      </label>
                    </>
                  )
                )}

                {isThumbnailButtonLoading ? (
                  <>
                    <Button component="span" variant="outlined">
                      <CircularProgress
                        size={25}
                        color="inherit"
                        sx={{ marginLeft: "80px", marginRight: "80px" }}
                      />
                    </Button>
                  </>
                ) : (
                  !thumbnailLink && (
                    <>
                      <input
                        id="thumbnail-input"
                        type="file"
                        onChange={handleThumbnailChange}
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="thumbnail-input">
                        <Button component="span" variant="outlined">
                          Upload Thumbnail
                        </Button>
                      </label>
                    </>
                  )
                )}
              </Box>
              <Box>
                {videoData && (
                  <TextField
                    disabled
                    label="Video Link"
                    name="Video Link"
                    fullWidth
                    sx={{ marginBottom: "1rem" }}
                    value={videoData?.link}
                  />
                )}
                {thumbnailLink && (
                  <TextField
                    disabled
                    label="Thumbnail Link"
                    name="Thumbnail Link"
                    fullWidth
                    sx={{ marginBottom: "1rem" }}
                    value={thumbnailLink}
                  />
                )}
              </Box>
            </>
          )}
          <TextField
            label="Title"
            name="title"
            fullWidth
            sx={{ marginBottom: "1rem" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            sx={{ marginBottom: "1rem" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Autocomplete
            multiple
            id="tags"
            options={tags.map((tag) => tag.option)}
            onChange={handleTagChange}
            renderInput={(params) => (
              <TextField {...params} label="Video Tags" placeholder="Select Video tags" />
            )}
            sx={{ marginBottom: "1rem" }}
          />
          <FormControl fullWidth>
            <InputLabel id="select_language">Select Language</InputLabel>

            <Select
              labelId="select_language"
              label="Select Language"
              name="language"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <MenuItem key={language.code} value={language.name}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="select_category">Select Category</InputLabel>

            <Select
              labelId="select_category"
              label="Select Category"
              name="category"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            {/* <Button
              onClick={handleClick}
              variant="contained"
              sx={{ marginRight: "1rem" }}
            >
              Submit
            </Button> */}

            {isButtonLoading ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "black",
                    color: "white",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "0.5rem",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  <CircularProgress
                    color="inherit"
                    size={25}
                    sx={{ marginLeft: "35px", marginRight: "35px" }}
                  />
                </Button>
              </>
            ) : (
              <GeneralButton onClick={handleClick} text="Submit Video" />
            )}
            <GeneralButton onClick={handleClose} text="Close" />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UploadVideoModal;
