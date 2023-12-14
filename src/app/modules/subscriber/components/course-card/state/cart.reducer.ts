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
    return { ...state, items: [...state.items, product] };
  }),   

  on(CartActions.removeFromCart, (state, { productId }) => {
    return { ...state, items: state.items.filter(item => item.id !== productId) };
  }),

  on(CartActions.clearCart, (state) => {
    return { ...state, items: [] };
  })
);
