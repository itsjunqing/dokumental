import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import Logo from "../../res/images/Dokumental_Logo.png";

const Navbar = () => {
  return (
    <NavWrapper>
      <Link to="/">
        <LogoWrapper>
          <img
            className="logo"
            src={Logo}
            alt="Logo.PNG"
            width={50}
            height={50}
          />
          DokuMental
        </LogoWrapper>
      </Link>
      <div>
        <NavList>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about">About Us</NavLink>
          </NavItem>
          <NavItem>
            <Link to="/details">
              <NavButton>How It Works</NavButton>
            </Link>
          </NavItem>
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
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavItem = styled.li`
  margin-left: 1rem;
`;

const NavButton = styled.button`
  background: none;
  border: 1px solid #e04873;
  padding: 0.3rem;
  transition: 0.2s;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  &:hover {
    background: #e04873;
  }
`;

const NavLink = styled(Link)`
  transition: 0.3s;
  &:hover {
    color: #e04873;
  }
`;

export default Navbar;
