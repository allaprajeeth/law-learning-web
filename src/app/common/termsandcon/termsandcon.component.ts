import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-termsandcon',
  templateUrl: './termsandcon.component.html',
  styleUrls: ['./termsandcon.component.scss']
})
export class TermsandconComponent {
  isCheckboxChecked: boolean = false;

  constructor(private dialogRef: MatDialogRef<TermsandconComponent>) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

