import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-tc',
  templateUrl: './shared-tc.component.html',
  styleUrls: ['./shared-tc.component.scss']
})
export class SharedTCComponent {
  isCheckboxChecked: boolean = false;
  dialogRef: any;
  // constructor(private dialogRef: MatDialogRef<TermsandconComponent>,
  //   private AcceptServie: PdfService,
  //   private router: Router,) {}
  
  // onCloseClick(): void {
  //   alert("You can't register without accepting our Terms & Conditions")
  //   this.dialogRef.close();
    
  // }
  
  // onAcceptClick() {
  //   this.AcceptServie.setAcceptButtonClicked(true);
  //   this.dialogRef.close();
  //   this.router.navigate(['/register']);
  // }
}
