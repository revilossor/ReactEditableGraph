import { createRef, Component, Fragment } from "react";
import styled from "styled-components";

import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import Node from "../components/Node";

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

class EmptyComponent extends Component {
  onChangeValue() {}
  render() {
    return <Fragment />;
  }
}

export default class EditableGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
  }

  state = {
    graph: this.props.model
  };

  componentDidMount() {
    this.Viewer.changeTool("auto");
  }

  render() {
    console.log("::render::graph::");
    console.dir({ graph: this.state.graph });

    return (
      <Container>
        <ReactSVGPanZoom
          ref={Viewer => (this.Viewer = Viewer)}
          width={this.props.width}
          height={this.props.height}
          background="#f0e2a3"
          SVGBackground="#f0e2a3"
          customMiniature={EmptyComponent}
          customToolbar={EmptyComponent}
          detectAutoPan={false}
          onClick={event =>
            console.log("click", event.x, event.y, event.originalEvent)
          }
        >
          <svg width={this.props.width} height={this.props.height}>
            <g>
              {this.state.graph.nodes.map((node, i) => (
                <Node model={node} key={i} />
              ))}
            </g>
          </svg>
        </ReactSVGPanZoom>
      </Container>
    );
  }
}
