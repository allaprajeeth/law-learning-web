import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserDetailsService } from '../../services/user-details/user-details.service';
import { ForgotEmailService } from '../forgot-email/services/forgot-email.service';
import { ForgotPhoneService } from '../forgot-phoneno/Services/forgot-phone.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss'],
})
export class PhoneVerificationComponent {
  @Input() changeType!: 'phone' | 'email';
  phoneOTPInput: string = '';
  showContainer1 = true;
  showContainer2 = false;
  otpVerified = false;
  showOtpInput = false;
  phoneOtpForm: FormGroup;
  forgotEmailForm: FormGroup;
  accountForm!: FormGroup;
  updatePhoneMode = false;
  updatePhoneForm: FormGroup;
  isCurrentEmailEditable = false;
  userMobile: string = ''; // Added userMobile property
  constructor(
    public dialogRef: MatDialogRef<PhoneVerificationComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userDetailsService: UserDetailsService,
    private forgotPhoneService: ForgotPhoneService,
    private router: Router
  ) {
    this.initializeForm();
    this.getUserInfo();
    this.phoneOtpForm = this.fb.group({
      phoneOtp: ['', [Validators.required]],
    });
    this.forgotEmailForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
    });
    this.updatePhoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      confirmPhone: [
        '',
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
    });
  }

  initializeForm() {
    this.accountForm = this.fb.group({
      currentEmail: [{ value: '', disabled: true }, Validators.required],
      emailOtp: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
    });
  }
  get emailOtp() {
    return this.accountForm.get('emailOtp');
  }
  sendOtp() {
    this.showOtpInput = true;
    // const email = this.email?.value;
    const userEmail = this.userDetailsService.email;
    const type = 'SEND_EMAIL_OTP';
    this.forgotPhoneService.validationKey$.next('');
    const FormData = {
      type: type,
      email: userEmail,
    };
    this.forgotPhoneService.sendOtp(FormData).subscribe(() => {
      // if (!this.detailsEntered) {
      //   this.detailsEntered = true;
      // } else if (this.email && this.phone) {
      //   this.detailsEntered = true;
      // }
    });
  }
  getUserInfo() {
    const userEmail = this.userDetailsService.email;
    this.accountForm.controls['currentEmail'].setValue(userEmail);
  }
  verifyAndUpdate() {
    const phoneotp = this.phoneOtp?.value;
    // const email = this.email?.value;
    const userEmail = this.userDetailsService.email;
    const type = 'VERIFY_NEW_PHONE_OTP';
    const FormData = {
      type: type,
      email: userEmail,
      phone_otp: phoneotp,
      validation_key: this.forgotPhoneService.validationKey$.value,
    };
    this.forgotPhoneService.verifyotpPhone(FormData).subscribe(() => {
      localStorage.removeItem('userDetails');
      localStorage.removeItem('jwtToken');
      this.router.navigate(['/login']);
    });

    this.dialogRef.close();
  }

  onEmailOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.accountForm.get('emailOtp')!.setValue(truncatedValue, {
      emitEvent: false,
    });
  }

  newPhoneNumberInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 10);
    this.updatePhoneForm.get('phone')!.setValue(truncatedValue, {
      emitEvent: false,
    });
  }

  onPhoneOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.phoneOtpForm
      .get('phoneOtp')!
      .setValue(truncatedValue, { emitEvent: false });
  }

  checkPhoneMatch(event: any) {
    const phoneControl = this.updatePhoneForm?.get('phone');
    const confirmPhoneControl = this.updatePhoneForm?.get('confirmPhone');
    if (phoneControl && confirmPhoneControl) {
      const input = event.target.value;
      const digitsOnly = input.replace(/\D/g, '');
      const truncatedValue = digitsOnly.slice(0, 10);
      confirmPhoneControl.setValue(truncatedValue, { emitEvent: false });
      if (phoneControl.value !== truncatedValue) {
        confirmPhoneControl.setErrors({ mismatch: true });
      } else {
        confirmPhoneControl.setErrors(null);
      }
    }
  }
  get confirmPhone() {
    return this.updatePhoneForm.get('confirmPhone');
  }
  sendOtpPhone() {
    this.updatePhoneMode = true;

    const phone = this.confirmPhone?.value;
    const type = 'SEND_NEW_PHONE_OTP';
    this.forgotPhoneService.validationKey$.next('');
    const FormData = {
      type: type,
      newPhone: phone,
    };
    this.forgotPhoneService.sendOtpPhone(FormData).subscribe(() => {
      this.updatePhoneMode = true;
    });
  }

  get phoneNumber() {
    return this.forgotEmailForm.get('phoneNumber');
  }
  get phoneOtp() {
    return this.phoneOtpForm.get('phoneOtp');
  }
  sendOTP() {
    this.sendOtp();
  }
  verifyotp() {
    this.otpVerified = true;
    this.showContainer1 = false;
    this.showContainer2 = true;

    const emailOtp = this.emailOtp?.value;
    const type = 'VERIFY_EMAIL_OTP';
    const FormData = {
      type: type,
      email_otp: emailOtp,
      validation_key: this.forgotPhoneService.validationKey$.value,
    };
    this.forgotPhoneService.verifyotp(FormData).subscribe(() => {
      // const otpInputString = String(this.emailOTPInput);
      // this.otpVerified = true;
      // this.showVerifyButton = false;
      // this.showContainer1 = false;
      // this.showContainer2 = true;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
