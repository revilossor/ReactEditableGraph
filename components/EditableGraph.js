import { Component } from "react";
import styled from "styled-components";

import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import Node from "./Node";
import Edge from "./Edge";

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
    graph: this.props.model,
    portPositions: this.getPortPositions(this.props.model)
  };

  componentDidMount() {
    this.Viewer.changeTool("auto");
    this.Viewer.pan(-5000, -5000);
  }

  setDragMode(on = true) {
    this.Viewer.changeTool(on ? "auto" : "none");
  }

  getPortPositions(graph) {
    const getPosition = (node, index, length, isInPort) => {
      const interval = 100 / length;
      return {
        x: node.x + (isInPort ? 0 : 100),
        y:
          node.y + length === 1
            ? interval / 2
            : interval / 2 + interval * (index + 1) - interval
      };
    };

    return graph.nodes.reduce((ports, node) => {
      node.ports.in.forEach((port, i) => {
        ports[`${node.id}_in_${i}`] = getPosition(
          node,
          i,
          node.ports.in.length,
          true
        );
      });
      node.ports.out.forEach((port, i) => {
        ports[`${node.id}_out_${i}`] = getPosition(
          node,
          i,
          node.ports.out.length,
          false
        );
      });
      return ports;
    }, {});
  }

  updateGraphState() {
    const nodes = Array.from(document.querySelectorAll("rect.node"));
    this.setState(
      {
        graph: {
          ...this.state.graph,
          nodes: this.state.graph.nodes.map(node => {
            const element = nodes.find(el => el.id === node.id);
            return {
              ...node,
              x: element.x.baseVal.value,
              y: element.y.baseVal.value
            };
          })
        }
      },
      () => {
        console.log("new graph state");
        console.dir(this.state.graph);
      }
    );
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
            this.updateGraphState.call(this);
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
              {this.state.graph.edges.map((edge, i) => (
                <Edge
                  model={edge}
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
