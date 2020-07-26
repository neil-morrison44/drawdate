import React, { useState, useMemo, useEffect, Fragment, useLayoutEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { readMetadata } from "png-metadata"
import Palette from "./palette"

const Import = ({ onClose, onImportPalette, onImportDrawingCanvas }) => {
  const [importedPalette, setImportedPalette] = useState(null)
  const [importedDrawing, setImportedDrawing] = useState(null)
  const [importedOutput, setImportedOutput] = useState(null)

  const drawingImgRef = useRef()

  const onSelectFile = ([file]) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function () {
      const pngData = new Uint8Array(reader.result)
      const metadata = readMetadata(pngData)
      if (metadata.tEXt?.Palette) {
        setImportedPalette(JSON.parse(metadata.tEXt.Palette))
      } else {
        setImportedPalette(null)
      }
      if (metadata.tEXt?.DrawingCanvas) {
        setImportedDrawing(metadata.tEXt.DrawingCanvas)
      } else {
        setImportedDrawing(null)
      }

      const imgBlob = new Blob([pngData], { type: "image/png" })
      setImportedOutput(URL.createObjectURL(imgBlob))
    }
  }

  const onImport = () => {
    onImportPalette(importedPalette)

    const canvas = document.createElement("canvas")
    canvas.width = "400"
    canvas.height = "240"
    const ctx = canvas.getContext("2d")
    ctx.drawImage(drawingImgRef.current, 0, 0)
    onImportDrawingCanvas(ctx.getImageData(0, 0, 400, 240))
    onClose()
  }

  return createPortal(
    <div className="import">
      <div className="import__title">
        Import{" "}
        <button className="import__close-button" onClick={onClose}>
          Close
        </button>
      </div>

      <input
        type="file"
        accept="image/png"
        onChange={({ target }) => onSelectFile(target.files)}
      ></input>
      <div className="import__preview">
        {importedPalette && <Palette colourPalette={importedPalette} readOnly />}
        {importedDrawing && (
          <img
            className="import__drawing-preview"
            ref={drawingImgRef}
            width="400"
            height="240"
            src={importedDrawing}
          />
        )}
        {importedOutput && (
          <img className="import__output-preview" width="400" height="240" src={importedOutput} />
        )}
        {importedPalette && importedDrawing && (
          <button className="import__import-button" onClick={onImport}>
            Import Palette {"&"} Drawing
          </button>
        )}
        {importedOutput && !importedPalette && !importedDrawing && (
          <div>Importing images not exported from here is not yet supported</div>
        )}
      </div>
    </div>,
    document.querySelector(".modal-container")
  )
}

export default Import
