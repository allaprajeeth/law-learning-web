import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

interface ApiResponse {
  message: string;
}
interface ApiResponseError {
  message: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      selectedCategory: ['Subscriber', [Validators.required]],
      emailOtp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      phoneOtp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }
  isSendOtpsClicked: boolean = true;
  images: string[] = ['assets/Law Learning.png'];
  currentIndex: number = 0;
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
    this.isInputFilled =
      (!!this.loginForm.get('email')?.value ?? false) &&
      (!!this.loginForm.get('phone')?.value ?? false);
  }
  sendOtps() {
    this.showOtpFields();
    //this.sendOtp();
    this.isSendOtpsClicked = !this.isSendOtpsClicked;
  }
  async sendOtp() {
    const baseUrl =
      ' https://ea06-202-53-86-13.ngrok-free.app/api/signuplogin/sendotp';
    const url = `${baseUrl}?email=${encodeURIComponent(
      this.email
    )}&phone=${encodeURIComponent(this.phone)}&role=${
      this.selectedCategory
    }&action=sendotplogin`;
    const requestData = {
      email: this.email,
      phone: this.phone,
      role: this.selectedCategory,
      action: 'sendotplogin',
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      const response = (await firstValueFrom(
        this.http.post(url, JSON.stringify(requestData), {
          headers: headers,
        })
      )) as ApiResponse;

      if (response && response.message) {
        console.log('API Response:', response);
        this.showSuccessMessage(response.message);
      }

      console.log('OTP sent successfully', response);
    } catch (error: any) {
      console.error('Error sending OTP:', error);

      if (
        error instanceof HttpErrorResponse &&
        error.error &&
        error.error.message
      ) {
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
  login() {
    // this.loginpage();
    this.loginValidation();
  }
  async loginpage() {
    const baseUrl =
      '  https://ea06-202-53-86-13.ngrok-free.app/api/signuplogin/verifyotp';
    const url = `${baseUrl}?email=${encodeURIComponent(
      this.email
    )}&phone=${encodeURIComponent(this.phone)}&role=${
      this.selectedCategory
    }&action=verifylogin&emailotp=${encodeURIComponent(
      this.emailotp
    )}&phoneotp=${encodeURIComponent(this.phoneotp)}`;
    const requestData = {
      email: this.email,
      phone: this.phone,
      role: this.selectedCategory,
      emailotp: this.emailotp,
      phoneotp: this.phoneotp,
      action: 'verifylogin',
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      const response = (await firstValueFrom(
        this.http.post(url, JSON.stringify(requestData), {
          headers: headers,
        })
      )) as ApiResponse;
      if (response && response.message) {
        console.log('API Response:', response);
        this.showSuccessMessage(response.message);
      }

      setTimeout(() => {
        this.loginValidation();
      }, 1500);
      console.log('Login successful', response);
    } catch (error: any) {
      console.error(' Invalid OTP:', error);

      if (
        error instanceof HttpErrorResponse &&
        error.error &&
        error.error.message
      ) {
        // Display the error message from the API response
        this.showErrorMessage(error.error.message);
      } else {
        this.showErrorMessage('Invalid OTPs.');
      }
    }
  }

  loginValidation(): void {
    const selectedCategoryValue = this.loginForm.get('selectedCategory')?.value;
    console.log('Selected Category:', selectedCategoryValue);
    let route: string = '';
    if (selectedCategoryValue === 'Subscriber') {
      route = 'subscriber/homepage';
    } else if (selectedCategoryValue === 'Instructor') {
      route = 'instructor/homepage';
    } else if (selectedCategoryValue === 'Reviewer') {
      route = 'reviewer/homepage';
    } else if (selectedCategoryValue === 'Content_Manager') {
      route = 'authentication/homepage';
    } else if (selectedCategoryValue === 'Admin') {
      route = 'admin/homepage';
    }
    this.router.navigate([route]);

    // Clear error messages and remove error border
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
  onEmailOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.loginForm
      .get('emailOtp')!
      .setValue(truncatedValue, { emitEvent: false });
  }
  onPhoneOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.loginForm
      .get('phoneOtp')!
      .setValue(truncatedValue, { emitEvent: false });
  }
  onPhoneNumberInput(event:any){
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 10);
    this.loginForm
    .get('phone')!
    .setValue(truncatedValue, { emitEvent: false });
  }
  handlePhoneInput(event: any) {
    this.onPhoneNumberInput(event);
    this.checkInput();
  }

}
