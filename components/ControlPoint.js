import { Component } from "react";

import Draggable from "./Draggable";

const defaults = {
  fill: "#04356c",
  stroke: "#04356c",
  strokeWidth: 3,
  r: 8
};

export default class ControlPoint extends Draggable {
  render() {
    return (
      <circle
        cx={this.props.model.x}
        cy={this.props.model.y}
        className="controlPoint"
        {...defaults}
      />
    );
  }
}
