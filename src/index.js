import React from "react";
import ReactDOM from "react-dom";
import "./css/main.css";
import Home from "./js/Home";
import About from "./js/About";
import Portfolio from "./js/Portfolio";
import Contact from "./js/Contact";
import registerServiceWorker from "./registerServiceWorker";
const main = document.querySelector("#main");
const Router = {
  "": <Home />,
  home: <Home />,
  about: <About />
};
console.log(1);
let router = Router[main.attributes.router.value];
ReactDOM.render(router, main);

registerServiceWorker();
