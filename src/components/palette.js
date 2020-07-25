import React, { useState } from "react"
import OutputCanvas from "./outputCanvas"
import EditPalette from "./editPalette"

const Palette = ({ selectedColour, colourPalette, onChangeColour }) => {
  const [editModalOpen, setEditModalOpen] = useState(false)

  return (
    <div className="palette">
      <h3>Palette</h3>
      <div className="palette__choices">
        {Object.entries(colourPalette).map(([drawingColour, outputImagePattern]) => (
          <button
            key={drawingColour}
            onClick={() => onChangeColour(drawingColour)}
            className={`palette__colour ${
              selectedColour === drawingColour ? "palette__colour--selected" : ""
            }`}
          >
            <div
              className="palette__drawing-colour"
              style={{
                backgroundColor: `rgb(${drawingColour}, ${drawingColour}, ${drawingColour})`,
              }}
            ></div>
            <OutputCanvas
              width={outputImagePattern[0].length}
              height={outputImagePattern.length}
              imagePattern={outputImagePattern}
            />
          </button>
        ))}
      </div>
      <button onClick={() => setEditModalOpen(true)}>Edit</button>
      {editModalOpen && (
        <EditPalette palette={colourPalette} onClose={() => setEditModalOpen(false)} />
      )}
    </div>
  )
}

export default Palette
