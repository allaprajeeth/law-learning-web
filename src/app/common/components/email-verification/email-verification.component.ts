import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent {
  @Input() changeType!: 'phone' | 'email';
  emailOtp: string = '';
  showOtpInput = false;
  showContainer1 = true;
  showContainer2 = false;
  otpVerified = false;
  accountForm!: FormGroup;
  updateEmailMode = false;
  emailOtpForm: FormGroup;
  updateEmailForm: FormGroup;
  isCurrentPhoneEditable = false;

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

  sendOtpEmail() {
    this.updateEmailMode = true;
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
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();

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

  sendOtp() {
    this.showOtpInput = true;
  }

  verifyAndUpdate() {
    this.snackBar.open('Email updated successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top' as MatSnackBarVerticalPosition,
    });
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
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
