import React from "react";

type ButtonProps = {
  handleClick: () => void;
  text?: string;
};

export const Button = ({ handleClick, text }: ButtonProps) => {
  return <button onClick={handleClick}>{text || "click me"}</button>;
};
