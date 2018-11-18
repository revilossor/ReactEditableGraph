import { Component } from "react";

import Draggable from "./Draggable";

const defaults = {
  fill: "#ff5900",
  stroke: "#a63a00",
  strokeWidth: 3,
  r: 8
};

export default class ControlPoint extends Draggable {
  onDrag(e) {
    this.props.onControlPointMoved(this.props.index, e);
  }

  render() {
    return (
      <circle
        cx={this.state.x}
        cy={this.state.y}
        className="controlPoint"
        {...defaults}
      />
    );
  }
}
