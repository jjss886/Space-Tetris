import React, { Component } from "react";
import { render } from "react-dom";

import "./ast/style.css";
import Tetris from "./components/Tetris";

render(
  <div>
    <Tetris />
  </div>,
  document.getElementById("app")
);
