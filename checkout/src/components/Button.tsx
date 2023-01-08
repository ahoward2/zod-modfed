import React from "react";
import styled from "styled-components";

type ButtonProps = {
  handleClick: () => void;
  text?: string;
};

export const Button = ({ handleClick, text }: ButtonProps) => {
  return (
    <ButtonWrapper onClick={handleClick}>{text || "click me"}</ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  width: 100%;
  height: 24px;
`;
