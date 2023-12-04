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
        date: '01 Dec 2023', 
        price: '₹499',
        expiryDate: '04 Feb 2024',
      },
      {
        heading: 'Family Law',
        date: '07 Nov 2023', 
        price: '₹699',
        expiryDate: '20 Jan 2024',
      },
      {
        heading: 'Intellectual Property Law',
        date: '11 Oct 2023', 
        price: '₹999',
        expiryDate: '19 Feb 2024',
      },
    ];
  }

  downloadInvoice(index: number) {
    // Logic to download the invoice based on the selected index
    console.log(`Download invoice for ${this.purchaseHistory[index].heading}`);
  }
}
