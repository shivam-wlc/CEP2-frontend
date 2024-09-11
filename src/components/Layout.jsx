import React from "react";
import Footer from "./Footer.jsx";
import Headers from "./Headers.jsx";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";

const Layout = () => {
  return (
    <Box sx={{ backgroundColor: "#edeaeae01", border: 1 }}>
      <Headers />
      {/* pages */}
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
