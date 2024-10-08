import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreatorIcon, MaleFemaleIcon, NewUser, TotalUsers } from "../../assets/assest.js";
import usersIcon from "../../assets/glass/ic_glass_users.png";
import { getGeneralUserData, selectGeneralData } from "../../redux/slices/adminSlice.js";
import { selectToken } from "../../redux/slices/authSlice.js";
import { fonts } from "../../utility/fonts.js";

const AdminHome = () => {
  const dispatchToRedux = useDispatch();
  const generalData = useSelector(selectGeneralData);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatchToRedux(getGeneralUserData({ token }));
  }, []);

  return (
    <div>
      <Typography variant="h5" sx={{ fontFamily: fonts.poppins, fontWeight: "600" }}>
        Hi, Welcome Back
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <DetailsCard icon={NewUser} numbers={generalData?.last7DaysJoinedUsers} title={"New Users"} />
        <DetailsCard icon={TotalUsers} numbers={generalData?.totalUsers} title={"Total Users"} />
        <DetailsCard icon={CreatorIcon} numbers={generalData?.totalCreators} title={"Total Creators"} />

        <Box
          sx={{
            width: "23%",
            height: "150px",
            backgroundColor: "white",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <img src={MaleFemaleIcon} alt="users" width={"80px"} height={"80px"} />
          <Box>
            <Typography variant="h6" sx={{ fontFamily: fonts.poppins, fontWeight: "600" }}>
              {generalData?.maleCount} / {generalData?.femaleCount}
            </Typography>
            <Typography
              variant="body"
              sx={{
                fontFamily: fonts.poppins,
                fontWeight: "600",
                color: "gray",
              }}
            >
              Male / Female
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AdminHome;

const DetailsCard = ({ icon, numbers, title }) => {
  return (
    <Box
      sx={{
        width: "23%",
        height: "150px",
        backgroundColor: "white",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <img src={icon} alt="users" width={"80px"} height={"80px"} />
      <Box>
        <Typography variant="h6" sx={{ fontFamily: fonts.poppins, fontWeight: "600" }}>
          {numbers}
        </Typography>
        <Typography variant="body" sx={{ fontFamily: fonts.poppins, fontWeight: "600", color: "gray" }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
