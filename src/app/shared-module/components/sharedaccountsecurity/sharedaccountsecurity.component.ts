import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NumberchangepopupComponent } from 'src/app/modules/subscriber/components/numberchangepopup/numberchangepopup.component';

@Component({
  selector: 'app-sharedaccountsecurity',
  templateUrl: './sharedaccountsecurity.component.html',
  styleUrls: ['./sharedaccountsecurity.component.scss']
})
export class SharedaccountsecurityComponent implements OnInit  {

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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
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
