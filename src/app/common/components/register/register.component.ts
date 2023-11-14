import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; 
// import { ModalComponent } from '../modal/modal.component';
import { TermsandconComponent } from '../../termsandcon/termsandcon.component';
import { PdfService } from 'src/app/sharedService.service';

interface ApiResponse {
  message: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  ngOnInit() {
    this.AcceptService.isAcceptButtonClicked$.subscribe((value) => {
      this.isAcceptButtonClicked = value;
    });
  }

  registerForm: FormGroup;
  constructor(public dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private AcceptService:PdfService
    ){
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]],
       phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
       selectedCategory: ['Subscriber', [Validators.required]],
       emailOtp: [ '',[Validators.required,Validators.pattern('^[0-9]*$'),],],
       phoneOtp: ['', [Validators.required,Validators.pattern('^[0-9]*$'),]],
    });
  } 
   lawimage="/assets/law.png"
   isAcceptButtonClicked = false;
  isSendOtpsClicked: boolean = true;
  images: string[] = ['assets/Law Learning.png'];
  currentIndex: number = 0;
  name:string ='';
  email: string = '';
  phone: string = '';
  selectedCategory: string = 'Subscriber';
  emailotp: string = '';
  phoneotp: string = '';
  emailOtpError: string = '';
  phoneOtpError: string = '';
  isInputFilled: boolean = false;
  isOtpVisible: boolean = false;
  isLoginVisible: boolean = false;
  disableCategorySelect: boolean = false;
  otpsFilled:boolean=false;

  checkInput(): void {
    this.isInputFilled = (!!this.registerForm.get('name')?.value ?? false) && (this.registerForm.get('email')?.value ?? false) && (!!this.registerForm.get('phone')?.value ?? false);
  }
  sendOtps(){
    this.showOtpFields();
    //this.sendOtpSignup();
    this.isSendOtpsClicked=!this.isSendOtpsClicked;

  }
  async sendOtpSignup() {
  const baseUrl = 'https://ea06-202-53-86-13.ngrok-free.app/api/signuplogin/sendotp';
  const url = `${baseUrl}?name=${encodeURIComponent(this.name)}&email=${encodeURIComponent(this.email)}&phone=${encodeURIComponent(this.phone)}&role=${this.selectedCategory}&action=sendotpsignup`;
    const requestData = {
      name:this.email,
      email: this.email,
      phone: this.phone,
      role: this.selectedCategory,
      action: 'sendotpsignup'
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  try{
    const response = await firstValueFrom(
      this.http.post(url, JSON.stringify(requestData), {
        headers: headers
      })
    )as ApiResponse;
    if (response && response.message) {
      console.log('API Response:', response);
      this.showSuccessMessage(response.message);
    }
    
  console.log('OTP sent successfully', response);
    }
    catch (error: any) {
      console.error('Error sending OTP:', error);
    
      if (error instanceof HttpErrorResponse && error.error && error.error.message) {
        
        this.showErrorMessage(error.error.message);
      } else {
        this.showErrorMessage('An error occurred while sending OTP.');
      }
    }

  }
  
showOtpFields(): void {
    this.isOtpVisible = true;
    this.isLoginVisible = true;
    this.disableCategorySelect = true; 
  }
  signupVerify(){
    //this.signUppage();
    this.signUpValidation()
  }
  async signUppage(){
    const baseUrl = ' https://ea06-202-53-86-13.ngrok-free.app/api/signuplogin/verifyotp';
    const url = `${baseUrl}?name=${encodeURIComponent(this.name)}email=${encodeURIComponent(this.email)}&phone=${encodeURIComponent(this.phone)}&role=${this.selectedCategory}&action=verifysignup&emailotp=${encodeURIComponent(this.emailotp)}&phoneotp=${encodeURIComponent(this.phoneotp)}`;
    const requestData = {
      name:this.name,
      email: this.email,
      phone: this.phone,
      role: this.selectedCategory,
      emailotp:this.emailotp,
      phoneotp:this.phoneotp,
      action: 'verifysignup'
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  try{
    const response = await firstValueFrom(
      this.http.post(url, JSON.stringify(requestData), {
        headers: headers
      })
    ) as ApiResponse
    if (response && response.message) {
      console.log('API Response:', response);
      this.showSuccessMessage(response.message);

      setTimeout(() => {
        this.signUpValidation();
      }, 1500); 
    }
    console.log('Sign up Successful', response);
  }
  catch (error) {
    if (error instanceof HttpErrorResponse && error.error && error.error.message) {
      this.showErrorMessage(error.error.message);
    } 
    console.error('Error:', error);
  }

  }

  signUpValidation(): void {
      this.router.navigate(['/login']);
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      verticalPosition: 'top',
      panelClass: ['success-snackbar'] 
    });
}
showErrorMessage(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 3000, 
    verticalPosition: 'top',
    panelClass: ['error-snackbar'] 
  });
}
onEmailOtpInput(event: any) {
  const input = event.target.value;
  const digitsOnly = input.replace(/\D/g, '');
  const truncatedValue = digitsOnly.slice(0, 6);
  this.registerForm.get('emailOtp')!.setValue(truncatedValue, { emitEvent: false });
 
}
onPhoneOtpInput(event: any) {
  const input = event.target.value;
  const digitsOnly = input.replace(/\D/g, '');
  const truncatedValue = digitsOnly.slice(0, 6);
  this.registerForm.get('phoneOtp')!.setValue(truncatedValue, { emitEvent: false });
 
}
handlePhoneInput(event: any) {
  this.onPhoneNumberInput(event);
  this.checkInput();
}
onPhoneNumberInput(event:any){
  const input = event.target.value;
  const digitsOnly = input.replace(/\D/g, '');
  const truncatedValue = digitsOnly.slice(0, 10);
  this.registerForm
  .get('phone')!
  .setValue(truncatedValue, { emitEvent: false });
}

openModal() {
  this.dialog.open(TermsandconComponent, {
    width: '700px',
    height: '600px',
  });
}


}

