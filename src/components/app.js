import React, { useState, useMemo, Suspense, useRef } from "react"

import OutputCanvas from "./outputCanvas"
import Tools from "./tools"
import Palette from "./palette"
import throttle from "lodash.throttle"
import useWebWorker from "react-webworker-hook"
import OutputImageWorker from "./outputImage.worker.js"
import { useUndoStack } from "./useUndoStack"
import { COLOUR_PALETTE, TOOL_LIST } from "../values/toolsAndPalette"

const DrawingCanvas = React.lazy(() => import("./drawingCanvas"))
const Export = React.lazy(() => import("./export"))

const outputImageWorker = new OutputImageWorker()

const App = () => {
  const [tool, setTool] = useState("pencil")
  const [colour, setColour] = useState(0)
  const [palette, setPalette] = useState(COLOUR_PALETTE)
  const [baseImageData, pushToUndoStack, undo, undoCount, clear] = useUndoStack()
  const [outputImageData = null, processImageData] = useWebWorker({
    worker: outputImageWorker,
  })
  const [openModal, setOpenModal] = useState(null)
  const drawingCanvasRef = useRef()
  const outputCanvasRef = useRef()

  const paletteKeys = Object.keys(palette)

  // slight risk that the `processImageData` that this memoizes and the real one will go out of sync
  const throttledProcessImageData = useMemo(() => throttle(processImageData, 32), [])
  return (
    <div className="app">
      <Suspense fallback={"Loading..."}>
        <DrawingCanvas
          ref={drawingCanvasRef}
          palette={palette}
          tool={tool}
          colour={colour}
          initialImageData={baseImageData}
          onUpdate={(ctx) =>
            throttledProcessImageData({
              imageData: ctx.getImageData(0, 0, 400, 240),
              palette,
              paletteValues: paletteKeys,
            })
          }
          onSetUndoPoint={(ctx) => pushToUndoStack(ctx.getImageData(0, 0, 400, 240))}
        />
      </Suspense>
      <OutputCanvas imageData={outputImageData} ref={outputCanvasRef} />
      <Tools
        onChangeTool={(tool) => setTool(tool)}
        toolList={TOOL_LIST}
        selectedTool={tool}
      ></Tools>
      <Palette
        colourPalette={palette}
        selectedColour={colour}
        onChangeColour={(colour) => setColour(colour)}
        onUpdatePalette={setPalette}
      />
      <div className="app__options">
        <button className="app__undo" onClick={undo}>
          Undo ({undoCount})
        </button>
        <button className="app__clear" onClick={clear}>
          Clear
        </button>
        <button className="app__import" onClick={undo}>
          Import
        </button>
        <button className="app__export" onClick={() => setOpenModal("export")}>
          Export
        </button>
      </div>

      <Suspense fallback={"Loading..."}>
        {openModal === "export" && (
          <Export
            palette={palette}
            onClose={() => setOpenModal(null)}
            outputCanvasRef={outputCanvasRef}
            drawingCanvasRef={drawingCanvasRef}
          />
        )}
      </Suspense>
    </div>
  )
}

export default App
