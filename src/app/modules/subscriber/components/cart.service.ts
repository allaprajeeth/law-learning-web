import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import * as CartActions from './course-card/state/cart.actions';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private totalActualPriceSubject = new BehaviorSubject<number>(0);
  totalActualPrice$: Observable<number> = this.totalActualPriceSubject.asObservable();

  private discountedPriceSubject = new BehaviorSubject<number>(0);
  discountedPrice$: Observable<number> = this.discountedPriceSubject.asObservable();

  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);

  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartItemCount$: Observable<number> = this.cartItemCountSubject.asObservable();

  private addedToCartStatus: Record<string, boolean> = {};

  constructor(private store: Store<AppState>) { }

  updateTotalActualPrice(totalActualPrice: number) {
    this.totalActualPriceSubject.next(totalActualPrice);
  }

  updateDiscountedPrice(discountedPrice: number) {
    this.discountedPriceSubject.next(discountedPrice);
  }

  updateCartItemCount(count: number) {
    this.cartItemCountSubject.next(count);
  }

  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  generateUniqueProductId() {
    return new Date().getTime();
  }

  private updateButtonText() {
    const isCartEmpty = this.cartItems.length === 0;

    if (isCartEmpty) {
      this.store.dispatch(CartActions.setAddToCartButtonText());
    } else {
      this.store.dispatch(CartActions.setGoToCartButtonText());
    }
  }

  // addToCart(product: any) {
  //   const isItemExistsInCart = this.cartItems.findIndex((cartItem) => cartItem.id === product.id);

  //   if (isItemExistsInCart === -1) {
  //     this.cartItems.push(product);
  //     this.cartItemsSubject.next(this.cartItems);

  //     // Set addedToCart status
  //     this.addedToCartStatus[product.id] = true;
  //   } else {
  //     console.log('Item already in cart');
  //   }

  //   this.store.dispatch(CartActions.setGoToCartButtonText());

  //   this.updateButtonText();
  // }

  // removeItemById(uniqueId: string) {
  //   const indexToRemove = this.cartItems.findIndex((item) => item.id === uniqueId);
  //   if (indexToRemove !== -1) {
  //     this.cartItems.splice(indexToRemove, 1);
  //     this.cartItemsSubject.next(this.cartItems);
  //   }

  //   delete this.addedToCartStatus[uniqueId];

  //   this.updateButtonText();
  // }

  addToCart(product: any) {
    const isItemExistsInCart = this.cartItems.findIndex((cartItem) => cartItem.id === product.id);
  
    if (isItemExistsInCart === -1) {
      this.cartItems.push(product);
      this.cartItemsSubject.next(this.cartItems);
  
      // Set addedToCart status
      this.addedToCartStatus[product.id] = true;
    } else {
      console.log('Item already in cart');
    }
  
    this.store.dispatch(CartActions.setGoToCartButtonText());
  
    this.updateButtonText();
  }
  
  removeItemById(uniqueId: string) {
    const indexToRemove = this.cartItems.findIndex((item) => item.id === uniqueId);
    if (indexToRemove !== -1) {
      this.cartItems.splice(indexToRemove, 1);
      this.cartItemsSubject.next(this.cartItems);
    }
  
    // Clear addedToCart status for the removed product
    delete this.addedToCartStatus[uniqueId];
  
    this.updateButtonText();
  }
  

  // isAddedToCart(uniqueId: string): boolean {
  //   return !!this.addedToCartStatus[uniqueId];
  // }

  isAddedToCart(productId: string): boolean {
    return !!this.addedToCartStatus[productId];
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.addedToCartStatus = {};

    this.updateButtonText();
  }
}












// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Store } from '@ngrx/store';
// import * as CartActions from './course-card/state/cart.actions';
// import { AppState } from 'src/app/app.state';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   // private totalActualPriceSubject = new BehaviorSubject<number>(0);
//   // private discountedPriceSubject = new BehaviorSubject<number>(0);

//   // private discountedPriceSubject = new BehaviorSubject<number>(0);
//   // discountedPrice$ = this.discountedPriceSubject.asObservable();

//   // updateDiscountedPrice(discountedPrice: number) {
//   //   this.discountedPriceSubject.next(discountedPrice);
//   // }
  
//   // totalActualPrice$: Observable<number> = this.totalActualPriceSubject.asObservable();
//   // discountedPrice$: Observable<number> = this.discountedPriceSubject.asObservable();


//   private totalActualPriceSubject = new BehaviorSubject<number>(0);
//   totalActualPrice$: Observable<number> = this.totalActualPriceSubject.asObservable();

//   private discountedPriceSubject = new BehaviorSubject<number>(0);
//   discountedPrice$: Observable<number> = this.discountedPriceSubject.asObservable();

//   private cartItems: any[] = [];
//   private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);

//   private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
//   cartItemCount$: Observable<number> = this.cartItemCountSubject.asObservable();

//     // Added property to keep track of the "added to cart" status
//   private addedToCartStatus: Record<string, boolean> = {};


//   // buttonText$ = this.store.select(CartSelectors.selectButtonText);

  
//   updateTotalActualPrice(totalActualPrice: number) {
//     this.totalActualPriceSubject.next(totalActualPrice);
//   }

//   updateDiscountedPrice(discountedPrice: number) {
//     this.discountedPriceSubject.next(discountedPrice);
//   }

  
//   // private cartItems: any[] = [];
//   // private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);

//   // private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
//   // cartItemCount$: Observable<number> = this.cartItemCountSubject.asObservable();

//   // Added property to keep track of the "added to cart" status
//   // private addedToCartStatus: Record<string, boolean> = {};

//   constructor(private store: Store<AppState>) { }

//   updateCartItemCount(count: number) {
//     this.cartItemCountSubject.next(count);
//   }

//   getCartItems(): Observable<any[]> {
//     return this.cartItemsSubject.asObservable();
//   }

//    // Generate a unique ID for each product
//   generateUniqueProductId() {
//     return new Date().getTime(); // Using a timestamp as a simple example
//   }

// // Add an item to the cart with a unique ID
// // addItem(item: any) {
// //   const existingItem = this.cartItems.find((cartItem) => cartItem.uniqueId === item.uniqueId);

// //   if (!existingItem) {
// //     this.cartItems.push(item);
// //     item.isAddedToCart = true;
// //     this.cartItemsSubject.next(this.cartItems);
// //     console.log('Item added to cart:', item);
// //   } else {
// //     console.log('Item with the same unique ID already exists in the cart:', item);
// //   }
// // }

// addToCart(product: any) {

//   this.store.dispatch(CartActions.addToCart({ product: product }));

//   // Check if the item is already in the cart by ID
//   const isItemExistsInCart = this.cartItems.findIndex((cartItem) => cartItem.id === product.id);

//   if (isItemExistsInCart == -1) {
//     // Item doesn't exist in the cart, so add it
//     this.cartItems.push(product);
//     this.cartItemsSubject.next(this.cartItems);
//   } else {
//     // Item already exists in the cart, you can update the quantity or take other actions here
//     console.log('Item already in cart');
//   }
// }

// // Remove an item from the cart based on its unique ID
// removeItemById(uniqueId: string) {
//     this.store.dispatch(CartActions.removeFromCart({ productId: uniqueId }));

//     const indexToRemove = this.cartItems.findIndex((item) => item.id === uniqueId);
//     if (indexToRemove !== -1) {
//       this.cartItems.splice(indexToRemove, 1);
//       this.cartItemsSubject.next(this.cartItems);
//     }

//      // Remove the "added to cart" status
//      delete this.addedToCartStatus[uniqueId];
//   }

//     // Check the "added to cart" status
//     isAddedToCart(uniqueId: string): boolean {
//       return !!this.addedToCartStatus[uniqueId];
//     }

//    // Clear the entire cart
//    clearCart() {
//     this.cartItems = [];
//     this.cartItemsSubject.next(this.cartItems);

//      // Clear the "added to cart" status
//      this.addedToCartStatus = {};
//   }

//   addToCartClicked() {
//     // Your existing logic for adding to the cart
//     // this.store.dispatch(CartActions.setGoToCartButtonText());
//   }

//   removeFromCartClicked() {
//     // Your existing logic for removing from the cart
//     // this.store.dispatch(CartActions.setAddToCartButtonText());
//   }
// }
