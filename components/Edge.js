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
  state = {
    edge: this.props.model,
    start: null,
    end: null
  };

  componentDidMount() {
    this.setState({
      start: document.getElementById(this.state.edge.start),
      end: document.getElementById(this.state.edge.end)
    });
  }

  render() {
    return (
      <g>
        <rect
          //          x={this.state.start.cx.baseVal.value}
          //          y={this.state.start.cy.baseVal.value}
          className="edge"
          {...defaults}
        />
      </g>
    );
  }
}
