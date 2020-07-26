import React from "react"
const TOOL_LIST = [
  {
    name: "pencil",
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="18px"
        height="18px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </svg>
    ),
  },
  {
    name: "fill",
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="18px"
        height="18px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z" />
      </svg>
    ),
  },
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
