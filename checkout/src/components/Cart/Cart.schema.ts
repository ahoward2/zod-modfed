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
};

export type OutgoingEvents = {
  removeItemFromCart: Item;
};
