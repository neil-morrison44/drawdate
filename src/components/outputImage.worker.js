import { renderOutputImageData } from "./renderOutputImageData"

self.addEventListener("message", (event) => {
  const { imageData, palette, paletteValues } = event.data

  self.postMessage(renderOutputImageData(imageData, palette, paletteValues))
})
