import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: { ml: number; price: number }) => void;
  removeItem: (productId: string, ml: number) => void;
  updateQuantity: (productId: string, ml: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, selectedSize) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.selectedSize.ml === selectedSize.ml
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.selectedSize.ml === selectedSize.ml
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1, selectedSize }] };
        });
      },

      removeItem: (productId, ml) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.selectedSize.ml === ml)
          ),
        }));
      },

      updateQuantity: (productId, ml, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, ml);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.selectedSize.ml === ml ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      total: () =>
        get().items.reduce((sum, i) => sum + i.selectedSize.price * i.quantity, 0),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "parfum-cart" }
  )
);
