import * as React from 'react'
import GameSelectionForm from 'src/chip8/gameSelectionForm'
import PlayingField from 'src/chip8/playingField'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #root {
    height: 100%;
  }
`

const PageContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 100%;
`

const App = () => (
  <>
    <GlobalStyle />
    <PageContainer>
      <PlayingField />
      <GameSelectionForm />
    </PageContainer>
  </>
)

export default App
