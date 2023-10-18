import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  showUserInfo = false;
  articleForm: FormGroup;
  userEntries: any[] = [];
  formSubmitted = false;
  containerStyles: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.articleForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  containerHeight: number = 0;

  onFormSubmit() {
    if (this.articleForm.valid) {
      this.showUserInfo = true;

      const newUserEntry = {
        name: this.articleForm.get('name')?.value,
        // email: this.articleForm.get('email')?.value,
        description: this.articleForm.get('description')?.value,
      };
      this.userEntries.push(newUserEntry);

      this.containerHeight = this.userEntries.length * 27;
      this.articleForm.reset();
      this.formSubmitted = false;
    }
  }
}

