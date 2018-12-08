import { chip8NumberOfColumns, chip8NumberOfRows, defaultPixelColor } from 'src/constants'

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

      canvasContext.fillStyle = defaultPixelColor
      canvasContext.fillRect(coordinateX, coordinateY, 1, 1)
    }
  }
}

const playBeep = (audioContext: AudioContext): void => {
  const oscillator = audioContext.createOscillator()
  const gain = audioContext.createGain()
  oscillator.connect(gain)
  oscillator.frequency.value = 400
  gain.connect(audioContext.destination)
  gain.gain.value = 1
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

export const io = { clearCanvasScreen, renderGraphics, playBeep }
