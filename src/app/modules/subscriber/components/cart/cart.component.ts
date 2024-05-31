import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
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
  isAdded :boolean =false
  s3BaseURL: string = endPoints.s3BaseURL;
 
  //   {
  //     id: 1,
  //     image: 'path_to_image_1',
  //     heading: 'Course Title 1',
  //     duration: '5',
  //     coursesText: 'Some course text 1',
  //     price: 1000 // Replace with actual price
  //   },
  //   {
  //     id: 2,
  //     image: 'path_to_image_2',
  //     heading: 'Course Title 2',
  //     duration: '7',
  //     coursesText: 'Some course text 2',
  //     price: 1200 // Replace with actual price
  //   },
  //   {
  //     id: 3,
  //     image: 'path_to_image_3',
  //     heading: 'Course Title 3',
  //     duration: '6',
  //     coursesText: 'Some course text 3',
  //     price: 1500 // Replace with actual price
  //   }
  // ];
  discountedPrice: number = 0;
  cartIsEmpty: boolean = false;


  constructor(private cartService: CartService, private http: HttpClient) {}

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
      this.selectedItems = this.selectedItems.filter(id => id !== courseId);
    }
  }

  addToMyCourses(): void {
    const url = endPoints.secureBaseURL + '/subscriber/cart/subscribe';
    this.http.post(url, this.selectedItems).subscribe(
      (response) => {
        this.isAdded =true
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
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      },
      (error) => {
        console.error('Error removing item:', error);
      }
    );
  }

}
