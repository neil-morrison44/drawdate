import React, { useState, Fragment, useEffect } from "react"
import { createPortal } from "react-dom"
import OutputCanvas from "../outputCanvas"
import PatternEditor from "./patternEditor"

const UNEDITABLE_SHADES = ["0", "255"]

const EditPalette = ({ palette, onUpdate, onClose }) => {
  const [selectedPattern, setSelectedPattern] = useState(null)

  const mergeNewPattern = (oldPattern, newPattern, newShade) => {
    const newPalette = { ...palette }
    const oldShade = Object.entries(newPalette).find(([_, pattern]) => pattern === oldPattern)?.[0]
    if (oldShade) delete newPalette[oldShade]
    if (newPattern) newPalette[newShade] = newPattern
    onUpdate(newPalette)
  }

  return createPortal(
    <div className="edit-palette">
      <div className="edit-palette__title">
        Edit Palette{" "}
        <button className="edit-palette__close-button" onClick={onClose}>
          Close
        </button>
      </div>
      {!selectedPattern && (
        <Fragment>
          <div className="edit-palette__list">
            {Object.entries(palette).map(([shade, pattern]) => (
              <button
                className="edit-palette__list-item"
                key={shade}
                onClick={() => {
                  if (!UNEDITABLE_SHADES.includes(shade)) setSelectedPattern(pattern)
                }}
                disabled={UNEDITABLE_SHADES.includes(shade)}
              >
                <div
                  className="edit-palette__shade-box"
                  style={{
                    backgroundColor: `rgb(${shade}, ${shade}, ${shade})`,
                  }}
                ></div>
                Shade: {shade}
                <OutputCanvas
                  className="edit-palette__output-canvas"
                  width={pattern[0].length}
                  height={pattern.length}
                  imagePattern={pattern}
                />
              </button>
            ))}
          </div>
          <button
            className="edit-palette__add-new-button"
            onClick={() => setSelectedPattern([[0]])}
          >
            Add New
          </button>
        </Fragment>
      )}
      {selectedPattern && (
        <Fragment>
          <button
            className="edit-palette__back-to-list-button"
            onClick={() => setSelectedPattern(null)}
          >
            Back To List
          </button>
          <PatternEditor
            palettePatterns={Object.values(palette)}
            paletteKeys={Object.keys(palette)}
            pattern={selectedPattern}
            shade={Object.entries(palette).find(([_, pattern]) => selectedPattern === pattern)?.[0]}
            onUpdate={(oldPattern, newPattern, newShade) => {
              setSelectedPattern(null)
              mergeNewPattern(oldPattern, newPattern, newShade)
            }}
          />
        </Fragment>
      )}
    </div>,
    document.querySelector(".modal-container")
  )
}

export default EditPalette
