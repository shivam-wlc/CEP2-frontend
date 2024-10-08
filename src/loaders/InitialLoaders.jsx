import { Box } from "@mui/material";
import React from "react";

import styles from "../styles/InitialLoaders.module.css";

const InitialLoaders = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.loader}></div>
    </Box>
  );
};

export default InitialLoaders;
