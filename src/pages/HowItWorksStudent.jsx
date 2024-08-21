// import React from "react";
// import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
// import Headers from "../components/Headers";

// const HowItWorksStudent = () => {
//   return (
//     <>
//       <Headers />
//       <Box sx={{ backgroundColor: "#f5f5f5", padding: "20px 0" }}>
//         <Container maxWidth="lg">
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: "bold",
//               textAlign: "center",
//               marginBottom: "40px",
//             }}
//           >
//             Student Page
//           </Typography>

//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Paper sx={{ padding: "20px", height: "100%" }}>
//                 <Typography variant="h4" sx={{ marginBottom: "20px" }}>
//                   Explore
//                 </Typography>
//                 <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//                   We provide free access to our video content, podcasts and
//                   articles for you. It’s curated so you can focus on the things
//                   that are important to you without distraction.
//                 </Typography>
//                 <Box
//                   sx={{
//                     height: "200px",
//                     backgroundColor: "#e0e0e0",
//                     marginBottom: "20px",
//                   }}
//                 ></Box>
//                 <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//                   The Explore pages are where you will see content from our
//                   international career guidance counsellors. We cater to a
//                   global audience so the content can be in different languages.
//                   Some of our counsellor members will host webinars or short
//                   courses to help you along your career journey. To react to
//                   content or participate in sessions you will need to ‘Sign up’
//                   to our CareerExplorer community.
//                 </Typography>
//                 <Button variant="contained" href="#" fullWidth>
//                   Sign Up
//                 </Button>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Paper sx={{ padding: "20px", height: "100%" }}>
//                 <Typography variant="h4" sx={{ marginBottom: "20px" }}>
//                   Learn
//                 </Typography>
//                 <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//                   The Learn pages are dedicated to Higher and Further Education
//                   Institutions. We try to capture the information that is useful
//                   and relevant to you as aspiring students looking to start your
//                   undergraduate or postgraduate education.
//                 </Typography>
//                 <Box
//                   sx={{
//                     height: "200px",
//                     backgroundColor: "#e0e0e0",
//                     marginBottom: "20px",
//                   }}
//                 ></Box>
//                 <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//                   Signing up to the CareerExplorer community allows us to keep
//                   you updated on new events and activities.
//                 </Typography>
//                 <Button variant="contained" href="#" fullWidth>
//                   Sign Up
//                 </Button>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Paper sx={{ padding: "20px", height: "100%" }}>
//                 <Typography variant="h4" sx={{ marginBottom: "20px" }}>
//                   Opportunity
//                 </Typography>
//                 <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//                   The Opportunity pages focus on building your experiences and
//                   skills so you can make more informed decisions on both your
//                   higher education and early work choices. With the growth in
//                   remote working, it’s important to have the skills of working
//                   and learning online.
//                 </Typography>
//                 <Box
//                   sx={{
//                     height: "200px",
//                     backgroundColor: "#e0e0e0",
//                     marginBottom: "20px",
//                   }}
//                 ></Box>
//                 <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//                   Signing up to the CareerExplorer community allows us to keep
//                   you updated on opportunities that are posted.
//                 </Typography>
//                 <Button variant="contained" href="#" fullWidth>
//                   Sign Up
//                 </Button>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Paper sx={{ padding: "20px", height: "100%" }}>
//                 <Typography variant="h4" sx={{ marginBottom: "20px" }}>
//                   Assessment Centre
//                 </Typography>
//                 <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//                   This is the place where you can undertake some short
//                   assessments that help you connect your interests, personal
//                   preferences and personality to various occupations. Our Career
//                   Directions Report will identify the ‘Best fit’ career options
//                   for you.
//                 </Typography>
//                 <Box
//                   sx={{
//                     height: "200px",
//                     backgroundColor: "#e0e0e0",
//                     marginBottom: "20px",
//                   }}
//                 ></Box>
//                 <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//                   You can use this as a guide to making choices of the
//                   educational programmes that will lead you to your chosen
//                   destinations. CareerExporer charge a small fee for the
//                   Assessments offered.
//                 </Typography>
//                 <Button variant="contained" href="#" fullWidth>
//                   Sign Up
//                 </Button>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default HowItWorksStudent;

import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import Headers from "../components/Headers";

const HowItWorksStudent = () => {
  return (
    <>
      <Headers />
      {/* <Box sx={{ backgroundColor: "#f5f5f5", padding: "20px 0" }}> */}
      <Box sx={{ padding: "20px 0" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Student Page
          </Typography>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Explore
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                We provide free access to our video content, podcasts and
                articles for you. It’s curated so you can focus on the things
                that are important to you without distraction.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                The Explore pages are where you will see content from our
                international career guidance counsellors. We cater to a global
                audience so the content can be in different languages. Some of
                our counsellor members will host webinars or short courses to
                help you along your career journey. To react to content or
                participate in sessions you will need to ‘Sign up’ to our
                CareerExplorer community.
              </Typography>
              <Button variant="contained" href="#" fullWidth>
                Sign Up
              </Button>
            </Paper>
          </Box>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Learn
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                The Learn pages are dedicated to Higher and Further Education
                Institutions. We try to capture the information that is useful
                and relevant to you as aspiring students looking to start your
                undergraduate or postgraduate education.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                Signing up to the CareerExplorer community allows us to keep you
                updated on new events and activities.
              </Typography>
              <Button variant="contained" href="#" fullWidth>
                Sign Up
              </Button>
            </Paper>
          </Box>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Opportunity
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                The Opportunity pages focus on building your experiences and
                skills so you can make more informed decisions on both your
                higher education and early work choices. With the growth in
                remote working, it’s important to have the skills of working and
                learning online.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                Signing up to the CareerExplorer community allows us to keep you
                updated on opportunities that are posted.
              </Typography>
              <Button variant="contained" href="#" fullWidth>
                Sign Up
              </Button>
            </Paper>
          </Box>

          <Box sx={{ marginBottom: "40px" }}>
            <Paper sx={{ padding: "20px", boxShadow: 3 }}>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Assessment Centre
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                This is the place where you can undertake some short assessments
                that help you connect your interests, personal preferences and
                personality to various occupations. Our Career Directions Report
                will identify the ‘Best fit’ career options for you.
              </Typography>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "20px",
                }}
              ></Box>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                You can use this as a guide to making choices of the educational
                programmes that will lead you to your chosen destinations.
                CareerExporer charge a small fee for the Assessments offered.
              </Typography>
              <Button variant="contained" href="#" fullWidth>
                Sign Up
              </Button>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HowItWorksStudent;
