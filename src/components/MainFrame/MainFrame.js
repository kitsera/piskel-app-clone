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
      x: null,
    }
  }

  clickHandeler(event) {
    const ctx = this.refs.canvas.getContext('2d')
    rect({ ctx, x: event.clientX, y: event.clientY, width: 10, height: 10})
  }

  render() {
    return (
      <canvas
        ref="canvas"
        height={500}
        width={500}
        onMouseDown={e => this.clickHandeler(e)}
      />
    );
  }
}
