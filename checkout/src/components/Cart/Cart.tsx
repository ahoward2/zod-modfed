import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EventsClient } from "@rocket-science-core/event-client";
import { Button } from "../Button";
import {
  Listeners as CartListeners,
  Item,
  ItemSchema,
  Emitters as CartEmitters,
} from "./Cart.schema";

const eventsClient = new EventsClient<CartListeners, CartEmitters>();

export const Cart = () => {
  const [items, setItems] = useState<Item[]>([]);

  const handleRemoveButtonClick = (item: Item) => {
    eventsClient.invoke("removeItemFromCart", item);
  };

  const calculateTotal = (items: Item[]) => {
    let sum = 0.0;
    items.forEach((item) => (sum += item.price));
    return parseFloat(sum.toString()).toFixed(2);
  };

  useEffect(() => {
    eventsClient.on(
      "addItemToCart",
      ({ detail, error }) => {
        if (error) {
          console.error(error);
        } else {
          setItems((current) => [detail, ...current]);
          eventsClient.emit("itemAddedToCart", detail);
        }
      },
      ItemSchema
    );
    eventsClient.on(
      "removeItemFromCart",
      ({ detail, error }) => {
        if (error) {
          console.error(error);
        } else {
          setItems((current) => {
            const itemIndex = current.findIndex(
              (itemSearched) => itemSearched.id === detail.id
            );
            current.splice(itemIndex, 1);
            return [...current];
          });
          eventsClient.emit("itemRemovedFromCart", detail);
        }
      },
      ItemSchema
    );
    return () => {
      eventsClient.remove("addItemToCart");
      eventsClient.remove("removeItemFromCart");
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
