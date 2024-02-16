import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUploadedFile } from 'src/app/shared-module/components/file-upload/file-upload.component';

@Component({
  selector: 'app-admin-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class AdminLibraryComponent {
  showSuccessMessage: boolean = false;

  // form: FormGroup = this.fb.group({});
  // uploadedFiles: Array<IUploadedFile> = []

  // constructor(private fb: FormBuilder) {
  //   this.createForm();
  // }
  // createForm() {
  //   this.form = this.fb.group({
  //     name: ['', Validators.required],
  //     address: ['', Validators.required]
  //   });
  // }

  // handleUploadedFiles(file: IUploadedFile): void {
  //   console.log(file)
  //   this.uploadedFiles.push(file);
  // }

  onSubmit() {
    this.showSuccessMessage = true;
    console.log('Form submitted:');
  }

  onFileChange(event: any) {
  
    // const file = event.target.files[0];
    // console.log('Selected file:', file);
  }
  goBack() {
    this.showSuccessMessage = false;
  }
  
}
