import * as React from 'react'
import { connect } from 'react-redux'
import PixelGrid from 'src/chip8/pixelGrid'
import { chip8Selectors } from 'src/chip8/store'
import { Chip8 } from 'src/chip8/types'
import styled from 'styled-components'

const StyledPixelGrid = styled(PixelGrid)`
  margin: 16px;
`

const PlayingField = ({ graphics }: StateProps): JSX.Element => {
  return <StyledPixelGrid columns={64} rows={32} scale={10} pixels={graphics} />
}

interface StateProps {
  readonly graphics: ReadonlyArray<number>
}

const mapStateToProps = (state: Chip8): StateProps => ({
  graphics: chip8Selectors.graphicsForRendering(state)
})

// We only want to re-render this component if the draw flag is true.
const areStatesEqual = ({ drawFlag }: Chip8) => !drawFlag

export default connect(
  mapStateToProps,
  null,
  null,
  { areStatesEqual }
)(PlayingField)
