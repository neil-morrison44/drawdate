import React, { useState } from "react"

const Tools = ({ onChangeTool, toolList, selectedTool }) => {
  return (
    <div className="tools">
      {toolList.map(({ name, Icon }) => (
        <button
          key={name}
          className={`tools__tool ${selectedTool === name ? "tools__tool--selected" : ""}`}
          onClick={() => onChangeTool(name)}
        >
          <Icon />
          {name}
        </button>
      ))}
    </div>
  )
}

export default Tools
