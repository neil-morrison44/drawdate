import DrawingCanvas from "./components/drawingCanvas"
import React from "react"
import ReactDOM from "react-dom"

import "./styles/main.scss"

window.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<DrawingCanvas />, document.querySelector(".app-container"))
})
