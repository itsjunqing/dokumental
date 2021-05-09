import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';

import { PageWrapper } from "../SharedStyles";
import DropZone from "../../components/DropZone";
import InfoBar from "./InfoBar";
import ErrorModal from "../../components/Modal/ErrorModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import * as actHome from "./ac-Home";

const Home = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const isToastVisible = useSelector((state) => state.Home.isToastVisible);
  const { addToast } = useToasts();

  useEffect(() => {
    if(isToastVisible){
      addToast("Failed to upload documents, please try again", {
        appearance: 'error',
        autoDismiss: true,
      })
      dispatch(actHome.handleState("isToastVisible", false));
    }
  }, [isToastVisible])

  const toggleModal = (property, msgProp, msg = "") => {
    dispatch(actHome.toggleModal(property, msgProp, msg));
  };
  const submitDocuments = () => {
    dispatch(actHome.sendDocuments(history));
  };

  return (
    <PageWrapper>
      <ErrorModal
        title="Error"
        property="isErrorVisible"
        messageProp="errorMsg"
        onClose={() => toggleModal("isErrorVisible")}
      />
      <ConfirmModal
        screen="Home"
        visibleProp="isConfirmVisible"
        messageProp="confirmMsg"
        loadingProp="isLoading"
        title="Confirm Action"
        onClose={() => toggleModal("isConfirmVisible")}
        onOk={submitDocuments}
      />
      <div>
        <h1>Predict Document Readability</h1>
        <p>
          Determine how readable your documents are with the help of our
          advanced classifier
        </p>
      </div>
      <DropZone
        toggleErrorModal={(msg) =>
          toggleModal("isErrorVisible", "errorMsg", msg)
        }
        toggleConfirmModal={(msg) =>
          toggleModal("isConfirmVisible", "confirmMsg", msg)
        }
      />
      <InfoBar />
    </PageWrapper>
  );
};

export default Home;
