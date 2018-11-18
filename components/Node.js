import { Component } from "react";

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

export default class Node extends Component {
  state = {
    node: this.props.model,
    dragging: false
  };

  getMousePosition(evt) {
    var CTM = event.target.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  startDrag(e) {
    e.preventDefault();
    this.props.setDragMode.call(null, false);
    this.setState({ dragging: true });
  }

  drag(e) {
    if (this.state.dragging) {
      e.preventDefault();
      const coord = this.getMousePosition(e);
      this.setState({
        node: { ...this.state.node, x: coord.x - 50, y: coord.y - 50 }
      });
    }
  }

  endDrag(e) {
    e.preventDefault();
    this.props.setDragMode.call(null);
    this.setState({
      dragging: false
    });
  }

  render() {
    return (
      <g>
        <rect
          onMouseDown={this.startDrag.bind(this)}
          onMouseMove={this.drag.bind(this)}
          onMouseUp={this.endDrag.bind(this)}
          onMouseLeave={this.endDrag.bind(this)}
          x={this.state.node.x}
          y={this.state.node.y}
          className="node"
          {...defaults}
        />
        {this.state.node.ports.in.map((port, i, arr) => (
          <Port
            x={this.state.node.x}
            y={this.state.node.y}
            key={i}
            index={i}
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
            length={arr.length}
            isInPort="false"
          />
        ))}
      </g>
    );
  }
}
