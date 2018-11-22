import { RootState } from 'src/rootReducer'

export const gameSelectors = {
  selectedGame: ({ game }: RootState) => game.selectedGame
}
