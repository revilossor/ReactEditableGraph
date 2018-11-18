import { Component } from "react";
import ReactDOM from "react-dom";

export default class Draggable extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    dragging: false,
    x: this.props.model.x,
    y: this.props.model.y
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
        x: coord.x - this.props.width / 2,
        y: coord.y - this.props.height / 2
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
    const thisNode = ReactDOM.findDOMNode(this);
    thisNode.addEventListener("mousedown", this.startDrag.bind(this));
    thisNode.addEventListener("mousemove", this.drag.bind(this));
    thisNode.addEventListener("mouseup", this.endDrag.bind(this));
    thisNode.addEventListener("mouseleave", this.endDrag.bind(this));
    thisNode.classList.add("draggable");
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener("mousedown", this.startDrag);
    ReactDOM.findDOMNode(this).removeEventListener("mousemove", this.drag);
    ReactDOM.findDOMNode(this).removeEventListener("mouseup", this.endDrag);
    ReactDOM.findDOMNode(this).removeEventListener("mouseleave", this.endDrag);
  }
}
