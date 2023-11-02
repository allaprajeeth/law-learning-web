import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Component({
  selector: 'app-numberchangepopup',
  templateUrl: './numberchangepopup.component.html',
  styleUrls: ['./numberchangepopup.component.scss']
})
export class NumberchangepopupComponent {
  newPhoneNumber: string = '';
  accountForm: FormGroup;
  showOtpInput = false;
  



  constructor(public dialogRef: MatDialogRef<NumberchangepopupComponent>, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.accountForm = this.fb.group({
      newPhone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  
  
  sendOtp() {
    // Implement logic to send OTP for the new phone number
    // Close the modal after sending OTP
    // this.dialogRef.close(this.newPhoneNumber);
    this.showOtpInput = true;

  }

  verifyAndUpdate() {
    // Implement logic to verify and update the number here
    
    // Show a success message using MatSnackBar
    this.snackBar.open('Number updated successfully!', 'Close', {
      duration: 3000, // 3 seconds
      verticalPosition: 'top' as MatSnackBarVerticalPosition,
    });
    
    // Close the dialog after showing the message
    this.dialogRef.close();
  }
}
