import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { AdvisorProfile } from 'src/app/common/models/instructor.model';

@Component({
  selector: 'app-edit-advisor-profile',
  templateUrl: './edit-advisor-profile.component.html',
  styleUrls: ['./edit-advisor-profile.component.scss']
})
export class EditAdvisorProfileComponent {
  showcredentialStatus: boolean = true;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  selectedFileName: string | null = null;
  advisorProfiles:AdvisorProfile[] = [];
  advisorId  :number| undefined
  s3BaseURL='https://elearning-stagging.s3.ap-south-1.amazonaws.com/'
  user: any;

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
  }
  
  goBack(): void {
    this.router.navigate(['/admin/all-profiles']); 
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
function goBack() {
  throw new Error('Function not implemented.');
}

