import { useState } from "react"

const MAX_UNDOS = 100

const useUndoStack = () => {
  const [baseImageData, setBaseImageData] = useState(null)
  const [undoStack, setUndoStack] = useState([])

  const undo = function () {
    if (undoStack[0]) {
      setBaseImageData(undoStack[0])
      setUndoStack(undoStack.slice(1, MAX_UNDOS - 1))
    }
  }

  const pushToUndoStack = function (imageData) {
    setUndoStack([imageData, ...undoStack].slice(0, MAX_UNDOS))
  }

  const clear = function () {
    setBaseImageData(baseImageData === null ? false : null)
  }

  const undoCount = undoStack.length

  return [baseImageData, pushToUndoStack, undo, undoCount, clear, setBaseImageData]
}

export { useUndoStack }
