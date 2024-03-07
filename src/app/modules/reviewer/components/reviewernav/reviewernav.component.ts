import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';
import { UserDetailsService } from 'src/app/common/services/user-details/user-details.service';
import { LogoutService } from 'src/app/common/services/logout.service';

@Component({
  selector: 'app-reviewernav',
  templateUrl: './reviewernav.component.html',
  styleUrls: ['./reviewernav.component.scss'],
})
export class ReviewernavComponent {
  showLogoutPopup = false;
  name: string | undefined;
  email: string | undefined;
  phoneno: string | undefined;
  jwtToken: string | null = null;


  constructor(private router: Router, 
    private sharedService: PopupService,
    private userDetailsService: UserDetailsService,
    private logoutService:LogoutService,
   ) {}

   ngOnInit() {
      
    this.userDetailsService.getUserInfoFromLocalStorage();
    this.name = this.userDetailsService.name;
    this.email = this.userDetailsService.email;
    this.phoneno = this.userDetailsService.phoneno;
    this.jwtToken = this.userDetailsService.jwtToken;

  }



  onUserCircleClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/reviewer/profile']);
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
    this.sharedService.showLogoutAlert = true;
  
    this.logoutService.logOutUser().subscribe(() => {
      console.log('logged out successfully');
  
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userDetails');

    });
  
    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);
  
    this.router.navigate(['/header']);
    this.showLogoutPopup = false;
  }
}
