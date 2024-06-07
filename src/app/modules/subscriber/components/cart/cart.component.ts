import { Component, OnInit } from '@angular/core';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cartcourseModel } from 'src/app/common/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  couponCode: string = '';
  totalActualPrice: number = 0;
  cartItems: cartcourseModel[] = [];
  selectedItems: number[] = [];
  isAdded: boolean = false;
  s3BaseURL: string = endPoints.s3BaseURL;
  discountedPrice: number = 0;
  cartIsEmpty: boolean = false;

  constructor( private http: HttpClient) {}

  ngOnInit() {
    this.getItemsToCart();
  }

  roundDiscountPercentage(discount: number): number {
    return Math.round(discount);
  }

  getItemsToCart(): void {
    const url = endPoints.secureBaseURL + '/subscriber/cart';

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response.data && response.data.content) {
          this.cartItems = response.data.content;
        }
      },
      (error) => {
        console.error('Error getting cart Items:', error);
      }
    );
  }

  onCheckboxChange(event: any): void {
    const courseId = +event.target.value;
    if (event.target.checked) {
      this.selectedItems.push(courseId);
    } else {
      this.selectedItems = this.selectedItems.filter((id) => id !== courseId);
    }
  }

  addToMyCourses(): void {
    const url = endPoints.secureBaseURL + '/subscriber/cart/subscribe';
    this.http.post(url, this.selectedItems).subscribe(
      (response) => {
        this.isAdded = true;
        console.log('Items added to My Courses successfully', response);
      },
      (error) => {
        console.error('Error adding items to My Courses:', error);
      }
    );
  }

  removeFromCart(itemId: number): void {
    const url = `${endPoints.secureBaseURL}/subscriber/cart`;
    const requestBody = [itemId];
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.request('DELETE', url, { headers, body: requestBody }).subscribe(
      (response) => {
        console.log('Item removed successfully', response);
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      },
      (error) => {
        console.error('Error removing item:', error);
      }
    );
  }

  closeMessage(): void {
    this.isAdded = false;
  }
}
