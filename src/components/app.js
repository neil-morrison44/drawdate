import React, { Fragment, useState } from "react"
import DrawingCanvas from "./drawingCanvas"
import OutputCanvas from "./outputCanvas"
import Tools from "./tools"
import Palette from "./palette"
import { renderOutputImageData } from "./renderOutputImageData"
import useWebWorker from "react-webworker-hook"
import OutputImageWorker from "./outputImage.worker.js"

const TOOL_LIST = [
  {
    name: "pencil",
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="18px"
        height="18px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </svg>
    ),
  },
]

const COLOUR_PALETTE = {
  0: [[1]],
  127: [
    [1, 0],
    [0, 1],
  ],
  191: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  255: [[0]],
}

const COLOUR_PALETTE_KEYS = Object.keys(COLOUR_PALETTE)

const outputImageWorker = new OutputImageWorker()

const App = () => {
  const [tool, setTool] = useState("pencil")
  const [colour, setColour] = useState(0)
  // const [outputImageData, setOutputImageData] = useState(null)
  const [outputImageData = null, processImageData, workerError] = useWebWorker({
    worker: outputImageWorker,
  })

  return (
    <div className="app">
      <DrawingCanvas
        tool={tool}
        colour={colour}
        onUpdate={(ctx) => {
          const imageData = ctx.getImageData(0, 0, 400, 240)
          processImageData({
            imageData,
            palette: COLOUR_PALETTE,
            paletteValues: COLOUR_PALETTE_KEYS,
          })
        }}
      />
      <OutputCanvas imageData={outputImageData} />
      <Tools
        onChangeTool={(tool) => setTool(tool)}
        toolList={TOOL_LIST}
        selectedTool={tool}
      ></Tools>
      <Palette
        colourPalette={COLOUR_PALETTE}
        selectedColour={colour}
        onChangeColour={(colour) => setColour(colour)}
      />
    </div>
  )
}

export default App
