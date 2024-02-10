import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/components/login/services/login.service';
import { PopupService } from 'src/popup.service';

@Component({
  selector: 'app-reviewernav',
  templateUrl: './reviewernav.component.html',
  styleUrls: ['./reviewernav.component.scss'],
})
export class ReviewernavComponent {
  showLogoutPopup = false;
  name: string = '';
  email="";
  username="";

  constructor(private router: Router, 
    private sharedService: PopupService,
    private loginService:LoginService,) {}

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

    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);
    this.router.navigate(['/header']);
    this.showLogoutPopup = false;
  }
}
