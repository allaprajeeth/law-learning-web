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
  advisorProfiles:AdvisorProfile[] = [];
  allProfiles: any[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
      this.selectedRole ="all";
      this.filterProfiles()

  }

  onRoleSelected(role: string): void {
    this.selectedRole = role;
   
    if(this.selectedRole === 'ADVISORS'){
      this.allProfiles =[]
      this.fetchAdvisorProfiles()
    }
    else{
      this.filterProfiles();
    }
  }

  filterProfiles(): void {
        const baseUrl = endPoints.secureBaseURL;
        const apiUrl = baseUrl + `/admin/user-profile/getAll`;
        let params = new HttpParams()
          .set('number', '0')
          .set('size', '20')
          .set('sort', 'id,DESC');
        if (this.selectedRole  === 'SUBSCRIBER') {
          params = params.set('search', 'SUBSCRIBER');
        } else if (this.selectedRole  === 'ADMIN') {
          params = params.set('search', 'ADMIN');
        } else if (this.selectedRole  === 'CONTENTMANAGER') {
          params = params.set('search', 'CONTENTMANAGER');
        } else if (this.selectedRole  === 'INSTRUCTOR') {
          params = params.set('search', 'INSTRUCTOR');
        }
        else if (this.selectedRole  === 'REVIEWER'){
          params = params.set('search', 'REVIEWER');
        }
        else {

        }

        this.http.get<any>(apiUrl, { params }).subscribe(response => {
          this.allProfiles = response.data.content;
          console.log(this.allProfiles);
        });
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
  this.router.navigate(["/admin/editadvisor",advisorId]);
 }
 navigateToAllProfiles(userId:any) {
  this.router.navigate(["/admin/profile-details",userId]);
 }
  
}
