import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  purchaseHistory = [
    {
      heading: 'Constitutional Law',
      date: '2023-11-01',
      price: '₹499'
    },
    {
      heading: 'Family Law',
      date: '2023-11-02',
      price: '₹699'
    },
    // Add more items as needed
  ];

  

  downloadInvoice(index: number) {
    // Logic to download the invoice based on the selected index
    console.log(`Download invoice for ${this.purchaseHistory[index].heading}`);
  }
}


