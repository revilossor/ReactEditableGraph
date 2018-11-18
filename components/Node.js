import { Component } from "react";

const defaults = {
  width: 100,
  height: 100,
  rx: 15,
  ry: 15,
  fill: "#c1d37f",
  stroke: "#b1c36f",
  strokeWidth: 4
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
      e.target.setAttributeNS(null, "x", coord.x - 50);
      e.target.setAttributeNS(null, "y", coord.y - 50);
    }
  }

  endDrag(e) {
    e.preventDefault();
    this.props.setDragMode.call(null);
    this.setState({ dragging: false });
  }

  render() {
    return (
      <svg>
        <rect
          className="node"
          {...defaults}
          x={this.state.node.x + 5000}
          y={this.state.node.y + 5000}
          onMouseDown={this.startDrag.bind(this)}
          onMouseMove={this.drag.bind(this)}
          onMouseUp={this.endDrag.bind(this)}
          onMouseLeave={this.endDrag.bind(this)}
        />
      </svg>
    );
  }
}
