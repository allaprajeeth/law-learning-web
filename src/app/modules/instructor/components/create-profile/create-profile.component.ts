import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit{
  userForm!: FormGroup; // Definite assignment assertion

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      about: ['', Validators.required],
      submitEnabled: [false] 
    });

    this.userForm.valueChanges.subscribe(() => {
      // Check if the required fields are filled
      const nameControl = this.userForm.get('name');
      const roleControl = this.userForm.get('role');
      const aboutControl = this.userForm.get('about');
      if (nameControl && roleControl && aboutControl && nameControl.valid && roleControl.valid && aboutControl.valid) {
        this.userForm.controls['submitEnabled'].setValue(true);
      } else {
        this.userForm.controls['submitEnabled'].setValue(false);
      }
    });
  }

  onSubmit() {
    this.snackBar.open('Details saved successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top' 
    });
 
  }
}
