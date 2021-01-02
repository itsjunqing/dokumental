import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTrail, animated } from "react-spring";
import { PageWrapper } from "../SharedStyles";
import NumOne from "../../res/images/one.png";
import NumTwo from "../../res/images/two.png";
import NumThree from "../../res/images/three.png";
import NumFour from "../../res/images/four.png";
import NumFive from "../../res/images/five.png";
import PostGraduate from "../../res/images/post_graduate.png";
import HighSchool from "../../res/images/high_school.png";
import ElementarySchool from "../../res/images/elementary_school.png";
const classificationResults = [
  {
    id: "1",
    fileName: "post_graduate.txt",
    edu_level: "Postgraduate",
    reader_age: "22+",
  },
  {
    id: "2",
    fileName: "under_graduate.txt",
    edu_level: "Undergraduate",
    reader_age: "19-21",
  },
  {
    id: "3",
    fileName: "high_school.txt",
    edu_level: "High School",
    reader_age: "15-18",
  },
  {
    id: "4",
    fileName: "secondary_school.txt",
    edu_level: "Secondary School",
    reader_age: "14-15",
  },
  {
    id: "5",
    fileName: "elementary_school.txt",
    edu_level: "Elementary School",
    reader_age: "11-13",
  },
];
const Results = () => {
  // const classificationResults = useSelector(
  //   (state) => state.Results.classificationResults
  // );

  const numIcon = (index) => {
    switch (index) {
      case 0:
        return NumOne;
      case 1:
        return NumTwo;
      case 2:
        return NumThree;
      case 3:
        return NumFour;
      case 4:
        return NumFive;
      default:
        return NumOne;
    }
  };
  const eduIcon = (eduCategory) => {
    switch (eduCategory) {
      case "Postgraduate":
        return PostGraduate;
      case "Undergraduate":
      case "High School":
        return HighSchool;
      case "Secondary School":
      case "Elementary School":
        return ElementarySchool;
      default:
        return HighSchool;
    }
  };
  const topBorderColor = (eduCategory) => {
    switch (eduCategory) {
      case "Postgraduate":
        return "red";
      case "Undergraduate":
      case "High School":
        return "orange";
      case "Secondary School":
      case "Elementary School":
        return "green";
      default:
        return "yellow";
    }
  };

  const trail = useTrail(classificationResults.length, {
    from: { opacity: 0, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 40, friction: 6, clamp: true },
  });

  console.log(classificationResults);
  return (
    <PageWrapper>
      <div>
        <h1>Your Results</h1>
        <p>
          Our Classifier has finished analyzing the readability of{" "}
          {classificationResults.length} of your uploaded documents
        </p>
      </div>
      <ResultWrapper>
        {trail.map((animation, index) => {
          const { id, fileName, edu_level, reader_age } = classificationResults[
            index
          ];
          return (
            <ResultCard
              style={animation}
              key={id}
              category={topBorderColor(edu_level)}
            >
              <Number>
                <img src={numIcon(index)} alt="edu level" />
              </Number>
              <TextGroup>
                <img src={eduIcon(edu_level)} alt="edu level" />
              </TextGroup>
              <TextGroup>
                <p>{fileName}</p>
                <p>3000 words</p>
              </TextGroup>
              <hr />
              <TextGroup>
                <p>Reccomended Educational Level</p>
                <strong>{edu_level}</strong>
              </TextGroup>
              <TextGroup>
                <p>Reader's Age</p>
                <strong>{reader_age}</strong>
              </TextGroup>
            </ResultCard>
          );
        })}
      </ResultWrapper>
    </PageWrapper>
  );
};

const ResultWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin: auto;
  & > * {
    margin: 0.5rem;
  }
`;

const ResultCard = styled(animated.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 1rem;
  background: ${({ theme: { colors } }) => colors.elevated};
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  transition: 0.3s;
  border-top: ${(props) => `3px solid ${props.category}`};
  &:hover {
    box-shadow: 13px 13px 4px rgba(0, 0, 0, 0.25);
  }
  & > * {
    margin: 0 0 0.5rem;
  }
`;

const TextGroup = styled.div`
  strong {
    font-size: 16px;
  }
  p {
    font-size: 14px;
  }
`;

const Number = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

export default Results;
