import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit{
  userForm!: FormGroup; // Definite assignment assertion
 
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,private uploadfile:UploadService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      jobTitle: ['', Validators.required],
      about: ['', Validators.required],
      submitEnabled: [false] 
    });

    this.userForm.valueChanges.subscribe(() => {
      // Check if the required fields are filled
      const nameControl = this.userForm.get('name');
      const roleControl = this.userForm.get('jobTitle');
      const aboutControl = this.userForm.get('about');
      if (nameControl && roleControl && aboutControl && nameControl.valid && roleControl.valid && aboutControl.valid) {
        this.userForm.controls['submitEnabled'].setValue(true);
      } else {
        this.userForm.controls['submitEnabled'].setValue(false);
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.uploadfile.updateProfile(this.userForm).subscribe(
        (response) => {
          // Handle success response
          console.log('Profile updated successfully:', response);
        },
        (error) => {
          // Handle error response
          console.error('Error updating profile:', error);
        }
      );
    }
    this.snackBar.open('Details saved successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top' 
    });
 
  }
}
