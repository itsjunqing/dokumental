import React from "react";
import styled from "styled-components";
import InfoImg1 from "../../res/images/upload.png";
import InfoImg2 from "../../res/images/classification.png";
import InfoImg3 from "../../res/images/grade.png";

const InfoBar = () => {
  return (
    <InfoWrapper>
      <InfoCard>
        <InfoLogoFrame>
          <InfoLogo src={InfoImg1} alt="upload" />
        </InfoLogoFrame>
        Upload your text files to analyze
      </InfoCard>
      <InfoCard>
        <InfoLogoFrame>
          <InfoLogo src={InfoImg2} alt="classification" />
        </InfoLogoFrame>
        Wait for our classifier to do its magic
      </InfoCard>
      <InfoCard>
        <InfoLogoFrame>
          <InfoLogo src={InfoImg3} alt="grade" />
        </InfoLogoFrame>
        View the results of our prediction
      </InfoCard>
    </InfoWrapper>
  );
};

const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 150px;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 10px;
  }
`;

const InfoLogo = styled.img`
  width: 60%;
  height: 60%;
`;

const InfoLogoFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
`;

export default InfoBar;
