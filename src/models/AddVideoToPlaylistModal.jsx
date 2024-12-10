// import { Button, CircularProgress, Container, MenuItem, Modal, Select, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { notify } from "../redux/slices/alertSlice.js";
// import { getUserPlaylist, addVideoToPlaylist, selectAllPlaylistName } from "../redux/slices/playlistSlice.js";
// import { fonts } from "../utility/fonts.js";

// const AddVideoToPlaylistModal = ({ open, onClose, videoId, userId, authenticated, token }) => {
//   const dispatchToRedux = useDispatch();
//   const [selectedPlaylist, setSelectedPlaylist] = useState("");
//   const [isButtonLoading, setIsButtonLoading] = useState(false);
//   const playlistNames = useSelector(selectAllPlaylistName);

//   useEffect(() => {
//     if (userId) {
//       dispatchToRedux(getUserPlaylist({ userId }));
//     }
//   }, [dispatchToRedux, userId]);

//   const handleAddToPlaylist = async () => {
//     if (!selectedPlaylist) {
//       dispatchToRedux(notify({ type: "error", message: "Please select a playlist" }));
//       return;
//     }

//     console.log("playlistId", selectedPlaylist, "videoId", videoId);

//     // try {
//     //   setIsButtonLoading(true);
//     //   const addingPlyistResponse = await dispatchToRedux(
//     //     addVideoToPlaylist({
//     //       playlistId: selectedPlaylist,
//     //       videoId,
//     //       userId,
//     //       token,
//     //     }),
//     //   );

//     //   setIsButtonLoading(false);
//     //   onClose();
//     //   if (addingPlyistResponse.payload.message) {
//     //     dispatchToRedux(notify({ type: "success", message: "Video added to playlist" }));
//     //   }
//     // } catch (error) {
//     //   setIsButtonLoading(false);
//     // }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Container
//         maxWidth="sm"
//         sx={{
//           marginTop: "10vh",
//           padding: "1rem",
//           backgroundColor: "white",
//           borderRadius: "8px",
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             marginBottom: "1rem",
//             fontFamily: fonts.sans,
//             fontWeight: "bold",
//             textAlign: "center",
//           }}
//         >
//           Add to Playlist
//         </Typography>
//         <Select
//           value={selectedPlaylist}
//           onChange={(e) => setSelectedPlaylist(e.target.value)}
//           fullWidth
//           sx={{ marginBottom: "1rem", fontFamily: fonts.sans }}
//         >
//           {playlistNames?.map((playlist) => (
//             <MenuItem key={playlist._id} value={playlist._id}>
//               {playlist.playlistName}
//             </MenuItem>
//           ))}
//         </Select>
//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             fontFamily: "Poppins, sans-serif",
//             marginTop: "1rem",
//             backgroundColor: "black",
//             color: "white",
//             padding: "0.5rem 1.5rem",
//             borderRadius: "0.5rem",
//             "&:hover": {
//               backgroundColor: "black",
//             },
//           }}
//           onClick={handleAddToPlaylist}
//           disabled={!selectedPlaylist}
//         >
//           {isButtonLoading ? <CircularProgress color="inherit" /> : "Add"}
//         </Button>
//       </Container>
//     </Modal>
//   );
// };

// export default AddVideoToPlaylistModal;
import { Button, CircularProgress, Box, MenuItem, Modal, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { notify } from "../redux/slices/alertSlice.js";
import { getUserPlaylist, addVideoToPlaylist, selectAllPlaylistName } from "../redux/slices/playlistSlice.js";
import { fonts } from "../utility/fonts.js";

const AddVideoToPlaylistModal = ({ open, onClose, videoId, userId, token }) => {
  const dispatchToRedux = useDispatch();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const playlistNames = useSelector(selectAllPlaylistName);

  useEffect(() => {
    if (userId) {
      dispatchToRedux(getUserPlaylist({ userId }));
    }
  }, [dispatchToRedux, userId]);

  console.log("playlistNames", playlistNames);

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylist) {
      dispatchToRedux(notify({ type: "error", message: "Please select a playlist" }));
      return;
    }

    console.log("playlistId", selectedPlaylist, "videoId", videoId);

    try {
      setIsButtonLoading(true);
      const addingPlaylistResponse = await dispatchToRedux(
        addVideoToPlaylist({
          playlistId: selectedPlaylist,
          videoId,
          userId,
          token,
        }),
      );

      setIsButtonLoading(false);
      onClose();
      if (addingPlaylistResponse.payload.message) {
        dispatchToRedux(notify({ type: "success", message: "Video added to playlist" }));
      }
    } catch (error) {
      setIsButtonLoading(false);
      dispatchToRedux(notify({ type: "error", message: "Error adding video to playlist" }));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "10px",
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: "1rem",
            fontFamily: fonts.sans,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Add to Playlist
        </Typography>
        <Select
          value={selectedPlaylist}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
          fullWidth
          displayEmpty
          sx={{
            marginBottom: "1rem",
            fontFamily: fonts.sans,
            border: "1px solid #ddd",
            borderRadius: "5px",
            "& .MuiSelect-select": {
              padding: "10px",
            },
          }}
        >
          <MenuItem value="" disabled>
            Select a Playlist
          </MenuItem>
          {playlistNames?.map((playlist) => (
            <MenuItem key={playlist._id} value={playlist.playlistId}>
              {playlist.playlistName}
            </MenuItem>
          ))}
        </Select>
        <Button
          fullWidth
          variant="contained"
          sx={{
            fontFamily: "Poppins, sans-serif",
            background: "linear-gradient(to right, #720361, #bf2f75)",
            color: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "0.5rem",
            "&:hover": {
              background: "linear-gradient(to right, #720361, #bf2f75)",
            },
          }}
          onClick={handleAddToPlaylist}
          disabled={!selectedPlaylist || isButtonLoading}
        >
          {isButtonLoading ? <CircularProgress color="inherit" size={24} /> : "Add"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddVideoToPlaylistModal;
