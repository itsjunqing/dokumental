import React from "react";
import styled from "styled-components";
import UploadImg from "../res/images/upload_documents2.png";

const DropZone = (props) => {
  return (
    <OutterWrapper>
      <InnerWrapper>
        <img
          src={UploadImg}
          alt="Upload Documents Here"
          width={50}
          height={50}
        />
        <SelectButton>Select Text Files</SelectButton>
        <p>or drag them here</p>
      </InnerWrapper>
    </OutterWrapper>
  );
};

const OutterWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 12rem;
  background: ${({ theme: { colors } }) => colors.main};
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
  & > * {
    margin-bottom: 0.7rem;
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

export default DropZone;
