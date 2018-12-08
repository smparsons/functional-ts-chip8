import { Chip8Emulator, createChip8Emulator } from 'src/chip8'
import { Func0, Func1 } from 'src/chip8/types'
import { chip8Games } from 'src/constants'

// tslint:disable:no-object-mutation

const setupPage = (document: Document): Func0<void> => (): void => {
  const gameSelectionDropdown = document.getElementById('games-dropdown')! as HTMLSelectElement
  populateGameSelectionDropdown(gameSelectionDropdown)

  const emulator = createChip8Emulator()

  const gameSelectionForm = document.getElementById('game-selection-form')! as HTMLFormElement
  const canvasHtmlElement = document.getElementById('playing-field')! as HTMLCanvasElement
  const canvasContext = canvasHtmlElement.getContext('2d')!

  gameSelectionForm.onsubmit = startEmulator(emulator, canvasContext, gameSelectionForm)
  document.onkeypress = pressKey(emulator)
  document.onkeyup = releaseKey(emulator)
}

const populateGameSelectionDropdown = (gameSelectionDropdown: HTMLSelectElement): void => {
  chip8Games
    .map(gameName => new Option(gameName, gameName))
    .forEach(gameDropdownOption => {
      gameSelectionDropdown.options.add(gameDropdownOption)
    })
}

const startEmulator = (
  emulator: Chip8Emulator,
  canvasContext: CanvasRenderingContext2D,
  gameSelectionForm: HTMLFormElement
): Func0<boolean> => (): boolean => {
  const formData = new FormData(gameSelectionForm)
  const gameName = formData.get('selected-game') as string

  emulator.reset()
  emulator.startGame(gameName, canvasContext)

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
