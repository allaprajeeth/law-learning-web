import { createAction, props } from '@ngrx/store';

export const addToCart = createAction('[Cart] Add to Cart', props<{ product: any }>());
export const removeFromCart = createAction('[Cart] Remove from Cart', props<{ productId: string }>());
