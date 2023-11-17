import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
  items: any[];
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product }) => {
    // Check if the item is already in the cart by ID
    const isItemExistsInCart = state.items.some(item => item.id === product.id);

    if (isItemExistsInCart) {
      // If the item is already in the cart, update its isAddedToCart property
      const updatedItems = state.items.map(item =>
        item.id === product.id ? { ...item, isAddedToCart: true } : item
      );

      return { ...state, items: updatedItems };
    } else {
      // If the item is not in the cart, add it with isAddedToCart property
      return { ...state, items: [...state.items, { ...product, isAddedToCart: true }] };
    }
  }),
  on(CartActions.removeFromCart, (state, { productId }) => {
    // Remove the item from the cart and update its isAddedToCart property
    const updatedItems = state.items.filter(item => item.id !== productId);
    return { ...state, items: updatedItems };
  })
);
