import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  couponCode: string = '';
  originalPrice: number = 499;
  discountedPrice: number = this.originalPrice;

  couponCodes: { code: string, discountPercentage: number }[] = [
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
    const coupon = this.couponCodes.find(c => c.code === enteredCode);

    if (coupon) {
      const discountPercentage = coupon.discountPercentage;

      // Calculate the discounted price
      this.discountedPrice = Math.round(this.originalPrice - (this.originalPrice * discountPercentage) / 100);
    }
  }
}
