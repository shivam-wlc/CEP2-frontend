import { Box, Card, CardContent, CssBaseline, Grid, Typography } from "@mui/material";
import ReactEcharts from "echarts-for-react";
import React from "react";

// Dummy data for charts
const data = [
  { name: "Jan", likes: 2400, comments: 4000 },
  { name: "Feb", likes: 1398, comments: 3000 },
  { name: "Mar", likes: 9800, comments: 2000 },
  { name: "Apr", likes: 3908, comments: 2780 },
  { name: "May", likes: 4800, comments: 1890 },
  { name: "Jun", likes: 3800, comments: 2390 },
  { name: "Jul", likes: 4300, comments: 3490 },
];

const demographicsData = [
  { name: "18-24", male: 4000, female: 2400 },
  { name: "25-34", male: 3000, female: 1398 },
  { name: "35-44", male: 2000, female: 9800 },
  { name: "45-54", male: 2780, female: 3908 },
  { name: "55-64", male: 1890, female: 4800 },
  { name: "65+", male: 2390, female: 3800 },
];

const userData = [
  { country: "USA", users: 1000 },
  { country: "UK", users: 800 },
  { country: "Canada", users: 600 },
  { country: "Australia", users: 400 },
  { country: "Germany", users: 300 },
  { country: "France", users: 200 },
];

const CreatorAnalytics = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginTop: "60px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Video Engagement
                </Typography>
                <ReactEcharts
                  option={{
                    xAxis: {
                      type: "category",
                      data: data.map((item) => item.name),
                    },
                    yAxis: { type: "value" },
                    tooltip: { trigger: "axis" },
                    legend: { data: ["Likes", "Comments"] },
                    series: [
                      {
                        name: "Likes",
                        type: "bar",
                        data: data.map((item) => item.likes),
                      },
                      {
                        name: "Comments",
                        type: "bar",
                        data: data.map((item) => item.comments),
                      },
                    ],
                  }}
                  style={{ height: "300px" }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Audience Demographics
                </Typography>
                <ReactEcharts
                  option={{
                    xAxis: {
                      type: "category",
                      data: demographicsData.map((item) => item.name),
                    },
                    yAxis: { type: "value" },
                    tooltip: { trigger: "axis" },
                    legend: { data: ["Male", "Female"] },
                    series: [
                      {
                        name: "Male",
                        type: "line",
                        data: demographicsData.map((item) => item.male),
                      },
                      {
                        name: "Female",
                        type: "line",
                        data: demographicsData.map((item) => item.female),
                      },
                    ],
                  }}
                  style={{ height: "300px" }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Demographics
                </Typography>
                <ReactEcharts
                  option={{
                    xAxis: {
                      type: "category",
                      data: userData.map((item) => item.country),
                    },
                    yAxis: { type: "value" },
                    tooltip: { trigger: "axis" },
                    series: [
                      {
                        name: "Users",
                        type: "bar",
                        data: userData.map((item) => item.users),
                      },
                    ],
                  }}
                  style={{ height: "300px" }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreatorAnalytics;
