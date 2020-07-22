import React, { Fragment, useState } from "react"
import DrawingCanvas from "./drawingCanvas"
import OutputCanvas from "./outputCanvas"
import Tools from "./tools"

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

const App = () => {
  const [tool, setTool] = useState("pencil")

  return (
    <div className="app">
      <DrawingCanvas tool={tool} />
      <OutputCanvas
        imageData={[
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ]}
      />
      <Tools
        onChangeTool={(tool) => setTool(tool)}
        toolList={TOOL_LIST}
        selectedTool={tool}
      ></Tools>
    </div>
  )
}

export default App
