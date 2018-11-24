import * as React from 'react'
import styled from 'styled-components'

// tslint:disable:no-class
// tslint:disable:no-this
// tslint:disable:no-object-mutation

// I'm pretty much forced to use a class here because I need
// a reference to the canvas dom element in order to manipulate
// its pixel data. I'm pretty sure I can't accomplish this with
// a stateless component.

const ScaledCanvas = styled.canvas`
  width: ${(props: PixelGridViewProps) => props.columns * props.scale}px;
  height: ${(props: PixelGridViewProps) => props.rows * props.scale}px;

  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: -o-crisp-edges;
  image-rendering: pixelated;
`

const defaultForeground = '#ffffff'
const defaultBackground = '#000000'

class PixelGrid extends React.Component<Props> {
  private readonly canvas: React.RefObject<HTMLCanvasElement>

  constructor(props: Props) {
    super(props)
    this.canvas = React.createRef()
  }

  public componentDidMount(): void {
    this.renderPixelsOnCanvas()
  }

  public componentDidUpdate(): void {
    this.renderPixelsOnCanvas()
  }

  public render(): JSX.Element {
    return (
      <>
        <ScaledCanvas
          width={this.props.columns}
          height={this.props.rows}
          ref={this.canvas}
          {...this.props}
        />
      </>
    )
  }

  private renderPixelsOnCanvas(): void {
    const canvas = this.canvas.current

    if (canvas) {
      const context = canvas.getContext('2d')

      if (context) {
        this.props.pixels.forEach((pixel, index) => {
          const coordinateX = index % this.props.columns
          const coordinateY = Math.floor(index / this.props.columns)

          context.fillStyle = pixel
            ? this.props.foregroundColor || defaultForeground
            : this.props.backgroundColor || defaultBackground
          context.fillRect(coordinateX, coordinateY, 1, 1)
        })
      }
    }
  }
}

interface PixelGridViewProps {
  readonly columns: number
  readonly rows: number
  readonly scale: number
  readonly foregroundColor?: string
  readonly backgroundColor?: string
}

interface Props extends PixelGridViewProps, React.CanvasHTMLAttributes<HTMLCanvasElement> {
  readonly pixels: Uint8Array
}

export default PixelGrid
