import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() heading: string = '';
  @Input() content: string = '';
  @Input() product: any;
  isAddedToCart: boolean = false;

  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.isAddedToCart = this.cartService.isAddedToCart(this.product.id);

    // Subscribe to cart changes
    this.cartSubscription = this.cartService.getCartItems().subscribe((cartItems) => {
      this.isAddedToCart = this.cartService.isAddedToCart(this.product.id);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the cart changes to avoid memory leaks
    this.cartSubscription.unsubscribe();
  }

  addToCartClicked(productToAdd: any) {
    if (!this.isAddedToCart) {
      this.cartService.addToCart(productToAdd);
      this.router.navigate(['/cart']);
    }
  }

}





//   constructor(private cartService: CartService, private router: Router, private store: Store<AppState>) {
//     // Check if the product is already in the cart and set the button text
//     // this.product.isAddedToCart = this.cartService.isAddedToCart(this.product.id);
//   }

//   ngOnInit() {    
//     this.store.select('cart').subscribe((cart: any[]) => {
//       this.isAddedToCart = cart.some(item => item.id === this.product.id);
//     });
//   }
  
//   addToCartClicked(productToAdd: any) {
//     if (this.product.isAddedToCart) {
//       // If already added to the cart, navigate to the cart
//       this.router.navigate(['/cart']);

//       // this.cartService.removeFromCart(this.product.id);
//     } else {
//       // Add the item to the cart
//       // this.cartService.addToCart(productToAdd);
//       this.product.isAddedToCart = true;
      
//       this.cartService.addToCart(this.product);

//     }
//   }
// }

