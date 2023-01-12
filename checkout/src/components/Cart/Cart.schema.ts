import { z } from "zod";

export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;

export type Listeners = {
  addItemToCart: CustomEvent<Item>;
  removeItemFromCart: CustomEvent<Item>;
};

export type Emitters = {
  itemAddedToCart: CustomEvent<Item>;
  itemRemovedFromCart: CustomEvent<Item>;
};
