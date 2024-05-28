import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { AdvisorProfile } from 'src/app/common/models/instructor.model';
import { Pagination } from 'src/app/common/models/pagination.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
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
  pageSize: number = 9;
  params: any = {};
  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {
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
    } else if (this.selectedRole === 'all') {
      this.params = {
        pagination: this.pagination.getPaginationRequest(),
      };
    }

    this.http.get<any>(apiUrl, { params }).subscribe((response) => {
      this.allProfiles = response.data.content;
      this.pagination = new Pagination(response.data);
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
    console.log('latest from all' + ' ' + page);
    this.pagination.page = page;
    this.filterProfiles(this.pagination);
  }

  openProfileModal(profileId: string): void {
    const profile = this.allProfiles.find(
      (profile) => profile.id === profileId
    );
    const modalContent = `
      <div class="modal-content">
       
  <div class="profile-container">
  <h2>User Profile</h2>
  <div class="profile-section">
    <label>Name:</label>
    <span>${profile.name}</span>
  </div>
  <div class="profile-section">
    <label>Phone:</label>
    <span>${profile.phone}</span>
  </div>

  <div class="profile-section">
    <label>Email:</label>
    <span>${profile.email}</span>
  </div>

  <div class="profile-section">
    <label>Role:</label>
    <span>${profile.role}</span>
  </div>

  <div class="profile-section">
    <label>Status</label>
    <span>${profile.status}</span>
  </div>
  <div class="profile-section">
    <label>Last Active:</label>
    <span>${profile.updatedDate}</span>
  </div>
      </div>
    `;

    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '500px',
      data: { content: modalContent },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
@Component({
  selector: 'app-profile-modal',
  template: `
    <button mat-icon-button class="close-button" (click)="closeModal()">
      X
    </button>
    <div [innerHTML]="data.content"></div>
  `,
  styles: [
    `
      ::ng-deep .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        font-size: 16px;
        .profile-section {
          margin-bottom: 10px;
        }
      }
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
      }
    `,
  ],
})
export class ProfileModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closeModal(): void {
    this.dialogRef.close();
  }
}
