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
    target: null
  };

  componentDidMount() {
    this.Viewer.changeTool("auto");
    this.Viewer.pan(-this.props.width / 2, -this.props.height / 2);
  }

  getPortPositions() {
    const getPosition = (node, index, length, isInPort) => {
      const interval = 100 / length;
      return {
        x: node.x + (isInPort ? 0 : 100),
        y:
          node.y +
          (length === 1
            ? interval / 2
            : interval / 2 + interval * (index + 1) - interval)
      };
    };

    return this.state.graph.nodes.reduce((ports, node) => {
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

  getMousePosition(e) {
    var CTM = event.target.getScreenCTM();
    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d
    };
  }

  startDrag(target) {
    this.Viewer.changeTool("none");
    this.setState({ target });
  }

  drag(e) {
    if (this.state.target) {
      e.preventDefault();
      const coord = this.getMousePosition(e);

      const point = {
        x: coord.x - this.state.target.props.width / 2,
        y: coord.y - this.state.target.props.height / 2
      };
      const id = this.state.target.props.model.id;
      if (id.includes(":::")) {
        const edges = this.state.graph.edges;
        const bits = id.split(":::");
        const edge_id = bits[0];
        const connection_id = parseInt(bits[1]);
        const edge = edges.find(edge => edge.id === edge_id);
        if (connection_id === 0) {
          console.log("moved start connection");
        } else if (connection_id - 1 === edge.points.length) {
          console.log("moved end connection");
        } else {
          edge.points[connection_id - 1] = point;
          this.setState({
            graph: {
              ...this.state.graph,
              edges
            }
          });
        }
      } else {
        const nodes = this.state.graph.nodes;
        const node = nodes.find(node => node.id === id);
        node.x = point.x;
        node.y = point.y;
        this.setState({
          graph: {
            ...this.state.graph,
            nodes
          }
        });
      }
    }
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
          onMouseMove={this.drag.bind(this)}
          onMouseUp={e => {
            this.state.target = null;
            this.Viewer.changeTool("auto");
          }}
        >
          <svg width={this.props.width} height={this.props.height}>
            <g>
              {this.state.graph.nodes.map((node, i) => (
                <Node
                  model={node}
                  key={i}
                  startDrag={this.startDrag.bind(this)}
                  width={100}
                  height={100}
                />
              ))}
              {this.state.graph.edges.map((edge, i) => (
                <Edge
                  model={edge}
                  key={i}
                  startDrag={this.startDrag.bind(this)}
                  portPositions={this.getPortPositions.call(this)}
                />
              ))}
            </g>
          </svg>
        </ReactSVGPanZoom>
      </Container>
    );
  }
}
