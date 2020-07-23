import { renderOutputImageData } from "./renderOutputImageData"

self.addEventListener("message", (event) => {
  const { imageData, palette } = event.data
  if (imageData && palette) {
    self.postMessage(renderOutputImageData(imageData, palette))
  }
})
