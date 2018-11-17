import { Component } from "react";
import styled from "styled-components";

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
    node: this.props.model
  };

  // TODO work out x from percentage unit in state...

  render() {
    console.log("::render::node::");
    console.dir({ node: this.state.node });

    return <rect {...defaults} {...this.state.node} />;
  }
}
