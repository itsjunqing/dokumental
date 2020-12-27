import React from "react";
import { useDispatch } from "react-redux";

import { PageWrapper } from "../SharedStyles";
import DropZone from "../../components/DropZone";
import InfoBar from "./InfoBar";
import ErrorModal from "../../components/Modal/ErrorModal";
import * as actHome from "./ac-Home";

const Home = () => {
  const dispatch = useDispatch();
  const toggleErrorModal = (errMsg = "") => {
    dispatch(actHome.toggleModal("isErrorVisible", errMsg));
  };

  return (
    <PageWrapper>
      <ErrorModal
        title="Error"
        property="isErrorVisible"
        messageProp="errorMsg"
        toggleModal={toggleErrorModal}
      />
      <div>
        <h1>Predict Document Readability</h1>
        <p>
          Determine how readable your documents are with the help of our
          advanced classifier
        </p>
      </div>
      <DropZone toggleErrorModal={toggleErrorModal} />
      <InfoBar />
      Copyright © Alfons Fernaldy
    </PageWrapper>
  );
};

export default Home;
