import { Item } from "@mf-types/checkout/_types/Cart";
import React from "react";

const handleClick = (item: Item) => {
  const event = new CustomEvent("addItemToCart", {
    detail: { id: Date.now(), ...item },
  });
  window.dispatchEvent(event);
};

const AddToCartButton = ({ item }: { item: Item }) => {
  return <button onClick={() => handleClick(item)}>Add to cart</button>;
};

export default AddToCartButton;
