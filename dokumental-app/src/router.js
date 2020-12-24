import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./screens/Home/Home";
import About from "./screens/About/About";
import Details from "./screens/Details/Details";
import Navbar from "./components/Navbar/Navbar";

const Routes = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/details" exact>
          <Details />
        </Route>
      </Router>
    </div>
  );
};

export default Routes;
