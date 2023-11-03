import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  couponCode: string = '';
  totalActualPrice: number = 0;
  cartItems: any[] = [];
  discountedPrice: number = 0; // Initialize discountedPrice to 0
  cartIsEmpty: boolean = false;

  // Property to keep track of the number of items in the cart
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      console.log('Cart Items:', this.cartItems);

      // Calculate the original price based on the prices of items in the cart
      this.totalActualPrice = this.getTotalActualPrice();
      this.calculateDiscountedPrice();

      // Update the cartItemCount based on the number of items in the cart
      const cartItemCount = this.cartItems.length;
      this.cartService.updateCartItemCount(cartItemCount);
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
    // Initialize discountedPrice based on totalActualPrice
    this.discountedPrice = this.totalActualPrice;
  // this.totalActualPrice = this.getTotalActualPrice();
  this.applyCoupon(); // Reapply the coupon code to update the discountedPrice
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
      { code: 'CODE80', discountPercentage: 80 },
    ];   

    const coupon = couponCodes.find((c) => c.code === enteredCode);

    if (coupon) {
      const discountPercentage = coupon.discountPercentage;

      // Calculate the discounted price based on the totalActualPrice and discount percentage
      this.discountedPrice = this.totalActualPrice - (this.totalActualPrice * discountPercentage) / 100;
      this.discountedPrice = Math.round(this.discountedPrice);
    }
  }

  onRemoveClick(uniqueId: string) {
    console.log('Removing item with uniqueId:', uniqueId);
  
    const itemIndex = this.cartItems.findIndex((item) => item.uniqueId === uniqueId);
    console.log('Item index to remove:', itemIndex);
  
    if (itemIndex !== -1) {
      // Remove the item from the cart
      const removedItem = this.cartItems.splice(itemIndex, 1)[0]; // Splice returns an array, so we select the first element (the removed item)
  
      // Update the totalActualPrice by subtracting the price of the removed item
      this.totalActualPrice -= removedItem.price;
  
      // Update the discountedPrice by applying the coupon code to the updated totalActualPrice
      this.calculateDiscountedPrice();
  
      // Update the cartItemCount
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

