import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

  detailsEntered = false;
  email: string = '';
  emailOTPInput: string = '';
  otpVerified = false;
  phone: string = '';
  confirmPhone: string = '';
  updatePhoneMode = false;
  phoneOTPInput: string = '';
  showVerifyButton = true;
  showContainer1 = true;
  showContainer2 = false;
  // updatePhoneForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.updatePhoneForm = this.fb.group({
  //     phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  //     confirmPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  //   }, { validator: this.phoneNumbersMatchValidator });
  // }

  // phoneNumbersMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   const phone = control.get('phone')?.value;
  //   const confirmPhone = control.get('confirmPhone')?.value;

  //   return phone === confirmPhone ? null : { 'phoneMismatch': true };
  // }
  
  

 
  sendOTP() {
    if (!this.detailsEntered) {
      // Logic to send OTP
      this.detailsEntered = true;
    } 
    else if (this.email && this.phone) {
      this.detailsEntered = true;
    } else {
      alert('Please enter a valid Email.');
    }
  }

  updatePhoneNumber() {
    // Logic to update phone number
    this.updatePhoneMode = true;
  }

  verifyOTP() {
    const otpInputString = String(this.emailOTPInput);

   if (this.emailOTPInput && otpInputString.length === 6) {
  
      this.otpVerified = true;
      this.showVerifyButton = false;
      this.showContainer1 = false;
      this.showContainer2 = true;
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  }
}
