import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { endPoints } from '../constants/endpoints';
import { BaseModel } from '../models/base.model';
import { environment } from 'src/environments/environment';
import { AuthTokenService } from './auth-token/auth-token.service';
import { UserRole } from '../enums/role.enums';
import { ReviewStatus } from '../enums/status.enums';
import { SubSection } from '../models/sub-sections.model';


interface ApiResponse {
  data: {
    content: Course[];
  };
  status: number;
}
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  createCourse: any;
  
  constructor(private httpClient: HttpClient,
    private authService: AuthTokenService
  ) {}

  post<T>(url: string, data: FormData): Observable<T> {
    const headers = new HttpHeaders();
    return this.httpClient.post<T>(url, data, { headers });
  }

  patch<T>(url: string, data: FormData): Observable<T> {
    const headers = new HttpHeaders();
    return this.httpClient.patch<T>(url, data, { headers });
  }

  getCourses(): Observable<Course[]> {
    const url = `${endPoints.baseURL}/secure/courses`;
    return this.httpClient.get<Course[]>(url);
  }

  getCourseDetails(courseId: number): Observable<BaseModel<Course>> {
    const url = `${endPoints.baseURL}/secure/courses/${courseId}`;
    return this.httpClient.get<BaseModel<Course>>(url);
  }


  updateCourse(courseId: number, data: FormData): Observable<any> {
    const url = `${endPoints.baseURL}/secure/courses/${courseId}/section`;
    const headers = new HttpHeaders();
    return this.httpClient.patch(url, data, { headers });
  }

  patchSubSection<T>(courseId: string, sectionId: number, subSectionId: number, data: any): Observable<T> {
    const url = `${endPoints.baseURL}/secure/courses/${courseId}/section/${sectionId}/sub-section`;
    const headers = new HttpHeaders();
    return this.httpClient.patch<T>(url, data, { headers });
  }

  /*------------ course review process ---------------- */

  showSubsciptionApprovalSection(subSection: SubSection): boolean {
    const role = this.authService.getUserRole();
    let roleEnum: UserRole = UserRole[role as keyof typeof UserRole];
    let statusEnum: ReviewStatus = ReviewStatus[subSection.reviewStatus as keyof typeof ReviewStatus];
    
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

  getReviewCourses(number: number, size: number): Observable<any> {
    const url = `${endPoints.baseURL}/secure/courses/review?number=${number}&size=${size}&sort=createdDate,DESC`;
    return this.httpClient.get(url);
  }

  getThumbnailUrl(thumbnailPath: string): string {
    return `${environment.endpoints.secureBaseURL}/${thumbnailPath}`;
  }

  getCourseById(courseId: number): Observable<Course> {
    const url = `${endPoints.baseURL}/secure/courses/${courseId}`;
    return this.httpClient.get<Course>(url);
  }



  sendReview(courseId: string, videoInfo: any): Observable<any> {
    const url = `${endPoints.baseURL}/secure/courses/review/${courseId}`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.patch(url, videoInfo, { headers: headers });
  }

  getCoursesToPublish(): Observable<ApiResponse> {
    const url = `${endPoints.baseURL}/secure/admin/courses/publish`;
    return this.httpClient.get<ApiResponse>(url);
  }

  getCourseId(courseId: number): Observable<Course> {
    const url = `${endPoints.baseURL}/secure/admin/courses//publish/${courseId}`;
    return this.httpClient.get<Course>(url);
  }
  
}
