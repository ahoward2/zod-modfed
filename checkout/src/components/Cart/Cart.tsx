import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

export const Cart = () => {
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
          items.map((item, index) => (
            <li key={item.id + "-" + index} className="item-card">
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

const CartWrapper = styled.div`
  background-color: white;
  border: solid 1px;
  padding: 8px;
  height: 100%;
  width: 100%;
  .item-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .item-card {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 8px 0;
  }
  .item-name-desc {
    display: flex;
    flex-direction: column;
  }
`;

export default CartWrapper;
