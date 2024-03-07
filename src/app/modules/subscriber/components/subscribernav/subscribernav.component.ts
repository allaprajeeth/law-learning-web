import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';
import { CartService } from '../cart.service';
import { LogoutService } from 'src/app/common/services/logout.service';
import { UserDetailsService } from 'src/app/common/services/user-details/user-details.service';

@Component({
  selector: 'app-subscribernav',
  templateUrl: './subscribernav.component.html',
  styleUrls: ['./subscribernav.component.scss'],
})
export class SubscribernavComponent implements OnInit {
  cartItemCount: number = 0;
  showLogoutPopup = false;
  auth: object | undefined;

  constructor(
    private router: Router,
    private sharedService: PopupService,
    private cartService: CartService,
    private logoutService: LogoutService,
    private userDetailsService: UserDetailsService
  ) {}

  name: string | undefined;
  email: string | undefined;
  phoneno: string | undefined;
  jwtToken: string | null = null;

  navigateToUserModule() {
    this.router.navigate(['/subscriber']);
  }

  ngOnInit() {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });

    this.userDetailsService.getUserInfoFromLocalStorage();
    this.name = this.userDetailsService.name;
    this.email = this.userDetailsService.email;
    this.phoneno = this.userDetailsService.phoneno;
    this.jwtToken = this.userDetailsService.jwtToken;

    console.log('Name:', this.name);
    console.log('Email:', this.email);
  }

  onUserCircleClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/subscriber/profile']);
  }
  get showLogoutAlert(): boolean {
    return this.sharedService.showLogoutAlert;
  }

  onLogoutClick(): void {
    this.showLogoutPopup = true;
  }

  onClosePopup(): void {
    this.showLogoutPopup = false;
  }

  onLogout(): void {
    this.logoutService.logOutUser().subscribe(() => { });
    this.showLogoutPopup = false;
  }
}
