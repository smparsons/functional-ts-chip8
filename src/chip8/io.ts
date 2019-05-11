import { chip8NumberOfColumns, chip8NumberOfRows, defaultPixelColor } from 'src/constants'

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
  oscillator.frequency.setTargetAtTime(400, audioContext.currentTime, 0.01)
  gain.connect(audioContext.destination)
  gain.gain.setTargetAtTime(1, audioContext.currentTime, 0.01)
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

const getGameBytes = async (gameName: string): Promise<Uint8Array> => {
  const response = await fetch(`roms/${gameName}`)
  const buffer = await response.arrayBuffer()
  return new Uint8Array(buffer)
}

const generateRandomSeed = (): number => Math.floor(Math.random() * 1000)

export const io = { clearCanvasScreen, renderGraphics, playBeep, getGameBytes, generateRandomSeed }
