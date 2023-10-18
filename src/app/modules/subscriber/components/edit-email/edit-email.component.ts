import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss']
})
export class EditEmailComponent {

  newEmail: string = '';

  constructor(public dialogRef: MatDialogRef<EditEmailComponent>) {}

  onSubmit(): void {
    // Handle form submission logic here (e.g., send OTP)

    // Close the dialog after submission
    this.dialogRef.close();
  }
}
