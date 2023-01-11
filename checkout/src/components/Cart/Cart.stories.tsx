import React from "react";
import { ComponentMeta } from "@storybook/react";
import { EventsBar } from "../EventsBar";
import { Cart } from "./Cart";

export default {
  title: "Cart/Primary",
  component: Cart,
} as ComponentMeta<typeof Cart>;

const item = {
  name: "NewItem",
  description: "This is a new item",
  price: 1.55,
};

const handleAddToCart = () => {
  const event = new CustomEvent("addItemToCart", {
    detail: { id: Date.now(), ...item },
  });
  window.dispatchEvent(event);
};

const Template = () => {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <EventsBar events={[{ type: "addItemToCart", event: handleAddToCart }]} />
      <Cart />
    </div>
  );
};

export const Primary = Template.bind({
  parameters: {
    layout: "centered",
  },
});
