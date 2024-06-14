import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/common/enums/role.enums';
import { ReviewStatus } from 'src/app/common/enums/status.enums';
import { Course } from 'src/app/common/models/course.model';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';
import { CourseService } from 'src/app/common/services/course.service';

@Component({
  selector: 'app-sharedoverview',
  templateUrl: './sharedoverview.component.html',
  styleUrls: ['./sharedoverview.component.scss'],
})
export class SharedoverviewComponent {
  @Input() course: Course = new Course();
  courseId: number | undefined;
  numberOfSubsections = 0;
  rejectComment: string = '';
  resubmitComment : string = '';
  isRejectCommentValid: boolean = false;
  isResubmitCommentValid: boolean = false;
  isInstructorModule: boolean = false;
  role:string =''

  constructor(
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
    this.role = this.authService.getUserRole();
    let roleEnum: UserRole = UserRole[this.role as keyof typeof UserRole];
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

  checkRejectComment(): void {
    this.isRejectCommentValid = this.rejectComment.trim().length > 0;
  }
  checkResubmitComment(): void {
    this.isResubmitCommentValid = this.resubmitComment.trim().length > 0;
  }


  approve() {
    const reviewData = { status: 'APPROVED' };
    const courseId = this.course?.id.toString();

    this.courseService.sendReview(courseId, reviewData).subscribe(
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

    this.courseService.sendReview(courseId, reviewData).subscribe(
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
  resubmit(){
    if (!this.resubmitComment.trim()) {
      alert('Please add a comment before resubmitting.');
      
      return;
    }
    
      const reviewData = { 
        status: 'RESUBMIT',
        comment: this.resubmitComment

       };
      const courseId = this.course?.id.toString();
  
      this.courseService.sendReview(courseId, reviewData).subscribe(
        response => {
          console.log('Course Resubmitted', response);
          if (this.role === 'ADMIN') {
          this.snackBar.open(  'You have requested for re-submission of the Course, a notification containing the related details will be sent to the Author.', 'Close', {
            verticalPosition: 'top'
          });
        }
        else{
          this.snackBar.open(  'You have requested for re-submission of the Course, a notification containing the related details will be sent to the Admin.', 'Close', {
            verticalPosition: 'top'
          });
        }
        
        },
        error => {
          console.error('Error Resubmitting course', error);
          this.snackBar.open('Error Resubmitting course', 'Close', {
            verticalPosition: 'top'
          });
        }
      );
    }
    
  
}
