import React from "react";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import "./Modal.css";

const ErrorModal = ({
  property = null,
  messageProp = null,
  onClose = () => {},
  title = "Title",
}) => {
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
          borderRadius: "0px",
          border: "0px solid #24272e",
          borderTop: "3px solid #FF0000",
          margin: "auto",
          width: "60vw",
          maxWidth: "400px",
          maxHeight: "200px",
          padding: "20px 10px",
          boxShadow: "5px 6px 4px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <Header>
        {title}
        <CloseIcon onClick={onClose}>
          <AiOutlineClose />
        </CloseIcon>
      </Header>
      <Dividor />
      <Body>{message}</Body>
      <Footer>
        <CloseButton onClick={onClose}>Ok</CloseButton>
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

const CloseButton = styled.button`
  background: ${({ theme: { colors } }) => `${colors.error}`};
  width: 80%;
  border-radius: 5px;
  color: white;
  padding: 0.3rem;
  transition: 0.2s;
  &:hover {
    background: ${({ theme: { colors } }) => `${colors.error_dark}`};
  }
  &:active {
    transform: scale(0.97);
  }
`;

export default ErrorModal;
