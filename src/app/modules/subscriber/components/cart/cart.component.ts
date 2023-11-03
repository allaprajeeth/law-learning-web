import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  couponCode: string = '';
  cartItems: any[] = [];
  originalPrice: number = 0;
  discountedPrice: number = this.originalPrice;
  cartIsEmpty: boolean = false;

  // Property to keep track of the number of items in the cart
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      console.log('Cart Items:', this.cartItems); // Add this line

      // Calculate the original price based on the prices of items in the cart
      this.originalPrice = this.calculateOriginalPrice();

   // Update the cartItemCount based on the number of items in the cart
   const cartItemCount = this.cartItems.length;
   this.cartService.updateCartItemCount(cartItemCount);
    });
  }

   // Calculate the original price based on the prices of items in the cart
   calculateOriginalPrice(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price;
    }
    return total;
  }

  // Update the total price for a cart item
  updateItemTotalPrice(item: any) {
    // Calculate the total price for the item and update the discountedPrice
    const totalItemPrice = this.originalPrice * item.quantity;
    item.totalPrice = totalItemPrice;
  }

  couponCodes: { code: string; discountPercentage: number }[] = [
    { code: 'CODE10', discountPercentage: 10 },
    { code: 'CODE20', discountPercentage: 20 },
    { code: 'CODE30', discountPercentage: 30 },
    { code: 'CODE40', discountPercentage: 40 },
    { code: 'CODE50', discountPercentage: 50 },
    { code: 'CODE60', discountPercentage: 60 },
    { code: 'CODE70', discountPercentage: 70 },
    { code: 'CODE80', discountPercentage: 80 },
  ];

  roundPercentage(percentage: number): number {
    return Math.round(percentage);
  }

  // Function to apply the coupon code and calculate the discounted price
  applyCoupon() {
    const enteredCode = this.couponCode;

    // Check if the entered code matches any predefined coupon
    const coupon = this.couponCodes.find((c) => c.code === enteredCode);

    // if (coupon) {
    //   const discountPercentage = coupon.discountPercentage;

    //   // Calculate the discounted price
    //   this.discountedPrice = Math.round(
    //     this.originalPrice - (this.originalPrice * discountPercentage) / 100
    //   );
    // }



  if (coupon) {
    const discountPercentage = coupon.discountPercentage;

    // Calculate the discounted price based on the original price and discount percentage
    this.discountedPrice = this.originalPrice - (this.originalPrice * discountPercentage) / 100;
    this.discountedPrice = Math.round(this.discountedPrice); // Round the discounted price
  }
  }

  onRemoveClick(uniqueId: string) {
    // Find the index of the item to remove based on the uniqueId
    const itemIndex = this.cartItems.findIndex((item) => item.uniqueId === uniqueId);
  
    // Remove the item if found
    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
      // Update the item count after removal
      this.updateCartItemCount();
    }
  
    // Check if the cart is empty and display a message
    if (this.cartItems.length === 0) {
      // You can set a flag or variable here to show a message in your template
      this.cartIsEmpty = true;
    }
  }
  
  updateCartItemCount() {
    this.cartItemCount = this.cartItems.length;
    this.cartService.updateCartItemCount(this.cartItemCount);
  }
}
