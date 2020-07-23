import React, { useState } from "react"

const Tools = ({ onChangeTool, toolList, selectedTool }) => {
  return (
    <div className="tools">
      <h3>Tools</h3>
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
