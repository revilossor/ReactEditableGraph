import Layout from "../components/Layout";
import Text from "../components/Text";
import EditableGraph from "../components/EditableGraph";

import styled from "styled-components";

const Container = styled.div`
  margin-top: 1.5rem;
`;

const Index = props => (
  <Layout colour="#f9d4bb" columns="1fr" rows="10vh 1fr">
    <Container>
      <Text colour="#664e4c" id="title" size="4rem">
        Editable Graph
      </Text>
    </Container>
    <EditableGraph width={10000} height={10000} model={props.graph} />
  </Layout>
);

Index.getInitialProps = function() {
  return {
    graph: {
      nodes: [
        { id: "1", x: 5100, y: 5080, ports: { in: [], out: ["", ""] } },
        { id: "2", x: 5470, y: 5180, ports: { in: [""], out: [""] } },
        { id: "2.5", x: 5500, y: 5500, ports: { in: [""], out: [] } },
        {
          id: "3",
          x: 5700,
          y: 5700,
          ports: { in: ["", "", ""], out: [""] }
        }
      ],
      edges: [
        {
          id: "1_out_0_to_2_in_0",
          start: "1_out_0",
          end: "2_in_0",
          points: [{ x: 5300, y: 5100 }]
        },
        {
          id: "1_out_1_to_2.5_in_0",
          start: "1_out_1",
          end: "2.5_in_0",
          points: [{ x: 5250, y: 5300 }, { x: 5300, y: 5500 }]
        }
      ]
    }
  };
};

export default Index;
