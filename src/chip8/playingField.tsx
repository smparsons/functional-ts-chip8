import * as React from 'react'
import styled from 'styled-components'

import PixelGrid from './pixelGrid'

const StyledPixelGrid = styled(PixelGrid)`
  margin: 32px;
`

const PlayingField = (): JSX.Element => (
  <StyledPixelGrid
    columns={64}
    rows={32}
    scale={10}
    pixels={[].concat.apply([], Array(1024).fill([0x0, 0x0, 0x0, 0xff, 0xff, 0xff, 0xff, 0xff]))}
  />
)

export default PlayingField
