import { Component } from '@angular/core';
import { PopupService } from 'src/popup.service';
import { LogoutService } from 'src/app/common/services/logout.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
// import { AdminService } from '../admin.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  // name = "";

  showLogoutPopup = false;
  constructor(
    private sharedService: PopupService,
    private logoutService: LogoutService,
    private router: Router,
    // private adminService: AdminService,
    private profileService: ProfileService
  ) {}

  get name(): string {
    return this.profileService.getUserName();
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
      });

      setTimeout(() => {
        this.sharedService.showLogoutAlert = false;
      }, 5000);

      this.router.navigate(['/header']);
      this.showLogoutPopup = false;
  }
}
