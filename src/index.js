import React from "react";
import ReactDOM from "react-dom";
import Main from "./js/Main";
import "./css/main.css";
//import registerServiceWorker from "./registerServiceWorker";
import { unregister } from "./registerServiceWorker";
// registerServiceWorker();
unregister();
ReactDOM.render(<Main router="home" />, document.querySelector("#root"));
