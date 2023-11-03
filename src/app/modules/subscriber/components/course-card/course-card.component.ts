import { Component, Input } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() heading: string = '';
  @Input() content: string = '';
  @Input() product: any;

  constructor(private cartService: CartService, private router: Router) {
    console.log("product", this.product);
    
  }

  addToCartClicked() {
    // Call the service to add the product to the cart
    this.cartService.addItem(this.product);
    this.router.navigate(['/cart']);
  }
  
}
