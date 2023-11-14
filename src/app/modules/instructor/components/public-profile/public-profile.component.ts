import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent {
  profileForm: FormGroup;
  imageUrl: string = 'https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_960_720.png';
  selectedFileName: string = 'No file selected';

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // category: ['', Validators.required],
      specialization: ['', Validators.required],
      // totalStudents: ['', Validators.required],
      // reviews: ['', Validators.required],
      aboutMe: ['', Validators.required],  
    });
  }

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: 'You have Successfully submitted your details.',
      // disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed (if needed)
      console.log('Dialog closed', result);
    });
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      this.selectedFileName = selectedFile.name;

      // Update image source
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      this.selectedFileName = 'No file selected';
      this.imageUrl = 'https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_960_720.png';
    }
  }
  
}
