import React, { Component } from "react";
import Content from "./Content";
import "../css/main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.showMenuFunc = () => this.state.showMenu;
    this.showRouterFunc = () => this.state.router;
    this.clickHandler = this.clickHandler.bind(this);
    this.routerHandler = this.routerHandler.bind(this);

    this.state = {
      showMenu: false,
      router: this.props.router || "home"
    };
  }

  clickHandler() {
    return this.setState({ showMenu: !this.state.showMenu });
  }

  routerHandler(destination) {
    if (destination === "fetch") return this.state.router;
    return this.setState({
      router: destination,
      showMenu: !this.state.showMenu
    });
  }

  render() {
    return (
      <main>
        <MenuBtn showMenu={this.showMenuFunc} menuAction={this.clickHandler} />
        <Menu showMenu={this.showMenuFunc} router={this.routerHandler} />
        <Content router={this.state.router} />
      </main>
    );
  }
}

let MenuBtn = props => {
  return (
    <div
      className={props.showMenu() ? "menu-btn close" : "menu-btn"}
      onClick={props.menuAction}
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
          if (props.router("fetch") === props.name) out += "selected ";
          return out;
        })()}
        onClick={() => props.router(props.name)}
      >
        {props.value}
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
        <NavItem
          name="home"
          value="Home"
          router={props.router}
          showMenu={props.showMenu}
        />
        <NavItem
          name="about"
          value="About Me"
          router={props.router}
          showMenu={props.showMenu}
        />
        <NavItem
          name="project"
          value="My Projects"
          router={props.router}
          showMenu={props.showMenu}
        />
        <NavItem
          name="contact"
          value="Contact Me"
          router={props.router}
          showMenu={props.showMenu}
        />
      </ul>
    </nav>
  );
};
