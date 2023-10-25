import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
interface ApiResponse {
  message: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private router: Router,private http: HttpClient,private snackBar: MatSnackBar){} 

  images: string[] = ['assets/law.img1.png'];
  currentIndex: number = 0;
  name:string ='';
  email: string = '';
  phone: string = '';
  selectedCategory: string = '';
  emailotp: string = '';
  phoneotp: string = '';
  emailOtpError: string = '';
  phoneOtpError: string = '';
  isInputFilled: boolean = false;
  isOtpVisible: boolean = false;
  isLoginVisible: boolean = false;
  disableCategorySelect: boolean = false;
  

  checkInput(): void {
    this.isInputFilled = !!this.email && !!this.phone;
  }
  sendOtps(){
    this.showOtpFields();
    this.sendOtpSignup();
    console.log(this.email);
    console.log(this.phone)
    console.log(typeof this.email)
  }
  async sendOtpSignup() {
  const baseUrl = 'https://c2f7-202-53-86-13.ngrok-free.app/api/signuplogin/sendotp';
  const url = `${baseUrl}?name=${encodeURIComponent(this.name)}&email=${encodeURIComponent(this.email)}&phone=${encodeURIComponent(this.phone)}&role=${this.selectedCategory}&action=sendotpsignup`;
    const requestData = {
      name:this.email,
      email: this.email,
      phone: this.phone,
      role: this.selectedCategory,
      action: 'sendotpsignup'
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  try{
    const response = await firstValueFrom(
      this.http.post(url, JSON.stringify(requestData), {
        headers: headers
      })
    )as ApiResponse;
    if (response && response.message) {
      console.log('API Response:', response);
      this.showSuccessMessage(response.message);
    }
    
  console.log('OTP sent successfully', response);
    }
    catch (error: any) {
      console.error('Error sending OTP:', error);
    
      if (error instanceof HttpErrorResponse && error.error && error.error.message) {
        // Display the error message from the API response
        this.showErrorMessage(error.error.message);
      } else {
        this.showErrorMessage('An error occurred while sending OTP.');
      }
    }

  }
  
showOtpFields(): void {
    this.isOtpVisible = true;
    this.isLoginVisible = true;
    this.disableCategorySelect = true; 
  }
  signupVerify(){
    this.loginpage();
  }
  async loginpage(){
    const baseUrl = '  https://c2f7-202-53-86-13.ngrok-free.app/api/signuplogin/verifyotp';
    const url = `${baseUrl}?name=${encodeURIComponent(this.name)}email=${encodeURIComponent(this.email)}&phone=${encodeURIComponent(this.phone)}&role=${this.selectedCategory}&action=verifysignup&emailotp=${encodeURIComponent(this.emailotp)}&phoneotp=${encodeURIComponent(this.phoneotp)}`;
    const requestData = {
      name:this.name,
      email: this.email,
      phone: this.phone,
      role: this.selectedCategory,
      emailotp:this.emailotp,
      phoneotp:this.phoneotp,
      action: 'verifysignup'
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  try{
    const response = await firstValueFrom(
      this.http.post(url, JSON.stringify(requestData), {
        headers: headers
      })
    ) as ApiResponse
    if (response && response.message) {
      console.log('API Response:', response);
      this.showSuccessMessage(response.message);

      setTimeout(() => {
        this.loginValidation();
      }, 2000); 
    }
    console.log('Sign up Successful', response);
  }
  catch (error) {
    if (error instanceof HttpErrorResponse && error.error && error.error.message) {
      this.showErrorMessage(error.error.message);
    } 
    console.error('Error:', error);
  }

  }

  loginValidation(): void {
    if (this.isOtpVisible && this.emailotp && this.phoneotp) {
      // Both OTP fields are filled, navigate to the appropriate route
      let route: string = '';
      // if (this.selectedCategory === '') {
      //   route = 'subscriber/homepage';
      // } else if (this.selectedCategory === 'Instructor') {
      //   route = 'instructor/homepage';
      // } else if (this.selectedCategory === 'Reviewer') {
      //   route = 'reviewer/homepage';
      // }else if (this.selectedCategory === 'ContentManager') {
      //   route = 'authentication/homepage';
      // }
      
      this.router.navigate(['/register']);
  
      // Clear error messages and remove error border
      this.emailOtpError = '';
      this.phoneOtpError = '';
      document.getElementById('emailOtp')?.classList.remove('error-input');
      document.getElementById('phoneOtp')?.classList.remove('error-input');
    } else {
      // OTP fields are not filled, display error messages and error border
      this.emailOtpError = this.emailotp ? '' : 'Email OTP is required.';
      this.phoneOtpError = this.phoneotp ? '' : 'Phone OTP is required.';
      if (!this.emailotp) {
        document.getElementById('emailOtp')?.classList.add('error-input');
      } else {
        document.getElementById('emailOtp')?.classList.remove('error-input');
      }
      if (!this.phoneotp) {
        document.getElementById('phoneOtp')?.classList.add('error-input');
      } else {
        document.getElementById('phoneOtp')?.classList.remove('error-input');
      }
    }
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      panelClass: ['success-snackbar'] 
    });
}
showErrorMessage(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 3000, 
    panelClass: ['error-snackbar'] 
  });
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

