import { Component } from '@angular/core';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-library-form',
  templateUrl: './library-form.component.html',
  styleUrls: ['./library-form.component.scss']
})
export class LibraryFormComponent {
  selectedRole: string = 'all';
  private apiUrl = endPoints.baseURL + '/secure/libraries';
  title :any;
  showSuccessMessage: boolean = false;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  constructor(private http: HttpClient) { }


  onFileChange(event: any): void {
    const fileList: FileList | null = event.target.files;
    
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }


  onSubmit(): void {
    if (this.title && this.selectedFile) {
      console.log(this.title , this.selectedFile)
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('file', this.selectedFile);
      // Send the form data to the backend
      this.http.post(this.apiUrl, formData)
        .subscribe(
          (response) => {
            this.showSuccessMessage = true;
            console.log('Form submitted:');
            console.log('Submission successful:', response);
          
          },
          (error) => {
            console.error('Error submitting:', error);
            
          }
        );
    }
  }

  goBack() {
    this.showSuccessMessage = false;
    this.title='';
    this.selectedFileName="";
  }
}
