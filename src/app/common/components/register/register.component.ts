import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 // constructor(private router: Router) {}
 images: string[] = [
  'assets/law.img1.png',
  // 'assets/law.img2.png',
  // 'assets/law.img3.png',
  // 'assets/law.img4.png'
  // Add more image paths as needed
];

currentIndex: number = 0;
interval: any;
username: string = '';
password: string = '';
signUpForm=new FormGroup({
  fullName: new FormControl("", [Validators.minLength(3)]),
  email:new FormControl("",[Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  password:new FormControl("",[Validators.minLength(6)]),
  phone: new FormControl("", [
    Validators.required, // Require the phone number to be provided
    Validators.pattern('^[0-9]{10}$') // Validate the phone number format (e.g., 10 digits)
  ])
})

ngOnInit() {
  // this.startAutoCarousel();
}

// ngOnDestroy() {
//   this.stopAutoCarousel();
// }

// startAutoCarousel() {
//   this.interval = setInterval(() => {
//     this.nextImage();
//   }, 3000); // Change image every 3 seconds (adjust as needed)
// }

// stopAutoCarousel() {
//   clearInterval(this.interval);
// }

// nextImage() {
//   this.currentIndex = (this.currentIndex + 1) % this.images.length;
// }

// prevImage() {
//   this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
// }




  selectedCategory: any;
  
  constructor(private router: Router) {} // Inject the Router module

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.router.navigate(['/register']);

}

}

























// import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//     selector: 'app-register',
//     templateUrl: './register.component.html',
//     styleUrls: ['./register.component.scss']
//   })
//   export class RegisterComponent implements OnInit {
//     email: string = '';
//   phone: string = '';
//   selectedCategory: string = '';
//   // password: string = '';
//   emailOtp: string = '';
//   phoneOtp: string = '';
//   emailOtpError: string = '';
//   phoneOtpError: string = '';
//   // passwordError: string = '';

//   isInputFilled: boolean = false;
//   // isPasswordVisible: boolean = false;
//   isOtpVisible: boolean = false;
//   isLoginVisible: boolean = false;
//   // router: any;

//   checkInput(): void {
//     this.isInputFilled = !!this.email && !!this.phone;
//   }

//   togglePasswordVisibility(): void {
//     // this.isPasswordVisible = this.selectedCategory === 'Option1' || this.selectedCategory === 'Option2';
//     // this.isOtpVisible = !this.isPasswordVisible; // Hide OTP fields when password is visible
//     // this.isLoginVisible = true;
//   }
  
//   showOtpFields(): void {
//     this.isOtpVisible = true;
//     this.isLoginVisible = true;
//   }


  

  
//   fnLogin(): void {
//     if (this.isOtpVisible && (!this.emailOtp || !this.phoneOtp)) {
//       this.emailOtpError = this.emailOtp ? '' : 'Email OTP is required.';
//       this.phoneOtpError = this.phoneOtp ? '' : 'Phone OTP is required.';

//       // Add error-input class to highlight the input fields with errors
//       if (!this.emailOtp) {
//         document.getElementById('emailOtp')?.classList.add('error-input');
//       } else {
//         document.getElementById('emailOtp')?.classList.remove('error-input');
//       }

//       if (!this.phoneOtp) {
//         document.getElementById('phoneOtp')?.classList.add('error-input');
//       } else {
//         document.getElementById('phoneOtp')?.classList.remove('error-input');
//       }

//       // return;

//       let route: string = '';
  
//           if (this.selectedCategory === 'Subscriber') {
//             route = 'subscriber/homepage';
//           } else if (this.selectedCategory === 'Instructor') {
//             route = 'instructor/homepage';
//           } else if (this.selectedCategory === 'Reviewer') {
//             route = 'reviewer/homepage';
//           }
      
//           this.router.navigate([route]);
//     }

    
//     // Your login logic here
//   }

//     // Your login logic here
  
//   // showPasswordField(): void {
//   //   this.isPasswordVisible = true;
//   // }

//   // images: string[] = ['assets/law.img1.png'];
//   // currentIndex: number = 0;
//   // interval: any;
//   // username: string = '';
//   // password: string = '';
//   // loginIsSuccessful: boolean = false;
//   // isCategoryEnabled: boolean = false;
//   // showNextButton: boolean = true;
//   // phoneOtp: string = '';
//   // emailOtp: string = '';
//   // selectedCategory: string = '';
//   // showLoginForm: boolean = true;

//   // constructor(private router: Router, private cdr: ChangeDetectorRef) {}

//   ngOnInit() {
//     // this.isCategoryEnabled = false;
   
      
   
//   }

//   constructor(private router: Router){}

  // showNextForm() {
  //   this.showNextButton = false;
  // }

  // onCategoryChange(event: any): void {
  //   this.selectedCategory = event.target.value;
  //   this.checkEnableCategorySelect();
  // }

  // checkEnableCategorySelect() {
  //   // Check if email and phone number are filled
  //   if (this.username && this.password) {
  //     // Enable category selection dropdown
  //     this.isCategoryEnabled = true;
  //     this.selectedCategory = 'Subscriber'; // Set default category to "Subscriber"
  //     this.showNextButton = true; // Enable "SendOtps" button
  //   } else {
  //     // Disable category selection dropdown and "SendOtps" button
  //     this.isCategoryEnabled = false;
  //     this.selectedCategory = ''; // Reset the selected category
  //     this.showNextButton = false; // Disable "SendOtps" button
  //   }
  //   this.cdr.detectChanges();
  // }
  

  // fnLogin(event: Event): void {
  //   if (this.selectedCategory === 'Subscriber' && this.showNextButton) {
  //     // Handle sending OTP logic here
  //     // This block is empty for handling OTP logic for Subscribers
  //   } else if (this.selectedCategory === 'Subscriber' && !this.showNextButton) {
  //     // Handle verifying OTP logic here
  //     // You need to handle OTP verification logic for Subscribers here
  //   } else {
  //     let route: string = '';
  
  //     if (this.selectedCategory === 'Subscriber') {
  //       route = 'subscriber/homepage';
  //     } else if (this.selectedCategory === 'Instructor') {
  //       route = 'instructor/homepage';
  //     } else if (this.selectedCategory === 'Reviewer') {
  //       route = 'reviewer/homepage';
  //     }
  
  //     this.router.navigate([route]);
  //   }
  // }
  
// }

