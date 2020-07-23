const paletteCache = {}

function closest(num, arr) {
  let curr = arr[0]
  let diff = Math.abs(num - curr)
  for (let val = 0; val < arr.length; val++) {
    let newdiff = Math.abs(num - arr[val])
    if (newdiff < diff) {
      diff = newdiff
      curr = arr[val]
    }
  }
  return curr
}

const renderOutputImageData = (imageData, palette) => {
  const paletteValues = Object.keys(palette)

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      //find current pixel
      let index = (x + y * imageData.width) * 4
      let inputShade = imageData.data[index]
      let inputOpacity = imageData.data[index + 3]

      let palettePattern = palette[closest(inputShade, paletteValues)]

      let outputShade = 255
      // console.log(inputOpacity)
      if (palettePattern) {
        const kernelXLength = palettePattern[0].length
        const kernelYLength = palettePattern.length
        outputShade = palettePattern[y % kernelYLength][x % kernelXLength]
      }
      imageData.data[index] = imageData.data[index + 1] = imageData.data[index + 2] =
        (outputShade * 255) ^ 255
      imageData.data[index + 3] = 255
    }
  }

  return imageData
}

export { renderOutputImageData }
