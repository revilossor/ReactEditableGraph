import { Component } from "react";

const defaults = {
  width: 100,
  height: 100,
  rx: 15,
  ry: 15,
  fill: "#4186d3",
  stroke: "#04356c",
  strokeWidth: 6
};

export default class Edge extends Component {
  render() {
    const startPos = this.props.portPositions[this.props.model.start];
    const endPos = this.props.portPositions[this.props.model.end];

    return (
      <g>
        <rect
          x={this.props.portPositions[this.props.model.start].x}
          y={this.props.portPositions[this.props.model.start].y}
          className="edge"
          {...defaults}
        />
      </g>
    );
  }
}
