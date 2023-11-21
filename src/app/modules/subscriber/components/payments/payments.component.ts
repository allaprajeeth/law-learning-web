import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  randomFutureDates;
  purchaseHistory;

  constructor(){
    this.randomFutureDates = this.generateRandomFutureDates(5);

    this.purchaseHistory = [
      {
        heading: 'Constitutional Law',
        date: '01 Nov 2023', 
        price: '₹499',
        expiryDate: this.randomFutureDates[0], 
      },
      {
        heading: 'Family Law',
        date: '07 Nov 2023', 
        price: '₹699',
        expiryDate: this.randomFutureDates[1],
      },
      {
        heading: 'Intellectual Property Law',
        date: '11 oct 2023', 
        price: '₹999',
        expiryDate: this.randomFutureDates[0], 
      },
      // Add more items as needed
    ];
  }

  private generateRandomFutureDates(numDates: number): Date[] {
    const dates: Date[] = [];
    for (let i = 0; i < numDates; i++) {
      const randomMonthOffset = Math.floor(Math.random() * 4) + 1;
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const randomDay = Math.floor(Math.random() * 28);
      currentDate.setMonth(currentMonth + randomMonthOffset);
      currentDate.setDate(randomDay);
      dates.push(currentDate);
    }
  
    // dates.sort((a, b) => a.getTime() - b.getTime());
  
    return dates;
  }
  

  downloadInvoice(index: number) {
    // Logic to download the invoice based on the selected index
    console.log(`Download invoice for ${this.purchaseHistory[index].heading}`);
  }
}
