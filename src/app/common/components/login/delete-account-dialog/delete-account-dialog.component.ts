import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,    private router: Router) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    // Logic for Okay button click
    this.dialogRef.close();
    this.router.navigate(['/register']);
  }
}
