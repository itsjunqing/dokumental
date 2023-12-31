import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import About from "./screens/About/About";
import Details from "./screens/Details/Details";
import Results from "./screens/Results/Results";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/about", name: "About", Component: About },
  { path: "/details", name: "Contact", Component: Details },
  { path: "/results", name: "Results", Component: Results },
];

const Routes = () => {
  return (
    <Router>
      <Navbar />
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          <Component />
        </Route>
      ))}
      <Footer />
    </Router>
  );
};

export default Routes;
