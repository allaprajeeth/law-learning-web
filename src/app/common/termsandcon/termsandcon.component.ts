import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfService } from 'src/app/sharedService.service';
import { NotificationService } from '../services/notification/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-termsandcon',
  templateUrl: './termsandcon.component.html',
  styleUrls: ['./termsandcon.component.scss']
})
export class TermsandconComponent {
  isCheckboxChecked: boolean = false;
  constructor(private dialogRef: MatDialogRef<TermsandconComponent>,
    private AcceptServie: PdfService,
    private snackBar: MatSnackBar ,
    private notificationService:NotificationService,
    private router: Router,) {}
  
  onCloseClick(): void {
    this.notificationService.notify("You can't register without accepting our Terms & Conditions")
    this.dialogRef.close();
    
  }
  
  onAcceptClick() {
    this.AcceptServie.setAcceptButtonClicked(true);
    this.dialogRef.close();
    this.router.navigate(['/register']);
  }
}

