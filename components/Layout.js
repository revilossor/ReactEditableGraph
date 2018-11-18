import styled from "styled-components";

import { Fragment } from "react";

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css?family=Bowlby+One+SC');
  .draggable:hover {
    cursor: move;
  }
  rect.node:hover {
    fill: #488dda;
  }
  circle.port:hover {
    cursor: crosshair;
    fill: #4186d3;
  }
  path.edge:hover {
    cursor: crosshair;
  }
`;

const Stage = styled.div`
  background-color: ${props => props.colour};
  display: grid;
  grid-template-columns: ${props => props.columns};
  grid-template-rows: ${props => props.rows};
  grid-gap: 10px;
  width: 100vw;
  height: 100vh;
`;

const Layout = props => (
  <Fragment>
    <GlobalStyle />
    <Stage {...props}>{props.children}</Stage>
  </Fragment>
);

export default Layout;
