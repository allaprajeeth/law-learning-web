import { Component } from '@angular/core';
import { PopupService } from 'src/popup.service';
import { LogoutService } from 'src/app/common/services/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  // popup: boolean = false;

  constructor(
    private sharedService: PopupService,
    private logoutService: LogoutService,
    private router: Router
  ) {}

  onLogoutClick() {
    this.sharedService.showLogoutAlert = true;

    this.logoutService.logOutUser().subscribe(() => {
      console.log('logged out successfully');
    });

    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);

    this.router.navigate(['/header']);
    // this.popup = true;
  }

  // approve() {
  //   this.sharedService.showLogoutAlert = true;

  //   this.logoutService.logOutUser().subscribe(() => {
  //     console.log('logged out successfully');
  //   });

  //   setTimeout(() => {
  //     this.sharedService.showLogoutAlert = false;
  //   }, 5000);

  //   this.router.navigate(['/header']);
  //   this.popup = false;
  // }

  // reject() {
  //   this.popup = false;
  // }
}
