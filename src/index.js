import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./style/styles.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
