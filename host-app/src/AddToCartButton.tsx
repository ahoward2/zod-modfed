import { Item } from "@ahowardtech/checkout/Cart.schema";
import React from "react";
import styled from "styled-components";

const AddToCartButton = ({
  item,
  handleClick,
}: {
  item: Item;
  handleClick: (item: Item) => void;
}) => {
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
