import { Item } from "@mf-types/@ahowardtech/checkout/_types/Cart/Cart.schema";
import React from "react";
import styled from "styled-components";

const handleClick = (item: Item) => {
  const event = new CustomEvent("addItemToCart", {
    detail: { id: Date.now(), ...item },
  });
  window.dispatchEvent(event);
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
