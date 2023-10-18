// import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   // constructor(private router: Router) {}
  
//   images: string[] = [
//     'assets/law.img1.png',
//   ];

//   currentIndex: number = 0;
//   interval: any;
//   email: string = '';
//   phone: string = '';
//   loginIsSuccessful: boolean = false;


//   showNextButton: boolean = true;
//   phoneOtp: string = '';
//   emailOtp: string = ''; 
//   showValidationError: boolean = false;

//   // Define an EventEmitter to emit the closeSignup event
//   @Output() closeSignup = new EventEmitter<void>();

//   selectedCategory: string = ''; // Initialize with an empty string
//   showLoginForm: boolean = true; 

//   showSignupForm() {
//     this.showLoginForm = false; // Set to false to show the signup form
//   }
//   onCloseSignup() {
//     this.closeSignup.emit();
//   }
//   constructor(private router: Router) {} // Inject the Router module
  
//   showNextForm() {
//     this.showNextButton = false;
//   }

//   onCategoryChange(event: any): void {
    
//       this.selectedCategory = event.target.value;
    
//   }

//   fnLogin(event: Event): void {
//     let route: string = ''; // Initialize route with an empty string or default route

//     if (this.selectedCategory === 'Subscriber') {
//       route = 'subscriber/homepage';
//     } else if (this.selectedCategory === 'Instructor') {
//       route = 'instructor/homepage';
//     } else if (this.selectedCategory === 'Reviewer') {
//       route = 'reviewer/homepage';
//     }

//     // Navigate to the corresponding homepage route
//     this.router.navigate([route]);
//   }

//   }
  







































import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  images: string[] = ['assets/law.img1.png'];
  currentIndex: number = 0;
  email: string = '';
  phone: string = '';
  selectedCategory: string = '';
  // password: string = '';
  emailOtp: string = '';
  phoneOtp: string = '';
  emailOtpError: string = '';
  phoneOtpError: string = '';
  // passwordError: string = '';

  isInputFilled: boolean = false;
  // isPasswordVisible: boolean = false;
  isOtpVisible: boolean = false;
  isLoginVisible: boolean = false;

  disableCategorySelect: boolean = false;

  checkInput(): void {
    this.isInputFilled = !!this.email && !!this.phone;
  }

  // togglePasswordVisibility(): void {
  //   // this.isPasswordVisible = this.selectedCategory === 'Option1' || this.selectedCategory === 'Option2';
  //   // this.isOtpVisible = !this.isPasswordVisible; // Hide OTP fields when password is visible
  //   // this.isLoginVisible = true;
  // }
  
  showOtpFields(): void {
    this.isOtpVisible = true;
    this.isLoginVisible = true;
    this.disableCategorySelect = true; 
  }


  

  
  fnLogin(): void {
    if (this.isOtpVisible && this.emailOtp && this.phoneOtp) {
      // Both OTP fields are filled, navigate to the appropriate route
      let route: string = '';
      if (this.selectedCategory === '') {
        route = 'subscriber/homepage';
      } else if (this.selectedCategory === 'Instructor') {
        route = 'instructor/homepage';
      } else if (this.selectedCategory === 'Reviewer') {
        route = 'reviewer/homepage';
      }else if (this.selectedCategory === 'ContentManager') {
        route = 'authentication/homepage';
      }
      
      this.router.navigate([route]);
  
      // Clear error messages and remove error border
      this.emailOtpError = '';
      this.phoneOtpError = '';
      document.getElementById('emailOtp')?.classList.remove('error-input');
      document.getElementById('phoneOtp')?.classList.remove('error-input');
    } else {
      // OTP fields are not filled, display error messages and error border
      this.emailOtpError = this.emailOtp ? '' : 'Email OTP is required.';
      this.phoneOtpError = this.phoneOtp ? '' : 'Phone OTP is required.';
      if (!this.emailOtp) {
        document.getElementById('emailOtp')?.classList.add('error-input');
      } else {
        document.getElementById('emailOtp')?.classList.remove('error-input');
      }
      if (!this.phoneOtp) {
        document.getElementById('phoneOtp')?.classList.add('error-input');
      } else {
        document.getElementById('phoneOtp')?.classList.remove('error-input');
      }
    }
  }
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private router: Router){} 
}

