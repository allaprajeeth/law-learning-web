import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TermsandconComponent } from 'src/app/common/termsandcon/termsandcon.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
 
  constructor(private router: Router) { }
  navigateToAboutUs() {
    this.router.navigate(['/aboutus']); 
  }
  navigateToContactUs() {
    this.router.navigate(['/contactus']); 
  }
  navigateToTermsAndConditions() {
    this.router.navigate(['/termsandcon']);
  }
}
