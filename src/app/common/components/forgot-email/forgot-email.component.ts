import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotEmailService } from './services/forgot-email.service';

@Component({
  selector: 'app-forgot-email',
  templateUrl: './forgot-email.component.html',
  styleUrls: ['./forgot-email.component.scss']
})
export class ForgotEmailComponent {
  detailsEntered = false;
  emailOTPInput: string = '';
  otpVerified = false;
  phone: string = '';

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
checkEmailMatch() {
    const emailControl = this.email?.value;
    const confirmEmailControl = this.confirmEmail?.value;

    if (emailControl && confirmEmailControl) {
      if (emailControl !== confirmEmailControl) {
        confirmEmailControl.setErrors({ mismatch: true });
      } else {
        confirmEmailControl.setErrors(null);
      }
    }
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
 
  get email(){
    return this.updateEmailForm.get('email')
  }
  get phoneNumber() {
    return this.forgotEmailForm.get('phoneNumber');
  }
  get phoneOtp(){
    return this.phoneOtpForm.get('phoneOtp')
  }
  get confirmEmail(){
    return this.updateEmailForm.get('confirmEmail')
  }
  get emailOtp(){
    return this.emailOtpForm.get('emailOtp')
  }
  sendOTP() {
    this.sendOtp()
  }
 verifyOTP() {
    this.verifyotp()
  }
  updateEmail() {
    this.sendOtpEmail()
  }
  updatedEmailMsg(){
    this.verifyotpEmail();
  }
  sendOtp() {
    const phone = this.phoneNumber?.value;
    const type='SEND_PHONE_OTP'
    this.forgotEmailService.validationKey$.next('');
    const FormData = {
      type:type,
      phone: phone,
     
    };
    this.forgotEmailService.sendOtp(FormData).subscribe(
      () => {
        if (!this.detailsEntered) {
          this.detailsEntered = true;
          this.updateEmailForm.controls['email'].disable();
          this.updateEmailForm.controls['confirmEmail'].disable();
          
        } else if (this.email && this.phone) {
          this.detailsEntered = true;
        }
      },

    );
    
  }
  verifyotp(){
    const phoneOtp = this.phoneOtp?.value;
    const type='VERIFY_PHONE_OTP'
     const FormData={
         type:type,
         phone_otp:phoneOtp,
         validation_key :this.forgotEmailService.validationKey$.value
     }
     this.forgotEmailService.verifyotp(FormData).subscribe(
      ()=>{
      this.otpVerified = true;
      this.showVerifyButton = false;
      this.showContainer1 = false;
      this.showContainer2 = true;
      }
      
     )
  }
  sendOtpEmail() {
    const newEmail= this.confirmEmail?.value;
    const type='SEND_NEW_EMAIL_OTP'
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
    const type='VERIFY_NEW_EMAIL_OTP'
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
