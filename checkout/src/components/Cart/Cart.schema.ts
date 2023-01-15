import { z } from "zod";
import { Event } from "@rocket-science-core/event-client";

export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;

export type Listeners = {
  addItemToCart: Event<Item>;
  removeItemFromCart: Event<Item>;
};

export type Emitters = {
  itemAddedToCart: Event<Item>;
  itemRemovedFromCart: Event<Item>;
};
