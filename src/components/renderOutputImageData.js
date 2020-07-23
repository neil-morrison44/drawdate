const paletteCache = {}

const renderOutputImageData = (imageData, width, height, palette) => {
  // const outputImageData = []

  // for (let y = 0; y < height; y++) {
  //   outputImageData.push([...new Array(width).fill(0)])
  // }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      //find current pixel
      let index = (x + y * imageData.width) * 4
      let inputShade = imageData.data[index]
      let inputOpacity = imageData.data[index + 3]

      let paletteColour =
        paletteCache[inputShade] ||
        (paletteCache[inputShade] = palette.find(
          ({ drawingColour }) => drawingColour === inputShade
        ))

      let outputShade = 255
      // console.log(inputOpacity)
      if (paletteColour && inputOpacity > 46) {
        const kernelXLength = paletteColour.outputImageData[0].length
        const kernelYLength = paletteColour.outputImageData.length
        outputShade = paletteColour.outputImageData[y % kernelYLength][x % kernelXLength]
      }
      imageData.data[index] = imageData.data[index + 1] = imageData.data[index + 2] =
        (outputShade * 255) ^ 255
      imageData.data[index + 3] = 255
    }
  }

  return imageData
}

export { renderOutputImageData }
