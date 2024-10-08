import React from "react";

import { PageNotFound } from "../assets/assest.js";

const InvalidPages = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${PageNotFound})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default InvalidPages;
