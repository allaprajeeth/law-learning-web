import { Component } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

  title = 'AngularCodeTestingProject';

  detailsEntered = false;
  email: string = '';
  phone: string = '';
  emailOTPInput: string = '';
  phoneOTPInput: string = '';

  otpVerified = false;
  newPassword: string = '';
  confirmPassword: string = '';

  newPasswordVisible = false;
  confirmPasswordVisible = false;

  // passwordResetSuccess = false;

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  sendOTP() {
    if (this.email && this.phone) {
      this.detailsEntered = true;
    } else {
      alert('Please enter valid Email and phone number.');
    }
  }

  verifyOTP() {
    // Implement OTP verification logic here
    if (this.emailOTPInput && this.phoneOTPInput) {
      this.otpVerified = true;
    } else {
      alert('Please enter valid emailOTP and phoneOTP');
    }
  }

  resetPassword() {
    if (this.newPassword && this.confirmPassword) {
      if (this.newPassword === this.confirmPassword) {
      } else {
        alert('New Password and Confirm Password must match.');
      }
    } else {
      alert('Please enter valid newPassword and confirmPassword.');
    }
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
