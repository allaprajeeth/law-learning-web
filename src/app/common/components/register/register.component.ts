import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { ModalComponent } from '../modal/modal.component';
import { TermsandconComponent } from '../../termsandcon/termsandcon.component';
import { RegistrationService } from './services/registration.service';
import { PdfService } from 'src/app/sharedService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  lawimage = '/assets/Law.png';
  isSendOtpsClicked: boolean = true;
  images: string[] = ['assets/Law Learning.png'];
  currentIndex: number = 0;
  // selectedCategory: string = '';
  emailotp: string = '';
  phoneotp: string = '';
  emailOtpError: string = '';
  phoneOtpError: string = '';
  isInputFilled: boolean = false;
  isOtpVisible: boolean = false;
  isLoginVisible: boolean = false;
  // disableCategorySelect: boolean = false;
  otpsFilled: boolean = false;
  isAcceptButtonClicked = false;
  registerForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private acceptButtonService:PdfService,
    private router:Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      selectedCategory: ['SUBSCRIBER', [Validators.required]],
      email_otp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      phone_otp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }
 
  ngOnInit() {
    this.acceptButtonService.isAcceptButtonClicked$.subscribe((value) => {
      this.isAcceptButtonClicked = value;
    });
  }
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get emailOtp() {
    return this.registerForm.get('email_otp');
  }
  get phoneOtp() {
    return this.registerForm.get('phone_otp');
  }
  get selectedCategory(){
    return this.registerForm.get('selectedCategory');
  }
  checkInput(): void {
    this.isInputFilled =
      (!!this.registerForm.get('name')?.value ?? false) &&
      (this.registerForm.get('email')?.value ?? false) &&
      (!!this.registerForm.get('phone')?.value ?? false);
  }
  sendOtps() {
    this.sendOtpSignup();
    
  }

  sendOtpSignup() {
    this.showOtpFields()
    // const name = this.name?.value;
    // const email = this.email?.value;
    // const phone = this.phone?.value;
    // const selectedCategory=this.selectedCategory?.value
    // this.registrationService.validationKey$.next('');
    // const signUpFormData = {
    //   name: name,
    //   email: email,
    //   phone: phone,
    //   role: selectedCategory
    // };

    // this.registrationService.sendOtpSignup(signUpFormData).subscribe(
    //   ()=>{
    //     this.showOtpFields()
    //   }
    // )

  }

  showOtpFields(): void {
    this.isOtpVisible = true;
    this.isLoginVisible = true;
    // this.disableCategorySelect = true;
    this.isSendOtpsClicked = !this.isSendOtpsClicked;
  }
  signupVerify() {
    this.signUppage();
  
  }
  signUppage() {
    this.router.navigate(['/login']);
    // const phoneOtp = this.phoneOtp?.value;
    // const emailOtp = this.emailOtp?.value;

    //  const signUpCompleteFormData={
    //      phone_otp:phoneOtp,
    //      email_otp:emailOtp,
    //      validation_key :this.registrationService.validationKey$.value
    //  }
    //  this.registrationService.signUppage(signUpCompleteFormData).subscribe(
    //   ()=>{
        
    //       this.router.navigate(['/login']);
       
    //   }
    //  )
  }
  

  

 
  onEmailOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.registerForm
      .get('email_otp')!
      .setValue(truncatedValue, { emitEvent: false });
  }
  onPhoneOtpInput(event: any) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 6);
    this.registerForm
      .get('phone_otp')!
      .setValue(truncatedValue, { emitEvent: false });
  }
  handlePhoneInput(event: any) {
    this.onPhoneNumberInput(event);
    this.checkInput();
  }
  onPhoneNumberInput(event: any) {
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
