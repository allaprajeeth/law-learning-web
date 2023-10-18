import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  sharedService: any;
  
  constructor(private router: Router) { }

  // You can use methods to navigate programmatically if needed
  navigateToUserModule() {
    this.router.navigate(['/subscriber']);
  }

 
  onUserCircleClick(event: Event) {
    event.preventDefault();
    // Navigate to the subscriber profile component
    this.router.navigate(['/subscriber/acSecurity']);
  }
  onLogoutClick() {
    this.sharedService.showLogoutAlert = true;
  
    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);
   } 
}
