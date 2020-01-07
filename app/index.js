import React from "react";
import { render } from "react-dom";

import "./ast/style.css";
import Tetris from "./components/Tetris";

render(
  <div className="mainReactDiv">
    <Tetris />
  </div>,
  document.getElementById("app")
);
