import React, { useState, useMemo, useEffect, Fragment } from "react"
import { createPortal } from "react-dom"
import { readMetadata, writeMetadata } from "png-metadata"

const Export = ({ onClose, palette, outputCanvasRef, drawingCanvasRef }) => {
  const [outputSrc, setOutputSrc] = useState(null)

  useEffect(() => {
    const ctx = outputCanvasRef.current.getContext("2d")
    ctx.canvas.toBlob((blob) => {
      blob
        .stream()
        .getReader()
        .read()
        .then(({ value }) => {
          const metadata = readMetadata(value)
          const tEXt = {
            Palette: JSON.stringify(palette),
            DrawingCanvas: drawingCanvasRef.current.toDataURL(),
          }
          return writeMetadata(value, { ...metadata, tEXt })
        })
        .then((buffer) => {
          const blob = new Blob([buffer], { type: "image/png" })
          setOutputSrc(URL.createObjectURL(blob))
        })
    })
  }, [])

  return createPortal(
    <div className="export">
      <div className="export__title">
        Export{" "}
        <button className="export__close-button" onClick={onClose}>
          Close
        </button>
      </div>
      {outputSrc && (
        <Fragment>
          <img className="export__preview-image" width="400" height="240" src={outputSrc} />
          <a className="export__download-link" download href={outputSrc}>
            Download
          </a>
        </Fragment>
      )}
    </div>,
    document.querySelector(".modal-container")
  )
}

export default Export
