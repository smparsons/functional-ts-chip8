import { Chip8Emulator, createChip8Emulator, io } from 'src/chip8'
import { Func0, Func1 } from 'src/chip8/types'
import { chip8Games } from 'src/constants'

const documentIds = {
  gamesDropdown: 'games-dropdown',
  gameSelectionForm: 'game-selection-form',
  playingField: 'playing-field'
}

const formFields = {
  selectedGame: 'selected-game'
}

const setupPage = (document: Document): Func0<void> => (): void => {
  const gameSelectionDropdown = document.getElementById(documentIds.gamesDropdown)! as HTMLSelectElement
  populateDropdownWithGames(gameSelectionDropdown)

  const emulator = createChip8Emulator()

  const gameSelectionForm = document.getElementById(documentIds.gameSelectionForm)! as HTMLFormElement
  const canvasHtmlElement = document.getElementById(documentIds.playingField)! as HTMLCanvasElement
  const canvasContext = canvasHtmlElement.getContext('2d')!

  io.clearCanvasScreen(canvasContext)

  const audioContext = new AudioContext()

  gameSelectionForm.onsubmit = startEmulator(emulator, canvasContext, audioContext, gameSelectionForm)
  document.onkeypress = pressKey(emulator)
  document.onkeyup = releaseKey(emulator)
}

const populateDropdownWithGames = (dropdown: HTMLSelectElement): void => {
  chip8Games
    .map(gameName => new Option(gameName, gameName))
    .forEach(gameDropdownOption => {
      dropdown.options.add(gameDropdownOption)
    })
}

const startEmulator = (
  emulator: Chip8Emulator,
  canvasContext: CanvasRenderingContext2D,
  audioContext: AudioContext,
  gameSelectionForm: HTMLFormElement
): Func0<boolean> => (): boolean => {
  const formData = new FormData(gameSelectionForm)
  const gameName = formData.get(formFields.selectedGame) as string

  emulator.reset()
  emulator.startGame({ gameName, canvasContext, audioContext })

  return false
}

type KeyPressFunc = Func1<KeyboardEvent, void>

const pressKey = (emulator: Chip8Emulator): KeyPressFunc => (event: KeyboardEvent): void => {
  emulator.pressKey(event.key)
}

const releaseKey = (emulator: Chip8Emulator): KeyPressFunc => (event: KeyboardEvent): void => {
  emulator.releaseKey(event.key)
}

window.onload = setupPage(document)
