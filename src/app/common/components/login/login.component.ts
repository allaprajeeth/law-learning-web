import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsandconComponent } from '../../termsandcon/termsandcon.component';
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
    private loginService:LoginService,
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
  isSendOtpsClicked: boolean = true;
  images: string[] = ['assets/Law Learning.png'];
  currentIndex: number = 0;
  email_otp: string = '';
  phone_otp: string = '';
  emailOtpError: string = '';
  phoneOtpError: string = '';
  isInputFilled: boolean = false;
  isOtpVisible: boolean = false;
  isLoginVisible: boolean = false;
  disableCategorySelect: boolean = false;

  checkInput(): void {
    this.isInputFilled =
      (!!this.loginForm.get('email')?.value ?? false) &&
      (!!this.loginForm.get('phone')?.value ?? false);
  }
  sendOtps() {
    this.sendOtpLogin();
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
  get selectedCategory(){
    return this.loginForm.get('selectedCategory');
  }
  sendOtpLogin() {
    this.showOtpFields()
    // const email = this.email?.value;
    // const phone = this.phone?.value;
    // const selectedCategory=this.selectedCategory?.value
    // this.loginService.validationKey$.next('');
    // const loginRequestFormData = {
    //   email: email,
    //   phone: phone,
    //   role: selectedCategory
    // };
    // this.loginService.sendOtpLogin(loginRequestFormData).subscribe(
    //   ()=>{
    //     this.showOtpFields()
    //   }
    // )
   
  }
  showOtpFields(): void {
    this.isOtpVisible = true;
    this.isLoginVisible = true;
    this.disableCategorySelect = true;
    this.isSendOtpsClicked = !this.isSendOtpsClicked;
  }
  login() {
   // this.loginpage();
   this.loginValidation();
   
  }
   loginpage() {
    const email = this.email?.value;
    const phone = this.phone?.value;
    const selectedCategory=this.selectedCategory?.value
    const phoneOtp = this.phoneOtp?.value;
    const emailOtp = this.emailOtp?.value;

     const loginVerifyFormData={
         email:email,
         phone:phone,
         role:selectedCategory,
         phone_otp:phoneOtp,
         email_otp:emailOtp,
         validation_key :this.loginService.validationKey$.value
     }
     this.loginService.loginpage(loginVerifyFormData).subscribe(
      ()=>{
        this.loginValidation();
      }
     )
  }
   
  loginValidation(): void {
    const selectedCategoryValue = this.loginForm.get('selectedCategory')?.value;
    console.log('Selected Category:', selectedCategoryValue);
    let route: string = '';
    if (selectedCategoryValue === 'SUBSCRIBER') {
      route = 'subscriber/homepage';
    } else if (selectedCategoryValue === 'INSTRUCTOR') {
      route = 'instructor/homepage';
    } else if (selectedCategoryValue === 'REVIEWER') {
      route = 'reviewer/homepage';
    } else if (selectedCategoryValue === 'CONTENTMANAGER') {
      route = 'authentication/homepage';
    } else if (selectedCategoryValue === 'Admin') {
      route = 'admin/homepage';
    }
    this.router.navigate([route]);

    // Clear error messages and remove error border
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
  onPhoneNumberInput(event:any){
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
