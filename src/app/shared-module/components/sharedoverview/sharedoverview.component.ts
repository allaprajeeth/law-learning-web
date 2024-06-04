import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { isNumber } from 'src/app/common/constants/utils';
import { UserRole } from 'src/app/common/enums/role.enums';
import { ReviewStatus } from 'src/app/common/enums/status.enums';
import { Course } from 'src/app/common/models/course.model';
import { SubSection } from 'src/app/common/models/sub-sections.model';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';
// import { CoursesService } from 'src/app/common/services/courses/courses.service';
import { CourseService } from 'src/app/common/services/course.service';
 
@Component({
  selector: 'app-sharedoverview',
  templateUrl: './sharedoverview.component.html',
  styleUrls: ['./sharedoverview.component.scss'],
})
export class SharedoverviewComponent {
  @Input() course: Course = new Course;
  courseId: number | undefined;
   numberOfSubsections = 0;
   rejectComment: string = '';
   isInstructorModule: boolean = false;
 
  constructor(
    // private courseService: CoursesService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private authService: AuthTokenService,
    private snackBar: MatSnackBar
 
  ) {}
 
  ngOnInit(): void {
    this.checkRoute();
    if (this.course && this.course.sections) {
      this.numberOfSubsections = this.course.sections.reduce((acc, section) => {
        return acc + (section.subSections ? section.subSections.length : 0);
      }, 0);
    }
  }
 
  private checkRoute(): void {
    this.route.url.subscribe(url => {
      this.isInstructorModule = url.some(segment => segment.path === 'instructor');
    });
  }
 
  isSubmitted(subsection: any): boolean {
    return subsection.reviewStatus === 'SUBMITTED';
  }  
 
  formApproval(): boolean {
    const role = this.authService.getUserRole();
    let roleEnum: UserRole = UserRole[role as keyof typeof UserRole];
    let statusEnum: ReviewStatus = ReviewStatus[this.course.reviewStatus as keyof typeof ReviewStatus];
   
    if (roleEnum === UserRole.CONTENTMANAGER) {
      return statusEnum === ReviewStatus.SUBMITTED;
    } else if (roleEnum === UserRole.ADMIN) {
      return statusEnum === ReviewStatus.CONTENT_MANAGER_REJECTED
            || statusEnum === ReviewStatus.REVIEWER_ACCEPTED
            || statusEnum === ReviewStatus.REVIEWER_REJECTED
            || statusEnum === ReviewStatus.REVIEWER_RESUBMIT;
    } else if (roleEnum === UserRole.REVIEWER) {
      return statusEnum === ReviewStatus.CONTENT_MANAGER_ACCEPTED
             || statusEnum === ReviewStatus.CM_ADMIN_ACCEPTED;
    }
    return false;
  }
 
 
 
  approve() {
    const reviewData = { status: 'APPROVED' };
    const courseId = this.course?.id.toString();
 
    this.courseService.sendReview(this.course.id.toString(), reviewData).subscribe(
      response => {
        console.log('Course approved', response);
        this.snackBar.open('Course approved successfully', 'Close', {
          verticalPosition: 'top'
        });
      },
      error => {
        console.error('Error approving course', error);
        this.snackBar.open('Error approving course', 'Close', {
          verticalPosition: 'top'
        });
      }
    );
  }
 
  reject() {
    if (!this.rejectComment.trim()) {
      alert('Please add a comment before rejecting.');
      return;
    }
 
    const reviewData = {
      status: 'REJECTED',
      comment: this.rejectComment
    };
    const courseId = this.course.id.toString();
   
    this.courseService.sendReview(this.course.id.toString(), reviewData).subscribe(
      response => {
        console.log('Course rejected', response);
        this.snackBar.open('Course rejected successfully', 'Close', {
          verticalPosition: 'top'
        });
      },
      error => {
        console.error('Error rejecting course', error);
        this.snackBar.open('Error rejecting course', 'Close', {
          verticalPosition: 'top'
        });
      }
    );
  }
}


  // approveOverview(status: string) {
  //   const courseId = this.course?.id;
  //   const body = {
  //     status: status,
  //     summary: ''
  //   };

  //   this.courseService.sendReview(String(courseId), body).subscribe(
  //     response => {
  //       console.log('Overview approved:', response);
  //       this.showSuccessPopup('Course Overview approved successfully.');
  //       this.overviewReviewStatus = status;
  //     },
  //     error => {
  //       console.error('Error approving overview:', error);
  //     }
  //   );
  // }

  // rejectOverview(status: string, rejectionComment: string | undefined) {
  //   const courseId = this.course?.id;
  //   const body = {
  //     status: status,
  //     summary: rejectionComment
  //   };

  //   this.courseService.sendReview(String(courseId), body).subscribe(
  //     response => {
  //       console.log('Overview commented:', response);
  //       this.overviewReviewStatus = status;
  //       this.showCommentBox = false;
  //       this.showRejectPopup('Course Overview commented successfully.');
  //     },
  //     error => {
  //       console.error('Error rejecting overview:', error);
  //     }
  //   );
  // }

  // toggleCommentBox() {
  //   this.showCommentBox = !this.showCommentBox;
  //   this.rejectComment = ''; 
  // }

  // showSuccessPopup(message: string) {
  //   this.snackBar.open(message, 'Close', { 
  //     verticalPosition: 'top',
  //     panelClass: ['success-snackbar'] 
  //   });
  // }

//   showRejectPopup(message: string) {
//     this.snackBar.open(message, 'Close', {
//       verticalPosition: 'top',
//       panelClass: ['reject-snackbar'] 
//     });
//   }
// }


