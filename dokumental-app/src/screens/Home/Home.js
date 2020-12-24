import React from "react";
import { PageWrapper } from "../SharedStyles";
import DropZone from "../../components/DropZone";

const Home = () => {
  return (
    <PageWrapper>
      <h1>Predict Document Readability</h1>
      <p style={{ marginBottom: "2rem" }}>
        Determine how readable your documents are with the help of our advanced
        classifier
      </p>
      <DropZone />
    </PageWrapper>
  );
};

export default Home;
