import { create } from "zustand";
import { persist } from "zustand/middleware";

// #-------------For typescript:---------------
// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string || null;
//   quantity: number;
// }
//
// interface CartStore {
//   items: CartItem[];
//   addItem: (item: CartItem) => void
// }

export const useCartStore = create()(
  persist((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) => i.id === item.id
            ? {...i, quantity: i.quantity + item.quantity}
          : i)
          };
        }

        return { items: [...state.items, item]}
      }),
    removeItem: (id) => set((state) => {
      return {
        items: state.items.map((item) => item.id === id
        ? {...item, quantity: item.quantity - 1}
        : item).filter((item) => item.quantity > 0),
      };
    }),
    clearCart: () => set((state) => {
      return { items: [] };
    }),
  }), { name: "cart" })
);