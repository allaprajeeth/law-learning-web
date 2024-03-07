import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileService } from '../profile.service';
import { SharedService } from 'src/app/shared-module/shared.service';
import { UserDetailsService } from 'src/app/common/services/user-details/user-details.service';


@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.scss']
})
export class AdminnavComponent implements OnInit {
  showLogoutPopup = false;
  auth: object | undefined;
  name: string | undefined;
  email: string | undefined;
  phoneno: string | undefined;
  jwtToken: string | null = null;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private sharedService: SharedService,
    private userDetailsService: UserDetailsService
  ) {}

  
  ngOnInit() {
    this.userDetailsService.getUserInfoFromLocalStorage();
      this.name = this.userDetailsService.name;
      this.email = this.userDetailsService.email;
      this.phoneno = this.userDetailsService.phoneno;
      this.jwtToken = this.userDetailsService.jwtToken;
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
