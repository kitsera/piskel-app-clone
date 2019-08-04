import React from "react";
import "./MainFrame.css";

function rect(props) {
  const { ctx, x, y, width, height } = props;
  ctx.fillRect(x, y, width, height);
}

export default class MainFrame extends React.Component {
  constructor() {
    super();
    this.state = {
      clicking: false
    };
  }

  getPixelCoordinates(x, y) {
    const rect = this.refs.canvas.getBoundingClientRect();
    x = x - rect.x;
    y = y - rect.y;
    const pixelX = Math.floor(x / 32) * 32;
    const pixelY = Math.floor(y / 32) * 32;
    return { x: pixelX, y: pixelY };
  }

  canvas() {
    return this.refs.canvas;
  }

  onMouseDownHandeler(event) {
    this.setState({ clicking: true });
    const ctx = this.canvas().getContext("2d");
    const pixelCoordinates = this.getPixelCoordinates(
      event.clientX,
      event.clientY
    );
    rect({
      ctx,
      x: pixelCoordinates.x,
      y: pixelCoordinates.y,
      width: 32,
      height: 32
    });
  }

  onMouseUpHandeler(event) {
    this.setState({ clicking: false });
  }

  onMouseMoveHandeler(event) {
    const clicking = this.state.clicking;
    if (clicking === false) {
      return;
    } else {
      const ctx = this.canvas().getContext("2d");
      const pixelCoordinates = this.getPixelCoordinates(
        event.clientX,
        event.clientY
      );
      rect({
        ctx,
        x: pixelCoordinates.x,
        y: pixelCoordinates.y,
        width: 32,
        height: 32
      });
    }
  }

  render() {
    return (
      <canvas
        ref="canvas"
        height={1024}
        width={1024}
        onMouseDown={e => this.onMouseDownHandeler(e)}
        onMouseUp={e => this.onMouseUpHandeler(e)}
        onMouseMove={e => this.onMouseMoveHandeler(e)}
      />
    );
  }
}
