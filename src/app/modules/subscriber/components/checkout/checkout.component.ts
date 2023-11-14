import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    // customerName: string = '';
    // customerEmail: string = '';
    // mobileNumber: string = '';
    selectedCountry: string = '';
    zipCode: string = '';
    // address: string = '';
    selectedPaymentMethod: string = '';
    nameOnCard: string = '';
    cardNumber: string = '';
    expiryDate: string = '';
    cvv: string = '';
    securityCode: string = '';
    rememberCard: boolean = false;

    totalActualPrice: number = 0;
  discountedPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.totalActualPrice$.subscribe((price) => {
      this.totalActualPrice = price;
    });

    this.cartService.discountedPrice$.subscribe((price) => {
      this.discountedPrice = price;
    });
  }

  roundDiscountPercentage(discount: number): number {
    return Math.round(discount);
  }

    paymentMethods = [
        { label: 'Credit/Debit Card', value: 'credit_debit_card' },
        // { label: 'Debit Card', value: 'debit_card' },
        { label: 'PhonePay', value: 'phonepay' },
        { label: 'GooglePay', value: 'googlepay' },
        { label: 'Paytm', value: 'paytm' },
    ];
    countries = [
      { code: 'US', name: 'United States' },
      { code: 'CA', name: 'Canada' },
      { code: 'IND', name: 'India' },
      { code: 'SL', name: 'Sri Lanka' },
      { code: 'AUS', name: 'Australia' },
      { code: 'SA', name: 'South Africa' },
      { code: 'NZ', name: 'NewZeland' },
      { code: 'UK', name: 'England' },
      { code: 'BAN', name: 'Bangladesh' },
  ];
  onCheckout() {
    // Implement checkout logic, integrate with payment gateway, etc.
    // This is a placeholder method
    console.log('Order placed!');
}
}
