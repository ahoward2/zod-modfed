import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../Button";
export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

declare global {
  interface WindowEventMap {
    addItemToCart: CustomEvent<Item>;
    removeItemFromCart: CustomEvent<Item>;
  }
}

export const Cart = () => {
  const [items, setItems] = useState<Item[]>([]);

  const addItemToCartHandler = (item: WindowEventMap["addItemToCart"]) => {
    setItems((current) => [item.detail, ...current]);
  };
  const removeItemFromCartHandler = (
    item: WindowEventMap["removeItemFromCart"]
  ) => {
    setItems((current) => {
      const itemIndex = current.findIndex(
        (itemSearched) => itemSearched.id === item.detail.id
      );
      current.splice(itemIndex, 1);
      return [...current];
    });
  };

  const handleRemoveButtonClick = (item: Item) => {
    const event = new CustomEvent("removeItemFromCart", {
      detail: item,
    });
    window.dispatchEvent(event);
  };

  const calculateTotal = (items: Item[]) => {
    let sum = 0.0;
    items.forEach((item) => (sum += item.price));
    return parseFloat(sum.toString()).toFixed(2);
  };

  useEffect(() => {
    window.addEventListener("addItemToCart", addItemToCartHandler);
    window.addEventListener("removeItemFromCart", removeItemFromCartHandler);
    return () => {
      window.removeEventListener("addItemToCart", addItemToCartHandler);
      window.removeEventListener(
        "removeItemFromCart",
        removeItemFromCartHandler
      );
    };
  }, []);

  return (
    <CartWrapper>
      <div className="cart-header">
        <span className="cart-header-title">cart 🛒</span>
      </div>
      <ul className="item-list">
        {items?.length > 0 &&
          items.map((item, index) => (
            <li key={item.id + "-" + index} className="item-card">
              <div className="item-name-desc">
                <span className="item-name">{item.name}</span>
                <span className="item-desc">{item.description}</span>
              </div>
              <div className="item-price">
                <span>{"$" + item.price}</span>
                <Button
                  handleClick={() => handleRemoveButtonClick(item)}
                  text="remove"
                />
              </div>
            </li>
          ))}
      </ul>
      <div className="cart-footer">
        <span className="price-total">{"$" + calculateTotal(items)}</span>
        <Button
          handleClick={() => console.log("checking out")}
          text="checkout"
        ></Button>
      </div>
    </CartWrapper>
  );
};

const CartWrapper = styled.div`
  background-color: white;
  border: solid 1px;
  padding: 8px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .cart-header {
    border-bottom: solid 1px;
    padding-bottom: 8px;
    > .cart-header-title {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
  .item-list {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    overflow-y: scroll;
  }
  .item-card {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 8px 0;
  }
  .item-name-desc {
    display: flex;
    width: 75%;
    flex-direction: column;
    > .item-name {
      font-weight: bold;
    }
  }
  .item-price {
    display: flex;
    flex-direction: column;
    justify-items: end;
  }
  .cart-footer {
    display: flex;
    justify-content: space-between;
    > .price-total {
      min-width: 50%;
    }
  }
`;

export default CartWrapper;
