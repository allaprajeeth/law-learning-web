import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-phoneno',
  templateUrl: './forgot-phoneno.component.html',
  styleUrls: ['./forgot-phoneno.component.scss']
})
export class ForgotPhonenoComponent {
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
  emailOtpForm:FormGroup;
  phoneOtpForm:FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar ,
    private router: Router,

  ){
     this.emailOtpForm = this.formBuilder.group({
    emailOtp: ['', [Validators.required]],
  });
  this.phoneOtpForm = this.formBuilder.group({
    phoneOtp: ['', [Validators.required]],
  });
  }
  onEmailOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.emailOtpForm
      .get('emailOtp')!
      .setValue(truncatedValue, { emitEvent: false });
  }

  sendOTP() {
    if (!this.detailsEntered) {
      // Logic to send OTP
      this.detailsEntered = true;
    } 
    else if (this.email && this.phone) {
      this.detailsEntered = true;
    } 
  }

  updatePhoneNumber() {
    // Logic to update phone number
    this.updatePhoneMode = true;
  }
  
  checkPhoneMatch(form: NgForm) {
    if (form.value.phone !== form.value.confirmPhone) {
      form.control.setErrors({ mismatch: true });
    } else {
      form.control.setErrors(null);
    }
  }
  verifyOTP() {
    const otpInputString = String(this.emailOTPInput);
      this.otpVerified = true;
      this.showVerifyButton = false;
      this.showContainer1 = false;
      this.showContainer2 = true;
    
  }
  onPhoneOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.phoneOtpForm
      .get('phoneOtp')!
      .setValue(truncatedValue, { emitEvent: false });
  }
  updateNumber(){
    this.router.navigate(['/login']);
    this.snackBar.open("Your Details Successfully Updated. Login with new  credentials.", 'Close', {
      duration: 3000, 
      verticalPosition: 'top',
    });
  }
}
