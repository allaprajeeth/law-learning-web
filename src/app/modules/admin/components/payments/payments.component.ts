import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  purchaseHistory;

  constructor(){
    
    this.purchaseHistory = [
      {
        heading: 'Constitutional Law',
        noofsubscribers:20,
        price: '₹499',
       
      },
      {
        heading: 'Family Law',
        noofsubscribers:16,
        price: '₹699',
        
      },
      {
        heading: 'Intellectual Property Law',
        noofsubscribers:25,
        price: '₹999',
       
      },
      // Add more items as needed
    ];
  }
}
