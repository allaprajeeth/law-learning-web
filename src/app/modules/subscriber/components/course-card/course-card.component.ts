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
    // Check if the product is already in the cart and set the button text
    // this.product.isAddedToCart = this.cartService.isAddedToCart(this.product.id);
  }
  
  addToCartClicked(productToAdd: any) {
    if (this.product.isAddedToCart) {
      // If already added to the cart, navigate to the cart
      this.router.navigate(['/cart']);
    } else {
      // Add the item to the cart
      this.cartService.addToCart(productToAdd);
      this.product.isAddedToCart = true;
    }
  }
}
