import React from "react";
import {
  Box,
  Button,
  Dialog,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { categories, languages, tags } from "../utility/category.js";
import GeneralButton from "../components/general/GeneralButton.jsx";

const EditVideoModal = ({
  open,
  onClose,
  video,
  onUpdate,
  isButtonLoading,
}) => {
  const defaultVideo = {
    title: "",
    description: "",
    tags: [],
    language: "",
    category: "",
  };

  const [formData, setFormData] = React.useState(defaultVideo);

  React.useEffect(() => {
    if (video) {
      setFormData(video);
    }
  }, [video]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateClick = () => {
    onUpdate(formData);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      //   fullScreen
      open={open}
      onClose={onClose}
      sx={{ p: 2, mt: 2 }}
    >
      {formData.youtubeLink ? (
        <iframe
          title="YouTube video player"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${formData.youtubeVideoId}`}
          frameborder="0"
          allowfullscreen
          style={{
            maxWidth: "80%",
            height: "auto",
            margin: "auto",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        ></iframe>
      ) : (
        formData.videoLink && (
          <video
            controls
            style={{
              maxWidth: "80%",
              height: "auto",
              margin: "auto",
              marginTop: "1rem",
              marginBottom: "1rem",
            }} // Adjust video size
          >
            <source src={formData.videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      )}
      <TextField
        label="Title"
        name="title"
        fullWidth
        sx={{
          maxWidth: "80%",
          margin: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        label="Description"
        name="description"
        fullWidth
        sx={{
          maxWidth: "80%",
          margin: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
        value={formData.description}
        onChange={handleChange}
      />

      <Autocomplete
        multiple
        id="tags"
        options={tags.map((tag) => tag.option)}
        value={formData.tags}
        onChange={(event, newValue) => {
          setFormData({
            ...formData,
            tags: newValue,
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Video Tags"
            placeholder="Select Video tags"
          />
        )}
        sx={{
          //   maxWidth: "80%",
          width: "80%",
          margin: "auto",
          textAlign: "center",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      />
      <FormControl fullWidth>
        <InputLabel
          id="select_language"
          sx={{ textAlign: "center", width: "35%" }}
        >
          Select Language
        </InputLabel>

        <Select
          labelId="select_language"
          label="Select Language"
          name="language"
          fullWidth
          sx={{
            maxWidth: "80%",
            margin: "auto",
            marginTop: "1rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
          value={formData.language}
          onChange={handleChange}
        >
          {languages.map((language) => (
            <MenuItem key={language.code} value={language.name}>
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel
          id="select_category"
          sx={{ textAlign: "center", width: "35%" }}
        >
          Select Category
        </InputLabel>

        <Select
          labelId="select_category"
          label="Select Category"
          name="category"
          fullWidth
          sx={{
            maxWidth: "80%",
            margin: "auto",
            marginTop: "1rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          padding: "1rem",
          paddingRight: "5rem",
        }}
      >
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
              <CircularProgress size={25} color="inherit" />
            </Button>
          </>
        ) : (
          <GeneralButton onClick={handleUpdateClick} text="Update" />
        )}

        <GeneralButton onClick={onClose} text="Cancel" />
      </Box>

      {/* <Button onClick={handleUpdateClick}>Update</Button>
      <Button onClick={onClose}>Cancel</Button> */}
    </Dialog>
  );
};

export default EditVideoModal;
