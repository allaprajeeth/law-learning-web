// adminnav.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileService } from '../profile.service';
import { SharedService } from 'src/app/shared-module/shared.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.scss']
})
export class AdminnavComponent implements OnInit {
  showLogoutPopup = false;
  auth: object | undefined;
  name = "";
  email = "";
  username = "";

  constructor(
    private router: Router,
    private store: Store,
    private profileService: ProfileService,
    private sharedService: SharedService,
  ) {}

  getUserInfoFromLocalStorage(): void {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) { 
      try {
        const userDetails = JSON.parse(userDetailsString);
        if (userDetails && userDetails.name && userDetails.email && userDetails.phone) {
          this.name = userDetails.name;
          this.email = userDetails.email;
          this.username = userDetails.phone;
          this.profileService.setUserName(this.name);
          this.sharedService.setUserDetails(this.name, this.email, this.username);
        } else {
          console.error('Invalid user details format:', userDetails);
        }
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
  }

  ngOnInit() {
    this.getUserInfoFromLocalStorage();

    // Subscribe to showLogoutAlert changes
    this.sharedService.showLogoutAlert$.subscribe(value => {
      this.showLogoutPopup = value;
    });
  }

  onUserCircleClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/admin/profile']);
  }
  
  onLogoutClick(): void {
    this.sharedService.setShowLogoutAlert(true);
  }
  
  onClosePopup(): void {
    this.sharedService.setShowLogoutAlert(false);
  }
}
