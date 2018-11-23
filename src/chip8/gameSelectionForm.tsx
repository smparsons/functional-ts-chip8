import * as React from 'react'
import { Field, FieldRenderProps, Form, FormRenderProps } from 'react-final-form'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Chip8Action, chip8Actions } from 'src/chip8/store'
import { chip8Games } from 'src/constants'
import styled from 'styled-components'

import { StartGameRequest } from './types'

const Panel = styled.div`
  display: grid;
  grid-gap: 16px;
  margin: 16px;
  align-content: start;
  justify-content: start;
`

const PlayButton = styled.button`
  justify-self: start;
`

const fields = {
  gameName: 'gameName'
}

const mapGame = (game: string): JSX.Element => (
  <option key={game} value={game}>
    {game}
  </option>
)

const required = (value: string): string | undefined => (value ? undefined : 'Please Select a Game')

const GameSelectionForm = ({ startGame }: DispatchProps): JSX.Element => (
  <Panel>
    <Form onSubmit={startGame}>
      {({ handleSubmit, hasValidationErrors }: FormRenderProps): JSX.Element => (
        <form onSubmit={handleSubmit}>
          <span>Please Select a Game:</span>
          <Field name={fields.gameName} validate={required}>
            {({ input }: FieldRenderProps): JSX.Element => (
              <select name={fields.gameName} {...input}>
                <option value="">Please Select a Game</option>
                {chip8Games.map(mapGame)}
              </select>
            )}
          </Field>
          <PlayButton type="submit" disabled={hasValidationErrors}>
            Play
          </PlayButton>
        </form>
      )}
    </Form>
  </Panel>
)

interface DispatchProps {
  readonly startGame: (request: StartGameRequest) => Chip8Action
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  startGame: (request: StartGameRequest): Chip8Action => dispatch(chip8Actions.startGame(request))
})

export default connect(
  null,
  mapDispatchToProps
)(GameSelectionForm)
