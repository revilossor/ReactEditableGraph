import { Component } from "react";
import styled from "styled-components";

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
    graph: this.props.graph
  };

  render() {
    console.log("::render::");
    console.dir({ graph: this.state.graph });

    return (
      <Container>
        <svg width={this.props.width} height={this.props.height}>
          <rect width="100" height="100" fill="#f06" />
        </svg>
      </Container>
    );
  }
}
