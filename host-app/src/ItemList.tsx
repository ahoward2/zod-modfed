import React from "react";
import styled from "styled-components";
import { Item } from "@mf-types/checkout/_types/Cart/Cart";
import AddToCartButton from "./AddToCartButton";

const items: Item[] = [
  {
    id: 1,
    name: "Blue Shirt",
    description: "The nicest blue shirt you ever saw.",
    price: 1.55,
  },
  {
    id: 2,
    name: "Blue Shoes",
    description: "The bluest shoes you ever saw.",
    price: 2.99,
  },
];

export const ItemList = () => {
  return (
    <ItemListWrapper>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item-card">
            <div className="item-name-desc">
              <span>{item.name}</span>
              <span>{item.description}</span>
            </div>
            <div className="item-price">
              <span>{"$" + item.price}</span>
              <AddToCartButton item={item} />
            </div>
          </li>
        ))}
      </ul>
    </ItemListWrapper>
  );
};

const ItemListWrapper = styled.div`
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
