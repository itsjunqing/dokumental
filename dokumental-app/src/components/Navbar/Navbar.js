import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaBrain } from "react-icons/fa";
import Logo from "../../res/images/Dokumental_Logo.png";
import Theme from "../../Theme";

const Navbar = () => {
  return (
    <NavWrapper>
      {/* -- Bottom Navigation --*/}
      <BottomDrawer>
        <BottomNavList>
          <li>
            <BottomNavLink
              to="/"
              exact
              activeStyle={{
                color: Theme.colors.main,
              }}
            >
              <FaHome />
              <p>Home</p>
            </BottomNavLink>
          </li>
          <li>
            <BottomNavLink
              to="/about"
              exact
              activeStyle={{
                color: Theme.colors.main,
              }}
            >
              <FaInfoCircle />
              <p>About</p>
            </BottomNavLink>
          </li>
          <li>
            <BottomNavLink
              to="/details"
              exact
              activeStyle={{
                color: Theme.colors.main,
              }}
            >
              <FaBrain />
              <p>Details</p>
            </BottomNavLink>
          </li>
        </BottomNavList>
      </BottomDrawer>
      {/* -- Top Navigation --*/}
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

const BottomDrawer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  display: flex;
  flex-direction: row;
  background: #292929;
  box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
  @media (min-width: 550px) {
    display: none;
  }
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
  white-space: nowrap;
  & > * {
    margin-left: 1rem;
  }
  @media (max-width: 550px) {
    display: none;
  }
`;

const BottomNavList = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  & > * {
    margin-left: 1rem;
  }
  justify-content: space-evenly;
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

const BottomNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
  transition: 0s;
`;

export default Navbar;
