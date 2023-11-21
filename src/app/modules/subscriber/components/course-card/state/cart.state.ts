import { createReducer, on, Action } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
  product: any; // Adjust based on your actual structure
  items: string[]; // Adjust based on your actual structure
}

export const initialState: CartState = {
  product: null,
  items: []
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product }) => ({
    ...state,
    items: [...state.items, product.productId],
  })),
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter((id) => id !== productId),
  }))
);

export function reducer(state: CartState | undefined, action: Action) {
    return cartReducer(state, action);
}