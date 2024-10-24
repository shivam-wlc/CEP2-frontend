import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Logo } from "../assets/assest.js";
import renderCurrentPage from "../components/PageRender.jsx";
import Sidebar from "../components/workspace/Sidebar.jsx";
import { logout, selectAuthenticated, selectToken, selectUserId } from "../redux/slices/authSlice.js";
import { getUserProfile, selectUserProfile } from "../redux/slices/profileSlice.js";
import { fonts } from "../utility/fonts.js";
const drawerWidth = 280;

const Workspace = (props) => {
  const { window } = props;
  const navigate = useNavigate();
  const dispatchToRedux = useDispatch();
  const userData = useSelector(selectUserProfile);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const authenticate = useSelector(selectAuthenticated);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  // GET REQUEST
  useEffect(() => {
    if (authenticate) {
      dispatchToRedux(getUserProfile({ userId, token }));
    } else navigate("/");
  }, [authenticate, userId]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (pageName) => {
    setCurrentPage(pageName);
    handleDrawerClose();
  };

  const handleLogout = () => {
    try {
      dispatchToRedux(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  console.log("data shivam", userData);
  const inputBoxStyle = {
    "& .MuiFilledInput-root": {
      borderRadius: "25px", // Adjust the value as per your needs
      backgroundColor: "#f9fafb",
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "none", // Remove underline in non-focus state
    },
    "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none", // Remove underline on hover
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: "none", // Remove underline in focus state
    },

    "& .MuiFilledInput-input": {
      padding: "10px 14px", // Adjust the value as per your needs
    },
  };

  const drawer = (
    <div>
      <Box
        sx={{
          height: "10vh",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <img
          src={Logo}
          alt="Career Explorer"
          width={"60%"}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </Box>
      <Divider />

      {userData && (
        <Sidebar
          userRole={userData?.activeDashboard}
          handleMenuItemClick={handleMenuItemClick}
          currentPage={currentPage}
        />
      )}
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f9fafb" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ height: "10vh", boxShadow: "none", backgroundColor: "#BC2876" }}>
          <Box sx={{ mr: "100px" }}>
            <Typography
              variant="h7"
              sx={{
                fontFamily: fonts.sans,
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              {"Hi " + userData?.firstName + "," || "Hi User,"}
            </Typography>
            <Typography
              variant="h7"
              sx={{
                fontFamily: fonts.sans,
                whiteSpace: "nowrap",
                display: "block",
                fontWeight: "700",
                fontSize: "1.2rem",
              }}
            >
              {userData?.activeDashboard === "creator"
                ? "Counsellor Hub"
                : userData?.activeDashboard === "admin"
                  ? "Admin Panel"
                  : "Welcome Back"}
            </Typography>
          </Box>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* <Box
            sx={{
              border: "1px solid white",
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <TextField
              // fullWidth

              variant="filled"
              label="Search Here"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              sx={inputBoxStyle}
            />
          </Box>      */}

          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large" aria-label="show new messages" color="gray">
            {/* <Badge badgeContent={5} color="error">
              <MailIcon />
            </Badge> */}
          </IconButton>
          <IconButton size="large" aria-label="show new notifications" color="gray" sx={{ mr: 3 }}>
            {/* <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge> */}
          </IconButton>
          <Box>
            {/* <IconButton  sx={{ p: 0 }}> */}
            <Box
              sx={{
                backgroundColor: "white",
                height: "3.25rem",
                width: "content-fit",
                display: "flex",
                fontSize: "1rem",
                padding: ".4rem",
                borderRadius: "2rem",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={handleOpenUserMenu}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  {/* <img src={""} alt="userImage" style={{height: "40px", width: "40px"}} /> */}
                  <Avatar
                    alt={userData?.name}
                    src={userData?.profilePicture}
                    sx={{ width: 40, height: 40, marginRight: 1 }}
                  />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                  <Typography sx={{ fontWeight: "600", color: "#696969", fontSize: "1.1rem" }}>
                    {userData?.firstName + " " + userData?.lastName || "User Name"}
                  </Typography>
                  <button
                    onClick={handleLogout}
                    style={{
                      color: "red",
                      fontFamily: fonts.sans,
                      fontSize: "0.8rem",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}>
                <KeyboardArrowDownIcon
                  sx={{ paddingRight: ".4rem", pr: "1", color: "black", cursor: "pointer" }}
                />
              </Box>
            </Box>
            {/* </IconButton> */}
          </Box>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    marginTop: "-0.5rem",
                    fontFamily: fonts.sans,
                    fontSize: "0.9rem",
                    color: "gray",
                    fontWeight: "500",
                  }}
                >
                  {userData?.email}
                </Typography>
                <Divider />
              </Box>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Box
                component={Link}
                to="/"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  textDecoration: "none",
                }}
              >
                <Typography textAlign="center" sx={{ fontFamily: fonts.sans, color: "black" }}>
                  Home
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography textAlign="center" sx={{ fontFamily: fonts.sans }}>
                  Switch Workspace
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Side bar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#f9fafb",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Pages */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {userData && renderCurrentPage(currentPage, userData)}
      </Box>
    </Box>
  );
};

export default Workspace;
