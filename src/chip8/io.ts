import { chip8NumberOfColumns, chip8NumberOfRows } from 'src/constants'

// tslint:disable:no-object-mutation
// tslint:disable:no-let

const clearCanvasScreen = (canvasContext: CanvasRenderingContext2D): void => {
  canvasContext.fillStyle = '#000000'
  canvasContext.fillRect(0, 0, chip8NumberOfColumns, chip8NumberOfRows)
}

const renderGraphics = (graphics: Uint8Array, canvasContext: CanvasRenderingContext2D): void => {
  clearCanvasScreen(canvasContext)

  for (let i = 0; i < graphics.length; i++) {
    if (graphics[i]) {
      const coordinateX = i % chip8NumberOfColumns
      const coordinateY = Math.floor(i / chip8NumberOfColumns)

      canvasContext.fillStyle = '#ffffff'
      canvasContext.fillRect(coordinateX, coordinateY, 1, 1)
    }
  }
}

export const io = { clearCanvasScreen, renderGraphics }
