import { Component, Input, OnInit } from '@angular/core';
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
  user: UserModel | null = null;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  selectedFileName: string | null = null;
  userDetailsSubscription: any;
  name: string | undefined;
  @Input() displayName: string | undefined;
 
  constructor(private http: HttpClient, private authTokenService: AuthTokenService) { }
 

  ngOnInit(): void {
    this.userDetailsSubscription = this.authTokenService.userDetails$.subscribe(
      (userDetails: UserModel | null) => {      
        this.name = userDetails?.name;
      }
    );
    const user = this.authTokenService.getUserDetails();
    if (user)
      this.imageUrl = user.imageURL ? endPoints.s3BaseURL + user.imageURL : user.imageURL;
    console.log('DisplayName in ProfileComponent:', this.displayName);
  }


  // constructor(private http: HttpClient, private authTokenService: AuthTokenService) { }

  // ngOnInit(): void {
  //   this.user = this.authTokenService.getUserDetails();
  //   if (this.user)
  //     this.imageUrl = this.user.imageURL ? endPoints.s3BaseURL + this.user.imageURL : this.user.imageURL;
  // }


  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      if (this.selectedFile) {
        this.selectedFileName = this.selectedFile.name;

        const formData = new FormData();
        formData.append('file', this.selectedFile);

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
        },
        error => {
          console.error('Upload failed', error);
        }
      );
  }
}
