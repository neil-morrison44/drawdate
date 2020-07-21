import React, { useRef, useLayoutEffect, useState } from "react"
import Pressure from "pressure"

const DrawingCanvas = ({
  onUpdate = () => {},
  onFinalUpdate = () => {},
  width = 400,
  height = 240,
  initialImageData,
}) => {
  const canvasRef = useRef()
  const [currentPressure, setCurrentPressure] = useState(0.5)
  const [currentTouch, setCurrentTouch] = useState(null)
  const [boundingRect, setBoundingRect] = useState(null)

  useLayoutEffect(() => {
    Pressure.set(
      canvasRef.current,
      {
        change: (force) => setCurrentPressure(force),
      },
      { polyfill: true }
    )
    if (!boundingRect) setBoundingRect(canvasRef.current.getBoundingClientRect())
  })

  const drawDot = (x, y) => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.fillRect(
      Math.round(x - currentPressure),
      Math.round(y - currentPressure),
      Math.round(currentPressure * 2),
      Math.round(currentPressure * 2)
    )

    onUpdate(ctx)
  }

  const drawLine = (x1, y1, x2, y2) => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.strokeWidth = currentPressure
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    onUpdate(ctx)
  }

  const touchStart = ({ touches }) => {
    const stylusTouch = [...touches].find(({ touchType }) => touchType === "stylus")
    if (stylusTouch) {
      const { clientX, clientY } = stylusTouch
      const newTouch = { x: clientX - boundingRect.left, y: clientY - boundingRect.top }
      setCurrentTouch(newTouch)
      drawDot(newTouch.x, newTouch.y)
    }
  }

  const touchMove = ({ touches }) => {
    const stylusTouch = [...touches].find(({ touchType }) => touchType === "stylus")
    if (stylusTouch) {
      const { clientX, clientY } = stylusTouch
      const newTouch = { x: clientX - boundingRect.left, y: clientY - boundingRect.top }
      drawLine(currentTouch.x, currentTouch.y, newTouch.x, newTouch.y)
      setCurrentTouch(newTouch)
    }
  }

  const touchEnd = ({ touches }) => {
    const stylusTouch = [...touches].find(({ touchType }) => touchType === "stylus")
    if (stylusTouch) {
      setCurrentTouch(null)
      const ctx = canvasRef.current.getContext("2d")
      onFinalUpdate(ctx)
    }
  }
  return (
    <canvas
      ref={canvasRef}
      className="drawing-canvas"
      width={width}
      height={height}
      onTouchStart={(e) => touchStart(e)}
      onTouchMove={(e) => touchMove(e)}
      onTouchEnd={(e) => touchEnd(e)}
    ></canvas>
  )
}

export default DrawingCanvas
