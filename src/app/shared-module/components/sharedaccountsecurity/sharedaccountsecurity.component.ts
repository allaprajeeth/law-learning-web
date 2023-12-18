import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailVerificationComponent } from 'src/app/common/components/email-verification/email-verification.component';
import { PhoneVerificationComponent } from 'src/app/common/components/phone-verification/phone-verification.component';

@Component({
  selector: 'app-sharedaccountsecurity',
  templateUrl: './sharedaccountsecurity.component.html',
  styleUrls: ['./sharedaccountsecurity.component.scss']
})
export class SharedaccountsecurityComponent {

  accountForm!: FormGroup;
  isCurrentEmailEditable = false;
  isCurrentPhoneEditable = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.initializeForm();
  }

  initializeForm() {
    this.accountForm = this.fb.group({
      currentEmail: [{ value: '', disabled: true }, Validators.required],
      currentPhone: [{ value: '', disabled: true }, Validators.required],
      newEmail: [''],
      newPhone: [''],
      emailOtp: [''],
      phoneOtp: ['']
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
