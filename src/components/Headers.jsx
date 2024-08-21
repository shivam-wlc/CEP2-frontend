import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import EastIcon from "@mui/icons-material/East";
import { Link, useNavigate } from "react-router-dom";
import { pages, settings } from "../utility/paths.js";
import { Logo } from "../assets/assest.js";
import { fonts } from "../utility/fonts.js";
import { colors } from "../utility/color.js";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectAuthenticated,
  selectUserId,
  selectToken,
} from "../redux/slices/authSlice.js";
import {
  getUserProfile,
  selectUserProfile,
} from "../redux/slices/profileSlice.js";
import { Divider } from "@mui/material";

const Headers = () => {
  const navigate = useNavigate();
  const dispatchToRedux = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const userData = useSelector(selectUserProfile);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // getUserProfile

  useEffect(() => {
    if (authenticated) {
      dispatchToRedux(getUserProfile({ userId, token }));
    }
  }, [authenticated, userId]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    handleCloseNavMenu();
    navigate(path); // Use navigate function to redirect to the specified path
  };

  const handleCloseUserMenu = (name) => {
    setAnchorElUser(null);

    if (name === "Dashboard") {
      navigate(`/workspace/${userId}`);
    }
  };

  const handleLogout = () => {
    try {
      dispatchToRedux(logout());
    } catch (error) {}
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: colors.white,
        boxShadow: "none",
        borderBottom: "1px solid #E5E5E5",
        // height: "11vh",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, marginRight: 1 }}
            component={Link}
            to={"/"}
          >
            <img src={Logo} alt="Career Explorer" width={200} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color={colors.darkGray}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleNavigate(page.path)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            component={Link}
            to={"/"}
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              margin: "auto",
            }}
          >
            <img src={Logo} alt="Career Explorer" width={150} />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              gap: "2rem",
              marginRight: "5rem",
              //   border: "1px solid red",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigate(page.path)}
                sx={{
                  my: 2,
                  color: colors.darkGray,
                  fontFamily: fonts.poppins,
                  fontWeight: 500,
                  fontSize: 16,
                  display: "block",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {authenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userData?.firstName}
                    src={userData?.profilePicture}
                    sx={{ width: 55, height: 55, marginRight: 1 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "65px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
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
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{ fontFamily: fonts.sans, fontWeight: "bold" }}
                    >
                      {userData?.firstName + " " + userData?.lastName}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: fonts.sans,
                        color: colors.darkGray,
                        fontSize: "0.8rem",
                      }}
                    >
                      {userData?.email}
                    </Typography>
                  </Box>
                </MenuItem>{" "}
                <Divider />
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleCloseUserMenu(setting.name)}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ fontFamily: fonts.sans }}
                    >
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Typography
                    textAlign="center"
                    sx={{ color: colors.red, fontFamily: fonts.poppins }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }} component={Link} to={"/register"}>
              <Button
                sx={{
                  color: colors.white,
                  fontFamily: fonts.poppins,
                  fontWeight: 500,
                  fontSize: { xs: 12, md: 14 },
                  backgroundColor: colors.midGray,
                  paddingX: { xs: 2, md: 3 },
                  paddingY: { xs: 1.5, md: 1.5 },

                  borderRadius: 7,
                  "&:hover": {
                    backgroundColor: colors.midGray,
                  },
                }}
              >
                Signup
                <EastIcon
                  sx={{ display: { xs: "none", md: "inline" }, marginLeft: 1 }}
                />
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Headers;
