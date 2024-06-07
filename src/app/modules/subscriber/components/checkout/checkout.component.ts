import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    selectedCountry: string = '';
    selectedState: string = '';
    selectedPaymentMethod: string = '';
    nameOnCard: string = '';
    cardNumber: string = '';
    expiryDate: string = '';
    cvv: string = '';
    securityCode: string = '';
    rememberCard: boolean = false;
    phonePayNumber: string = '';
    googlePayNumber: string = '';
    paytmNumber: string = '';

    totalActualPrice: number = 0;
    discountedPrice: number = 0;

  constructor() {}

  ngOnInit() {
    // this.cartService.totalActualPrice$.subscribe((price) => {
    //   this.totalActualPrice = price;
    // });

    // this.cartService.discountedPrice$.subscribe((price) => {
    //   this.discountedPrice = price;
    // });
  }

  roundDiscountPercentage(discount: number): number {
    return Math.round(discount);
  }

    paymentMethods = [
        { label: 'Credit/Debit Card', value: 'credit_debit_card' },
        { label: 'PhonePay', value: 'phonepay' },
        { label: 'GooglePay', value: 'googlepay' },
        { label: 'Paytm', value: 'paytm' },
    ];
    countries = [
      { code: 'US', name: 'United States', states: ['New York', 'California', 'Texas', 'Florida'], defaultState: 'New York' },
      { code: 'CA', name: 'Canada', states: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'], defaultState: 'British Columbia' },
      { code: 'IND', name: 'India', states: ['Maharashtra', 'Karnataka', 'Delhi', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu'], defaultState: 'Andhra Pradesh' },
      { code: 'SL', name: 'Sri Lanka', states: ['Western', 'Central', 'Southern', 'Northern', 'Colombo'], defaultState: 'Colombo' },
      { code: 'AUS', name: 'Australia', states: ['New South Wales', 'Victoria', 'Queensland', 'Sydney', 'Western Australia'], defaultState: 'Sydney' },
      { code: 'SA', name: 'South Africa', states: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape'], defaultState: 'KwaZulu-Natal' },
      { code: 'NZ', name: 'New Zealand', states: ['Auckland', 'Wellington', 'Canterbury', 'Waikato'], defaultState: 'Canterbury' },
      { code: 'UK', name: 'England', states: ['London', 'Manchester', 'Birmingham', 'Liverpool'], defaultState: 'Birmingham' },
      { code: 'BAN', name: 'Bangladesh', states: ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna'], defaultState: 'Rajshahi' },
    ];      
       
    getStatesForSelectedCountry(): string[] {
      const selectedCountryObj = this.countries.find(country => country.code === this.selectedCountry);
      
      if (selectedCountryObj) {
        // Preserve the selected state when a new country is selected
        const previousSelectedState = this.selectedState;
    
        // Always reset the selected state when a new country is selected
        this.selectedState = selectedCountryObj.defaultState || '';
    
        // If the previous state is a valid state for the new country, keep it; otherwise, use the default state
        if (selectedCountryObj.states.includes(previousSelectedState)) {
          this.selectedState = previousSelectedState;
        }
    
        return selectedCountryObj.states;
      } else {
        return [];
      }
    }
    
    
 
  onCheckout() {
    // Implement checkout logic, integrate with payment gateway, etc.
    // This is a placeholder method
    console.log('Order placed!');
}
}
