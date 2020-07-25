import React, { useState } from "react"

const recommendShade = (pattern) => {
  const flattenedPattern = pattern.flat()
  const pixelSum = flattenedPattern.reduce((acc, curr) => acc + curr)
  return Math.round((pixelSum / flattenedPattern.length) * 255) ^ 255
}

const addRow = (pattern) => [...pattern, [...pattern[pattern.length - 1]]]

const addColumn = (pattern) => pattern.map((row) => [...row, row[row.length - 1]])

const flipBit = (pattern, rowIndex, columnIndex) => {
  const newPattern = pattern.map((row) => [...row])
  newPattern[rowIndex][columnIndex] = newPattern[rowIndex][columnIndex] ^ 1
  return newPattern
}

const PatternEditor = ({ shade, pattern, onUpdate }) => {
  const [editedPattern, setEdititedPattern] = useState(pattern)
  const [newShade, setNewShade] = useState(shade)

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
        <button
          className="pattern-editor__pattern-add-column"
          onClick={() => setEdititedPattern(addColumn(editedPattern))}
        >
          Add Column
        </button>
        <button
          className="pattern-editor__pattern-add-row"
          onClick={() => setEdititedPattern(addRow(editedPattern))}
        >
          Add Row
        </button>
      </div>
      <div>Current shade: {newShade}</div>
      <div>(Recommended Shade: {recommendShade(editedPattern)})</div>
      <button onClick={() => onUpdate(pattern, editedPattern, newShade)}>Save</button>
    </div>
  )
}

export default PatternEditor
