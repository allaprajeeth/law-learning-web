import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfService } from 'src/app/sharedService.service';
@Component({
  selector: 'app-termsandcon',
  templateUrl: './termsandcon.component.html',
  styleUrls: ['./termsandcon.component.scss']
})
export class TermsandconComponent {
  isCheckboxChecked: boolean = false;
  constructor(private dialogRef: MatDialogRef<TermsandconComponent>,private AcceptServie: PdfService,private snackBar: MatSnackBar ) {}
  
  onCloseClick(): void {
    this.snackBar.open("You cannot register without accepting the Terms & Conditions", 'Close', {
      duration: 3000, 
      verticalPosition: 'top',
    });
    this.dialogRef.close();
  }
  
  onAcceptClick() {
    this.AcceptServie.setAcceptButtonClicked(true);
    this.dialogRef.close();
  }
}

