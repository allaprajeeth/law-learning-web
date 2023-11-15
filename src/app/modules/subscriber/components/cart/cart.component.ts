import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  couponCode: string = '';
  totalActualPrice: number = 0;
  cartItems: any[] = [];
  discountedPrice: number = 0; 
  cartIsEmpty: boolean = false;
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      
      this.cartItems = items;
      console.log('Cart Items:', this.cartItems);

      this.totalActualPrice = this.getTotalActualPrice();
      this.calculateDiscountedPrice();

      const cartItemCount = this.cartItems.length;
      this.cartService.updateCartItemCount(cartItemCount);

      this.cartService.updateTotalActualPrice(this.totalActualPrice);
      this.cartService.updateDiscountedPrice(this.discountedPrice);
    });
    
    
    this.cartService.totalActualPrice$.subscribe((price) => {
      this.totalActualPrice = price;
    });
  
    this.cartService.discountedPrice$.subscribe((price) => {
      this.discountedPrice = price;
    });
  }

  getTotalActualPrice(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price;
    }
    return total;
  }
  
  calculateDiscountedPrice(): void {
    this.discountedPrice = this.totalActualPrice;
  // this.totalActualPrice = this.getTotalActualPrice();
  this.applyCoupon();
  this.cartService.updateDiscountedPrice(this.discountedPrice);
}

  applyCoupon() {
    const enteredCode = this.couponCode;
    const couponCodes = [
      { code: 'CODE10', discountPercentage: 10 },
      { code: 'CODE20', discountPercentage: 20 },
      { code: 'CODE30', discountPercentage: 30 },
      { code: 'CODE40', discountPercentage: 40 },
      { code: 'CODE50', discountPercentage: 50 },
      { code: 'CODE60', discountPercentage: 60 },
      { code: 'CODE70', discountPercentage: 70 },
    ];   

    const coupon = couponCodes.find((c) => c.code === enteredCode);

    if (coupon) {
      const discountPercentage = coupon.discountPercentage;
      this.discountedPrice = this.totalActualPrice - (this.totalActualPrice * discountPercentage) / 100;
      this.discountedPrice = Math.round(this.discountedPrice);
  
      this.cartService.updateDiscountedPrice(this.discountedPrice);
      this.couponCode = '';
    }
  }

  onRemoveClick(uniqueId: string) {
    console.log('Removing item with uniqueId:', uniqueId);
  
    const itemIndex = this.cartItems.findIndex((item) => item.id === uniqueId);
    console.log('Item index to remove:', itemIndex);
  
    if (itemIndex !== -1) {
      const removedItem = this.cartItems.splice(itemIndex, 1)[0];  
      this.totalActualPrice -= removedItem.price; 
      this.calculateDiscountedPrice();
      this.updateCartItemCount();
    }
  
    if (this.cartItems.length === 0) {
      this.cartIsEmpty = true;
    }
  }
  

  updateCartItemCount() {
    this.cartItemCount = this.cartItems.length;
    this.cartService.updateCartItemCount(this.cartItemCount);
  }

  roundDiscountPercentage(discount: number): number {
    return Math.round(discount);
  }
}

