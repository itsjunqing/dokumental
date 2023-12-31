import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import UploadImg from "../res/images/upload_documents.png";
import docx_icon from "../res/images/docx_icon.png";
import txt_icon from "../res/images/txt_icon.png";
import pdf_icon from "../res/images/pdf_icon.png";
import { useDropzone } from "react-dropzone";
import { AiFillCloseCircle } from "react-icons/ai";
import * as actHome from "../screens/Home/ac-Home";

const DropZone = ({ toggleErrorModal, toggleConfirmModal }) => {
  const dispatch = useDispatch();
  const submittedFiles = useSelector((state) => state.Home.submittedFiles);

  // TODO: Show modal on error
  const onDrop = useCallback(
    (inputFiles) => {
      const checkFiles = (inFiles) => {
        let exists = false;
        inFiles.forEach((x) => {
          submittedFiles.forEach((y) => {
            if (x.path === y.path) exists = true;
          });
        });
        return exists;
      };
      if (submittedFiles.length + inputFiles.length > 10) {
        toggleErrorModal("You can only upload a maximum of 10 documents");
      } else if (checkFiles(inputFiles)) {
        toggleErrorModal("File already uploaded");
      } else {
        dispatch(
          actHome.handleState("submittedFiles", [
            ...submittedFiles,
            ...inputFiles,
          ])
        );
      }
    },
    [dispatch, submittedFiles, toggleErrorModal]
  );

  const onDropRejected = () =>
    toggleErrorModal("Only txt, docx and pdf files are allowed");

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: ".docx, .txt, .pdf",
    noClick: true,
  });

  const cardTransition = useTransition(submittedFiles, (file) => file.path, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
    config: { mass: 1, tension: 300, friction: 18 },
  });

  const fileIcon = (type) => {
    switch(type){
      case "text/plain": return txt_icon;
      case "application/pdf": return pdf_icon;
      default: return docx_icon;
    }
  }

  const renderDocuments = () => {
    return cardTransition.map(({ item, key, props }) => {
      const { name, type, path, size } = item;
      return (
        <DocCard key={key} style={props}>
          <CloseIcon
            onClick={() =>
              dispatch(
                actHome.handleState(
                  "submittedFiles",
                  submittedFiles.filter((item) => item.path !== path)
                )
              )
            }
          >
            <AiFillCloseCircle />
          </CloseIcon>
          <img
            className="icon"
            src={fileIcon(type)}
            alt=".docx"
          />
          <div>
            <h1>{name}</h1>
            <p>{Math.round(size / 1024, 2)} KB</p>
          </div>
        </DocCard>
      );
    });
  };

  return (
    <OutterWrapper {...getRootProps({})}>
      <input {...getInputProps({})} />
      <InnerWrapper isDragActive={isDragActive}>
        {submittedFiles.length === 0 && (
          <img className="icon" src={UploadImg} alt="Upload Documents Here" />
        )}
        <DocWrapper>{renderDocuments()}</DocWrapper>
        <ButtonGroup>
          <div>
            <SelectButton onClick={open}>Select Files</SelectButton>
            <p style={{ marginTop: "4px", fontSize: "12px" }}>
              .txt, .pdf or .docx only
            </p>
          </div>
          {submittedFiles.length !== 0 && (
            <div>
              <SelectButton
                onClick={() =>
                  toggleConfirmModal(
                    "Are you sure you want to submit these documents?"
                  )
                }
              >
                Upload Files
              </SelectButton>
            </div>
          )}
        </ButtonGroup>
        {submittedFiles.length === 0 && (
          <p>{!isDragActive ? "or drag them here" : "and drop them"}</p>
        )}
      </InnerWrapper>
    </OutterWrapper>
  );
};

const OutterWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 12rem;
  background: ${({ theme: { colors } }) => colors.main};
  outline: none;
`;
const InnerWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 0.8rem;
  padding: 2rem 0;
  height: 90%;
  width: 90%;
  background: ${({ theme: { colors } }) => colors.dark_main};
  border: ${(props) => (props.isDragActive ? `2px` : `0px`)} dashed black;
  & > * {
    margin-bottom: 0.7rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    margin: 0 1rem;
  }
`;

const SelectButton = styled.button`
  background: white;
  border-radius: 5px;
  color: ${({ theme: { colors } }) => colors.main};
  padding: 0.3rem;
  transition: 0.2s;
  &:hover {
    background: #e6e6e6;
  }
`;

const DocWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  & > * {
    margin: 1rem;
  }
`;

const DocCard = styled(animated.div)`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  padding: 0.5rem;
  border-radius: 10px;
  background: white;
  box-shadow: 5px 6px 4px rgba(0, 0, 0, 0.25);
  & > * {
    margin: 0.3rem 0;
  }
  h1,
  p {
    color: black;
    font-size: 16px;
    width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    font-size: 12px;
  }
  @media (min-width: 450px) {
    width: 200px;
    p {
      font-size: 16px;
    }
    h1 {
      font-size: 20px;
    }
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0px;
  right: 5px;
  color: black;
  transition: 0.3s;
  & > * {
    width: 30px;
    height: 30px;
  }
  &:hover,
  &:active {
    color: red;
  }
`;

export default DropZone;
