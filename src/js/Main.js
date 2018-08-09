import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Project from "./Project";
import PageNotFound from "./PageNotFound";
import Contact from "./Contact";
import "../css/main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.menuAction = this.menuAction.bind(this);

    this.state = {
      showMenu: false
    };
  }
  componentDidUpdate() {}

  menuAction(toggleMode) {
    if (!toggleMode) return this.state.showMenu;
    return () => this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    return (
      <Router>
        <main>
          <MenuBtn showMenu={this.menuAction} menuAction={this.menuAction} />
          <Menu showMenu={this.menuAction} />
          <Switch>
            <Redirect from="/home" to="/" />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/project" component={Project} />
            <Route path="/contact" component={Contact} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
      </Router>
    );
  }
}

let MenuBtn = props => {
  return (
    <div
      className={props.showMenu() ? "menu-btn close" : "menu-btn"}
      onClick={() => props.menuAction(true)()}
    >
      <div className={props.showMenu() ? "btn-line show" : "btn-line"} />
      <div className={props.showMenu() ? "btn-line show" : "btn-line"} />
      <div className={props.showMenu() ? "btn-line show" : "btn-line"} />
    </div>
  );
};

let NavItem = props => {
  return (
    <li
      className={props.showMenu() ? "nav-item show" : "nav-item"}
      name={props.name}
    >
      <i
        className={(() => {
          let out = "nav-link ";
          if (props.showMenu()) out += "show ";
          if (window.location.pathname === props.name) out += "selected ";
          return out;
        })()}
        onClick={() => props.showMenu(true)()}
      >
        <Link to={props.name}>{props.value}</Link>
      </i>
    </li>
  );
};

let Menu = props => {
  return (
    <nav className={props.showMenu() ? "menu show" : "menu"}>
      <div
        className={props.showMenu() ? "menu-branding show" : "menu-branding"}
      >
        <div className="portrait" />
      </div>
      <ul className={props.showMenu() ? "menu-nav show" : "menu-nav"}>
        <NavItem name="/" value="Home" showMenu={props.showMenu} />
        <NavItem name="/about" value="About Me" showMenu={props.showMenu} />
        <NavItem
          name="/project"
          value="My Projects"
          showMenu={props.showMenu}
        />
        <NavItem name="/contact" value="Contact Me" showMenu={props.showMenu} />
      </ul>
    </nav>
  );
};
