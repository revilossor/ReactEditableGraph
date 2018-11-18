import { Component } from "react";
import styled from "styled-components";

import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import Node from "./Node";
import Empty from "./Empty";

const Container = styled.div`
  overflow: auto;
  border: 4px solid #664e4c;
  background-color: #f0e2a3;
  margin: 4px;

  @media (min-width: 1200px) {
    margin-left: 10vw;
    margin-right: 10vw;
  }
`;

export default class EditableGraph extends Component {
  state = {
    graph: this.props.model
  };

  componentDidMount() {
    this.Viewer.changeTool("auto");
    this.Viewer.pan(-5000, -5000);
  }

  setDragMode(on = true) {
    this.Viewer.changeTool(on ? "auto" : "none");
  }

  render() {
    return (
      <Container>
        <ReactSVGPanZoom
          ref={Viewer => (this.Viewer = Viewer)}
          width={this.props.width}
          height={this.props.height}
          background="#f0e2a3"
          SVGBackground="#f0e2a3"
          customMiniature={Empty}
          customToolbar={Empty}
          detectAutoPan={false}
          onMouseUp={e => {
            this.setDragMode.call(this);
          }}
        >
          <svg width={this.props.width} height={this.props.height}>
            <g>
              {this.state.graph.nodes.map((node, i) => (
                <Node
                  model={node}
                  key={i}
                  setDragMode={this.setDragMode.bind(this)}
                />
              ))}
            </g>
          </svg>
        </ReactSVGPanZoom>
      </Container>
    );
  }
}
