import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);

  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartItemCount$: Observable<number> = this.cartItemCountSubject.asObservable();

  // Added property to keep track of the "added to cart" status
  private addedToCartStatus: Record<string, boolean> = {};

  constructor() { }

  updateCartItemCount(count: number) {
    this.cartItemCountSubject.next(count);
  }

  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

// Add an item to the cart with a unique ID
addItem(item: any) {
  const existingItem = this.cartItems.find((cartItem) => cartItem.uniqueId === item.uniqueId);

  if (!existingItem) {
    this.cartItems.push(item);
    item.isAddedToCart = true;
    this.cartItemsSubject.next(this.cartItems);
  }
}

  // Remove an item from the cart based on its unique ID
  removeItemById(uniqueId: string) {
    const indexToRemove = this.cartItems.findIndex((item) => item.uniqueId === uniqueId);
    if (indexToRemove !== -1) {
      this.cartItems.splice(indexToRemove, 1);
      this.cartItemsSubject.next(this.cartItems);
    }

     // Remove the "added to cart" status
     delete this.addedToCartStatus[uniqueId];
  }

    // Check the "added to cart" status
    isAddedToCart(uniqueId: string): boolean {
      return !!this.addedToCartStatus[uniqueId];
    }

   // Clear the entire cart
   clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);

     // Clear the "added to cart" status
     this.addedToCartStatus = {};
  }
}
