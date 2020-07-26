import React from "react"
import { createPortal } from "react-dom"

const Export = ({ onClose }) => {
  return createPortal(
    <div className="export">
      <div className="export__title">
        Export{" "}
        <button className="export__close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.querySelector(".modal-container")
  )
}

export default Export
