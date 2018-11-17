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
    <EditableGraph graph="" />
  </Layout>
);

export default Index;
