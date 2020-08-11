import React, {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react"
import { flood_fill } from "wasm-flood-fill"
import { ImplementContext, IMPLEMENT_OPTIONS } from "./implementContextProvider"

const PRESSURE_FACTOR = 10
const TOUCH_TYPE = "stylus"

const DrawingCanvas = (
  {
    onUpdate = () => {},
    onSetUndoPoint = () => {},
    width = 400,
    height = 240,
    initialImageData,
    colour,
    tool,
    palette,
  },
  ref
) => {
  const canvasRef = useRef()
  const { implement } = useContext(ImplementContext)
  const [currentTouch, setCurrentTouch] = useState(null)
  const [boundingRect, setBoundingRect] = useState(null)

  useImperativeHandle(ref, () => ({
    toDataURL: (mode) => canvasRef.current.toDataURL(),
  }))

  useLayoutEffect(() => {
    if (!boundingRect) setBoundingRect(canvasRef.current.getBoundingClientRect())
    const ctx = canvasRef.current.getContext("2d")
    ctx.fillStyle = "white"
    if (initialImageData) {
      ctx.putImageData(initialImageData, 0, 0)
    } else {
      ctx.fillRect(0, 0, width, height)
    }
    onUpdate(ctx)
  }, [width, height, initialImageData])

  useLayoutEffect(() => {
    const ctx = canvasRef.current.getContext("2d")
    onUpdate(ctx)
  }, [palette])

  const setCanvasColour = (ctx) => {
    if (tool === "mask") {
      ctx.fillStyle = ctx.strokeStyle = "red"
    } else {
      ctx.fillStyle = ctx.strokeStyle = `rgb(${colour}, ${colour}, ${colour})`
    }
  }

  const drawDot = (x, y) => {
    const ctx = canvasRef.current.getContext("2d")
    onSetUndoPoint(ctx)
    if (tool === "pencil" || tool === "mask") {
      setCanvasColour(ctx)
      const size = (currentTouch?.pressure || 1) / 4
      ctx.fillRect(
        Math.round(x - size),
        Math.round(y - size),
        Math.round(size * 2),
        Math.round(size * 2)
      )
    }

    if (tool === "fill" || tool === "mask fill") {
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = flood_fill(
        ctx,
        imageData.data,
        Math.round(x),
        Math.round(y),
        tool === "mask fill" ? 255 : colour,
        tool === "mask fill" ? 0 : colour,
        tool === "mask fill" ? 0 : colour,
        200,
        100
      )

      ctx.putImageData(new ImageData(data, width, height), 0, 0)
    }

    onUpdate(ctx)
  }

  const drawLine = (x1, y1, x2, y2) => {
    const ctx = canvasRef.current.getContext("2d")
    if (tool === "pencil" || tool === "mask") {
      setCanvasColour(ctx)
      ctx.lineWidth = currentTouch?.pressure || 1
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
    onUpdate(ctx)
  }

  const findTouch = (touches) => {
    if (implement === IMPLEMENT_OPTIONS.STYLUS) {
      return [...touches].find(({ touchType }) => touchType === TOUCH_TYPE)
    } else {
      return touches[0]
    }
  }

  const touchStart = ({ touches }) => {
    const activeTouch = findTouch(touches)
    if (activeTouch) {
      const { clientX, clientY } = activeTouch
      const newTouch = {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
        pressure: activeTouch.force * PRESSURE_FACTOR,
      }
      setCurrentTouch(newTouch)
      drawDot(newTouch.x, newTouch.y)
    }
  }

  const touchMove = ({ touches }) => {
    const activeTouch = findTouch(touches)
    if (activeTouch) {
      const { clientX, clientY } = activeTouch
      const newTouch = {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
        pressure: activeTouch.force * PRESSURE_FACTOR,
      }
      drawLine(currentTouch.x, currentTouch.y, newTouch.x, newTouch.y)
      setCurrentTouch(newTouch)
    }
  }

  const touchEnd = () => {
    if (currentTouch) setCurrentTouch(null)
  }

  const onMouseDown = (e) => {
    if (implement !== IMPLEMENT_OPTIONS.MOUSE) return
    touchStart({ touches: [{ ...e, force: 0.5 }] })
  }

  const onMouseMove = (e) => {
    if (implement !== IMPLEMENT_OPTIONS.MOUSE) return
    if (currentTouch) touchMove({ touches: [{ ...e, force: 0.5 }] })
  }

  const onMouseUp = (e) => {
    if (implement !== IMPLEMENT_OPTIONS.MOUSE) return
    touchEnd()
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
      onMouseDown={(e) => onMouseDown(e)}
      onMouseMove={(e) => onMouseMove(e)}
      onMouseUp={(e) => onMouseUp(e)}
    ></canvas>
  )
}

export default forwardRef(DrawingCanvas)
