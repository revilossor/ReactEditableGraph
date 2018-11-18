import { Component } from "react";

import Draggable from "./Draggable";
import Port from "./Port";

const defaults = {
  width: 100,
  height: 100,
  rx: 15,
  ry: 15,
  fill: "#4186d3",
  stroke: "#04356c",
  strokeWidth: 6
};

export default class Node extends Draggable {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g>
        <rect
          x={this.state.x}
          y={this.state.y}
          id={this.props.model.id}
          className="node"
          {...defaults}
        />
        {this.props.model.ports.in.map((port, i, arr) => (
          <Port
            x={this.state.x}
            y={this.state.y}
            key={i}
            index={i}
            id={`${this.props.model.id}_in_${i}`}
            length={arr.length}
            isInPort="true"
          />
        ))}
        {this.props.model.ports.out.map((port, i, arr) => (
          <Port
            x={this.state.x}
            y={this.state.y}
            key={i}
            index={i}
            id={`${this.props.model.id}_out_${i}`}
            length={arr.length}
            isInPort="false"
          />
        ))}
      </g>
    );
  }
}
