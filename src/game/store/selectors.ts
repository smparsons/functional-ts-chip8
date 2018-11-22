import { RootState } from 'src/rootReducer'

export const gameSelectors = {
  selectedGameUrl: (state: RootState): string | null =>
    state.game.selectedGame ? `/roms/${state.game.selectedGame}` : null
}
