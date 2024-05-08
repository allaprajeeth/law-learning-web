import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { AdvisorProfile } from 'src/app/common/models/instructor.model';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss'],
})
export class AllProfilesComponent implements OnInit {
  selectedRole: string = 'all';
  advisorId: number | undefined;
  advisorProfiles: AdvisorProfile[] = [];
  allProfiles: any[] = [];

  pagination: Pagination = new Pagination();
  params: any = {};
  constructor(private http: HttpClient, private router: Router) {
    this.pagination = new Pagination();
  }

  ngOnInit(): void {
    this.selectedRole = 'all';
    this.params = {
      pagination: this.pagination.getPaginationRequest(),
    };
    this.filterProfiles(this.params);
  }

  onRoleSelected(role: string): void {
    this.selectedRole = role;

    if (this.selectedRole === 'ADVISORS') {
      this.allProfiles = [];
      this.fetchAdvisorProfiles();
    } else {
      this.filterProfiles(this.params);
    }
  }

  filterProfiles(params: any): void {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/admin/user-profile/getAll`;

    if (this.selectedRole !== 'all') {
      this.params.search = this.selectedRole;
    }
    else if(this.selectedRole === 'all'){
      this.params = {
        pagination: this.pagination.getPaginationRequest(),
      };
    }
   

    this.http.get<any>(apiUrl, { params }).subscribe((response) => {
      this.allProfiles = response.data.content;
      this.pagination = new Pagination(response.data);
      console.log(this.allProfiles);
      console.log(this.pagination);
    });
  }

  getInitials(username: string): string {
    const initials = username
      .split(' ')
      .map((word) => word[0])
      .join('');
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
    const apiUrl = baseUrl + `/advisor/profiles`;
    const params = new HttpParams()
      .set('search', '')
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
    this.http.get<any>(apiUrl, { params }).subscribe((response) => {
      this.advisorProfiles = response.data.content;
    });
  }

  navigateToAdvisorProfiles(advisorId: any): void {
    this.router.navigate(['/admin/editadvisor', advisorId]);
  }
  navigateToAllProfiles(userId: any) {
    this.router.navigate(['/admin/profile-details', userId]);
  }

  onPageChange(page: number) {
    console.log(page);
    this.pagination.page =page
    this.filterProfiles(this.pagination)
  }
}
