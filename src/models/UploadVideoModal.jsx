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
import creatorStyle from "../styles/CreatorVideo.module.css";
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
    <Dialog
      // fullScreen
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: "blur(8px) !important",
        backgroundColor: "rgba(0, 0, 0, 0.3) !important",
        paddingBottom: "2rem",
      }}
    >
      <Box
        sx={{
          padding: "0rem 1.4rem 1.4rem",
          maxWidth: "695px",
          margin: "auto",
          // border: "1px solid",
          height: "860px",
          borderRadius: "1rem",
          // overflow: "auto",
          // border: "5px solid black",
          width: "97%",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            width: "100%",
            height: "48px",
            backgroundColor: "transparent",
            color: "#b4b2b2",
            fontWeight: "400",
            fontSize: "2rem",
            border: "none",
            borderRadius: "1.5rem",
            textAlign: "end",
            margin: "0rem 0rem",
          }}
        >
          x
        </button>
        <Typography
          variant="h5"
          sx={{
            marginBottom: "0rem",
            fontWeight: 600,
            textAlign: "center",
            fontFamily: fonts.sans,
            padding: "0rem 1rem 1rem",
          }}
        >
          Upload Your Video Here
        </Typography>
        <Box
          sx={{
            backgroundColor: "#F2F2F2",
            padding: ".7rem",
            borderRadius: ".5rem",
            color: "#6c6c6c",
          }}
        >
          <Typography sx={{ marginBottom: "1rem", fontFamily: fonts.sans }}>
            Please adhere to the following rules:
          </Typography>
          <ul style={{ paddingLeft: "1rem" }}>
            <li style={{ fontFamily: fonts.sans }}>
              You can either upload a YouTube link or manually upload a video at a time.
            </li>
            <li style={{ fontFamily: fonts.sans }}>
              Do not refresh the page or navigate away while the video is uploading.
            </li>
            <li style={{ fontFamily: fonts.sans }}>Thumbnail is mandatory for video uploads.</li>
          </ul>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{ sx: { backgroundColor: "#BC2876" } }}
          sx={{ mb: "10px", mt: "10px", borderBottom: "1px solid #a6a6a6" }}
        >
          <Tab
            label="Upload YouTube Link"
            sx={{
              fontFamily: fonts.sans,
              color: "#5d5d5d",
              fontSize: "16px",
              textTransform: "capitalize",
              "&.Mui-selected": {
                color: "#BC2876",
                borderLeft: "none",
                borderRight: "none",
              },
            }}
          />
          <Tab
            label="Upload Video Manually"
            sx={{
              fontFamily: fonts.sans,
              color: "#5d5d5d",
              fontSize: "16px",
              textTransform: "capitalize",
              "&.Mui-selected": {
                color: "#BC2876",
                borderLeft: "none",
                borderRight: "none",
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
                  marginTop: "2rem",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  // label="YouTube Link"
                  placeholder="YouTube Link"
                  name="youtubeLink"
                  variant="standard"
                  sx={{
                    marginBottom: "1rem",
                    padding: ".66rem 1.4rem",
                    borderRadius: "2rem",
                    backgroundColor: "#F2F2F2",
                    border: "none",
                    outline: "none",
                    height: "3.375rem",
                    width: "39.6875rem",
                  }}
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                  }}
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
            name="title"
            placeholder="Title"
            variant="standard"
            sx={{
              marginBottom: "1rem",
              padding: ".66rem 1.4rem",
              borderRadius: "2rem",
              backgroundColor: "#F2F2F2",
              border: "none",
              outline: "none",
              height: "3.375rem",
              // width: "39.6875rem",
              width: "100%",
            }}
            InputProps={{
              disableUnderline: true,
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            name="description"
            placeholder="Description"
            variant="standard"
            sx={{
              marginBottom: "1rem",
              padding: ".66rem 1.4rem",
              borderRadius: "2rem",
              backgroundColor: "#F2F2F2",
              border: "none",
              outline: "none",
              height: "6.575rem",
              // width: "39.6875rem",
              width: "100%",
            }}
            InputProps={{
              disableUnderline: true,
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Autocomplete
            multiple
            id="tags"
            options={tags.map((tag) => tag.option)}
            onChange={handleTagChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Video Tags"
                variant="standard"
                sx={{
                  padding: ".66rem 1.4rem",
                  borderRadius: "2rem",
                  backgroundColor: "#F2F2F2",
                  border: "none",
                  outline: "none",
                  height: "3.375rem",
                  // width: "39.6875rem",
                  width: "100%",
                }}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                }}
              />
            )}
          />

          <FormControl fullWidth>
            <InputLabel id="select_language" shrink={false} sx={{ display: "none" }}>
              Select Language
            </InputLabel>

            <Select
              labelId="select_language"
              variant="standard"
              displayEmpty // This makes the placeholder visible when nothing is selected
              name="language"
              value={language} // This binds the value of the Select
              onChange={(e) => setLanguage(e.target.value)}
              sx={{
                marginBottom: "1rem",
                padding: ".66rem 0rem", // Base padding
                borderRadius: "2rem",
                backgroundColor: "#F2F2F2",
                border: "none", // No default border
                outline: "none",
                height: "3.375rem",
                width: "33.6875rem",
                "&:before": {
                  borderBottom: "none", // Removes underline before focus
                },
                "&:after": {
                  borderBottom: "none", // Removes underline after focus
                },
                "&:hover:before, &:hover:after": {
                  borderBottom: "none", // No underline on hover
                },
                "&:focus:before, &:focus:after": {
                  borderBottom: "none", // No underline when focused
                },
                "& .MuiSelect-select": {
                  padding: ".66rem 2.4rem", // Adjust padding for the select input (increased right padding)
                },
                "& .MuiSelect-icon": {
                  right: "1rem", // Adjust arrow icon position if necessary
                },
              }}
              inputProps={{
                disableUnderline: true, // Ensure underline is disabled
              }}
            >
              {/* Placeholder Item */}
              <MenuItem value="" disabled>
                Select Language
              </MenuItem>

              {languages.map((language) => (
                <MenuItem key={language.code} value={language.name}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select
              variant="standard"
              displayEmpty // This makes the placeholder visible when nothing is selected
              name="category"
              fullWidth
              value={category} // This binds the value of the Select
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                marginBottom: "1rem",
                padding: ".66rem 0rem", // Base padding
                borderRadius: "2rem",
                backgroundColor: "#F2F2F2",
                border: "none", // No default border
                outline: "none",
                height: "3.375rem",
                width: "33.6875rem",
                "&:before": {
                  borderBottom: "none", // Removes underline before focus
                },
                "&:after": {
                  borderBottom: "none", // Removes underline after focus
                },
                "&:hover:before, &:hover:after": {
                  borderBottom: "none", // No underline on hover
                },
                "& .MuiSelect-select": {
                  padding: ".66rem 2.4rem", // Adjust padding for the select input (increased right padding)
                },
                "& .MuiSelect-icon": {
                  right: "1rem", // Adjust arrow icon position if necessary
                },
              }}
              inputProps={{
                "aria-label": "Select Category",
              }}
            >
              {/* Placeholder Item */}
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>

              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", paddingBottom: "1rem" }}>
            <button
              onClick={handleClose}
              style={{
                width: "86px",
                height: "48px",
                backgroundColor: "#787876",
                color: "white",
                fontWeight: "600",
                fontSize: "1rem",
                border: "none",
                borderRadius: "1.5rem",
              }}
            >
              Close
            </button>

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
              <button
                onClick={handleClick}
                className={creatorStyle["navButton"]}
                style={{ fontWeight: "600", fontSize: "1rem" }}
              >
                Submit Video
              </button>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UploadVideoModal;
