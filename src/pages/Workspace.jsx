// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   CssBaseline,
//   Divider,
//   Drawer,
//   IconButton,
//   Menu,
//   MenuItem,
//   TextField,
//   Toolbar,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { useNavigate, Link } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { Logo } from "../assets/assest.js";
// import { fonts } from "../utility/fonts.js";

// // redux
// import { useDispatch, useSelector } from "react-redux";
// import {
//   logout,
//   selectUserId,
//   selectAuthenticated,
//   selectToken,
// } from "../redux/slices/authSlice.js";
// import {
//   getUserProfile,
//   selectUserProfile,
// } from "../redux/slices/profileSlice.js";

// import Sidebar from "../components/workspace/Sidebar.jsx";
// import renderCurrentPage from "../components/PageRender.jsx";
// const drawerWidth = 280;

// const Workspace = (props) => {
//   const { window } = props;
//   const navigate = useNavigate();
//   const dispatchToRedux = useDispatch();
//   const userData = useSelector(selectUserProfile);
//   const userId = useSelector(selectUserId);
//   const token = useSelector(selectToken);
//   const authenticate = useSelector(selectAuthenticated);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const [currentPage, setCurrentPage] = useState("Dashboard");

//   // GET REQUEST
//   useEffect(() => {
//     if (authenticate) {
//       dispatchToRedux(getUserProfile({ userId, token }));
//     } else navigate("/");
//   }, [authenticate, userId]);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleMenuItemClick = (pageName) => {
//     setCurrentPage(pageName);
//     handleDrawerClose();
//   };

//   const handleLogout = () => {
//     try {
//       dispatchToRedux(logout());
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const drawer = (
//     <div>
//       <Box
//         sx={{
//           height: "10vh",
//           display: "flex",
//           justifyContent: "left",
//           alignItems: "center",
//           margin: "1rem",
//         }}
//       >
//         <img src={Logo} alt="Career Explorer" width={"60%"} />
//       </Box>

//       <Box
//         sx={{
//           height: "10vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#f2f3f5",
//           borderRadius: "0.5rem",
//           marginBottom: "1rem",
//           gap: "1rem",
//           ml: "1rem",
//           mr: "1rem",
//         }}
//       >
//         <Avatar
//           alt={userData?.name}
//           src={userData?.profilePicture}
//           sx={{ width: 55, height: 55 }}
//         />
//         <Typography
//           variant="h7"
//           sx={{ fontFamily: fonts.sans, fontWeight: "600" }}
//         >
//           {/* {userData?.name || "User Name"} */}
//           {userData?.firstName + " " + userData?.lastName || "User Name"}
//         </Typography>
//       </Box>
//       <Divider />

//       {userData && (
//         <Sidebar
//           userRole={userData?.activeDashboard}
//           handleMenuItemClick={handleMenuItemClick}
//         />
//       )}
//       <Divider />
//     </div>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex", backgroundColor: "#f9fafb" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//           backgroundColor: "white",
//           boxShadow: "none",
//         }}
//       >
//         <Toolbar
//           sx={{ height: "10vh", boxShadow: "none", backgroundColor: "#f9fafb" }}
//         >
//           <IconButton
//             color="black"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <TextField
//             fullWidth
//             InputProps={{
//               endAdornment: (
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//           <Box sx={{ flexGrow: 1 }} />
//           <IconButton size="large" aria-label="show new messages" color="gray">
//             {/* <Badge badgeContent={5} color="error">
//               <MailIcon />
//             </Badge> */}
//           </IconButton>
//           <IconButton
//             size="large"
//             aria-label="show new notifications"
//             color="gray"
//             sx={{ mr: 3 }}
//           >
//             {/* <Badge badgeContent={17} color="error">
//               <NotificationsIcon />
//             </Badge> */}
//           </IconButton>
//           <Tooltip title="Open settings">
//             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//               <Avatar
//                 alt={userData?.name}
//                 src={userData?.profilePicture}
//                 sx={{ width: 55, height: 55, marginRight: 1 }}
//               />
//             </IconButton>
//           </Tooltip>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorElUser}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             open={Boolean(anchorElUser)}
//             onClose={handleCloseUserMenu}
//           >
//             <MenuItem>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 1,
//                 }}
//               >
//                 <Typography
//                   textAlign="left"
//                   sx={{ fontWeight: "bold", fontFamily: fonts.sans }}
//                 >
//                   {userData?.firstName + " " + userData?.lastName ||
//                     "User Name"}
//                 </Typography>
//                 <Typography
//                   textAlign="center"
//                   sx={{
//                     marginTop: "-0.5rem",
//                     fontFamily: fonts.sans,
//                     fontSize: "0.9rem",
//                     color: "gray",
//                     fontWeight: "500",
//                   }}
//                 >
//                   {userData?.email}
//                 </Typography>
//                 <Divider />
//               </Box>
//             </MenuItem>
//             <MenuItem onClick={handleCloseUserMenu}>
//               <Box
//                 component={Link}
//                 to="/"
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 1,
//                   textDecoration: "none",
//                 }}
//               >
//                 <Typography
//                   textAlign="center"
//                   sx={{ fontFamily: fonts.sans, color: "black" }}
//                 >
//                   Home
//                 </Typography>
//               </Box>
//             </MenuItem>
//             <MenuItem onClick={handleCloseUserMenu}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 1,
//                 }}
//               >
//                 <Typography textAlign="center" sx={{ fontFamily: fonts.sans }}>
//                   Switch Workspace
//                 </Typography>
//               </Box>
//             </MenuItem>

//             <Divider />
//             <MenuItem onClick={handleCloseUserMenu}>
//               <Box
//                 component={Button}
//                 onClick={handleLogout}
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 1,
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     color: "red",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontFamily: fonts.sans,
//                     gap: 1,
//                     fontSize: "0.9rem",
//                   }}
//                 >
//                   <LogoutIcon />
//                   Logout
//                 </Typography>
//               </Box>
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//               backgroundColor: "#f9fafb",
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         <Toolbar />

//         {userData && renderCurrentPage(currentPage, userData)}
//       </Box>
//     </Box>
//   );
// };

// export default Workspace;

import React, { useState, useEffect } from "react";
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
import { useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Logo } from "../assets/assest.js";
import { fonts } from "../utility/fonts.js";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectUserId,
  selectAuthenticated,
  selectToken,
} from "../redux/slices/authSlice.js";
import {
  getUserProfile,
  selectUserProfile,
} from "../redux/slices/profileSlice.js";

import Sidebar from "../components/workspace/Sidebar.jsx";
import renderCurrentPage from "../components/PageRender.jsx";
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
        <img src={Logo} alt="Career Explorer" width={"60%"} />
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
        <Toolbar
          sx={{ height: "10vh", boxShadow: "none", backgroundColor: "#BC2876" }}
        >
          <Box sx={{ mr: "100px" }}>
            <Typography
              variant="h7"
              sx={{
                fontFamily: fonts.sans,
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              {/* {userData?.name || "User Name"} */}
              {"Hi " + userData?.firstName + " " + userData?.lastName ||
                "Hi User Name"}
            </Typography>
            <Typography
              variant="h7"
              sx={{
                fontFamily: fonts.sans,
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              Your Workspace
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
          <TextField
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large" aria-label="show new messages" color="gray">
            {/* <Badge badgeContent={5} color="error">
              <MailIcon />
            </Badge> */}
          </IconButton>
          <IconButton
            size="large"
            aria-label="show new notifications"
            color="gray"
            sx={{ mr: 3 }}
          >
            {/* <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge> */}
          </IconButton>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={userData?.name}
                src={userData?.profilePicture}
                sx={{ width: 55, height: 55, marginRight: 1 }}
              />
            </IconButton>
          </Tooltip>
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
                  textAlign="left"
                  sx={{ fontWeight: "bold", fontFamily: fonts.sans }}
                >
                  {userData?.firstName + " " + userData?.lastName ||
                    "User Name"}
                </Typography>
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
                <Typography
                  textAlign="center"
                  sx={{ fontFamily: fonts.sans, color: "black" }}
                >
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

            <Divider />
            <MenuItem onClick={handleCloseUserMenu}>
              <Box
                component={Button}
                onClick={handleLogout}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.sans,
                    gap: 1,
                    fontSize: "0.9rem",
                  }}
                >
                  <LogoutIcon />
                  Logout
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
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
