import React, { useState, useMemo, useEffect, Fragment } from "react"
import { createPortal } from "react-dom"
import { readMetadata, writeMetadata } from "png-metadata"

const Export = ({ onClose, palette, outputCanvasRef, drawingCanvasRef }) => {
  const [outputSrc, setOutputSrc] = useState(null)

  useEffect(() => {
    const ctx = outputCanvasRef.current.getContext("2d")
    ctx.canvas.toBlob((blob) => {
      const reader = new FileReader()

      reader.readAsArrayBuffer(blob)

      reader.onload = () => {
        const buffer = new Uint8Array(reader.result)
        console.log(buffer)
        const metadata = readMetadata(buffer)
        const tEXt = {
          Palette: JSON.stringify(palette),
          DrawingCanvas: drawingCanvasRef.current.toDataURL(),
        }
        const withMetaDataBuffer = writeMetadata(buffer, { ...metadata, tEXt })

        const blob = new Blob([withMetaDataBuffer], { type: "image/png" })
        setOutputSrc(URL.createObjectURL(blob))
      }
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
