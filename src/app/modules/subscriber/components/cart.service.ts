import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
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

  constructor(private store: Store) { }

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

  private updateButtonText() {
    const isCartEmpty = this.cartItems.length === 0;

    if (isCartEmpty) {
      this.store.dispatch(CartActions.setAddToCartButtonText());
    } else {
      this.store.dispatch(CartActions.setGoToCartButtonText());
    }
  }

  addToCart(product: any) {
    this.store.dispatch(CartActions.addToCart({ product }));
  
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);

    const cartItemCount = this.cartItems.length;
    this.cartItemCountSubject.next(cartItemCount);

    const totalActualPrice = this.getTotalActualPrice();
    this.totalActualPriceSubject.next(totalActualPrice);

    const discountedPrice = this.calculateDiscountedPrice();
    this.discountedPriceSubject.next(discountedPrice);

    this.addedToCartStatus[product.id] = true;
    this.store.dispatch(CartActions.setGoToCartButtonText());
  }

  removeFromCart(productId: string) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  
    delete this.addedToCartStatus[productId];
  
    const updatedItems = this.cartItems.filter((item) => item.id !== productId);
    this.cartItems = updatedItems;
    this.cartItemsSubject.next(updatedItems);
  
    const cartItemCount = this.cartItems.length;
    this.cartItemCountSubject.next(cartItemCount);
  
    const totalActualPrice = this.getTotalActualPrice();
    this.totalActualPriceSubject.next(totalActualPrice);
  
    const discountedPrice = this.calculateDiscountedPrice();
    this.discountedPriceSubject.next(discountedPrice);
  
    this.store.dispatch(CartActions.setAddToCartButtonText());
  }  

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  getTotalActualPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
  
  calculateDiscountedPrice(): number {
    return this.totalActualPriceSubject.value;
  }
  
  updateAddedToCartStatus(productId: string, status: boolean) {
    this.addedToCartStatus[productId] = status;
    this.updateButtonText();
  }
  
  isAddedToCart(productId: string): boolean {
    return !!this.addedToCartStatus[productId];
  }
}
