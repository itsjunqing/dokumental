import React, { useState, useCallback } from "react";
import styled from "styled-components";
import UploadImg from "../res/images/upload_documents.png";
import docx_icon from "../res/images/docx_icon.png";
import txt_icon from "../res/images/txt_icon.png";
import { useDropzone } from "react-dropzone";
import { AiFillCloseCircle } from "react-icons/ai";

const DropZone = (props) => {
  const [files, setFiles] = useState([]);

  const checkFiles = (inFiles) => {
    let exists = false;
    inFiles.forEach((x) => {
      files.forEach((y) => {
        if (x.path === y.path) exists = true;
      });
    });
    return exists;
  };

  // TODO: Show modal on error
  const onDrop = useCallback(
    (inputFiles) => {
      if (files.length + inputFiles.length > 3) {
        console.log("Max Files reached");
      } else if (checkFiles(inputFiles)) {
        console.log("File already uploaded");
      } else {
        setFiles([...files, ...inputFiles]);
      }
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ".docx, .txt",
    maxFiles: 3,
    noClick: true,
  });
  console.log("Render -> ", files);

  const renderDocuments = useCallback(
    () => (
      <DocWrapper>
        {files.map(({ name, type, path, size }) => (
          <DocCard key={path}>
            <CloseIcon
              onClick={() =>
                setFiles(files.filter((item) => item.path !== path))
              }
            >
              <AiFillCloseCircle />
            </CloseIcon>
            <img
              className="icon"
              src={type === "text/plain" ? txt_icon : docx_icon}
              alt=".docx"
            />
            <div>
              <h1>{name}</h1>
              <p>{size} Bytes</p>
            </div>
          </DocCard>
        ))}
      </DocWrapper>
    ),
    [files]
  );

  return (
    <OutterWrapper {...getRootProps({})}>
      <input {...getInputProps({})} />
      <InnerWrapper isDragActive={isDragActive}>
        {files.length === 0 ? (
          <img className="icon" src={UploadImg} alt="Upload Documents Here" />
        ) : (
          renderDocuments()
        )}
        <ButtonGroup>
          <div>
            <SelectButton onClick={open}>Select Files</SelectButton>
            <p style={{ marginTop: "4px", fontSize: "12px" }}>
              .txt or .docx only
            </p>
          </div>
          {files.length !== 0 && (
            <div>
              <SelectButton>Upload Files</SelectButton>
            </div>
          )}
        </ButtonGroup>
        {files.length === 0 && (
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
  transition: 0.2s;
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

const DocCard = styled.div`
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
