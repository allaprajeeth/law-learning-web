import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { UserModel } from '../../models/user.model';
import { endPoints } from '../../constants/endpoints';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  selectedFileName: string | null = null;
 
  constructor(private http: HttpClient, private authTokenService: AuthTokenService) { }
 
  ngOnInit(): void {
    const user = this.authTokenService.getUserDetails();
    if (user)
      this.imageUrl = user.imageURL ? endPoints.s3BaseURL + user.imageURL : user.imageURL;
  }
 
  onFileSelected(event: any): void {
 
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('Selected file:', this.selectedFile);
 
      if (this.selectedFile) {
        this.selectedFileName = this.selectedFile.name;
        console.log('Selected file name:', this.selectedFileName);
 
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        console.log('Form data:', formData);
 
        this.imageUrl = URL.createObjectURL(this.selectedFile);
 
      }
    }
  }
  onSave(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
 
    const formData = new FormData();
    formData.append('file', this.selectedFile);
 
    this.http.post<any>(endPoints.secureBaseURL + '/profile/upload', formData)
      .subscribe(
        (response: any) => {
          this.imageUrl = endPoints.s3BaseURL + response.data.imageURL + '?random=' + Math.random();
          console.log(this.imageUrl)
        },
        error => {
          console.error('Upload failed', error);
        }
      );
  }
}