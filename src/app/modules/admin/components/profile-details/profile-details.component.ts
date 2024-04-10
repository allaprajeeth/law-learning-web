// profile-details.component.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { AdvisorProfile } from 'src/app/common/models/instructor.model';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  showcredentialStatus: boolean = true;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  selectedFileName: string | null = null;
  advisorProfiles:AdvisorProfile[] = [];
  advisorId  :number| undefined
  s3BaseURL='https://elearning-stagging.s3.ap-south-1.amazonaws.com/'
  user: any;// Replace 'any' with your user model/interface

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const params = paramMap.get('id');
      this.advisorId = +params!;
      if (this.advisorId) {
        this.fetchAdvisorProfiles(this.advisorId);
      }
    });
   
    

  
    // Fetch user data based on route parameter (userId)
    const userId = this.route.snapshot.paramMap.get('userId');

    if (userId) {
      // Replace the following line with your user fetching logic
      this.user = this.fetchUserData(userId);
    } else {
      console.error('User ID is null.');
      // Handle the situation where the user ID is null (e.g., redirect, show error message, etc.)
    }
  }

  toggleBlockStatus(): void {
    // Implement the logic to toggle block status (backend call, etc.)
    this.user.isBlocked = !this.user.isBlocked;
  }

  editComment(comment: any): void {
    // Implement the logic to edit a comment
  }

  deleteComment(comment: any): void {
    // Implement the logic to delete a comment
  }

  goBack(): void {
    this.router.navigate(['/admin/all-profiles']); // Replace with the appropriate route
  }

  // Replace this with your actual method to fetch user data
  private fetchUserData(userId: string): any {
    // Mock data - Replace with your actual fetching logic
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      coursesPurchased: 5,
      articlesWritten: 10,
      lastActive: new Date(),
      isBlocked: false,
      comments: [
        { text: 'Great course!', date: new Date() },
        { text: 'Interesting article.', date: new Date() }
      ]
    };
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
    this.http.patch<any>(endPoints.secureBaseURL + `/advisor/profile/upload/${this.advisorId}`, formData)
      .subscribe(
        (response: any) => {
          this.imageUrl = endPoints.s3BaseURL + response.data.imageURL + '?random=' + Math.random();
        },
        error => {
          console.error('Upload failed', error);
        }
      );
  }

  fetchAdvisorProfiles(advisorIdToFetch?: number): void {
    this.advisorProfiles=[]
    const baseUrl = endPoints.baseURL;
    const apiUrl = baseUrl + `/advisor/profiles`;
    const params = new HttpParams()
      .set('search', '')
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
      
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      if (advisorIdToFetch) {
        
        this.advisorProfiles = response.data.content.filter((profile: { id: number; }) => profile.id === advisorIdToFetch);
      }
    });
  }
}
