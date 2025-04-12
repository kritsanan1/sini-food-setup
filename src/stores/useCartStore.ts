
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  quantity: number;
  restaurantId: string;
  restaurantName?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// Create cart store with persist middleware to save cart in localStorage
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);
        
        if (existingItemIndex !== -1) {
          // Item exists, update quantity
          const updatedItems = [...currentItems];
          const quantity = (newItem.quantity || 1) + updatedItems[existingItemIndex].quantity;
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex], 
            quantity
          };
          set({ items: updatedItems });
        } else {
          // Add new item
          set({ 
            items: [...currentItems, { ...newItem, quantity: newItem.quantity || 1 }] 
          });
        }
      },
      
      removeItem: (itemId) => {
        set({
          items: get().items.filter(item => item.id !== itemId)
        });
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        
        set({
          items: get().items.map(item => 
            item.id === itemId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      totalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'cart-storage', // name of the localStorage key
    }
  )
);
