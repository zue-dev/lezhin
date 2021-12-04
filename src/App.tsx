import React from "react";
import styled from "styled-components";
import Page from "./pages/Page";

const Wrap = styled.div`
  max-width: 414px;
  margin: 0 auto;
  padding: 32px 16px;
  background-color: white;
`;

function App() {
  return (
    <Wrap>
      <h1>로맨스 장르 랭킹</h1>
      <Page />
    </Wrap>
  );
}

export default App;
