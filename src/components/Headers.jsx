import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { interestLogo } from "../assets/assest.js";
import { logout, selectAuthenticated, selectToken, selectUserId } from "../redux/slices/authSlice.js";
import { getUserProfile, selectUserProfile } from "../redux/slices/profileSlice.js";
import commonStyles from "../styles/Common.module.css";
import navBar from "../styles/Headers.module.css";
import { colors } from "../utility/color.js";
import { fonts } from "../utility/fonts.js";
import { settings } from "../utility/paths.js";

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
  const navItems = [
    {
      name: "Explore",
      slug: "/explore",
    },
    {
      name: "Assessment Center",
      slug: "/assessment",
    },
    {
      name: "Resume Builder",
      slug: "/resume-builder",
    },
    {
      name: "How it works?",
      slug: "/how-it-works",
    },
    {
      name: "Pricing",
      slug: "/pricing",
    },
  ];

  console.log("userData", userData);
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
    navigate(path);
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

  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [navigate]);

  function handleNavClick(slug) {
    navigate(slug);
  }

  return (
    <nav className={navBar["navContainer"]}>
      <Link to={"/"}>
        <img src={interestLogo} alt="logo" width={"50%"} />
      </Link>
      <div className={navBar["right"]}>
        <ul className={navBar["navLinks"]}>
          {navItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavClick(item.slug)}
              className={item.slug === activeLink ? navBar.active : ""}
            >
              {item.name}
            </li>
          ))}
        </ul>
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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography sx={{ fontFamily: fonts.sans, fontWeight: "bold" }}>
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
                <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.name)}>
                  <Typography textAlign="center" sx={{ fontFamily: fonts.sans }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center" sx={{ color: colors.red, fontFamily: fonts.poppins }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <button className={commonStyles.navButton} onClick={() => navigate("/register")}>
            Sign up
            <span>
              <MdArrowOutward />
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Headers;
