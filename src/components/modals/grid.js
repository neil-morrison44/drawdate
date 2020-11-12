import React, { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Palette from "../palette"

const Grid = ({ onClose, onUpdateGrid, enabled, x, y, image }) => {
  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = x
    canvas.height = y
    const ctx = canvas.getContext("2d")
    ctx.strokeStyle = "black"
    ctx.moveTo(0, y)
    ctx.lineTo(x, y)
    ctx.lineTo(x, 0)
    ctx.stroke()

    onUpdateGrid({ enabled, x, y, image: canvas.toDataURL() })
  }, [x, y])

  return createPortal(
    <div className="grid">
      <div className="grid__title">
        Setup Grid{" "}
        <button className="grid__close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <input
        type="number"
        value={x}
        onChange={({ target }) => onUpdateGrid({ x, enabled, y, x: target.value })}
      />{" "}
      by{" "}
      <input
        type="number"
        value={y}
        onChange={({ target }) => onUpdateGrid({ x, enabled, x, y: target.value })}
      />
      <div>
        <input
          type="checkbox"
          id="scales"
          name="enable"
          checked={enabled}
          onChange={({ target }) => onUpdateGrid({ x, y, enabled: target.checked, image })}
        />
        <label htmlFor="enable">Show Grid</label>
      </div>
    </div>,
    document.querySelector(".modal-container")
  )
}

export default Grid
