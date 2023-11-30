import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-articleform',
  templateUrl: './articleform.component.html',
  styleUrls: ['./articleform.component.scss']
})
export class ArticleformComponent {
  
  articleForm: FormGroup;
  // isSubmitButtonDisabled: boolean = false;

  constructor(private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      name: ['', Validators.required],
      articleName: ['', Validators.required],
      description: ['', Validators.required],
  
    });
    
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      window.alert('Please fill out all the required fields.');
      return;
    }
  }
}
