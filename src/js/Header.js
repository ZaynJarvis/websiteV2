import React, { Component } from "react";

import Home from "./js/Home";
import About from "./js/About";
import Project from "./js/Project";
import Contact from "./js/Contact";

class Header extends Component {
  constructor(props) {
    super(props);
    const main = document.querySelector("#main");
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");
    const menuNav = document.querySelector(".menu-nav");
    const menuBranding = document.querySelector(".menu-branding");

    let showMenu = false;

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item =>
      item.addEventListener("click", () => {
        menuBtn.classList.remove("close");
        menuNav.classList.remove("show");
        menu.classList.remove("show");
        menuBranding.classList.remove("show");
        navItems.forEach(item => item.classList.remove("show"));
        showMenu = false;
        main.attributes.router.value = item.attributes.name.value;
        // highlight specific tag
        navItems.forEach(other => other.classList.remove("selected"));
        item.classList.add("selected");
        ReactDOM.render(
          <Greeting router={main.attributes.router.value} />,
          main
        );
      })
    );

    function Greeting(props) {
      const router = props.router;
      console.log(router);
      if (router === "home" || "") return <Home />;
      else if (router === "about") return <About />;
      else if (router === "project") return <Project />;
      else if (router === "contact") return <Contact />;
    }
    // typeform.

    ReactDOM.render(<Greeting router={main.attributes.router.value} />, main);
  }

  buttonClick() {
    if (!showMenu) {
      menuBtn.classList.add("close");
      menuNav.classList.add("show");
      menu.classList.add("show");
      menuBranding.classList.add("show");
      navItems.forEach(item => item.classList.add("show"));
      showMenu = true;
    } else {
      menuBtn.classList.remove("close");
      menuNav.classList.remove("show");
      menu.classList.remove("show");
      menuBranding.classList.remove("show");
      navItems.forEach(item => item.classList.remove("show"));
      showMenu = false;
    }
  }

  render() {
    return (
      <section>
        <header>
          <div class="menu-btn" onClick={buttonClick}>
            <div class="btn-line" />
            <div class="btn-line" />
            <div class="btn-line" />
          </div>
          <nav class="menu">
            <div class="menu-branding">
              <div class="portrait" />
            </div>
            <ul class="menu-nav">
              <li class="nav-item selected" name="home">
                <i class="nav-link">Home</i>
              </li>
              <li class="nav-item" name="about">
                <i class="nav-link">About Me</i>
              </li>
              <li class="nav-item" name="project">
                <i class="nav-link">My Projects</i>
              </li>
              <li class="nav-item" name="contact">
                <i class="nav-link">Contact Me</i>
              </li>
            </ul>
          </nav>
        </header>

        <main id="main" router="home" />
      </section>
    );
  }
}

export default Header;
