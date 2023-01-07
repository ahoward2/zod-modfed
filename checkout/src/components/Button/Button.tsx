import React from "react";

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

const Button = () => {
  return <button onClick={handleClick}>Add to cart!</button>;
};

export default Button;
