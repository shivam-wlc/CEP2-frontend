import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import { Logo, pdfPhoto, GoldFish } from "../../assets/assest.js";

const Styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    padding: "20px",
  },
  heading: {
    fontWeight: 100,
    textAlign: "center",
    fontSize: "18px",
    marginTop: "25px",
  },
  image: {
    width: "100px",
  },
  sectionSubHeading2: {
    color: "#70798C",
    fontWeight: 500,
    fontSize: "10px",
    textAlign: "center",
    marginBottom: "20px",
  },
  cardheading: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#252323",
  },
  subHeading: {
    fontSize: "10px",
    fontWeight: "400",
    color: "#A99985",
  },
  text: {
    fontSize: "9.5px",
    lineHeight: "1.7px",
  },
  card: {
    marginBottom: "25px",
    padding: "10px 25px",
  },
  careerContainer: {
    marginTop: "25px",
    fontSize: "9.5px",
  },
  careerOptions: {
    fontSize: "9.5px",
    marginTop: "2px",
    marginBottom: "2px",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#70798C",
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 20,
    fontSize: 10,
    color: "#70798C",
  },
  firstPage: {
    flexDirection: "row",
    alignItems: "stretch", // Ensures items stretch to fit vertically
  },
  pdfImage: {
    width: "60%", // Adjust as needed
    alignSelf: "stretch", // Stretch image to fill its container vertically
  },
  textContainer: {
    marginLeft: "5%", // Adjust spacing between image and text
    flex: 1, // Takes remaining space
    justifyContent: "center", // Center text vertically
  },
  confidentialText: {
    fontSize: "18px",
    fontWeight: "800",
    // marginTop: "-55px",
  },
  reportText: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  nameText: {
    fontSize: "12px",
  },
  aboutReport: {
    marginTop: "10px", // Adjust as needed
    fontSize: "14px",
    textAlign: "justify",
    marginBottom: "10px",
    padding: "0 20px", // Adjust padding as needed
  },
  secondPage: {
    marginTop: "240px",
    marginBottom: "100px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  thirdPage: {
    padding: "10px",
    marginTop: "250px",
  },
  // New Styles for result cards
  resultCard: {
    marginBottom: 25,
    padding: 10,
    flexDirection: "row", // Arrange items horizontally
    alignItems: "flex-start", // Align items to the top
  },
  areaHeading: {
    fontSize: 12,
    fontWeight: "bold",
    color: "green", // Green color for area heading
    marginBottom: 5,
  },
  descriptionContainer: {
    width: "65%", // Left side container width
    paddingRight: 10, // Right padding for separation
  },
  descriptionText: {
    fontSize: 9.5,
    lineHeight: 1.7,
  },
  scoreContainer: {
    width: "35%", // Right side container width
    border: "1px solid green", // Green border
    padding: 5,
    textAlign: "center",
  },
  scoreText: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "green", // Green color for score text
  },
  careerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "150px",
  },
  careerBox: {
    width: "25%", // Each box takes 25% of the container (4 boxes per row)
    marginBottom: 20,
    padding: 10,
    border: "1px solid #ccc", // Example border
  },
  careerTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontWeight: "bold",
  },
  bestFitText: {
    fontSize: 8,
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "gray",
  },
  fourthPage: {
    marginTop: "250px",
  },
  tableContainer: {
    marginTop: "20px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontSize: 10,
    padding: 5,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 8,
    padding: 5,
    textAlign: "left",
  },
  imageCell: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  pathwaysContainer: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
  },
  pathwaysHeading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: "10px",
  },
  pathwaysText: {
    fontSize: 9.5,
    marginBottom: "5px",
    textAlign: "justify",
  },
  section: {
    marginTop: "150px",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: "100px",
    fontWeight: "bold",
    textAlign: "center",
  },
  alsoCalled: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
  },
  whatTheyDo: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: "20px",
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: "20px",
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
  listItem: {
    marginLeft: 10,
    fontSize: 12,
  },
  bulletPoint: {
    flexDirection: "row",
  },
  bullet: {
    fontSize: 12,
    marginRight: 5,
  },
  bulletText: {
    fontSize: 12,
  },
  knowledge: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: "20px",
    color: "blue",
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: "20px",
  },
  graph: {
    marginTop: "100px",
    marginBottom: "100px",
  },
});

function getCurrentDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (zero-based) and pad with leading zero if necessary
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`;
}

const PDFResult = ({
  resultData,
  userName,
  detailedCareerData,
  // graphImage,
  chart,
}) => {
  const careers = resultData?.jobSuggestionBasedOnResult;
  const result = resultData?.result;
  const data = detailedCareerData?.map((d) => ({ careerDescription: d })) || [];
  const generatedDate = getCurrentDate();

  let graph = null;
  if (chart) {
    graph = chart;
  }
  return (
    <Document>
      <Page size="A4" style={Styles.page}>
        <View>
          <Image style={Styles.image} src={Logo} />
        </View>
        <View style={Styles.firstPage}>
          <Image style={Styles.pdfImage} src={pdfPhoto} />
          <View style={Styles.textContainer}>
            <Text style={Styles.confidentialText}>Confidential</Text>
            <Text style={Styles.reportText}>Career Direction Report</Text>
            <Text style={Styles.nameText}>{userName}</Text>
            <Text style={Styles.nameText}>Generated: {generatedDate}</Text>
          </View>
        </View>

        {/* cheart  */}

        <View style={Styles.secondPage}>
          <Text style={{ ...Styles.heading, fontWeight: "bold" }}>
            About This Report
          </Text>
          <Text style={Styles.aboutReport}>
            About this Report The Career Directions Report is derived from well
            tested and proven methodologies that analyze an individuals’
            interests using six domains – Realistic, Conventional, Enterprising,
            Social, Artistic and Investigative. We call these Interest Spheres
            and a short explanation of each one is shown later.
          </Text>
          <Text style={Styles.aboutReport}>
            We all have unique personalities and interests that come together to
            define who we are. The weight of influence of each of these Interest
            Spheres is different for each one of us and how they combine gives
            us insights on the career choices we can make.
          </Text>

          <Text style={Styles.aboutReport}>
            Our predictive algorithms use the responses that you have given to
            present to you different job profiles that you should investigate
            further and consider for your future. Remember your future is in
            your hands to craft as you choose. Initial choices will no doubt be
            refined as you explore the opportunities that are right for you.
          </Text>

          <Text style={Styles.aboutReport}>
            Share the findings of this report with your friends and family and
            get them to help you assess and fine-tune your career ideas so you
            can visualize the best future for you.
          </Text>
          <Text style={Styles.aboutReport}>
            The world of work is moving at a tremendous pace. We encourage you
            to use the resources on the CareerExplorer.me platform to navigate
            in the direction that is best for you.
          </Text>
          <Text style={Styles.aboutReport}>
            “The future depends on what you do today.” —Mahatma Gandhi
          </Text>
        </View>
        <View style={Styles.thirdPage}>
          <Text style={{ ...Styles.aboutReport, marginTop: "10px" }}>
            {userName}, this is your Interests Profile Graph derived from your
            responses from the Interest Profiler Assessment. Core elements that
            make up who you are always remain, but as your experiences grow some
            of your interests become more or less pronounced on the graph. Your
            initial focus should be on the combination of your top 3 Interest
            Spheres.
          </Text>

          <Image style={Styles.graph} src={graph} />
          {/* <Image style={Styles.graph} src={{ uri: chart }} /> */}

          {/* <Image style={Styles.graph} source={graph} /> */}
        </View>
        {/* <View>
          {result.map((r, i) => {
            return (
              <View key={i} style={Styles.card}>
                <Text style={Styles.cardheading}>
                  Interest Sphere: {r.area}
                </Text>
                <Text style={Styles.subHeading}>Score: {r.score}</Text>
                <Text style={Styles.text}>{r.description}</Text>
              </View>
            );
          })}
        </View> */}
        <View>
          {result.map((r, i) => (
            <View key={i} style={Styles.resultCard}>
              <View style={Styles.descriptionContainer}>
                <Text style={Styles.areaHeading}>
                  Interest Sphere: {r.area}
                </Text>
                <Text style={Styles.descriptionText}>{r.description}</Text>
              </View>
              <View style={Styles.scoreContainer}>
                <Text style={Styles.scoreText}>Score: {r.score}</Text>
              </View>
            </View>
          ))}
        </View>
        <View>
          <Text style={Styles.heading}> Which career? </Text>
          <Text style={Styles.aboutReport}>
            {userName}, below you will see the different occupations that we
            would recommend you consider. Where there is a ‘Best fit’ this
            represents what most closely matches with your interests and your
            educational plans.
          </Text>
          <Text style={Styles.aboutReport}>
            You should not consider this as a closed or restricted list of
            occupations. This is your starting point to use to investigate and
            dig down to find the right space for you. As you progress your
            education, experiences and the opportunities that become available
            to you influence your career choices. Be open to change and seek
            help and assistance form your counsellors and friends and family to
            make your best choices.
          </Text>
        </View>

        <View style={Styles.careerGrid}>
          {careers.map((c, i) => (
            <View key={i} style={Styles.careerBox}>
              <Text style={Styles.careerTitle}>{c.title}</Text>
              <Text style={Styles.bestFitText}>{c.fit}</Text>
            </View>
          ))}
        </View>

        <View style={Styles.fourthPage}>
          <Text style={Styles.heading}>What next?</Text>
          <Text style={Styles.aboutReport}>
            Our analysis has identified the occupations and careers that you
            should investigate further. To best understand what these careers
            involve, we recommend a 3-step plan for you to work through:
          </Text>
        </View>

        {/* table */}
        <View>
          <View style={Styles.tableContainer}>
            {/* Network */}
            <View style={Styles.tableRow}>
              <Text style={Styles.tableCell}>Network</Text>
              <Text style={Styles.tableCell}>
                Speak to people you know in those fields. Ask them about their
                career journeys, what they studied and how they got to their
                current job. What their aspirations are going forward. What
                challenges they see on the horizon. Of course, ask for their
                guidance on opportunities they can recommend in the field.
              </Text>
              <View style={{ ...Styles.tableCell, ...Styles.imageCell }}>
                <Image
                  src={GoldFish}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
            {/* Upskill */}
            <View style={Styles.tableRow}>
              <Text style={Styles.tableCell}>Upskill</Text>
              <Text style={Styles.tableCell}>
                Register for and complete some micro-credential or certification
                programmes online in the fields that interest you most and are
                aligned to your selected career. CareerExporer.me has created
                the ‘Opportunity’ section on its platform for you to see options
                to build knowledge and skills.
              </Text>
              <View style={{ ...Styles.tableCell, ...Styles.imageCell }}>
                <Image
                  src={GoldFish}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
            {/* Build Experiences */}
            <View style={Styles.tableRow}>
              <Text style={Styles.tableCell}>Build Experiences</Text>
              <Text style={Styles.tableCell}>
                Look into getting some work experience in your chosen fields.
                This can come in the form of holiday jobs, remote work projects,
                virtual internships or apprenticeships.
              </Text>
              <View style={{ ...Styles.tableCell, ...Styles.imageCell }}>
                <Image
                  src={GoldFish}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
          </View>
        </View>
        <View>
          {/* Career Pathways View */}
          <View style={Styles.pathwaysContainer}>
            <Text style={Styles.pathwaysHeading}>Career Pathways</Text>
            <Text style={Styles.pathwaysText}>
              For each occupation that has been recommended for you there are 6
              information sections that you should read and make notes on what
              you like or don’t like:
            </Text>
            <Text style={Styles.pathwaysText}>
              1) What people in these jobs do
            </Text>
            <Text style={Styles.pathwaysText}>2) Knowledge required</Text>
            <Text style={Styles.pathwaysText}>3) Skills required</Text>
            <Text style={Styles.pathwaysText}>4) Abilities</Text>
            <Text style={Styles.pathwaysText}>5) Personality type</Text>
            <Text style={Styles.pathwaysText}>6) Technology competence</Text>
            <Text style={Styles.pathwaysText}>
              {userName} please use this as the starting point on your career
              discovery and planning process. Good luck!
            </Text>
          </View>
        </View>

        {/* detailed Report  */}
        <View style={Styles.section}>
          <Text style={Styles.title}>Detailed Report</Text>
          {data.map((career, i) => (
            <View key={i}>
              <Text style={Styles.title}>
                {career.careerDescription.career.title}
              </Text>
              <Text style={Styles.alsoCalled}>
                Also Called:{" "}
                {career.careerDescription.career.also_called?.title.join(", ")}
              </Text>
              <Text style={Styles.whatTheyDo}>What They Do:</Text>
              <Text style={Styles.text}>
                {career.careerDescription.career.what_they_do}
              </Text>
              <Text style={Styles.whatTheyDo}>On the job, you would</Text>
              {career.careerDescription.career.on_the_job.task.map(
                (task, index) => {
                  return (
                    <View style={Styles.bulletPoint} key={index}>
                      <Text style={Styles.bullet}>•</Text>
                      <Text style={Styles.bulletText}>{task}</Text>
                    </View>
                  );
                }
              )}
              {/* knowledge  */}
              <Text style={Styles.knowledge}>Knowledge</Text>
              {career.careerDescription?.knowledge?.group?.map(
                (group, index) => (
                  <View key={index}>
                    <Text style={Styles.groupTitle}>{group.title.name}</Text>
                    {group.element.map((element, i) => (
                      <Text key={i} style={Styles.text}>
                        • {element.name}
                      </Text>
                    ))}
                  </View>
                )
              )}
              {/* skills  */}
              <Text style={Styles.knowledge}>Skills</Text>
              {career.careerDescription?.skills?.group?.map((group, index) => (
                <View key={index}>
                  <Text style={Styles.groupTitle}>{group.title.name}</Text>
                  {group.element.map((element, i) => (
                    <Text key={i} style={Styles.text}>
                      • {element.name}
                    </Text>
                  ))}
                </View>
              ))}
              {/* abilities  */}
              <Text style={Styles.knowledge}>Abilities</Text>
              {career.careerDescription?.abilities?.group?.map(
                (group, index) => (
                  <View key={index}>
                    <Text style={Styles.groupTitle}>{group.title.name}</Text>
                    {group.element.map((element, i) => (
                      <Text key={i} style={Styles.text}>
                        • {element.name}
                      </Text>
                    ))}
                  </View>
                )
              )}
              {/* Personality type  */}
              <Text style={Styles.knowledge}>Personality</Text>
              <View>
                <Text style={Styles.groupTitle}>
                  {
                    career.careerDescription.personality.top_interest
                      .description
                  }
                </Text>
                {career.careerDescription?.personality?.work_styles?.element?.map(
                  (element, i) => (
                    <Text key={i} style={Styles.text}>
                      • {element.name}
                    </Text>
                  )
                )}
              </View>
              {/* Technology competence  */}

              <View style={Styles.section}>
                <Text style={Styles.knowledge}>Technology Competence</Text>
                {career.careerDescription.technology.category.map(
                  (category, index) => (
                    <View key={index}>
                      <Text style={Styles.groupTitle}>
                        {category.title.name}
                      </Text>
                      {category.example.map((example, i) => (
                        <Text key={i} style={Styles.text}>
                          • {example.name}{" "}
                          {example.hot_technology
                            ? `(Hot Technology: ${example.hot_technology})`
                            : ""}
                        </Text>
                      ))}
                    </View>
                  )
                )}
              </View>
            </View>
          ))}
        </View>

        {/* footer  */}
        <Text style={Styles.footer}>careerexplorer.com</Text>
        <Text
          style={Styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PDFResult;
