import React from "react";
import ReactDOM from "react-dom";
import Main from "./js/Main";
import "./css/main.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Main router="home" />, document.querySelector("#root"));

setTimeout(() => {
  document.querySelector(".loader").classList.add("dead");
}, 500);

registerServiceWorker();
