import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Cart } from "./Cart";
import { Button } from "../Button";

export default {
  title: "Cart/Primary",
  component: Cart,
} as ComponentMeta<typeof Cart>;

const Template = () => {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <Button />
      <Cart />
    </div>
  );
};

export const Primary = Template.bind({});
