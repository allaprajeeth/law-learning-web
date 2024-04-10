// all-profiles.component.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { AdvisorProfile } from 'src/app/common/models/instructor.model';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss']
})
export class AllProfilesComponent implements OnInit {

  selectedRole: string = 'all';
  advisorId:number | undefined;
  constructor(private http: HttpClient,
    private router: Router) { }
  advisorProfiles:AdvisorProfile[] = [];
  


  subscriberProfiles: any[] = [
    { username: 'Pushpa', role: 'Subscriber', status: 'Active' },
    { username: 'Vani', role: 'Subscriber', status: 'Inactive' },
    { username: 'Lokesh', role: 'Subscriber', status: 'Blocked' },
    // Add more subscriber profiles
  ];

  instructorProfiles: any[] = [
    { username: 'John', role: 'Instructor', status: 'Active' },
    { username: 'Davis', role: 'Instructor', status: 'Inactive' },
    // Add more instructor profiles
  ];

  reviewerProfiles: any[] = [
    { username: 'Wilson', role: 'Reviewer', status: 'Active' },
    { username: 'Smith', role: 'Reviewer', status: 'Inactive' },
    // Add more reviewer profiles
  ];

  contentManagerProfiles: any[] = [
    { username: 'Johnson', role: 'Content-manager', status: 'Active' },
    // { username: 'sarah', role: 'Content-manager', status: 'Inactive' },
    // Add more content manager profiles
  ];

  allProfiles: any[] = [];

  ngOnInit(): void {
    // Combine all profiles into a single array
    this.allProfiles = [
      ...this.subscriberProfiles,
      ...this.instructorProfiles,
      ...this.reviewerProfiles,
      ...this.contentManagerProfiles,
    ];

   
     
  
  }

  onRoleSelected(role: string): void {
    this.selectedRole = role;
    this.filterProfiles();
  }
  filterProfiles(): void {
    if (this.selectedRole === 'all') {
      // If 'all' is selected, show all profiles
      this.allProfiles = [
        ...this.subscriberProfiles,
        ...this.instructorProfiles,
        ...this.reviewerProfiles,
        ...this.contentManagerProfiles,
          this.fetchAdvisorProfiles(),
       ...this.advisorProfiles 
      ];
    } else {
      // Filter profiles based on the selected role
      switch (this.selectedRole) {
        case 'subscribers':
          this.allProfiles = this.subscriberProfiles;
          break;
        case 'reviewers':
          this.allProfiles = this.reviewerProfiles;
          break;
        case 'instructors':
          this.allProfiles = this.instructorProfiles;
          break;
        case 'content-managers':
          this.allProfiles = this.contentManagerProfiles;
          break;
        case 'advisors':
          this.fetchAdvisorProfiles()
          this.allProfiles=this.advisorProfiles ;
          break;
          default:
          break;
      }
    }
  }

  getInitials(username: string): string {
    // Logic to extract initials from the username, e.g., "John Doe" => "JD"
    const initials = username.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  }

  getStatusStyles(status: string): any {
    switch (status.toLowerCase()) {
      case 'inactive':
        return { color: 'blue' };
      case 'blocked':
        return { color: 'red' };
      case 'active':
        return { color: 'green' };
      default:
        return {};
    }
  }

  fetchAdvisorProfiles(): void {
    const baseUrl = endPoints.baseURL;
    const apiUrl =baseUrl+ `/advisor/profiles`;
    const params = new HttpParams()
      .set('search', '')
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      this.advisorProfiles = response.data.content;
    });
  }

 navigateToAdvisorProfiles(advisorId: any):void{
  this.router.navigate(["/admin/profile-details",advisorId]);
 }
  
}
