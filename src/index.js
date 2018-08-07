import React from "react";
import ReactDOM from "react-dom";
import "./css/main.css";
import Home from "./js/Home";
import About from "./js/About";
import Project from "./js/Project";
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
  else if (router === "project") return <Project />;
  else if (router === "contact") return <Contact />;
}
// typeform.
(function() {
  let qs,
    js,
    q,
    s,
    d = document,
    gi = d.getElementById,
    ce = d.createElement,
    gt = d.getElementsByTagName,
    id = "typef_orm",
    b = "https://embed.typeform.com/";
  if (!gi.call(d, id)) {
    js = ce.call(d, "script");
    js.id = id;
    js.src = b + "embed.js";
    q = gt.call(d, "script")[0];
    q.parentNode.insertBefore(js, q);
  }
})();

ReactDOM.render(<Greeting router={main.attributes.router.value} />, main);

registerServiceWorker();
