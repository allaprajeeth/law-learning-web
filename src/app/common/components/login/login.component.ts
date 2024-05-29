import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsandconComponent } from '../../termsandcon/termsandcon.component';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  openModal() {
    this.dialog.open(TermsandconComponent, {
      width: '700px',
      height: '600px',
    });
  }
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public dialog: MatDialog,

  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      selectedCategory: ['SUBSCRIBER', [Validators.required]],
      email_otp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      phone_otp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }
  // loginForm: FormGroup;
  isOtpVisibles = true;
  otpValidDuration = 600;
  timer: any;
  timerSubscription: any;
  isSendOtpsClicked: boolean = true;
  images: string[] = ['assets/5th Estate ADR 1.png'];
  currentIndex: number = 0;
  email_otp: string = '';
  phone_otp: string = '';
  emailOtpError: string = '';
  phoneOtpError: string = '';
  isInputFilled: boolean = false;
  isOtpVisible: boolean = false;
  isLoginVisible: boolean = false;
  disableCategorySelect: boolean = false;
  startOtpTimer() {
    this.timer = this.otpValidDuration;
    this.timerSubscription = interval(1000).pipe(
      takeWhile(() => this.timer > 0)
    ).subscribe(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.isOtpVisibles = false;
        this.isLoginVisible = false;

        this.timerSubscription.unsubscribe();
      }
    });
  }

  reloadPage(): void {
    // this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
    window.location.reload();
    // });
  }
  get formattedTimer(): string {
    const minutes: number = Math.floor(this.timer / 60);
    const seconds: number = this.timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  checkInput(): void {
    this.isInputFilled =
      (!!this.loginForm.get('email')?.value ?? false) &&
      (!!this.loginForm.get('phone')?.value ?? false);
  }
  sendOtps() {
    this.sendOtpClick();
    this.isInputFilled = false;
    this.isOtpVisibles=true;
  }
  get email() {
    return this.loginForm.get('email');
  }
  get phone() {
    return this.loginForm.get('phone');
  }
  get emailOtp() {
    return this.loginForm.get('email_otp');
  }
  get phoneOtp() {
    return this.loginForm.get('phone_otp');
  }

  sendOtpClick() {
    // this.showOtpFields()
    const email = this.email?.value;
    const phone = this.phone?.value;
    this.loginService.validationKey$.next('');
    const loginRequestFormData = {
      email: email,
      phone: phone,
    };

    this.loginService.sendOtpClick(loginRequestFormData).subscribe(
      (response) => {
        this.showOtpFields()
        this.startOtpTimer();
        this.loginForm.controls['phone'].disable();
        this.loginForm.controls['email'].disable();
      }
    )

  }
  showOtpFields(): void {
    this.isOtpVisible = true;
    this.isLoginVisible = true;
    this.disableCategorySelect = true;
    this.isSendOtpsClicked = !this.isSendOtpsClicked;
  }
  login() {
    this.loginClick()
    //this.loginValidation();

  }
  loginClick() {
    const phoneOtp = this.phoneOtp?.value;
    const emailOtp = this.emailOtp?.value;

    const loginVerifyFormData = {
      phone_otp: phoneOtp,
      email_otp: emailOtp,
      validation_key: this.loginService.validationKey$.value,
    }
    this.loginService.loginClick(loginVerifyFormData).subscribe(
      () => { }
    )
  }

  onEmailOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.loginForm
      .get('email_otp')!
      .setValue(truncatedValue, { emitEvent: false });
  }
  onPhoneOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.loginForm
      .get('phone_otp')!
      .setValue(truncatedValue, { emitEvent: false });
  }
  onPhoneNumberInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 10);
    this.loginForm
      .get('phone')!
      .setValue(truncatedValue, { emitEvent: false });
  }
  handlePhoneInput(event: any) {
    this.onPhoneNumberInput(event);
    this.checkInput();
  }

}
