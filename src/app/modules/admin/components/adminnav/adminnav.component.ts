import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.scss']
})
export class AdminnavComponent {
  showLogoutPopup = false;
  constructor(private router: Router,private sharedService: PopupService) { }
 
  onUserCircleClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/admin/profile']);
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
