import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import Logo from "../../res/images/Dokumental_Logo.png";

const Navbar = () => {
  return (
    <NavWrapper>
      <Link to="/">
        <LogoWrapper>
          <img className="logo" src={Logo} alt="Logo.PNG" />
          DokuMental
        </LogoWrapper>
      </Link>
      <div>
        <NavList>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <Link to="/details">
              <NavButton>How It Works</NavButton>
            </Link>
          </li>
        </NavList>
      </div>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 0.5rem 1rem;
  max-width: 1200px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin-left: 1rem;
  }
`;

const NavButton = styled.button`
  border: ${({ theme: { colors } }) => `1px solid ${colors.main}`};
  padding: 0.3rem;
  transition: 0.2s;
  color: white;
  &:hover {
    background: ${({ theme: { colors } }) => colors.main};
  }
`;

const NavLink = styled(Link)`
  transition: 0.3s;
  color: white;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

export default Navbar;
