import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import {
  AdvisorProfile,
  UserProfile,
} from 'src/app/common/models/instructor.model';
import { Pagination } from 'src/app/common/models/pagination.model';
import { ConfirmationAlertComponent } from 'src/app/shared-module/components/confirmation-alert/confirmation-alert.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

// interface UserProfile {
//   id: string;
//   name: string;
//   role: string;
//   status: string;
//   isActive: boolean;
// }
@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss'],
})
export class AllProfilesComponent implements OnInit {
  selectedRole: string = 'All Profiles';
  advisorId: number | undefined;
  advisorProfiles: AdvisorProfile[] = [];
  allProfiles: any[] = [];
  pagination: Pagination = new Pagination();
  pagination1: Pagination = new Pagination();
  params: any = {};
  // userProfile: UserProfile[] = [];
  overallProfiles: UserProfile[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.selectedRole = 'all';
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
    const apiUrl =
      baseUrl + `/admin/user-profile/getAll?&sort=createdDate,DESC`;

    // Set search parameter
    if (this.selectedRole !== 'all') {
      params.search = this.selectedRole;
    } else {
      delete params.search;
    }

    // Get pagination parameters from the pagination object
    const paginationParams = this.pagination.getPaginationRequest();

    // Merge pagination parameters with other params if any
    const queryParams = { ...params, ...paginationParams };

    this.http
      .get<any>(apiUrl, { params: queryParams })
      .subscribe((response) => {
        this.allProfiles = response.data.content;
        this.pagination = new Pagination(response.data);
        console.log(response.data.content);
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
      case 'archived':
        return { color: 'red' };
      case 'active':
        return { color: 'green' };
      default:
        return {};
    }
  }

  onToggleUserActivation(profileId: number, event: MatSlideToggleChange) {
    const newStatus = event.checked ? 'ACTIVE' : 'ARCHIVED';
    const originalCheckedState = !event.checked;

    const confirmationMessage = event.checked
      ? 'Do you want to activate the user?'
      : 'Do you want to inactivate the user?';

    const dialogRef = this.dialog.open(ConfirmationAlertComponent, {
      width: '350px',
      data: {
        message: confirmationMessage,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        try {
          const baseUrl = endPoints.secureBaseURL;
          const apiUrl = `${baseUrl}/admin/user-profile/${profileId}?status=${newStatus}`;

          this.http.delete(apiUrl).subscribe(
            () => {
              this.allProfiles = this.allProfiles.map((profile) => {
                if (profile.id === profileId) {
                  return {
                    ...profile,
                    status: newStatus,
                  };
                } else {
                  return profile;
                }
              });

              const message =
                newStatus === 'ACTIVE'
                  ? 'User activated successfully'
                  : 'User inactivated successfully';
              this.snackBar.open(message, 'Close', { duration: 5000 });
            },
            (error) => {
              console.error('Error toggling user activation:', error);
              this.snackBar.open(
                'Failed to update user status. Please try again.',
                'Close',
                { duration: 5000 }
              );

              event.source.checked = originalCheckedState;
            }
          );
        } catch (error) {
          console.error('Error toggling user activation:', error);
          this.snackBar.open(
            'Failed to update user status. Please try again.',
            'Close',
            { duration: 5000 }
          );

          event.source.checked = originalCheckedState;
        }
      } else {
        event.source.checked = originalCheckedState;
      }
    });
  }

  fetchAdvisorProfiles(): void {
    const baseUrl = endPoints.baseURL;
    const apiUrl =
      baseUrl +
      `/advisor/profiles?page=${this.pagination1.page}&size=${this.pagination1.size}&sort=createdDate,DESC`;
    this.http.get<any>(apiUrl).subscribe((response) => {
      this.advisorProfiles = response.data.content;
      this.pagination1.totalElements = response.data.totalElements;
    });
  }
  onPageChange1(pagination: Pagination) {
    this.pagination.page = pagination.page;
    this.pagination.size = pagination.size;
    this.fetchAdvisorProfiles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToAdvisorProfiles(advisorId: any): void {
    this.router.navigate(['/admin/editadvisor', advisorId]);
  }
  navigateToAllProfiles(userId: any) {
    this.router.navigate(['/admin/profile-details', userId]);
  }

  onPageChange(pagination: Pagination, isAdvisors: boolean) {
    this.pagination.page = pagination.page;
    this.pagination.size = pagination.size;

    if (isAdvisors) {
      this.fetchAdvisorProfiles();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.filterProfiles(this.params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openProfileModal(profileId: string): void {
    const profile = this.allProfiles.find(
      (profile) => profile.id === profileId
    );
    console.log(this.allProfiles);

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
