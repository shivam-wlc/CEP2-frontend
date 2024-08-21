import React from "react";
import { Box, Typography } from "@mui/material";
import ImageIcon1 from "../../assets/icons/H2E1.1.png";
import ImageIcon2 from "../../assets/icons/H2E1.2.png";
import ImageIcon3 from "../../assets/icons/H2E1.3.png";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const HomeSubpage2 = () => {
  const categoriesTitle = [
    "All",
    "Marketing Trends",
    "Content Strategy",
    "Social Media",
    "SEO",
    "Email Marketing",
    "Branding",
    "Case Studies",
  ];

  const imagesUrls = [
    {
      url: ImageIcon1,
      title: "The Future of Marketing: Predictions for the Next 5 Years",
    },
    {
      url: ImageIcon2,
      title: "The Future of Marketing: Predictions for the Next 5 Years",
    },
    {
      url: ImageIcon3,
      title: "Crafting a Killer Content Strategy: Tips and Tricks for Success",
    },
  ];

  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ padding: "3rem" }}>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4">Categories</Typography>
          <Box
            sx={{
              mt: 2,
              width: "30%",
              borderBottom: "2px solid black",
            }}
          />
        </Box>
        <Box
          sx={{
            // border: "2px solid blue",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.2rem",
            padding: "1.5rem",
          }}
        >
          {categoriesTitle.map((title, index) => (
            <Typography
              key={`homesubpage-category-${index}`}
              sx={{
                backgroundColor: "#D8D6D6",
                paddingX: "1.5rem",
                paddingY: "0.3rem",
                borderRadius: 10,
              }}
            >
              {title}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            // border: "5px solid black",
            height: "60vh",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "90%",
            margin: "auto",
          }}
        >
          {imagesUrls.map((card, index) => (
            <Card
              key={`homesubpage2-${index}`}
              sx={{
                width: 360,
                height: 405,
                backgroundColor: "#F4EFEF",
                border: "1px solid black",
                borderRadius: 5,
              }}
            >
              <CardMedia
                sx={{ height: 250 }}
                image={card.url}
                title={card.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {card.title}
                </Typography>
              </CardContent>

              <CardActions
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    // border: "1px solid black",
                    width: "100%",
                    gap: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      // border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      size="small"
                      sx={{ color: "#4E1A3D", fontWeight: "bold" }}
                    >
                      <PersonIcon sx={{ fontSize: "1rem", mr: 1 }} /> by chiaki
                      sato
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      // border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      size="small"
                      sx={{ color: "#364B97", fontWeight: "bold" }}
                    >
                      <LocalOfferIcon sx={{ fontSize: "1rem", mr: 1 }} />
                      case studies
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeSubpage2;
