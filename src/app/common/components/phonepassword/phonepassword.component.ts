import { Component } from '@angular/core';

@Component({
  selector: 'app-phonepassword',
  templateUrl: './phonepassword.component.html',
  styleUrls: ['./phonepassword.component.scss']
})
export class PhonepasswordComponent {
  detailsEntered = false;
  email: string = '';
  phone: string = '';
  emailOTPInput: string = '';
  phoneOTPInput: string = '';

  otpVerified = false;
  newPassword: string = '';
  confirmPassword: string = '';

  // updatePhoneNumber: string = '';
  confirmPhone: string = '';

  // newPasswordVisible = false;
  // confirmPasswordVisible = false;

  // passwordResetSuccess = false;

  // toggleNewPasswordVisibility() {
  //   this.newPasswordVisible = !this.newPasswordVisible;
  // }

  // toggleConfirmPasswordVisibility() {
  //   this.confirmPasswordVisible = !this.confirmPasswordVisible;
  // }

  sendOTP() {
    if (this.phone) {
      this.detailsEntered = true;
    } else {
      alert('Please enter a valid Email.');
    }
  }

  verifyOTP() {
    // Implement OTP verification logic here
    if (this.emailOTPInput ) {
      this.otpVerified = true;
    } else {
      alert('Please enter valid emailOTP and phoneOTP');
    }
  }

  // resetPassword() {
  //   if (this.newPassword && this.confirmPassword) {
  //     if (this.newPassword === this.confirmPassword) {
  //     } else {
  //       alert('New Password and Confirm Password must match.');
  //     }
  //   } else {
  //     alert('Please enter valid newPassword and confirmPassword.');
  //   }
  // }

  updatePhoneNumber(){

  }

  loginAgain() {
    if (this.newPassword && this.confirmPassword) {
      if (this.newPassword === this.confirmPassword) {
        this.detailsEntered = false;
        this.otpVerified = false;
        this.email = '';
        this.phone = '';
        this.emailOTPInput = '';
        this.phoneOTPInput = '';
        this.newPassword = '';
        this.confirmPassword = '';
      } else {
        alert('New Password and Confirm Password must match.');
      }
    } else {
      alert('Please enter valid newPassword and confirmPassword');
    }
  }
}


