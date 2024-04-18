import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPhoneService } from './Services/forgot-phone.service';

@Component({
  selector: 'app-forgot-phoneno',
  templateUrl: './forgot-phoneno.component.html',
  styleUrls: ['./forgot-phoneno.component.scss'],
})
export class ForgotPhonenoComponent {
  detailsEntered = false;
  emailOTPInput: string = '';
  otpVerified = false;
  phone: string = '';
  updatePhoneMode = false;
  showVerifyButton = true;
  showContainer1 = true;
  showContainer2 = false;

  emailOtpForm: FormGroup;
  phoneOtpForm: FormGroup;
  forgotPhoneForm: FormGroup;
  updatePhoneForm: FormGroup;
  sendotpButton =true
  phoneotpSent=true

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private forgotPhoneService: ForgotPhoneService
  ) {
    this.emailOtpForm = this.formBuilder.group({
      emailOtp: ['', [Validators.required]],
    });
    this.phoneOtpForm = this.formBuilder.group({
      phoneOtp: ['', [Validators.required]],
    });
    this.forgotPhoneForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
    this.updatePhoneForm = this.formBuilder.group({
      phone: ['', [Validators.required]],
      confirmPhone: ['', [Validators.required]],
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
  onPhoneOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.phoneOtpForm
      .get('phoneOtp')!
      .setValue(truncatedValue, { emitEvent: false });
  }

 
  checkPhoneMatch() {
    const phoneControl = this.updatePhoneForm?.get('phone');
    const confirmPhoneControl = this.updatePhoneForm?.get('confirmPhone');
    if (phoneControl && confirmPhoneControl) {
      if (phoneControl.value !== confirmPhoneControl.value) {
        confirmPhoneControl.setErrors({ mismatch: true });
      } else {
        confirmPhoneControl.setErrors(null);
      }
    }
  }
  get email() {
    return this.forgotPhoneForm.get('email');
  }
  get phoneOtp() {
    return this.phoneOtpForm.get('phoneOtp');
  }
  get confirmPhone() {
    return this.updatePhoneForm.get('confirmPhone');
  }
  get emailOtp() {
    return this.emailOtpForm.get('emailOtp');
  }
  sendOTP() {
    this.sendOtp();
  }
  updatePhoneNumber() {
    this.sendOtpPhone();
  }
  verifyOTP() {
    this.verifyotp();
  }
  updateDetails() {
    this.verifyotpPhone();
  }
  
  sendOtp() {
    const email = this.email?.value;
    const type = 'SEND_EMAIL_OTP';
    this.forgotPhoneService.validationKey$.next('');
    const FormData = {
      type: type,
      email: email,
    };
    this.forgotPhoneService.sendOtp(FormData).subscribe(() => {
      if (!this.detailsEntered) {
        this.detailsEntered = true;
        this.sendotpButton=false

      } else if (this.email && this.phone) {
        this.detailsEntered = true;
        this.sendotpButton=false
      }
    });
  }
  verifyotp() {
    const emailOtp = this.emailOtp?.value;
    const type = 'VERIFY_EMAIL_OTP';
    const FormData = {
      type: type,
      email_otp: emailOtp,
      validation_key: this.forgotPhoneService.validationKey$.value,
    };
    this.forgotPhoneService.verifyotp(FormData).subscribe(() => {
      const otpInputString = String(this.emailOTPInput);
      this.otpVerified = true;
      this.showVerifyButton = false;
      this.showContainer1 = false;
      this.showContainer2 = true;
    });
  }
  sendOtpPhone() {
    const phone = this.confirmPhone?.value;
    const type = 'SEND_NEW_PHONE_OTP';
    this.forgotPhoneService.validationKey$.next('');
    const FormData = {
      type: type,
      newPhone: phone,
    };
    this.forgotPhoneService.sendOtpPhone(FormData).subscribe(() => {
      this.updatePhoneMode = true;
      this.phoneotpSent = true; 
      this.updatePhoneForm.controls['phone'].disable();
      this.updatePhoneForm.controls['confirmPhone'].disable();

    });
  }
  verifyotpPhone() {
    const phoneotp = this.phoneOtp?.value;
    const email = this.email?.value;
    const type = 'VERIFY_NEW_PHONE_OTP';
    const FormData = {
      type: type,
      email: email,
      phone_otp: phoneotp,
      validation_key: this.forgotPhoneService.validationKey$.value,
    };
    this.forgotPhoneService.verifyotpPhone(FormData).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
