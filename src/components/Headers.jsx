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

import { interestLogo, menu } from "../assets/assest.js";
import { logout, selectAuthenticated, selectToken, selectUserId } from "../redux/slices/authSlice.js";
import { getUserProfile, selectUserProfile } from "../redux/slices/profileSlice.js";
import commonStyles from "../styles/Common.module.css";
import navBar from "../styles/Headers.module.css";
import { colors } from "../utility/color.js";
import { fonts } from "../utility/fonts.js";
import { pages, settings } from "../utility/paths.js";

const Headers = () => {
  const navigate = useNavigate();
  const dispatchToRedux = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const userData = useSelector(selectUserProfile);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Explore", slug: "/explore" },
    { name: "Assessment Center", slug: "/assessment" },
    { name: "Resume Builder", slug: "/resume-builder" },
    { name: "How it works?", slug: "/how-it-works" },
    { name: "Pricing", slug: "/pricing" },
  ];

  useEffect(() => {
    if (authenticated) {
      dispatchToRedux(getUserProfile({ userId, token }));
    }
  }, [authenticated, userId]);

  const handleNavClick = (slug) => {
    setIsMenuOpen(false);
    navigate(slug);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseUserMenu = (name) => {
    setAnchorElUser(null);

    if (name === "Dashboard") {
      navigate(`/workspace/${userId}`);
    }
  };

  return (
    <nav className={navBar["navContainer"]}>
      <Link to={"/"} className={navBar["logo"]}>
        <img src={interestLogo} alt="logo" width={"50%"} />
      </Link>
      <div className={navBar["right"]}>
        <div className={navBar["menuContainer"]}>
          <IconButton onClick={handleToggleMenu} className={navBar["menuIcon"]}>
            <img src={menu} alt="menu" />
          </IconButton>
        </div>

        <ul className={`${navBar["navLinks"]} ${isMenuOpen ? navBar["open"] : ""}`}>
          {navItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavClick(item.slug)}
              className={item.slug === window.location.pathname ? navBar.active : ""}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {authenticated ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
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
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography sx={{ fontFamily: fonts.sans, fontWeight: "bold" }}>
                    {userData?.firstName + " " + userData?.lastName}
                  </Typography>
                  <Typography sx={{ fontFamily: fonts.sans, color: colors.darkGray, fontSize: "0.8rem" }}>
                    {userData?.email}
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.name)}>
                  <Typography textAlign="center" sx={{ fontFamily: fonts.sans }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={() => dispatchToRedux(logout())}>
                <Typography textAlign="center" sx={{ color: colors.red, fontFamily: fonts.poppins }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <button className={commonStyles.navButton} onClick={() => navigate("/register")}>
            <p style={{ textWrap: "noWrap" }}>Sign up</p>
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
