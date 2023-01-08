import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Cart } from "./Cart";
import { Button } from "../Button";

export default {
  title: "Cart/Primary",
  component: Cart,
} as ComponentMeta<typeof Cart>;

const item = {
  name: "NewItem",
  description: "This is a new item",
  price: 1.55,
};

const handleClick = () => {
  const event = new CustomEvent("addItemToCart", {
    detail: { id: Date.now(), ...item },
  });
  window.dispatchEvent(event);
};

const Template = () => {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <Button handleClick={handleClick} text="add to cart" />
      <Cart />
    </div>
  );
};

export const Primary = Template.bind({});
