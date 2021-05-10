import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTrail, animated } from "react-spring";
import { useHistory } from "react-router-dom";
import { PageWrapper } from "../SharedStyles";
import NumOne from "../../res/images/one.png";
import NumTwo from "../../res/images/two.png";
import NumThree from "../../res/images/three.png";
import NumFour from "../../res/images/four.png";
import NumFive from "../../res/images/five.png";
import NumSix from "../../res/images/six.png";
import NumSeven from "../../res/images/seven.png";
import NumEight from "../../res/images/eight.png";
import NumNine from "../../res/images/nine.png";
import NumTen from "../../res/images/ten.png";
import PostGraduate from "../../res/images/post_graduate.png";
import HighSchool from "../../res/images/high_school.png";
import ElementarySchool from "../../res/images/elementary_school.png";

const Results = () => {
  const history = useHistory();
  const classificationResults = useSelector(
    (state) => state.Results.classificationResults
  );

  console.log("classificationResults = ", classificationResults);

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
      case 5:
        return NumSix;
      case 6:
        return NumSeven;
      case 7:
        return NumEight;
      case 8:
        return NumNine;
      case 9:
        return NumTen;
      default:
        return NumOne;
    }
  };
  const eduIcon = (level) => {
    switch (level) {
      case "Undergraduate":
        return PostGraduate;
      case "High School":
      case "Middle School":
        return HighSchool;
      case "Elementary School":
        return ElementarySchool;
      default:
        return HighSchool;
    }
  };
  const topBorderColor = (level) => {
    switch (level) {
      case "Undergraduate":
        return "red";
      case "High School":
        return "#2867B2";
      case "Middle School":
        return "orange";
      case "Elementary School":
        return "green";
      default:
        return "yellow";
    }
  };

  const indexToLevel = (index) => {
    switch(index){
      case 0:
        return "Elementary School"
      case 1:
        return "Middle School"
      case 2:
        return "High School"
      case 3:
        return "Undergraduate"
      default:
        return "Unknown"
    }
  }

  const sortByIndices = (array) => {
    for (let i = 0; i < array.length; i++) {
      array[i] = [array[i], i];
    }
    array.sort(function(left, right) {
      return left[0] > right[0] ? -1 : 1;
    });

    array.sortIndices = [];
    for (let j = 0; j < array.length; j++) {
      array.sortIndices.push(indexToLevel(array[j][1]));
      array[j] = array[j][0];
    }
    return array;
  }

  const trail = useTrail(classificationResults.length, {
    from: { opacity: 0, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 40, friction: 6, clamp: true },
  });

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
          const { name, level, percentages } = classificationResults[index];
          const sortedPercentages = sortByIndices([...percentages])
          return (
            <ResultCard
              style={animation}
              key={index}
              category={topBorderColor(level)}
            >
              <Number>
                <img src={numIcon(index)} alt="edu level" />
              </Number>
              <TextGroup style={{paddingLeft: 30, paddingRight: 30, marginBottom: 20}}>
                <p>{name}</p>
              </TextGroup>
              <TextGroup>
                <img src={eduIcon(level)} alt="edu level" />
              </TextGroup>
              <ConfidenceGroup>
                {sortedPercentages.map((percentage, i) => {
                  return (
                  <ConfidenceItem key={i}>
                    <p>{sortedPercentages.sortIndices[i]}</p>
                    <p>{percentage}% confidence</p>
                  </ConfidenceItem>
                  )
                })}
              </ConfidenceGroup>
            </ResultCard>
          );
        })}
      </ResultWrapper>
      <BackButton onClick={() => history.push("/")}>
        Scan more documents
      </BackButton>
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
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`;

const ConfidenceGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-top: 10px;
  & > * {
    margin-bottom: 5px;
    color: #8F8F8F;
    &:nth-child(1){
        color: #FFFFFF;
    }
  }
`

const ConfidenceItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  p {
    font-size: 14px;
  }
`

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  color: #FFFFFF;
  background-color: #E04873;

`

const Number = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

export default Results;
