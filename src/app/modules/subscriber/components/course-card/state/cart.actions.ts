// import { createAction, props } from '@ngrx/store';

// export const addToCart = createAction(
//   '[Cart] Go to Cart',
//   props<{ productId: string }>()
// );

// export const removeFromCart = createAction(
//   '[Cart] Add to Cart',
//   props<{ productId: string }>()
// );



import { createAction, props } from '@ngrx/store';

export const addToCart = createAction('[Cart] Add to Cart', props<{ product: any }>());
export const removeFromCart = createAction('[Cart] Remove from Cart', props<{ productId: string }>());
export const setGoToCartButtonText = createAction('[Cart] Set Go to Cart Button Text');
export const setAddToCartButtonText = createAction('[Cart] Set Add to Cart Button Text');


