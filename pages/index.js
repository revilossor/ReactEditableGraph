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
    <EditableGraph width={5000} height={5000} model={props.graph} />
  </Layout>
);

Index.getInitialProps = function() {
  return {
    graph: {
      nodes: [{ id: "1", x: 100, y: 80 }, { id: "2", x: 400, y: 300 }],
      edges: [
        {
          start: { node: "1", port: "out_0", points: [{ x: 100, y: 100 }] },
          end: { node: "2", port: "in_1", points: [{ x: 100, y: 120 }] }
        }
      ]
    }
  };
};

export default Index;
