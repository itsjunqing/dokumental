import React from "react";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { withRouter } from "react-router-dom";
import "./Modal.css";

const ConfirmModal = (props) => {
  const {
    property = null,
    onClose = () => {},
    onOk = () => {},
    title = "Title",
    messageProp = null,
  } = props;
  const isOpen = useSelector((state) => state.Home[property]);
  const message = useSelector((state) => state.Home[messageProp]);
  return (
    <ReactModal
      isOpen={isOpen}
      closeTimeoutMS={200}
      ariaHideApp={false}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          color: "white",
          backgroundColor: "rgb(36,39,46)",
          borderRadius: "10px",
          border: "0px solid #24272e",
          margin: "auto",
          width: "60vw",
          maxWidth: "400px",
          maxHeight: "200px",
          padding: "20px 10px 0px",
          boxShadow: "5px 6px 4px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <Header>{title}</Header>
      <Dividor />
      <Body>{message}</Body>
      <Footer>
        <CloseButton onClick={onClose}>Cancel</CloseButton>
        <OkButton onClick={onOk}>Submit</OkButton>
      </Footer>
    </ReactModal>
  );
};

const Header = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const CloseIcon = styled.div`
  transition: 0.3s;
  &:hover {
    color: red;
  }
`;

const Dividor = styled.hr`
  border: 1px solid gray;
  border-radius: 5px;
`;

const Button = styled.button`
  flex: 1;
  color: white;
  padding: 0.3rem;
  /* margin: 0 -10px; */
  transition: 0.2s;
`;

const CloseButton = styled(Button)`
  margin-left: -10px;
  background: ${({ theme: { colors } }) => `${colors.error}`};
  &:hover:enabled {
    background: ${({ theme: { colors } }) => `${colors.error_dark}`};
  }
  &:disabled {
    opacity: 0.5;
  }
`;
const OkButton = styled(Button)`
  margin-right: -10px;
  background: ${({ theme: { colors } }) => `${colors.confirm}`};
  &:hover {
    background: ${({ theme: { colors } }) => `${colors.confirm_dark}`};
  }
`;

export default withRouter(ConfirmModal);
