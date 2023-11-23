import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-articleform',
  templateUrl: './articleform.component.html',
  styleUrls: ['./articleform.component.scss']
})
export class ArticleformComponent {
  // articleForm: FormGroup;
  // // isSubmitButtonDisabled: boolean = false;

  // constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
  //   this.articleForm = this.fb.group({
  //     name: ['', Validators.required],
  //     articleName: ['', Validators.required],
  //     description: ['', Validators.required],
  //     // file: [null, Validators.required]
  //   });
    
  // }

  // ngOnInit(): void {}

  // onSubmit() {
  //   if (this.articleForm.invalid) {
  //     // Mark form fields as touched to trigger validation error messages
  //     this.articleForm.markAllAsTouched();
  //     // Show an alert indicating that the user needs to fill out all the required fields
  //     window.alert('Please fill out all the required fields.');
  //     return;
  //   }

  //   // Disable the submit button
  //   // this.isSubmitButtonDisabled = false;

  //   // Handle form submission logic here

  //   // Show success message popup
  //   this._snackBar.open('Your form has been successfully submitted to admin Thank you...', 'Close', {
  //     duration: 3000,
  //     verticalPosition: 'top' // 3 seconds
  //   });

    

  //   // Enable the submit button after a delay (e.g., 3 seconds)
  //   setTimeout(() => {
  //     // this.isSubmitButtonDisabled = true;
  //     this.articleForm.reset();
  //   }, 3000);

  //   // Reset the form after submission if needed
  //   // this.articleForm.reset();
  // }
}
