import React, { useState } from "react";
import { Box } from "@mui/material";
import PreTest from "./PreTest";
import backgroundImage from "../../assets/interestProfiler.webp";
import Questions from "./Questions";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../redux/slices/onetSlice.js";
import { selectToken } from "../../redux/slices/authSlice.js";
import Headers from "../../components/Headers.jsx";

const styles = {
  containerStyle: {
    // backgroundImage: `url(${backgroundImage})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // background:
    //   "radial-gradient(at bottom right, #f9f9f3 0, #f9f9f3 3px, rgba(249,249,243,0.2) 3px, rgba(249,249,243,0.2) 6px, rgba(249,249,243,0.75) 6px, rgba(249,249,243,0.75) 9px, rgba(249,249,243,0.25) 9px, rgba(249,249,243,0.25) 12px, rgba(249,249,243,0.3) 12px, rgba(249,249,243,0.3) 15px, rgba(249,249,243,0.75) 15px, rgba(249,249,243,0.75) 18px, rgba(249,249,243,0.2) 18px, rgba(249,249,243,0.2) 21px, transparent 21px, transparent 24px), radial-gradient(at top left, transparent 0, transparent 3px, rgba(249,249,243,0.2) 3px, rgba(249,249,243,0.2) 6px, rgba(249,249,243,0.75) 6px, rgba(249,249,243,0.75) 9px, rgba(249,249,243,0.3) 9px, rgba(249,249,243,0.3) 12px, rgba(249,249,243,0.25) 12px, rgba(249,249,243,0.25) 15px, rgba(249,249,243,0.75) 15px, rgba(249,249,243,0.75) 18px, rgba(249,249,243,0.2) 18px, rgba(249,249,243,0.2) 21px, #f9f9f3 21px, #f9f9f3 24px, transparent 24px, transparent 60px)",
    // backgroundBlendMode: "multiply",
    // backgroundSize: "24px 24px, 24px 24px",
    backgroundColor: "white",
    // backgroundColor: "#333333",

    height: "101vh",
    width: "101vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(100px)",
    color: "#fff",
    marginLeft: "-10px",
  },
};

export default function InterestProfiler() {
  const dispatchToRedux = useDispatch();
  const token = useSelector(selectToken);
  const [hide, setHide] = useState(false);
  const hadnleChooseOption = async (type) => {
    await dispatchToRedux(
      getQuestions({ resource: type, start: 1, end: 60, token })
    );
    setHide(true);
  };
  return (
    <Box
      sx={{
        ...styles.containerStyle,
      }}
    >
      {hide ? (
        <Questions />
      ) : (
        <Box
          sx={{
            ...styles.containerStyle,
            backgroundColor: "white",
          }}
        >
          <PreTest hadnleChooseOption={hadnleChooseOption} />
        </Box>
      )}
    </Box>
  );
}
