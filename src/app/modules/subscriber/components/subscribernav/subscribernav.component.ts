import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';
import { CartService } from '../cart.service';
CartService


@Component({
  selector: 'app-subscribernav',
  templateUrl: './subscribernav.component.html',
  styleUrls: ['./subscribernav.component.scss']
})
export class SubscribernavComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private router: Router, private sharedService: PopupService, private cartService: CartService) { }

  // You can use methods to navigate programmatically if needed
  navigateToUserModule() {
    this.router.navigate(['/subscriber']);
  }

  ngOnInit() {
 // Subscribe to the cartItemCount$ observable to keep it updated
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
  }
 
  onUserCircleClick(event: Event) {
    event.preventDefault();
    // Navigate to the subscriber profile component
    this.router.navigate(['/subscriber/acSecurity']);
  }
  get showLogoutAlert(): boolean {
    return this.sharedService.showLogoutAlert;
  }
  
  onLogoutClick() {
    this.sharedService.showLogoutAlert = true;
  
    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);
   }
}
