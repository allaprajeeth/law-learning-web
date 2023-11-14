import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-email',
  templateUrl: './forgot-email.component.html',
  styleUrls: ['./forgot-email.component.scss']
})
export class ForgotEmailComponent {
  detailsEntered = false;
  email: string = '';
  emailOTPInput: string = '';
  otpVerified = false;
  phone: string = '';
  confirmEmail: string = '';
  updateEmailMode = false;
  phoneOTPInput: string = '';
  showVerifyButton = true;
  showContainer1 = true;
  showContainer2 = false;
  emailOtpForm:FormGroup;
  phoneOtpForm:FormGroup;
  forgotEmailForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar ,
    private router: Router,

  ) {
     this.phoneOtpForm = this.formBuilder.group({
    phoneOtp: ['', [Validators.required]],
    });
    this.emailOtpForm = this.formBuilder.group({
    emailOtp: ['', [Validators.required]],
    });
    this.forgotEmailForm=this.formBuilder.group({
      phoneNumber:['',[Validators.required]]
    })
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
      this.detailsEntered = true;
    } 
    else if (this.email && this.phone) {
      this.detailsEntered = true;
    } 
  }

  updateEmail() {
    // Logic to update phone number
    this.updateEmailMode = true;
  }
  
  checkEmailMatch(form: NgForm) {
    if (form.value.email !== form.value.confirmEmail) {
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
  onPhoneNumberInput(event:any){
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 10);
    this.forgotEmailForm
    .get('phoneNumber')!
    .setValue(truncatedValue, { emitEvent: false });
  }
  onPhoneOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.phoneOtpForm
      .get('phoneOtp')!
      .setValue(truncatedValue, { emitEvent: false });
  }
  updatedEmailMsg(){
    this.router.navigate(['/login']);
    this.snackBar.open("Your Details Successfully Updated. Login with new  credentials.", 'Close', {
      duration: 3000, 
      verticalPosition: 'top',
    });
  }
}
