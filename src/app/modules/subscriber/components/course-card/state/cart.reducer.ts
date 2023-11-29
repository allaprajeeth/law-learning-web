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
      return {
        ...state,
        items: [...state.items],
      };
    } else {
      // If the item is not in the cart, add it with isAddedToCart property
      return { ...state, items: [...state.items, { ...product, isAddedToCart: true }] };
    }
  }),
  
   on(CartActions.removeFromCart, (state, { productId }) => {
    // Remove the item from the cart and update its isAddedToCart property
    const updatedItems = state.items.map(item =>
      item.id === productId ? { ...item, isAddedToCart: false } : item
    );

    return { ...state, items: updatedItems };
  })
);




// import { createReducer, on } from '@ngrx/store';
// import * as CartActions from './cart.actions';

// export interface CartState {
//   // ... other properties
//   isGoToCartButton: boolean;
// }

// export const initialState: CartState = {
//   // ... other initial state properties
//   isGoToCartButton: false,
// };

// export const cartReducer = createReducer(
//   initialState,
//   on(CartActions.setGoToCartButtonText, (state) => ({ ...state, isGoToCartButton: true })),
//   on(CartActions.setAddToCartButtonText, (state) => ({ ...state, isGoToCartButton: false })),
//   // ... other reducer logic
// );
