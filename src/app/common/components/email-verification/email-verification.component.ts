import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserDetailsService } from '../../services/user-details/user-details.service';
import { ForgotEmailService } from '../forgot-email/services/forgot-email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent {
  @Input() changeType!: 'phone' | 'email';
  // emailOtp: string = '';
  showOtpInput = false;
  showContainer1 = true;
  showContainer2 = false;
  otpVerified = false;
  accountForm!: FormGroup;
  updateEmailMode = false;
  emailOtpForm: FormGroup;
  updateEmailForm: FormGroup;
  isCurrentPhoneEditable = false;
  userMobile: string = ''; // Added userMobile property
  // phoneOtp: any;
  onPhoneOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.accountForm.get('phoneOtp')!.setValue(truncatedValue, {
      emitEvent: false,
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
  get emailOtp(){
    return this.emailOtpForm.get('emailOtp')
  }
  sendOtpEmail() {
    this.updateEmailMode = true;

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
  
  get email() {
    return this.updateEmailForm.get('email');
  }
  get confirmEmail() {
    return this.updateEmailForm.get('confirmEmail');
  }

  constructor(
    public dialogRef: MatDialogRef<EmailVerificationComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userDetailsService: UserDetailsService, 
    private forgotEmailService:ForgotEmailService,
    private router: Router,
  ) {
    this.initializeForm();
    this.getUserInfo();
    this.emailOtpForm = this.fb.group({
      emailOtp: ['', [Validators.required]],
    });
    this.updateEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
    });
  }

  initializeForm() {
    this.accountForm = this.fb.group({
      currentPhone: [{ value: '', disabled: true }, Validators.required],
      phoneOtp: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
    });
  }
  getUserInfo() {
    // const userInfo = this.userDetailsService.getUserInfoFromLocalStorage();
    // this.userMobile = userInfo.phoneno;
    const userMobile = this.userDetailsService.phoneno;
    this.accountForm.controls['currentPhone'].setValue(userMobile); // Set value to currentPhone   
  }
  sendOtp() {
    this.showOtpInput = true;
    const userMobile = this.userDetailsService.phoneno;
    const type='SEND_PHONE_OTP'
    const FormData = {
      type:type,
      phone: userMobile,
     
    };
    this.forgotEmailService.sendOtp(FormData).subscribe(
      () => {
        // if (!this.detailsEntered) {
        //   this.detailsEntered = true;
        // } else if (this.email && this.phone) {
        //   this.detailsEntered = true;
        // }
      },

    );
  }

  get phoneOtp(){
    return this.accountForm.get('phoneOtp')
  }
  get phoneNumber() {
    return this.updateEmailForm.get('phoneNumber');
  }
  verifyAndUpdate() {
    const emailotp = this.emailOtp?.value;
    const phone = this.userDetailsService.phoneno;
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
    // this.snackBar.open('Email updated successfully!', 'Close', {
    //   duration: 3000,
    //   verticalPosition: 'top' as MatSnackBarVerticalPosition,
    // });
    this.dialogRef.close();
  }

  isEmailMatching(): boolean {
    const email = this.updateEmailForm.get('email')?.value;
    const confirmEmail = this.updateEmailForm.get('confirmEmail')?.value;

    return email === confirmEmail;
  }

  verifyotp() {
    this.otpVerified = true;
    this.showContainer1 = false;
    this.showContainer2 = true;

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
  
      this.showContainer1 = false;
      this.showContainer2 = true;
      }
      
     )
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
