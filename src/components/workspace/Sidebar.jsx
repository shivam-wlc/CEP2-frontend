// import React from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import HistoryIcon from "@mui/icons-material/History";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import SettingsIcon from "@mui/icons-material/Settings";
// import QueueMusicIcon from "@mui/icons-material/QueueMusic";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
// import ShareIcon from "@mui/icons-material/Share";
// import {
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import { fonts } from "../../utility/fonts.js";

// const Sidebar = ({ userRole, handleMenuItemClick }) => {
//   let sideBarMenues = [];
//   switch (userRole) {
//     case "user":
//       sideBarMenues = [
//         { name: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
//         { name: "History", icon: <HistoryIcon />, route: "/history" },
//         { name: "My Likes", icon: <FavoriteIcon />, route: "/mylikes" },
//         { name: "My Playlist", icon: <QueueMusicIcon />, route: "/myplaylist" },
//         {
//           name: "My Assessments",
//           icon: <AssessmentIcon />,
//           route: "/myassessments",
//         },
//         { name: "Profile", icon: <SettingsIcon />, route: "/profile" },
//       ];
//       break;
//     case "admin":
//       sideBarMenues = [
//         {
//           name: "Dashboard",
//           icon: <DashboardIcon />,
//           route: "/admindashboard",
//         },
//         { name: "Users", icon: <HistoryIcon />, route: "/users" },
//         { name: "Creators", icon: <QueueMusicIcon />, route: "/creator" },
//         { name: "Records", icon: <AssessmentIcon />, route: "/records" },
//         { name: "Profile", icon: <SettingsIcon />, route: "/profile" },
//       ];
//       break;
//     case "creator":
//       sideBarMenues = [
//         {
//           name: "Dashboard",
//           icon: <DashboardIcon />,
//           route: "/creatordashboard",
//         },
//         { name: "My Content", icon: <VideoLibraryIcon />, route: "/mycontent" },
//         { name: "Analytics", icon: <AssessmentIcon />, route: "/analytics" },
//         { name: "Social Media", icon: <ShareIcon />, route: "/socialmedia" },
//         { name: "Profile", icon: <SettingsIcon />, route: "/profile" },
//       ];
//       break;
//     default:
//       sideBarMenues = [];
//   }

//   return (
//     <List>
//       {sideBarMenues.map((menuItem, index) => (
//         <ListItem
//           key={index}
//           sx={{
//             cursor: "pointer",
//             mt: "-0.5rem",
//             padding: "0.5rem 0.5rem",
//             borderRadius: "0.5rem",
//           }}
//         >
//           <ListItemButton onClick={() => handleMenuItemClick(menuItem.name)}>
//             <ListItemIcon sx={{ color: "#899499" }}>
//               {menuItem.icon}
//             </ListItemIcon>
//             <ListItemText
//               primaryTypographyProps={{
//                 fontFamily: fonts.sans,
//                 fontWeight: "600",
//                 color: "#717f8c",
//                 fontSize: "0.9rem",
//               }}
//               primary={menuItem.name}
//             />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default Sidebar;
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

import { fonts } from "../../utility/fonts.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice.js";

const Sidebar = ({ userRole, handleMenuItemClick, currentPage }) => {
  const dispatchToRedux = useDispatch();
  const navigate = useNavigate();
  let sideBarMenues = [];
  switch (userRole) {
    case "user":
      sideBarMenues = [
        { name: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
        { name: "History", icon: <HistoryIcon />, route: "/history" },
        { name: "My Likes", icon: <FavoriteIcon />, route: "/mylikes" },
        { name: "My Playlist", icon: <QueueMusicIcon />, route: "/myplaylist" },
        {
          name: "My Assessments",
          icon: <AssessmentIcon />,
          route: "/myassessments",
        },
        { name: "Profile", icon: <SettingsIcon />, route: "/profile" },
      ];
      break;
    case "admin":
      sideBarMenues = [
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          route: "/admindashboard",
        },
        { name: "Users", icon: <HistoryIcon />, route: "/users" },
        { name: "Creators", icon: <QueueMusicIcon />, route: "/creator" },
        { name: "Records", icon: <AssessmentIcon />, route: "/records" },
        { name: "Profile", icon: <SettingsIcon />, route: "/profile" },
      ];
      break;
    case "creator":
      sideBarMenues = [
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          route: "/creatordashboard",
        },
        { name: "My Content", icon: <VideoLibraryIcon />, route: "/mycontent" },
        { name: "Analytics", icon: <AssessmentIcon />, route: "/analytics" },
        { name: "Social Media", icon: <ShareIcon />, route: "/socialmedia" },
        { name: "Profile", icon: <SettingsIcon />, route: "/profile" },
      ];
      break;
    default:
      sideBarMenues = [];
  }

  const handleLogout = () => {
    try {
      dispatchToRedux(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "85vh",
        justifyContent: "space-between",
        border: "none",
      }}
    >
      <List>
        {sideBarMenues.map((menuItem, index) => (
          <ListItem
            key={index}
            sx={{
              cursor: "pointer",
              mt: "-0.5rem",
              padding: "0.5rem 0.5rem",
              borderRadius: "0.5rem",
            }}
          >
            <ListItemButton
              onClick={() => handleMenuItemClick(menuItem.name)}
              sx={{
                background:
                  currentPage === menuItem.name ? "linear-gradient(to top left, #720361, #BF2F75);" : "",
                borderRadius: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#899499",
                  color: currentPage === menuItem.name ? "white" : "",
                }}
              >
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: fonts.sans,
                  fontWeight: "600",
                  color: "#717f8c",
                  fontSize: "0.9rem",
                  color: currentPage === menuItem.name ? "white" : "",
                }}
                primary={menuItem.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <button
        onClick={handleLogout}
        style={{
          width: "263px",
          height: "45px",
          borderRadius: "11px",
          fontSize: "1rem",
          color: "#777777",
          margin: ".5rem",
          border: "1px solid #00000033",
          backgroundColor: "#FFFFFF",
          boxShadow: "2px 2px 10px #a9a9a977",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </Box>
  );
};

export default Sidebar;
