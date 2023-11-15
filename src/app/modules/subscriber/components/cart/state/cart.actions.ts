// cart.actions.ts
import { createAction, props } from '@ngrx/store';


export const setAddToCartButtonText = createAction(' Add to Cart ');

export const addToCart = createAction('[Cart] Add to Cart', props<{ product: any }>());
export const removeFromCart = createAction('[Cart] Remove from Cart', props<{ productId: string }>());
export function setGoToCartButtonText(): any {
  throw new Error('Function not implemented.');
}

