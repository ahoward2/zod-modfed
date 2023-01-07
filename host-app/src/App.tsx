import React from "react";
import styled from "styled-components";
import { ItemList } from "./ItemList";

const RemoteCart = React.lazy(() => import("checkout/Cart"));

const App = () => {
  return (
    <AppWrapper>
      <h1>Ecomm Store</h1>
      <div style={{ width: "600px", height: "400px", display: "flex" }}>
        <ItemList />
        <React.Suspense fallback="loading cart">
          <RemoteCart></RemoteCart>
        </React.Suspense>
      </div>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
