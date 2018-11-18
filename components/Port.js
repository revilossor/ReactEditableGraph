import { Component } from "react";

const defaults = {
  r: 10,
  fill: "#66a9d3",
  stroke: "#04356c",
  strokeWidth: 5
};

export default class Node extends Component {
  state = {
    target: null
  };

  getPosition({ index, length, isInPort = "true" }) {
    const interval = 100 / length;
    return {
      x: isInPort === "true" ? 0 : 100,
      y:
        length === 1
          ? interval / 2
          : interval / 2 + interval * (index + 1) - interval
    };
  }

  render() {
    const position = this.getPosition(this.props);
    return (
      <circle
        cx={this.props.x + position.x}
        cy={this.props.y + position.y}
        id={this.props.id}
        {...defaults}
      />
    );
  }
}
