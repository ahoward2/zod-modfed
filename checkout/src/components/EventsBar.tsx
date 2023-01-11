import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

interface EventsBarProps {
  events: {
    type: string;
    event: () => any;
  }[];
}

export const EventsBar = ({ events }: EventsBarProps) => {
  return (
    <EventsBarWrapper>
      <div className="events-bar-content">
        <p className="title">Events Bar</p>
        {events &&
          events.map((event) => (
            <Button
              key={event.type}
              handleClick={event.event}
              text={event.type}
            />
          ))}
      </div>
    </EventsBarWrapper>
  );
};

const EventsBarWrapper = styled.div`
  width: 100%;
  padding: 8px 0px 8px 0px;
  display: flex;
  flex-direction: column;
  > .events-bar-content {
    display: flex;
    padding: 8px;
    background-color: lightgray;
    > .title {
      font-weight: bold;
      margin-top: 0px;
      margin-bottom: 0px;
`;
