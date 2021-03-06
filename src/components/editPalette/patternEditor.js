import React, { useState } from "react"

const recommendShade = (pattern) => {
  const flattenedPattern = pattern.flat()
  const pixelSum = flattenedPattern.reduce((acc, curr) => acc + curr)
  return Math.round((pixelSum / flattenedPattern.length) * 255) ^ 255
}

const addRow = (pattern) => [...pattern, [...pattern[pattern.length - 1]]]

const removeRow = (pattern) => {
  if (pattern.length === 1) return pattern
  return [...pattern].slice(0, pattern.length - 1)
}

const addColumn = (pattern) => pattern.map((row) => [...row, row[row.length - 1]])

const removeColumn = (pattern) => {
  if (pattern[0].length === 1) return pattern
  return pattern.map((row) => [...row].slice(0, row.length - 1))
}

const flipBit = (pattern, rowIndex, columnIndex) => {
  const newPattern = pattern.map((row) => [...row])
  newPattern[rowIndex][columnIndex] = newPattern[rowIndex][columnIndex] ^ 1
  return newPattern
}

const PatternEditor = ({ paletteKeys, palettePatterns, shade, pattern, onUpdate }) => {
  const [editedPattern, setEdititedPattern] = useState(pattern)
  const [newShade, setNewShade] = useState(shade)

  const getSaveText = () => {
    if (palettePatterns.includes(pattern)) return "Update"
    if (paletteKeys.includes(newShade)) return "Save & Overwrite"
    return "Save New"
  }

  return (
    <div className="pattern-editor">
      <div className="pattern-editor__pattern">
        {editedPattern.map((patternRow, rowIndex) => (
          <div className="pattern-editor__row" key={rowIndex}>
            {patternRow.map((shade, columnIndex) => (
              <div
                className="pattern-editor__cell"
                key={`${rowIndex} ${columnIndex}`}
                onClick={() => setEdititedPattern(flipBit(editedPattern, rowIndex, columnIndex))}
                style={{ backgroundColor: shade ? "black" : "white" }}
              ></div>
            ))}
          </div>
        ))}
        <div className="pattern-editor__pattern-column-buttons">
          <button onClick={() => setEdititedPattern(addColumn(editedPattern))}>{">"}</button>
          <button onClick={() => setEdititedPattern(removeColumn(editedPattern))}>{"<"}</button>
        </div>
        <div className="pattern-editor__pattern-row-buttons">
          <button onClick={() => setEdititedPattern(removeRow(editedPattern))}>
            <span>{"<"}</span>
          </button>
          <button onClick={() => setEdititedPattern(addRow(editedPattern))}>
            <span>{">"}</span>
          </button>
        </div>
      </div>
      <div>
        Shade:{" "}
        <input
          type="number"
          min="1"
          max="254"
          value={newShade}
          className="pattern-editor__shade-input"
          onChange={({ target }) => setNewShade(target.value)}
        ></input>{" "}
        (Recommended shade: {recommendShade(editedPattern)})
      </div>
      <div className="pattern-editor__buttons">
        <button
          className="pattern-editor__save-button"
          onClick={() => onUpdate(pattern, editedPattern, newShade)}
          disabled={!newShade}
        >
          {getSaveText()}
        </button>
        {palettePatterns.includes(pattern) && (
          <button
            className="pattern-editor__remove-button"
            onClick={() => onUpdate(pattern, null, newShade)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default PatternEditor
