import React from "react";
import styled from "styled-components";
import AddToCartButton from "./AddToCartButton";
import { items } from "./Items";

export const ItemList = () => {
  return (
    <ItemListWrapper>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item-card">
            <div className="item-name-desc">
              <span className="item-name">{item.name}</span>
              <span className="item-desc">{item.description}</span>
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
`;
