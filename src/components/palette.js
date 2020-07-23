import React from "react"
import OutputCanvas from "./outputCanvas"

const Palette = ({ selectedColour, colourPalette, onChangeColour }) => {
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
    </div>
  )
}

export default Palette
