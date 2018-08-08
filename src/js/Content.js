import React, { Component } from "react";
import Home from "./Home";
import About from "./About";
import Project from "./Project";
import Contact from "./Contact";
import "../css/main.css";

class Content extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.router === "home" || "") return <Home />;
    else if (this.props.router === "about") return <About />;
    else if (this.props.router === "project") return <Project />;
    else if (this.props.router === "contact") return <Contact />;
  }
}

export default Content;
