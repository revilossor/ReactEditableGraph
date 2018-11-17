import Layout from "../components/Layout";
import Text from "../components/Text";

import styled from "styled-components";

const Container = styled.div`
  margin-top: 1.5rem;
`;

const Index = props => (
  <Layout colour="#f9d4bb" columns="1fr" rows="10vh 1fr">
    <Container>
      <Text colour="#664e4c" id="title" size="4rem">
        React Editable Graph
      </Text>
    </Container>
    <div>graph go here</div>
  </Layout>
);

export default Index;
