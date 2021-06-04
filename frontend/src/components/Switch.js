import React from "react";
import styled from "styled-components";

const Switch = ({ checked = false, onChange = () => {} }) => {
  return (
    <SwitchLabel>
      <Input type="checkbox" checked={checked} onChange={onChange} />
      <Slider></Slider>
    </SwitchLabel>
  );
};

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    background-color: ${({ theme: { colors } }) => colors.main};
  }
  &:checked + span:before {
    transform: translateX(26px);
    width: 100;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
  transition: 0.4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 34px;
  }
`;

export default Switch;
