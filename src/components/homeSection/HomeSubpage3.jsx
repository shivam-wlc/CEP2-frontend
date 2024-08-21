import React from "react";
import { Box, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const HomeSubpage3 = () => {
  const Services1 = [
    {
      title: "Marketing trends",
      description: "Stay up-to-date with the latest insights",
    },
    {
      title: "Content strategy",
      description: "Plan and execute effective content marketing",
    },
    {
      title: "Social media marketing",
      description: "Engage and grow your social audience",
    },
    {
      title: "SEO optimization",
      description: "Improve your search engine visibility",
    },
  ];

  const Services2 = [
    {
      title: "Email marketing",
      description: "Nurture leads and drive conversions",
    },
    { title: "Branding", description: "Develop a strong brand identity" },
    { title: "Case studies", description: "Browse latest insights" },
  ];

  const blog = [
    {
      title: "The Future of Marketing: Predictions for the Next 5 Years",
      imageUrl: "https://source.unsplash.com/random/1",
    },
    {
      title: "Crafting a Killer Content Strategy: Tips and Tricks for Success",
      imageUrl: "https://source.unsplash.com/random/2",
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", padding: "5% 0%" }}>
        <Box
          sx={{
            display: "flex",
            paddingLeft: "5%",
            paddingRight: "2%",
            width: "50%",
          }}
        >
          <Box>
            {Services1.map((el, i) => (
              <Box
                key={`service1-${i}`}
                sx={{
                  display: "flex",
                  width: "275px",
                  padding: "10px",
                  height: "75px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#076c7e",
                    height: "25px",
                    borderRadius: "20px",
                    color: "white",
                    marginRight: "20px",
                  }}
                >
                  <ChevronRightIcon />
                </Box>

                <Box>
                  <Typography variant="h6">{el.title}</Typography>
                  <Typography variant="body1">{el.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box>
            {Services2.map((el, i) => (
              <Box
                key={`service2-${i}`}
                sx={{
                  display: "flex",
                  width: "275px",
                  padding: "10px",
                  height: "75px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#076c7e",
                    height: "25px",
                    borderRadius: "20px",
                    color: "white",
                    marginRight: "20px",
                  }}
                >
                  <ChevronRightIcon />
                </Box>

                <Box>
                  <Typography variant="h6">{el.title}</Typography>
                  <Typography variant="body1">{el.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <hr />
        <Box sx={{ paddingLeft: "5%", paddingRight: "10%" }}>
          <Typography variant="h5">From the Blog</Typography>
          <br />
          <Box>
            {blog.map((ele, i) => (
              <Box key={`blog-${i}`} sx={{ display: "flex" }}>
                <Box>
                  <img
                    src={ele.imageUrl}
                    width={"200px"}
                    height={"130px"}
                    style={{
                      borderRadius: "15px",
                      margin: "5px 15px 5px 0px",
                    }}
                    alt="no image"
                  />
                </Box>

                <Box sx={{ padding: "20px 0px", lineHeight: "1.5" }}>
                  <Typography variant="body1">{ele.title}</Typography>
                  <br />
                  <a href="#" style={{ color: "black" }}>
                    Read More &gt;
                  </a>
                </Box>
              </Box>
            ))}
          </Box>
          <br />
          <a href="#" style={{ color: "black" }}>
            Browse all articles &gt;
          </a>
        </Box>
      </Box>
    </>
  );
};

export default HomeSubpage3;
