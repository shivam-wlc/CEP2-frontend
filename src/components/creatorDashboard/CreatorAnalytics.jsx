import { Box, Card, CardContent, CssBaseline, Grid, Typography } from "@mui/material";
import ReactEcharts from "echarts-for-react";
import React from "react";

import { fonts } from "../../utility/fonts";

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
    <>
      <Typography
        variant="h5"
        sx={{
          fontFamily: fonts.poppins,
          fontWeight: "600",
          paddingTop: "1rem",
          marginLeft: "1.5rem",
        }}
      >
        Analytics
      </Typography>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            // marginTop: "60px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                sx={{
                  backgroundColor: "#720361",
                  borderRadius: "1rem",
                  height: "340px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: "white", fontWeight: "600" }}>
                    Video Engagement
                  </Typography>
                  <ReactEcharts
                    option={{
                      xAxis: {
                        type: "category",
                        data: data.map((item) => item.name),
                        axisLine: { lineStyle: { color: "#ffffffd" } },
                        axisTick: { show: false },
                        axisLabel: { color: "#ffffff" },
                      },
                      yAxis: {
                        type: "value",
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { color: "#ffffff" },
                        splitLine: {
                          show: true,
                          lineStyle: {
                            type: "dashed",
                            color: "#886d6d9f",
                          },
                        },
                      },
                      tooltip: { trigger: "axis" },
                      legend: {
                        data: [
                          {
                            name: "Likes",
                            icon: "circle",
                            itemStyle: { color: "#FF5B8F" },
                          },
                          {
                            name: "Comments",
                            icon: "circle",
                            itemStyle: { color: "#FD8C0C" },
                          },
                        ],
                        top: "5%",
                        right: "10%",
                      },
                      series: [
                        {
                          name: "Likes",
                          type: "line",
                          data: data.map((item) => item.likes),
                          smooth: true,
                          lineStyle: {
                            width: 4,
                            color: "#FF5B8F",
                          },
                          areaStyle: {
                            color: {
                              type: "linear",
                              x: 0,
                              y: 0,
                              x2: 0,
                              y2: 1,
                              colorStops: [
                                { offset: 0, color: "#EE469F" },
                                { offset: 1, color: "#ee46a03f" },
                              ],
                            },
                          },
                        },
                        {
                          name: "Comments",
                          type: "line",
                          data: data.map((item) => item.comments),
                          smooth: true,
                          lineStyle: {
                            width: 4,
                            color: "#FD8C0C",
                          },
                          areaStyle: {
                            color: {
                              type: "linear",
                              x: 0,
                              y: 0,
                              x2: 0,
                              y2: 1,
                              colorStops: [
                                { offset: 0, color: "#FD8C0C" },
                                { offset: 1, color: "#fd8c0c14" },
                              ],
                            },
                          },
                        },
                      ],
                    }}
                    style={{
                      height: "300px",
                      backgroundImage: "url('/path/to/your/image.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: "1rem", height: "340px" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "600" }}>
                    User Demographics
                  </Typography>
                  <ReactEcharts
                    option={{
                      xAxis: {
                        type: "category",
                        data: userData.map((item) => item.country),
                        axisLine: { lineStyle: { color: "#ccc" } },
                        axisTick: { show: false },
                        axisLabel: { color: "#666" },
                      },
                      yAxis: {
                        type: "value",
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { color: "#666" },
                        splitLine: {
                          show: true,
                          lineStyle: {
                            type: "dashed",
                            color: "#ccc",
                          },
                        },
                      },
                      tooltip: { trigger: "axis" },
                      series: [
                        {
                          name: "Users",
                          type: "bar",
                          data: userData.map((item) => item.users),
                          barWidth: "40%",
                          itemStyle: {
                            color: {
                              type: "linear",
                              x: 0,
                              y: 1,
                              x2: 0,
                              y2: 0,
                              colorStops: [
                                { offset: 0, color: "#BF2F7500" },
                                { offset: 1, color: "#BF2F75" },
                              ],
                            },
                            borderRadius: [10, 10, 0, 0],
                          },
                        },
                      ],
                    }}
                    style={{ height: "300px" }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: "1rem", height: "340px" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: "600" }}>
                      Audience Demographics
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "12px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            border: "2px solid #FF8A00",
                            marginRight: "6px",
                            backgroundColor: "transparent",
                          }}
                        />
                        <Typography variant="body2">Male</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            border: "2px solid #BC2876",
                            marginRight: "6px",
                            backgroundColor: "transparent",
                          }}
                        />
                        <Typography variant="body2">Female</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <ReactEcharts
                    option={{
                      xAxis: {
                        type: "category",
                        data: demographicsData.map((item) => item.name),
                      },
                      yAxis: { type: "value" },
                      tooltip: { trigger: "axis" },
                      legend: { show: false },
                      series: [
                        {
                          name: "Male",
                          type: "line",
                          data: demographicsData.map((item) => item.male),
                          itemStyle: {
                            color: "#FF8A00",
                          },
                          lineStyle: {
                            color: "#FF8A00",
                            width: 3,
                          },
                        },
                        {
                          name: "Female",
                          type: "line",
                          data: demographicsData.map((item) => item.female),
                          itemStyle: {
                            color: "#BC2876",
                          },
                          lineStyle: {
                            color: "#BC2876",
                            width: 3,
                          },
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
    </>
  );
};

export default CreatorAnalytics;
