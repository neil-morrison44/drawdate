import { renderOutputImageData } from "./renderOutputImageData"

console.log("start up!")

// Post data to parent thread
// self.postMessage({ foo: "foo" })

// Respond to message from parent thread
self.addEventListener("message", (event) => {
  console.log(event)
  const { imageData, palette } = event.data
  if (imageData && palette) {
    self.postMessage(renderOutputImageData(imageData, palette))
  }
})
