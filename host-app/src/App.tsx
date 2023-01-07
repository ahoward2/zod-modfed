import React from "react";
import { ItemList } from "./ItemList";
import Cart from "@mf-types/checkout/_types/Cart/Cart";
const RemoteCart = React.lazy(
  () => import("checkout/Cart")
) as unknown as typeof Cart;

const App = () => {
  return (
    <>
      <br></br>
      <h1>Ecomm Store</h1>
      <h2>Cart consumed via module federation</h2>
      <br></br>
      <div style={{ width: "600px", height: "400px", display: "flex" }}>
        <ItemList />
        <React.Suspense fallback="loading cart">
          <RemoteCart></RemoteCart>
        </React.Suspense>
      </div>
    </>
  );
};

export default App;
