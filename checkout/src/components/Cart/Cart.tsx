import React, { useState, useEffect } from "react";
import CartWrapper from "./Cart.styles";

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

declare global {
  interface WindowEventMap {
    addItemToCart: CustomEvent<Item>;
  }
}

const Cart = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    window.addEventListener("addItemToCart", (item) => {
      setItems((current) => [item.detail, ...current]);
    });

    return () => {
      window.removeEventListener("addItemToCart", (item) => {
        setItems((current) => [item.detail, ...current]);
      });
    };
  }, []);

  return (
    <CartWrapper>
      <ul className="item-list">
        {items?.length > 0 &&
          items.map((item) => (
            <li key={item.id} className="item-card">
              <div className="item-name-desc">
                <span>{item.name}</span>
                <span>{item.description}</span>
              </div>
              <div className="item-price">
                <span>{"$" + item.price}</span>
              </div>
            </li>
          ))}
      </ul>
    </CartWrapper>
  );
};

export default Cart;
