import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./Footer.jsx";
import Headers from "./Headers.jsx";

const Layout = () => {
  return (
    <Box sx={{ backgroundColor: "#edeaeae01" }}>
      <Headers />
      {/* pages */}
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
