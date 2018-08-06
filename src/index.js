import React from "react";
import ReactDOM from "react-dom";
import "./css/main.css";
import Home from "./js/Home";
import About from "./js/About";
import Portfolio from "./js/Portfolio";
import Contact from "./js/Contact";
import registerServiceWorker from "./registerServiceWorker";

const main = document.querySelector("#main");
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");

let showMenu = false;

menuBtn.addEventListener("click", () => {
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
});

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
    ReactDOM.render(<Greeting router={main.attributes.router.value} />, main);
  })
);

function Greeting(props) {
  const router = props.router;
  console.log(router);
  if (router === "home" || "") return <Home />;
  else if (router === "about") return <About />;
}

ReactDOM.render(<Home />, main);

registerServiceWorker();
