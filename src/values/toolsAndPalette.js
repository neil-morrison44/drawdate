import React from "react"
import {
  FaPencilAlt,
  FaFillDrip,
  FaEraser,
  FaMask,
  FaRandom,
  FaHandPointDown,
} from "react-icons/fa"

const TOOL_LIST = [
  {
    name: "pencil",
    Icon: () => <FaPencilAlt />,
  },
  {
    name: "fill",
    Icon: () => <FaFillDrip />,
  },
  {
    name: "mask",
    Icon: () => <FaEraser />,
  },
  { name: "mask fill", Icon: () => <FaMask /> },
  { name: "smudge", Icon: () => <FaHandPointDown /> },
]

const COLOUR_PALETTE = {
  0: [[1]],
  28: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  127: [
    [0, 1],
    [1, 0],
  ],
  227: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  255: [[0]],
}

export { TOOL_LIST, COLOUR_PALETTE }
