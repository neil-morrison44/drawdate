import React, { useRef, useLayoutEffect } from "react"

const OutputCanvas = ({ imageData, className, imagePattern, width = 400, height = 240 }) => {
  const canvasRef = useRef()

  useLayoutEffect(() => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, width, height)

    if (imageData) {
      ctx.putImageData(imageData, 0, 0)
    }
    if (imagePattern) {
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          ctx.fillStyle = imagePattern?.[y]?.[x] ? "black" : "rgb(225,225,225)"
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }, [imageData, imagePattern])

  return (
    <canvas
      ref={canvasRef}
      className={`output-canvas ${className || ""}`}
      width={width}
      height={height}
    ></canvas>
  )
}

export default OutputCanvas
