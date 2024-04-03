import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PdfService } from 'src/app/sharedService.service';

@Component({
  selector: 'app-shareddelete-account',
  templateUrl: './shareddelete-account.component.html',
  styleUrls: ['./shareddelete-account.component.scss']
})
export class ShareddeleteAccountComponent {
  loginForm: FormGroup;
  constructor(private router: Router,private http: HttpClient,private snackBar: MatSnackBar ,private formBuilder: FormBuilder
    ,private deleteTimeService:PdfService){
    this.loginForm = this.formBuilder.group({
       emailOtp: [ '',[Validators.required,Validators.pattern('^[0-9]*$'),],],
       phoneOtp: ['', [Validators.required,Validators.pattern('^[0-9]*$'),]],
    });
  }
  ngOnInit() {
    const storedCountdown = this.deleteTimeService.getCountdownValue();

    if (storedCountdown !== null &&  this.isDeleteAccountClicked == false) {
      this.countdown = storedCountdown;
      this.isDeleteCountdownVisible = true;
      this.startCountdown();
    }
  }
  countdownInterval: any;
  isSendOtpsClicked: boolean = true;
  isOtpVisible: boolean = true;
  isLoginVisible: boolean = false;
  isDeleteAccountClicked:boolean=false;
  isdeleteClicked:boolean=false;
  sendOtps(){
    this.showOtpFields();
    //this.isSendOtpsClicked=false;
  }
  closeButton(){
    this.isDeleteAccountClicked =false;
    this.isOtpVisible=false
  }
  closeAccount(){
    this.isDeleteAccountClicked=true;
      this.snackBar.open(" OTP's sent to register Email Id and Phone Id ", 'Close', {
        duration: 3000, 
        verticalPosition: 'top',
      });
  }
  countdown: number = 72 * 60 * 60;
showOtpFields(): void {
    this.isOtpVisible = true;
    this.isLoginVisible = true;
  }
  delete(){
    this.isOtpVisible=false;
    this.isDeleteCountdownVisible = true;
    this.deleteTimeService.setCountdownValue(this.countdown);
    this.startCountdown();
  }
  isDeleteCountdownVisible: boolean = false;
  startCountdown() {
     this.countdownInterval = setInterval(() => {
      this.countdown = this.deleteTimeService.getCountdownValue() || 0;
      this.countdown--; // Decrease countdown by 1 second

      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.deleteAccount();
      } else {
        this.deleteTimeService.setCountdownValue(this.countdown);
      }
    }, 1000); // 1 second in milliseconds
  }
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingSecs = remainingSeconds % 60;
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSecs)}`;
  }
  deleteAccount() {
    this.snackBar.open('Your account has been permanently deleted', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });

    this.router.navigate(['/homepage']);
  }
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
onEmailOtpInput(event: any) {
  const input = event.target.value;
  const digitsOnly = input.replace(/\D/g, '');
  const truncatedValue = digitsOnly.slice(0, 6);
  this.loginForm.get('emailOtp')!.setValue(truncatedValue, { emitEvent: false });
}
onPhoneOtpInput(event: any) {
  const input = event.target.value;
  const digitsOnly = input.replace(/\D/g, '');
  const truncatedValue = digitsOnly.slice(0, 6);
  this.loginForm.get('phoneOtp')!.setValue(truncatedValue, { emitEvent: false });
}
revertDelete() {
  clearInterval(this.countdownInterval);
  this.isOtpVisible = true;
  this.isDeleteAccountClicked = false;
  this.isDeleteCountdownVisible = false;
  this.countdown = 72 * 60 * 60; 
  this.deleteTimeService.clearCountdownValue()
}
}
