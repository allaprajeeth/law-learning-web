import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TermsandconComponent } from 'src/app/common/termsandcon/termsandcon.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // router: any;
  constructor(private router: Router) { }
  navigateToTermsAndConditions() {
    // Navigate to the 'TermsandconComponent' route
    this.router.navigate(['/termsandcon']);
  }
}
