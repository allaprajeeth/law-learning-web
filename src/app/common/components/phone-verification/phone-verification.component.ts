import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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

  constructor(
    public dialogRef: MatDialogRef<PhoneVerificationComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
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

  sendOtp() {
    this.showOtpInput = true;
  }

  verifyAndUpdate() {
    this.snackBar.open('Phone Number updated successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top' as MatSnackBarVerticalPosition,
    });
    this.dialogRef.close();
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

  sendOtpPhone() {
    this.updatePhoneMode = true;
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
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
