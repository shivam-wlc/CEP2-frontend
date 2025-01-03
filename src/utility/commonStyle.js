import { fonts } from "./fonts.js";

const inputFieldStyle = {
  width: "30%",
  backgroundColor: "#F6F6F6",
  fontFamily: fonts.poppins,
  borderRadius: "90px",
  border: "none",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  InputLabelProps: {
    sx: { marginLeft: "15px" },
  },
  InputProps: {
    disableUnderline: true,
    sx: {
      fontFamily: fonts.poppins,
      "&::placeholder": {
        fontFamily: fonts.poppins,
      },
    },
    inputProps: {
      style: {
        paddingLeft: "20px",
      },
    },
  },
};

const tableHeadStyle = { fontWeight: "600", fontFamily: fonts.poppins, color: "#717f8c" };
const tableBodyStyle = { fontFamily: fonts.poppins, color: "#717f8c" };

const buttonStyle = {
  background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
  width: "10%",
  "&:hover": {
    background: "linear-gradient(124.89deg, #BF2F75 -3.87%, #720361 63.8%)",
  },
  borderRadius: "90px",
  padding: "10px 0px",
  fontWeight: "bold",
  color: "white",
};

export { inputFieldStyle, tableHeadStyle, tableBodyStyle, buttonStyle };
