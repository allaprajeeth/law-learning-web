import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleformService } from '../articleform.service';

@Component({
  selector: 'app-sharedarticleform',
  templateUrl: './sharedarticleform.component.html',
  styleUrls: ['./sharedarticleform.component.scss'],
})

export class SharedarticleformComponent {
  articleForm: FormGroup;
  formData: FormData;
  constructor(private fb: FormBuilder, private router: Router,  private articleformService: ArticleformService) {
    this.articleForm = this.fb.group({
      name: ['', Validators.required],
      articleName: ['', Validators.required],
      description: ['', Validators.required],
      file: [null, Validators.required]
    });
    this.formData = new FormData();
  }
  onFileUpload(event: any){
    console.log(event.target.files);
    const files = event.target.files;
    if (files !== null && files.length > 0) {
      const file: File | null = files[0];
      if (file) {
      this.formData.append('file', file);
      }
    }
  }

  onSubmit() {
    if (this.articleForm.valid) {  
      // Add individual fields to the 'articleBean' parameter
      this.formData.append('articleBean', JSON.stringify({
         title: this.articleForm.get('name')!.value,
        author: this.articleForm.get('articleName')!.value,
        subject: this.articleForm.get('description')!.value,
        description: this.articleForm.get('description')!.value
      }));

      // Make API request using the ApiService
      this.articleformService.post<any>('http://192.168.1.42:8080/api/v1/secure/articles', this.formData).subscribe(
        (response) => {
          console.log('Article submitted successfully:', response);
          this.router.navigate(['/subscriber/submitmesg']);
        },
        (error) => {
          console.error('Error submitting article:', error);
        }
      );
    }
  }
  
  
  // navigateToSuccessMessage() {
  //   this.router.navigate(['/subscriber/submitmesg']);
  // }
}
