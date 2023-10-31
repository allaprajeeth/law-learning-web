import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NumberchangepopupComponent } from '../numberchangepopup/numberchangepopup.component';
@Component({
  selector: 'app-accountsecurity',
  templateUrl: './accountsecurity.component.html',
  styleUrls: ['./accountsecurity.component.scss']
})
export class AccountsecurityComponent {

  accountForm: FormGroup;
  isCurrentEmailEditable = false;
  isCurrentPhoneEditable = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.accountForm = this.fb.group({
      currentEmail: [{ value: '', disabled: true }, Validators.required],
      currentPhone: [{ value: '', disabled: true }, Validators.required],
      newEmail: [''],
      newPhone: [''],
      emailOtp: [''],
      phoneOtp: ['']
    });
  }

  // constructor(private dialog: MatDialog) {}

  openPhoneVerificationModal() {
    const dialogRef = this.dialog.open(NumberchangepopupComponent, {
      width: '700px', // Set the width of the modal
    });

    dialogRef.afterClosed().subscribe(newPhoneNumber => {
      if (newPhoneNumber) {
        // Handle the new phone number, e.g., update your form control or send it to the server.
        console.log('New Phone Number:', newPhoneNumber);
      }
    });
  }

  editCurrentPhone() {
    console.log('Edit button clicked');
    this.openPhoneVerificationModal();
  }
}
