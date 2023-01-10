import { Item, IncomingEvents } from "@ahowardtech/checkout/Cart.schema";
import React from "react";
import styled from "styled-components";
import { EventsClient } from "@ahowardtech/event-lib";

const eventsClient = new EventsClient<IncomingEvents, any>();

const handleClick = (item: Item) => {
  eventsClient.invoke("addItemToCart", { id: Date.now(), ...item });
};

const AddToCartButton = ({ item }: { item: Item }) => {
  return (
    <AddToCartButtonWrapper onClick={() => handleClick(item)}>
      add to cart
    </AddToCartButtonWrapper>
  );
};

const AddToCartButtonWrapper = styled.button`
  width: 100%;
  height: 24px;
`;

export default AddToCartButton;
