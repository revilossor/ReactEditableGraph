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
  state = {
    node: this.props.model
  };

  render() {
    return (
      <g>
        <rect
          x={this.state.node.x}
          y={this.state.node.y}
          id={this.state.node.id}
          className="node"
          {...defaults}
        />
        {this.state.node.ports.in.map((port, i, arr) => (
          <Port
            x={this.state.node.x}
            y={this.state.node.y}
            key={i}
            index={i}
            id={`${this.state.node.id}_in_${i}`}
            length={arr.length}
            isInPort="true"
          />
        ))}
        {this.state.node.ports.out.map((port, i, arr) => (
          <Port
            x={this.state.node.x}
            y={this.state.node.y}
            key={i}
            index={i}
            id={`${this.state.node.id}_out_${i}`}
            length={arr.length}
            isInPort="false"
          />
        ))}
      </g>
    );
  }
}
