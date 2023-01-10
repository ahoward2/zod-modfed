import { z } from "zod";

export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;

export type IncomingEvents = {
  addItemToCart: CustomEvent<Item>;
  removeItemFromCart: CustomEvent<Item>;
  random: CustomEvent<number>;
};

export type OutgoingEvents = {
  itemAddedToCart: Item;
  itemRemovedFromCart: Item;
  random: number;
};
