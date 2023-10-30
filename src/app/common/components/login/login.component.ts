import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ApiResponse {
  message: string;
}
interface ApiResponseError {
  message: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent  {
  
  constructor(private router: Router,private http: HttpClient,private snackBar: MatSnackBar){} 
  isSendOtpsClicked: boolean = true;
  images: string[] = ['assets/law.img1.png'];
  currentIndex: number = 0;
  email: string = '';
  phone: string = '';
  selectedCategory: string = 'Subscriber';
  emailotp: string = '';
  phoneotp: string = '';
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
  sendOtps(){
    this.showOtpFields();
    //this.sendOtp();
    this.isSendOtpsClicked=!this.isSendOtpsClicked;
  }
  async sendOtp() {
  const baseUrl = ' https://ea06-202-53-86-13.ngrok-free.app/api/signuplogin/sendotp';
  const url = `${baseUrl}?email=${encodeURIComponent(this.email)}&phone=${encodeURIComponent(this.phone)}&role=${this.selectedCategory}&action=sendotplogin`;
    const requestData = {
      email: this.email,
      phone: this.phone,
      role: this.selectedCategory,
      action: 'sendotplogin'
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try{
      const response = await firstValueFrom(
        this.http.post(url, JSON.stringify(requestData), {
          headers: headers
        })
      ) as ApiResponse;
      
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
  login(){
    
   // this.loginpage();
    this.loginValidation()
  }
  async loginpage(){
    const baseUrl = '  https://ea06-202-53-86-13.ngrok-free.app/api/signuplogin/verifyotp';
    const url = `${baseUrl}?email=${encodeURIComponent(this.email)}&phone=${encodeURIComponent(this.phone)}&role=${this.selectedCategory}&action=verifylogin&emailotp=${encodeURIComponent(this.emailotp)}&phoneotp=${encodeURIComponent(this.phoneotp)}`;
    const requestData = {
      email: this.email,
      phone: this.phone,
      role: this.selectedCategory,
      emailotp:this.emailotp,
      phoneotp:this.phoneotp,
      action: 'verifylogin'
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

    setTimeout(() => {
      this.loginValidation();
    }, 1500); 
    console.log('Login successful', response);
  }
  catch (error: any) {
    console.error(' Invalid OTP:', error);
  
    if (error instanceof HttpErrorResponse && error.error && error.error.message) {
      // Display the error message from the API response
      this.showErrorMessage(error.error.message);
    } else {
      this.showErrorMessage('Invalid OTPs.');
    }
  }

  }
  loginValidation(): void {
    if (this.isOtpVisible && this.emailotp && this.phoneotp) {
      let route: string = '';
      if (this.selectedCategory === 'Subscriber') {
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
      verticalPosition: 'top',
      panelClass: ['success-snackbar'] 
    });
}
showErrorMessage(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 3000, 
    verticalPosition: 'top',
    panelClass: ['error-snackbar'] 
  });
}



}