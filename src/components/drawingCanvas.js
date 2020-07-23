import React, { useRef, useLayoutEffect, useState, Fragment } from "react"

const PRESSURE_FACTOR = 10
const TOUCH_TYPE = "stylus"
// const TOUCH_TYPE = undefined

const DrawingCanvas = ({
  onUpdate = () => {},
  onFinalUpdate = () => {},
  width = 400,
  height = 240,
  initialImageData,
  colour,
  tool,
}) => {
  const canvasRef = useRef()
  const [currentTouch, setCurrentTouch] = useState(null)
  const [boundingRect, setBoundingRect] = useState(null)

  useLayoutEffect(() => {
    if (!boundingRect) setBoundingRect(canvasRef.current.getBoundingClientRect())
    const ctx = canvasRef.current.getContext("2d")
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
  }, [width, height, initialImageData])

  const setCanvasColour = (ctx) => {
    switch (tool) {
      case "pencil":
        ctx.fillStyle = ctx.strokeStyle = `rgb(${colour}, ${colour}, ${colour})`
        break
      default:
        break
    }
  }

  const drawDot = (x, y) => {
    const ctx = canvasRef.current.getContext("2d")
    setCanvasColour(ctx)
    const size = (currentTouch?.pressure || 1) / 4
    ctx.fillRect(
      Math.round(x - size),
      Math.round(y - size),
      Math.round(size * 2),
      Math.round(size * 2)
    )

    onUpdate(ctx)
  }

  const drawLine = (x1, y1, x2, y2) => {
    const ctx = canvasRef.current.getContext("2d")
    setCanvasColour(ctx)
    ctx.lineWidth = currentTouch?.pressure || 1
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    onUpdate(ctx)
  }

  const touchStart = ({ touches }) => {
    const stylusTouch = [...touches].find(({ touchType }) => touchType === TOUCH_TYPE)
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
    const stylusTouch = [...touches].find(({ touchType }) => touchType === TOUCH_TYPE)
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
    const stylusTouch = [...touches].find(({ touchType }) => touchType === TOUCH_TYPE)
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
      {tool}
      {colour}
    </Fragment>
  )
}

export default DrawingCanvas
