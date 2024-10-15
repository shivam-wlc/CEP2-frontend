import React, { useEffect, useState } from "react";
import navBar from "../styles/Headers.module.css";
import commonStyles from "../styles/Common.module.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { pages, settings } from "../utility/paths.js";
import { interestLogo, menu } from "../assets/assest.js";
import { fonts } from "../utility/fonts.js";
import { colors } from "../utility/color.js";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuthenticated, selectUserId, selectToken } from "../redux/slices/authSlice.js";
import { getUserProfile, selectUserProfile } from "../redux/slices/profileSlice.js";
import { Divider } from "@mui/material";
import { MdArrowOutward } from "react-icons/md";

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
                <MenuItem key={setting.name} onClick={() => setAnchorElUser(null)}>
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
