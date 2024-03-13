import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailVerificationComponent } from 'src/app/common/components/email-verification/email-verification.component';
import { PhoneVerificationComponent } from 'src/app/common/components/phone-verification/phone-verification.component';
import { SharedService } from 'src/app/shared-module/shared.service';

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
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.accountForm = this.fb.group({
      currentEmail: [{ value: 'nuncsystems@gmail.com', disabled: true }, Validators.required],
      currentPhone: [{ value: '0987654321', disabled: true }, Validators.required],
      newEmail: [''],
      newPhone: [''],
      emailOtp: [''],
      phoneOtp: ['']
    });
  }

  ngOnInit() {
    this.sharedService.getUserDetails().subscribe(userDetails => {
      if (userDetails) {
        this.userEmail = userDetails.email;
        this.userPhone = userDetails.phone;
      }
    });
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

