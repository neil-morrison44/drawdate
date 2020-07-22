const paletteCache = {}

const renderOutputImageData = (imageData, width, height, palette) => {
  const outputImageData = []

  for (let y = 0; y < height; y++) {
    outputImageData.push([...new Array(width).fill(0)])
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      //find current pixel
      let index = (x + y * imageData.width) * 4
      let red = imageData.data[index]

      // console.log(index, red)
      // if (red !== 0) {
      //   console.log(red)
      // }

      let paletteColour =
        paletteCache[red] ||
        (paletteCache[red] = palette.find(({ drawingColour }) => drawingColour === red))

      if (paletteColour) {
        const kernelXLength = paletteColour.outputImageData[0].length
        const kernelYLength = paletteColour.outputImageData.length
        outputImageData[y][x] = paletteColour.outputImageData[y % kernelYLength][x % kernelXLength]
      }
    }
  }

  return outputImageData
}

export { renderOutputImageData }
