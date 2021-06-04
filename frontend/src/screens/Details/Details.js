import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";

const Details = () => {
  return (
    <PageWrapper>
      <VideoWrapper>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ana49FQ94RA"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </VideoWrapper>
    </PageWrapper>
  );
};

const VideoWrapper = styled.div`
  height: 500px;
  width: 100%;
`;

export default Details;
