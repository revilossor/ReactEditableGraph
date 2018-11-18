import { Component } from "react";
import ReactDOM from "react-dom";

export default class Draggable extends Component {
  startDrag(e) {
    this.props.startDrag(this);
  }

  componentDidMount() {
    const thisNode = ReactDOM.findDOMNode(this);
    thisNode.addEventListener("mousedown", this.startDrag.bind(this));
    thisNode.classList.add("draggable");
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener("mousedown", this.startDrag);
  }
}
