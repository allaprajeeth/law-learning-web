import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ForgotEmailService } from './services/forgot-email.service';

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
  updateEmailForm:FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar ,
    private router: Router,
    private forgotEmailService:ForgotEmailService

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
    this.updateEmailForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
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
    this.sendOtp()
    // if (!this.detailsEntered) {
    //   this.detailsEntered = true;
    // } 
    // else if (this.email && this.phone) {
    //   this.detailsEntered = true;
    // } 
  }

  updateEmail() {
    // Logic to update phone number
   
    this.sendOtpEmail()
  }
  
  checkEmailMatch() {
    const emailControl = this.updateEmailForm?.get('email');
    const confirmEmailControl = this.updateEmailForm?.get('confirmEmail');

    if (emailControl && confirmEmailControl) {
      if (emailControl.value !== confirmEmailControl.value) {
        confirmEmailControl.setErrors({ mismatch: true });
      } else {
        confirmEmailControl.setErrors(null);
      }
    }
  }
 
  verifyOTP() {
    this.verifyotp()
    
    
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
    this.verifyotpEmail();
   
    // this.snackBar.open("Your Details Successfully Updated. Login with new  credentials.", 'Close', {
    //   duration: 3000, 
    //   verticalPosition: 'top',
    // });
  }
  get phoneNumber() {
    return this.forgotEmailForm.get('phoneNumber');
  }
  get phoneOtp(){
    return this.phoneOtpForm.get('phoneOtp')
  }
  get newEmail(){
    return this.updateEmailForm.get('confirmEmail')
  }
  get emailOtp(){
    return this.emailOtpForm.get('emailOtp')
  }
  sendOtp() {
    const phone = this.phoneNumber?.value;
    const type='sendphoneotp'
    this.forgotEmailService.validationKey$.next('');
    const FormData = {
      type:type,
      phone: phone,
     
    };
    this.forgotEmailService.sendOtp(FormData).subscribe(
      () => {
        if (!this.detailsEntered) {
          this.detailsEntered = true;
        } else if (this.email && this.phone) {
          this.detailsEntered = true;
        }
      },

    );
    
  }
  verifyotp(){
    const phoneOtp = this.phoneOtp?.value;
    const type='verifyphoneotp'
     const FormData={
         type:type,
         phone_otp:phoneOtp,
         validation_key :this.forgotEmailService.validationKey$.value
     }
     this.forgotEmailService.verifyotp(FormData).subscribe(
      ()=>{
        const otpInputString = String(this.emailOTPInput);
      this.otpVerified = true;
      this.showVerifyButton = false;
      this.showContainer1 = false;
      this.showContainer2 = true;
      }
      
     )
  }
  sendOtpEmail() {
    const newEmail= this.newEmail?.value;
    const type='sendnewemailotp'
    this.forgotEmailService.validationKey$.next('');
    const FormData = {
      type:type,
      newEmail:newEmail
    };
    this.forgotEmailService.sendOtpEmail(FormData).subscribe(
      ()=>{
        this.updateEmailMode = true;
      }
    )
  }
  verifyotpEmail(){
    const emailotp = this.emailOtp?.value;
    const phone=this.phoneNumber?.value
    const type='verifynewemailotp'
     const FormData={
         type:type,
         phone:phone,
         email_otp:emailotp,
         validation_key :this.forgotEmailService.validationKey$.value
     }
     this.forgotEmailService.verifyotpEmail(FormData).subscribe(
      ()=>{
        this.router.navigate(['/login']);
      }
     )
  }

}
