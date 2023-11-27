import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-short-anstestpreview',
  templateUrl: './short-anstestpreview.component.html',
  styleUrls: ['./short-anstestpreview.component.scss']
})
export class ShortAnstestpreviewComponent {
  @Input() question: any;
  constructor(public dialogRef: MatDialogRef<ShortAnstestpreviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.question = data; 
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
