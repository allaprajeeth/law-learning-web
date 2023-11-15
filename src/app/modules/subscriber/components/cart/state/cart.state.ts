// cart.state.ts

import { createAction, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

// Actions
export const addToCart = createAction('[Cart] Add to Cart', (payload: { product: any }) => ({ payload }));
export const removeFromCart = createAction('[Cart] Remove from Cart', (payload: { productId: string }) => ({ payload }));
export const addToCartSuccess = createAction('[Cart] Add to Cart Success');
export const removeFromCartSuccess = createAction('[Cart] Remove from Cart Success');

// State
export interface CartState {
  items: any[];
}

export const initialCartState: CartState = {
  items: [],
};

// Reducer
export const cartReducer = createReducer(
  initialCartState,
  on(addToCartSuccess, (state) => ({ ...state })),
  on(removeFromCartSuccess, (state) => ({ ...state })),
  on(addToCart, (state, { payload }) => ({
    ...state,
    items: [...state.items, payload.product],
  })),
  on(removeFromCart, (state, { payload }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== payload.productId),
  }))
);

// Selectors
export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartItems = createSelector(selectCartState, (state) => state.items);

// Effects
@Injectable()
export class CartEffects {
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      mergeMap(() => of(addToCartSuccess()))
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromCart),
      mergeMap(() => of(removeFromCartSuccess()))
    )
  );

  constructor(private actions$: Actions) {}
}
