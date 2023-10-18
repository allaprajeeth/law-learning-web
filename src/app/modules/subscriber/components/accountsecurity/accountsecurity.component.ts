import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-accountsecurity',
  templateUrl: './accountsecurity.component.html',
  styleUrls: ['./accountsecurity.component.scss']
})
export class AccountsecurityComponent {

  accountForm: FormGroup;
  showOtpFields = false; // Flag to control visibility of OTP fields and Save Changes button

  constructor(private fb: FormBuilder, private router: Router) {


    


    this.accountForm = this.fb.group({
      currentEmail: ['', Validators.required],
      currentPhone: ['', Validators.required],
      // newEmail: ['', Validators.email],
      // newPhone: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")] 
      newEmail: [''],
      newPhone: [''],
      emailOtp: [''],
      phoneOtp: ['']
    });
  }

navigateToAccountSecurity() {
  this.router.navigate(['/account-security']);
}

navigateToSideNav() {
  this.router.navigate(['/side-nav']);
}

sendOtps() {
  // Logic to send OTPs goes here
  this.showOtpFields = true; // Set the flag to show OTP fields and Save Changes button
}

savechanges(){
  this.showOtpFields = false; 
}
}

