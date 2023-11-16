import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

// Example selector to check if an item is in the cart
export const selectIsItemInCart = createSelector(
  selectCartItems,
  (items: any[], props: { productId: string }) =>
    items.some((item) => item.id === props.productId && item.isAddedToCart)
);
