import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailVerificationComponent } from 'src/app/common/components/email-verification/email-verification.component';
import { PhoneVerificationComponent } from 'src/app/common/components/phone-verification/phone-verification.component';
import { SharedService } from 'src/app/shared-module/shared.service';
import { UserDetailsService } from '../../services/user-details/user-details.service';

@Component({
  selector: 'app-accountsecurity',
  templateUrl: './accountsecurity.component.html',
  styleUrls: ['./accountsecurity.component.scss']
})
export class AccountsecurityComponent {
  userEmail: string | null = null;
  userPhone: string | null = null;
  accountForm!: FormGroup;
  isCurrentEmailEditable = false;
  isCurrentPhoneEditable = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private userDetailsService:UserDetailsService
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.userDetailsService.getUserInfoFromLocalStorage();
    const userEmail = this.userDetailsService.email;
    const userMobile = this.userDetailsService.phoneno;
    this.accountForm = this.fb.group({
      currentEmail: [{ value: userEmail, disabled: true }, Validators.required],
      currentPhone: [{ value: userMobile, disabled: true }, Validators.required],
      newEmail: [''],
      newPhone: [''],
      emailOtp: [''],
      phoneOtp: ['']
    });
  }

  ngOnInit() {
    // this.sharedService.getUserDetails().subscribe(userDetails => {
    //   if (userDetails) {
    //     this.userEmail = userDetails.email;
    //     this.userPhone = userDetails.phone;
    //   }
    // });
    this.initializeForm();
  }

  openVerificationModal(changeType: 'phone' | 'email') {
    let dialogRef;
    if (changeType === 'phone') {
      dialogRef = this.dialog.open(PhoneVerificationComponent, {
        width: '700px'
      });
    } else if (changeType === 'email') {
      dialogRef = this.dialog.open(EmailVerificationComponent, {
        width: '700px'
      });
    }
  }

  editCurrentPhone() {
    this.openVerificationModal('phone');
  }

  editCurrentEmail() {
    this.openVerificationModal('email');
  }
}

