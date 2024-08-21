import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ShareIcon from "@mui/icons-material/Share";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { fonts } from "../../utility/fonts.js";

const Sidebar = ({ userRole, handleMenuItemClick }) => {
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

  return (
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
          <ListItemButton onClick={() => handleMenuItemClick(menuItem.name)}>
            <ListItemIcon sx={{ color: "#899499" }}>
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: fonts.sans,
                fontWeight: "600",
                color: "#717f8c",
                fontSize: "0.9rem",
              }}
              primary={menuItem.name}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
