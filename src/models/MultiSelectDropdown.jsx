// import React, { useEffect, useState } from "react";
// import {
//   Autocomplete,
//   TextField,
//   Checkbox,
//   FormControl,
//   Typography,
//   Select,
//   MenuItem,
//   ListItemText,
// } from "@mui/material";
// import {
//   getCareerClusterOptions,
//   selectClusterData,
// } from "../redux/slices/surveySlice.js";
// import { useDispatch, useSelector } from "react-redux";
// import { selectToken } from "../redux/slices/authSlice.js";
// import { notify } from "../redux/slices/alertSlice.js";

// const MultiSelectDropdown = ({
//   fonts,
//   selectedOptions,
//   setSelectedOptions,
// }) => {
//   const dispatch = useDispatch();
//   const token = useSelector(selectToken);
//   const clusterData = useSelector(selectClusterData);

//   const [open, setOpen] = useState(false);
//   const [d, setD] = useState([]);

//   const handleAppealingChange = (event) => setD(event.target.value);

//   useEffect(() => {
//     dispatch(getCareerClusterOptions({ token }));
//   }, []);

//   // Filter pathways based on the selected career clusters
//   const filteredPathways = clusterData
//     .filter((category) => d.includes(category.CareerClusters))
//     .flatMap((category) =>
//       category.CareerPathways.map((pathway) => ({
//         careerCluster: category.CareerClusters,
//         careerPathway: pathway,
//       }))
//     );

//   const filteredData = clusterData.filter((category) =>
//     d.includes(category.CareerClusters)
//   );

//   console.log("clusterData", clusterData);
//   console.log("d", d);

//   console.log("filteredPathways", filteredPathways);
//   return (
//     <>
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
//           At this point in your career journey, which Career Cluster most appeal
//           to you?<span style={{ color: "red" }}>*</span>
//         </Typography>
//         <Select
//           multiple
//           value={d}
//           onChange={handleAppealingChange}
//           renderValue={(selected) => selected.join(", ")}
//           sx={{
//             borderRadius: "25px",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderRadius: "25px",
//             },
//           }}
//         >
//           {clusterData.map((option) => (
//             <MenuItem key={option.CareerClusters} value={option.CareerClusters}>
//               <Checkbox checked={d.indexOf(option.CareerClusters) > -1} />
//               <ListItemText primary={option.CareerClusters} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
//         Select Career Pathways
//         <span style={{ color: "red" }}>*</span>
//       </Typography>
//       <Autocomplete
//         multiple
//         options={filteredData?.flatMap((category) =>
//           category.CareerPathways.map((pathway) => ({
//             careerCluster: category.CareerClusters,
//             careerPathway: pathway,
//           }))
//         )}
//         groupBy={(option) => option.careerCluster}
//         getOptionLabel={(option) => option.careerPathway}
//         value={selectedOptions}
//         onChange={(event, newValue) => {
//           setSelectedOptions(newValue);
//         }}
//         // open={true}
//         // onClose={() => {}}
//         open={open} // Set open state
//         onOpen={() => {
//           setOpen(true);
//         }}
//         onClose={() => {
//           // setOpen(false);
//         }}
//         renderOption={(props, option, { selected }) => {
//           const isChecked = selectedOptions.some(
//             (item) => item.careerPathway === option.careerPathway
//           );
//           return (
//             <li {...props}>
//               <Checkbox checked={isChecked} style={{ marginRight: 8 }} />
//               {option.careerPathway}
//             </li>
//           );
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="outlined"
//             label=""
//             placeholder=""
//             sx={{
//               borderRadius: "25px",
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderRadius: "25px",
//               },
//             }}
//           />
//         )}
//       />
//     </>
//   );
// };

// export default MultiSelectDropdown;

// import React, { useEffect, useState } from "react";
// import {
//   Autocomplete,
//   TextField,
//   Checkbox,
//   FormControl,
//   Typography,
//   Select,
//   MenuItem,
//   ListItemText,
// } from "@mui/material";
// import {
//   getCareerClusterOptions,
//   selectClusterData,
// } from "../redux/slices/surveySlice.js";
// import { useDispatch, useSelector } from "react-redux";
// import { selectToken } from "../redux/slices/authSlice.js";
// import { notify } from "../redux/slices/alertSlice.js";

// const MultiSelectDropdown = ({
//   fonts,
//   selectedOptions,
//   setSelectedOptions,
// }) => {
//   const dispatch = useDispatch();
//   const token = useSelector(selectToken);
//   const clusterData = useSelector(selectClusterData);

//   const [open, setOpen] = useState(false);
//   const [d, setD] = useState([]);
//   const [showPathways, setShowPathways] = useState(false);

//   console.log("sgivam", selectedOptions);

//   const handleAppealingChange = (event) => {
//     const value = event.target.value;
//     setD(value);
//     console.log("selectedOptions", selectedOptions);
//     if (value.length > 0) {
//       setShowPathways(true);
//       if (value.length > 2) {
//         dispatch(
//           notify({
//             type: "error",
//             message: "Please select upto 2 Career Clusters",
//           })
//         );
//       }
//     } else {
//       setShowPathways(false);
//     }
//   };

//   useEffect(() => {
//     dispatch(getCareerClusterOptions({ token }));
//   }, [dispatch, token]);

//   const filteredPathways = clusterData
//     .filter((category) => d.includes(category.CareerClusters))
//     .flatMap((category) =>
//       category.CareerPathways.map((pathway) => ({
//         careerCluster: category.CareerClusters,
//         careerPathway: pathway,
//       }))
//     );

//   const filteredData = clusterData.filter((category) =>
//     d.includes(category.CareerClusters)
//   );

//   return (
//     <>
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
//           At this point in your career journey, which Career Cluster most appeal
//           to you?<span style={{ color: "red" }}>*</span>
//         </Typography>
//         <Select
//           multiple
//           value={d}
//           onChange={handleAppealingChange}
//           renderValue={(selected) => selected.join(", ")}
//           sx={{
//             borderRadius: "25px",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderRadius: "25px",
//             },
//           }}
//         >
//           {clusterData.map((option) => (
//             <MenuItem key={option.CareerClusters} value={option.CareerClusters}>
//               <Checkbox checked={d.indexOf(option.CareerClusters) > -1} />
//               <ListItemText primary={option.CareerClusters} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {showPathways && (
//         <>
//           <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
//             Select Career Pathways
//             <span style={{ color: "red" }}>*</span>
//           </Typography>
//           <Autocomplete
//             multiple
//             options={filteredData?.flatMap((category) =>
//               category.CareerPathways.map((pathway) => ({
//                 careerCluster: category.CareerClusters,
//                 careerPathway: pathway,
//               }))
//             )}
//             groupBy={(option) => option.careerCluster}
//             getOptionLabel={(option) => option.careerPathway}
//             value={selectedOptions}
//             onChange={(event, newValue) => setSelectedOptions(newValue)}
//             open={open}
//             onOpen={() => setOpen(true)}
//             onClose={() => setOpen(false)}
//             renderOption={(props, option, { selected }) => {
//               const isChecked = selectedOptions.some(
//                 (item) => item.careerPathway === option.careerPathway
//               );
//               return (
//                 <li {...props}>
//                   <Checkbox checked={isChecked} style={{ marginRight: 8 }} />
//                   {option.careerPathway}
//                 </li>
//               );
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 variant="outlined"
//                 label=""
//                 placeholder=""
//                 sx={{
//                   borderRadius: "25px",
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderRadius: "25px",
//                   },
//                 }}
//               />
//             )}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default MultiSelectDropdown;

import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Checkbox,
  FormControl,
  Typography,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import {
  getCareerClusterOptions,
  selectClusterData,
} from "../redux/slices/surveySlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../redux/slices/authSlice.js";
import { notify } from "../redux/slices/alertSlice.js";

const MultiSelectDropdown = ({
  fonts,
  selectedOptions,
  setSelectedOptions,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const clusterData = useSelector(selectClusterData);

  const [open, setOpen] = useState(false);
  const [d, setD] = useState([]);
  const [showPathways, setShowPathways] = useState(false);

  console.log("sgivam", selectedOptions);

  const handleAppealingChange = (event) => {
    const value = event.target.value;
    setD(value);
    console.log("selectedOptions", selectedOptions);
    if (value.length > 0) {
      setShowPathways(true);
      if (value.length > 2) {
        dispatch(
          notify({
            type: "error",
            message: "Please select up to 2 Career Clusters",
          })
        );
      }
    } else {
      setShowPathways(false);
    }
  };

  useEffect(() => {
    dispatch(getCareerClusterOptions({ token }));
  }, [dispatch, token]);

  const filteredPathways = clusterData
    .filter((category) => d.includes(category.CareerClusters))
    .flatMap((category) =>
      category.CareerPathways.map((pathway) => ({
        careerCluster: category.CareerClusters,
        careerPathway: pathway,
      }))
    );

  const filteredData = clusterData.filter((category) =>
    d.includes(category.CareerClusters)
  );

  const handleOptionChange = (event, newValue) => {
    const groupedByCluster = newValue.reduce((acc, curr) => {
      acc[curr.careerCluster] = acc[curr.careerCluster] || [];
      acc[curr.careerCluster].push(curr);
      return acc;
    }, {});

    for (let cluster in groupedByCluster) {
      if (groupedByCluster[cluster].length > 2) {
        dispatch(
          notify({
            type: "warning",
            message: "You can choose up to 2 Career Pathways per cluster",
          })
        );
        return;
      }
    }

    setSelectedOptions(newValue);
  };

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
          At this point in your career journey, which Career Cluster most appeal
          to you?<span style={{ color: "red" }}>*</span>
        </Typography>
        <Select
          multiple
          value={d}
          onChange={handleAppealingChange}
          renderValue={(selected) => selected.join(", ")}
          sx={{
            borderRadius: "25px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "25px",
            },
          }}
        >
          {clusterData.map((option) => (
            <MenuItem key={option.CareerClusters} value={option.CareerClusters}>
              <Checkbox checked={d.indexOf(option.CareerClusters) > -1} />
              <ListItemText primary={option.CareerClusters} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {showPathways && (
        <>
          <Typography sx={{ fontFamily: fonts.sans, fontWeight: "600" }}>
            Select Career Pathways
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Autocomplete
            multiple
            options={filteredData?.flatMap((category) =>
              category.CareerPathways.map((pathway) => ({
                careerCluster: category.CareerClusters,
                careerPathway: pathway,
              }))
            )}
            groupBy={(option) => option.careerCluster}
            getOptionLabel={(option) => option.careerPathway}
            value={selectedOptions}
            onChange={handleOptionChange}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            disableCloseOnSelect 
            renderOption={(props, option, { selected }) => {
              const isChecked = selectedOptions.some(
                (item) => item.careerPathway === option.careerPathway
              );
              return (
                <li {...props}>
                  <Checkbox checked={isChecked} style={{ marginRight: 8 }} />
                  {option.careerPathway}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label=""
                placeholder=""
                sx={{
                  borderRadius: "25px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "25px",
                  },
                }}
              />
            )}
          />
        </>
      )}
    </>
  );
};

export default MultiSelectDropdown;
