import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../screens/SharedStyles";
import Logo from "../res/images/Dokumental_Logo.png";

const Footer = () => {
  return (
    <PageWrapper>
      <FooterWrapper>
        <p>Website Designed by Alfons Fernaldy</p>
        <img className="logo" src={Logo} alt="Logo.PNG" />
      </FooterWrapper>
    </PageWrapper>
  );
};

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 0 0 5px;
  }
`;

export default Footer;
