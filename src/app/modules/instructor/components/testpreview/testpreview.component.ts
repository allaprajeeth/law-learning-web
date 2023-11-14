import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-testpreview',
  templateUrl: './testpreview.component.html',
  styleUrls: ['./testpreview.component.scss']
})
export class TestpreviewComponent {
  constructor(public dialogRef: MatDialogRef<TestpreviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
