import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';
import { CartService } from '../cart.service';
import { LogoutService } from 'src/app/common/services/logout.service';
import { LoginService } from '../../../../common/components/login/services/login.service';
@Component({
  selector: 'app-subscribernav',
  templateUrl: './subscribernav.component.html',
  styleUrls: ['./subscribernav.component.scss']
})
export class SubscribernavComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(
    private router: Router,
     private sharedService: PopupService, 
     private cartService: CartService,
     private logoutService:LogoutService,
     private loginService:LoginService
     ) { }
  
     email = this.loginService.loggedInUserEmail$.value;

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
    this.router.navigate(['/subscriber/photo']);
  }
  get showLogoutAlert(): boolean {
    return this.sharedService.showLogoutAlert;
  }
  
  onLogoutClick() {
    this.sharedService.showLogoutAlert = true;

    this.logoutService.logOutUser().subscribe(() => {
      console.log("logged out successfully")
    });
    
    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);
   }
}
