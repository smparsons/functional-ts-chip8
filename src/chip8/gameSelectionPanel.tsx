import * as React from 'react'
import styled from 'styled-components'

const Panel = styled.div`
  display: grid;
  grid-gap: 16px;
  margin: 16px;
  align-content: start;
  justify-content: start;
`

const GameSelection = styled.div`
  display: grid;
`

const PlayButton = styled.button`
  justify-self: start;
`

const GameSelectionPanel = () => (
  <Panel>
    <GameSelection>
      <span>Please Select a Game:</span>
      <select />
    </GameSelection>
    <PlayButton>Play</PlayButton>
  </Panel>
)

export default GameSelectionPanel
