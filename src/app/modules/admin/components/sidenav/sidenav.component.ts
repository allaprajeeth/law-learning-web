import { Component } from '@angular/core';
import { PopupService } from 'src/popup.service';
import { LogoutService } from 'src/app/common/services/logout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(
    private sharedService: PopupService,
    private logoutService: LogoutService
  ) {}

  onLogoutClick() {
    this.sharedService.showLogoutAlert = true;

    this.logoutService.logOutUser().subscribe(() => {
      console.log('logged out successfully');
    });

    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);
  }
}
