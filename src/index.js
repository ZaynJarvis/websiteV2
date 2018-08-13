import React from "react";
import ReactDOM from "react-dom";
import Main from "./js/Main";
import "./css/main.css";
import { unregister } from "./registerServiceWorker";
unregister();
ReactDOM.render(<Main router="home" />, document.querySelector("#root"));
