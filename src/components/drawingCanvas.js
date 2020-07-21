import React, { useRef, useLayoutEffect, useState, Fragment } from "react"

const PRESSURE_FACTOR = 10

const DrawingCanvas = ({
  onUpdate = () => {},
  onFinalUpdate = () => {},
  width = 400,
  height = 240,
  initialImageData,
}) => {
  const canvasRef = useRef()
  const [currentTouch, setCurrentTouch] = useState(null)
  const [boundingRect, setBoundingRect] = useState(null)

  useLayoutEffect(() => {
    if (!boundingRect) setBoundingRect(canvasRef.current.getBoundingClientRect())
  }, [width, height, initialImageData])

  const drawDot = (x, y) => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.fillRect(
      Math.round(x - currentTouch.pressure),
      Math.round(y - currentTouch.pressure),
      Math.round(currentTouch.pressure * 2),
      Math.round(currentTouch.pressure * 2)
    )

    onUpdate(ctx)
  }

  const drawLine = (x1, y1, x2, y2) => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.lineWidth = currentTouch.pressure
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    onUpdate(ctx)
  }

  const touchStart = ({ touches }) => {
    const stylusTouch = [...touches].find(({ touchType }) => touchType === "stylus")
    if (stylusTouch) {
      const { clientX, clientY } = stylusTouch
      const newTouch = {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
        pressure: stylusTouch.force * PRESSURE_FACTOR,
      }
      setCurrentTouch(newTouch)
      drawDot(newTouch.x, newTouch.y)
    }
  }

  const touchMove = ({ touches }) => {
    const stylusTouch = [...touches].find(({ touchType }) => touchType === "stylus")
    if (stylusTouch) {
      const { clientX, clientY } = stylusTouch
      const newTouch = {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
        pressure: stylusTouch.force * PRESSURE_FACTOR,
      }
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
    <Fragment>
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        width={width}
        height={height}
        onTouchStart={(e) => touchStart(e)}
        onTouchMove={(e) => touchMove(e)}
        onTouchEnd={(e) => touchEnd(e)}
      ></canvas>
      {currentTouch?.pressure}
    </Fragment>
  )
}

export default DrawingCanvas
