import React from "react";
import styled from "styled-components";
import { ItemList } from "./ItemList";
import { items } from "./items";
import { EventsClient } from "@rocket-science/event-client";
import {
  Item,
  Listeners as CartListeners,
  Emitters as CartEmitters,
} from "@ahowardtech/checkout/Cart.schema";
const RemoteCart = React.lazy(() => import("@ahowardtech/checkout/Cart"));

const eventsClient = new EventsClient<CartEmitters, CartListeners>();

const handleClick = ({ name, description, price }: Item) => {
  eventsClient.emit("addItemToCart", {
    id: Date.now(),
    name,
    description,
    price,
  });
};

const App = () => {
  eventsClient.on("itemAddedToCart", "logDetails", ({ detail }) => {
    console.log(detail);
  });
  return (
    <AppWrapper>
      <h1>Ecomm Store</h1>
      <div className="app-content">
        <ItemList items={items} handleAddToCart={handleClick} />
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
  .app-content {
    display: flex;
    width: 700px;
    height: 400px;
  }
`;
