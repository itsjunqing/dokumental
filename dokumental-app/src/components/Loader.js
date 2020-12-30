import React from "react";
import styled from "styled-components";
import { rotate } from "../KeyframeAnimations";

const Loader = ({ size = 25 }) => {
  return <LoaderBody size={size}></LoaderBody>;
};

const LoaderBody = styled.div`
  position: relative;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  border: 5px solid transparent;
  border-top: 5px solid white;
  animation: ${rotate} 1s ease-in-out infinite;
`;

export default Loader;
