import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';

@Component({
  selector: 'app-instructornav',
  templateUrl: './instructornav.component.html',
  styleUrls: ['./instructornav.component.scss']
})
export class InstructornavComponent {
  
  constructor(private router: Router, private sharedService: PopupService) { }

  // You can use methods to navigate programmatically if needed
  navigateToUserModule() {
    this.router.navigate(['/subscriber']);
  }

 
  onUserCircleClick(event: Event) {
    event.preventDefault();
    // Navigate to the subscriber profile component
    this.router.navigate(['/subscriber/acSecurity']);
  }

  // Function to navigate to the Upload Course component
  navigateToUploadComponent() {
    // Navigate to the upload course route
    this.router.navigate(['/upload']);
  }

  onLogoutClick() {
    this.sharedService.showLogoutAlert = true;
  
    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);
   }

}
