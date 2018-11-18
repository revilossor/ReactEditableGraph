import { Component } from "react";
import ReactDOM from "react-dom";

export default class Draggable extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
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

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener(
      "mousedown",
      this.startDrag.bind(this)
    );
    ReactDOM.findDOMNode(this).addEventListener(
      "mousemove",
      this.drag.bind(this)
    );
    ReactDOM.findDOMNode(this).addEventListener(
      "mouseup",
      this.endDrag.bind(this)
    );
    ReactDOM.findDOMNode(this).addEventListener(
      "mouseleave",
      this.endDrag.bind(this)
    );
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener("mousedown", this.startDrag);
    ReactDOM.findDOMNode(this).removeEventListener("mousemove", this.drag);
    ReactDOM.findDOMNode(this).removeEventListener("mouseup", this.endDrag);
    ReactDOM.findDOMNode(this).removeEventListener("mouseleave", this.endDrag);
  }
}
