import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Headers from "../../components/Headers";
import { selectToken } from "../../redux/slices/authSlice";
import { getCareerInfo, selectOnet } from "../../redux/slices/onetSlice";
import { colors } from "../../utility/color";
import { fonts } from "../../utility/fonts";

const styles = {
  sectionHeading: {
    color: "#252323",
    fontSize: "30px",
    marginBottom: "20px",
    fontFamily: fonts.authPage,
    fontWeight: 600,
  },
  sectionSubHeading: {
    color: "#70798C",
    fontFamily: fonts.ntr,
    fontWeight: 500,
    fontSize: "20px",
  },
  text: {
    fontFamily: fonts.sans,
    fontSize: "16px",
    color: colors.lightGray,
    paddingLeft: "10px",
  },
  // test
  heading: {
    fontFamily: fonts.sans,
    fontSize: "21px",
    fontWeight: "600",
    color: "#252323",
    marginBottom: "5px",
  },
  subHeading: {
    fontFamily: fonts.poppins,
    fontSize: "18px",
    fontWeight: "400",
    color: "#A99985",
  },
  boxes: {
    // border: '1px solid black',
    minHeight: "100%",
    width: "25%",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    padding: "1rem",
    borderRadius: "5px",
  },
};

export default function CareerInfo() {
  const location = useLocation();
  const onet = useSelector(selectOnet);
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);
  const dispatchToRedux = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const careerCode = queryParams.get("careercode");
    if (careerCode) {
      setLoading(true);
      (async () => {
        await dispatchToRedux(getCareerInfo({ careercode: careerCode, topic: "report", token }));
        setLoading(false);
      })();
    }
  }, [location.search]);

  return (
    <>
      <Headers />
      <Container maxWidth="lg" sx={{ padding: "2rem" }}>
        <Box>
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box>
            <Typography
              sx={{
                fontFamily: fonts.sans,
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {onet.careerInfo?.career.title}
            </Typography>
            <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
              <span style={{ color: "#0C6DFD", fontSize: "16px" }}>Also Called: </span>
              {onet.careerInfo?.career.also_called?.title.join(", ")}
            </Typography>
            {/*  */}
            <Box
              sx={{
                ...styles.text,
                display: "flex",
                flexDirection: "column",
                marginTop: "2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography sx={styles.heading}>What they do:</Typography>
                <Typography sx={styles.text}>{onet.careerInfo?.career.what_they_do}</Typography>

                <Typography sx={{ ...styles.heading, marginTop: "1rem" }}> On the job, you would:</Typography>
                <ul style={{ lineHeight: "1.5rem" }}>
                  {onet.careerInfo?.career.on_the_job.task.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginTop: "5rem",
              }}
            >
              {/* Knowledge Box */}
              <Box
                sx={{
                  ...styles.boxes,
                  flexBasis: "100%",
                  marginBottom: "2rem",
                }}
              >
                <Typography
                  sx={{
                    ...styles.heading,

                    color: "#570088",
                  }}
                >
                  KNOWLEDGE
                </Typography>
                {onet.careerInfo?.knowledge.group.map((el, i) => (
                  <ul key={i}>
                    <Typography
                      sx={{
                        ...styles.heading,
                        fontSize: "18px",
                        color: "#570088",
                        marginLeft: "1rem",
                      }}
                    >
                      {el.title.name}
                    </Typography>
                    {el.element.map((item, ind) => (
                      <li
                        style={{
                          ...styles.text,
                          marginLeft: "3rem",
                          textTransform: "capitalize",
                        }}
                        key={ind}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ))}
              </Box>

              {/* Skills Box */}
              <Box
                sx={{
                  ...styles.boxes,
                  flexBasis: "100%",
                  marginBottom: "2rem",
                }}
              >
                <Typography sx={{ ...styles.heading, color: "#B23800" }}>SKILLS</Typography>
                {onet.careerInfo?.skills.group.map((el, i) => (
                  <ul key={i}>
                    <Typography
                      sx={{
                        ...styles.heading,
                        fontSize: "18px",
                        color: "#B23800",
                        marginLeft: "1rem",
                      }}
                    >
                      {el.title.name}
                    </Typography>
                    {el.element.map((item, ind) => (
                      <li
                        style={{
                          ...styles.text,
                          marginLeft: "3rem",
                          textTransform: "capitalize",
                        }}
                        key={ind}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ))}
              </Box>

              {/* Abilities Box */}
              <Box
                sx={{
                  ...styles.boxes,
                  flexBasis: "100%",
                  marginBottom: "2rem",
                }}
              >
                <Typography sx={{ ...styles.heading, color: "#074597" }}>ABILITIES</Typography>
                {onet.careerInfo?.abilities.group.map((el, i) => (
                  <ul key={i}>
                    <Typography
                      sx={{
                        ...styles.heading,
                        fontSize: "18px",
                        color: "#074597",
                        marginLeft: "1rem",
                      }}
                    >
                      {el.title.name}
                    </Typography>
                    {el.element.map((item, ind) => (
                      <li
                        style={{
                          ...styles.text,
                          marginLeft: "3rem",
                          textTransform: "capitalize",
                        }}
                        key={ind}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ))}
              </Box>

              {/* Personality Box */}
              <Box
                sx={{
                  ...styles.boxes,
                  flexBasis: "100%",
                  marginBottom: "2rem",
                }}
              >
                <Typography sx={{ ...styles.heading, color: "#9D3781" }}>PERSONALITY</Typography>
                <Typography style={styles.text}>
                  {onet.careerInfo?.personality.top_interest.description}
                </Typography>
                <ul>
                  <Typography sx={{ fontWeight: "600", ...styles.text }}>
                    They do well at jobs that need:
                  </Typography>
                  {onet.careerInfo?.personality.work_styles.element.map((el, i) => (
                    <li
                      key={i}
                      style={{
                        ...styles.text,
                        marginLeft: "3rem",
                        textTransform: "capitalize",
                      }}
                    >
                      <span style={{ color: "#9D3781" }}>{el.name}</span>
                    </li>
                  ))}
                </ul>
              </Box>

              {/* Technology Box */}
              <Box
                sx={{
                  ...styles.boxes,
                  flexBasis: "100%",
                  marginBottom: "2rem",
                }}
              >
                <Typography sx={{ ...styles.heading, color: "#78AA68" }}>TECHNOLOGY</Typography>
                {/* Add text and list items for Technology box */}
                <Typography style={styles.text}>You might use software like this on the job:</Typography>
                {onet.careerInfo?.technology.category.map((el, i) => (
                  <ul key={i}>
                    <Typography
                      sx={{
                        ...styles.heading,
                        fontSize: "18px",
                        color: "#78AA68",
                        marginLeft: "1rem",
                      }}
                    >
                      {el.title.name}
                    </Typography>
                    {el.example.map((item, ind) => (
                      <li
                        style={{
                          ...styles.text,
                          marginLeft: "3rem",
                          textTransform: "capitalize",
                        }}
                        key={ind}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
