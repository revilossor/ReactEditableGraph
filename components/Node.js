import { Component } from "react";

import Draggable from "./Draggable";
import Port from "./Port";

const defaults = {
  rx: 15,
  ry: 15,
  fill: "#4186d3",
  stroke: "#04356c",
  strokeWidth: 6
};

export default class Node extends Draggable {
  render() {
    return (
      <g>
        <rect
          x={this.props.model.x}
          y={this.props.model.y}
          id={this.props.model.id}
          className="node"
          width={this.props.width}
          height={this.props.height}
          {...defaults}
        />
        {this.props.model.ports.in.map((port, i, arr) => (
          <Port
            x={this.props.model.x}
            y={this.props.model.y}
            key={i}
            index={i}
            id={`${this.props.model.id}_in_${i}`}
            length={arr.length}
            isInPort="true"
          />
        ))}
        {this.props.model.ports.out.map((port, i, arr) => (
          <Port
            x={this.props.model.x}
            y={this.props.model.y}
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
