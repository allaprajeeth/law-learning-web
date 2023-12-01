import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sharedarticleform',
  templateUrl: './sharedarticleform.component.html',
  styleUrls: ['./sharedarticleform.component.scss'],
})

export class SharedarticleformComponent {
  articleForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.articleForm = this.fb.group({
      name: ['', Validators.required],
      articleName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.articleForm.invalid) {
      // this.articleForm.markAllAsTouched();
    }
  }

  navigateToSuccessMessage() {
    this.router.navigate(['/subscriber/submitmesg']);
  }
}
