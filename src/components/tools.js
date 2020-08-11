import React from "react"

const Tools = ({ onChangeTool, toolList, selectedTool }) => {
  return (
    <div className="tools">
      <h3>Tools</h3>
      <div className="tools__choices">
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
    </div>
  )
}

export default Tools
