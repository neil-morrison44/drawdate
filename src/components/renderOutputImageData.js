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

let paletteCache = {}

const renderOutputImageData = (imageData, palette, paletteValues) => {
  const { width, height, data } = imageData

  paletteCache = {}

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (x + y * width) * 4
      const inputShadeRed = data[index]
      const inputShadeGreen = data[index + 1]

      if (inputShadeRed > 128 && inputShadeGreen < 128) {
        data[index + 3] = 0
        continue
      }

      const palettePattern =
        paletteCache[inputShadeRed] ||
        (paletteCache[inputShadeRed] = palette[closest(inputShadeRed, paletteValues)])

      let outputShade = 255
      const kernelXLength = palettePattern[0].length
      const kernelYLength = palettePattern.length
      outputShade = palettePattern[y % kernelYLength][x % kernelXLength]

      data[index] = data[index + 1] = data[index + 2] = (outputShade * 255) ^ 255
      data[index + 3] = 255
    }
  }

  return imageData
}

export { renderOutputImageData }
