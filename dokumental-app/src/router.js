import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import About from "./screens/About/About";
import Details from "./screens/Details/Details";
import Navbar from "./components/Navbar/Navbar";

const Routes = () => {
  const routes = [
    { path: "/", name: "Home", Component: Home },
    { path: "/about", name: "About", Component: About },
    { path: "/details", name: "Contact", Component: Details },
  ];

  return (
    <Router>
      <Navbar />
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          <Component />
        </Route>
      ))}
    </Router>
  );
};

export default Routes;
