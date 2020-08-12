const getPixel = (x, y, imageData) => {
  const index = y * (imageData.width * 4) + x * 4
  return [index, index + 1, index + 2, index + 3].map((i) => imageData.data[i])
}

const setPixel = (x, y, imageData, [r, g, b, a]) => {
  const index = y * (imageData.width * 4) + x * 4

  imageData.data[index] = r
  imageData.data[index + 1] = g
  imageData.data[index + 2] = b
  imageData.data[index + 3] = a
  return imageData
}

const randomXY = (startX, startY, spread, width, height) => {
  let x = -1
  let y = -1

  while (x < 0 || x > width) {
    x = startX + Math.round(spread * Math.random() - spread / 2)
  }
  while (y < 0 || y >= height) {
    y = startY + Math.round(spread * Math.random() - spread / 2)
  }

  return [x, y]
}

const pixelSwap = (ctx, x, y, spread, swaps) => {
  x = Math.floor(x)
  y = Math.floor(y)
  const { width, height } = ctx.canvas
  const imageData = ctx.getImageData(0, 0, width, height)

  for (let index = 0; index < swaps; index++) {
    const [sourceX, sourceY] = randomXY(x, y, spread, width, height)
    const [destX, destY] = randomXY(x, y, spread, width, height)

    const sourcePixel = getPixel(sourceX, sourceY, imageData)
    const destPixel = getPixel(destX, destY, imageData)

    setPixel(destX, destY, imageData, sourcePixel)
    setPixel(sourceX, sourceY, imageData, destPixel)
  }

  return imageData
}

export { pixelSwap }
