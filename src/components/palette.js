import React from "react"
import OutputCanvas from "./outputCanvas"

const Palette = ({ selectedColour, colourPalette, onChangeColour }) => {
  return (
    <div className="palette">
      {colourPalette.map(({ drawingColour, outputImageData }) => (
        <button
          key={drawingColour}
          onClick={() => onChangeColour(drawingColour)}
          className={`palette__colour ${
            selectedColour === drawingColour ? "palette__colour--selected" : ""
          }`}
        >
          <div
            className="palette__drawing-colour"
            style={{ backgroundColor: `rgb(${drawingColour}, ${drawingColour}, ${drawingColour})` }}
          ></div>
          <OutputCanvas
            width={outputImageData[0].length}
            height={outputImageData.length}
            imageData={outputImageData}
          />
        </button>
      ))}
    </div>
  )
}

export default Palette
