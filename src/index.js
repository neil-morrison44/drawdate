import React from "react"
import ReactDOM from "react-dom"

import "./styles/main.scss"
import App from "./components/app"

window.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.querySelector(".app-container"))
})
