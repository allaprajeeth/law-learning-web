import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

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

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.isAddedToCart = this.cartService.isAddedToCart(this.product.id);
  }

  addToCartClicked() {
    if (!this.isAddedToCart) {
      this.cartService.addToCart(this.product);
    }
  }

  goToCartClicked() {
    this.router.navigate(['/cart']);
  }
}
