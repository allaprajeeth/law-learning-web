import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';

@Component({
  selector: 'app-reviewernav',
  templateUrl: './reviewernav.component.html',
  styleUrls: ['./reviewernav.component.scss'],
})
export class ReviewernavComponent {
  popup:boolean = false;

  constructor(private router: Router, private sharedService: PopupService) {}

  onUserCircleClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/reviewer/profile']);
  }
  get showLogoutAlert(): boolean {
    return this.sharedService.showLogoutAlert;
  }

  onLogoutClick() {
    this.popup = true;
  }

  approve(){
    this.sharedService.showLogoutAlert = true;

    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);
    this.router.navigate(['/header']);
    this.popup=false;
  }

  reject(){
    this.popup = false;
  }
}
