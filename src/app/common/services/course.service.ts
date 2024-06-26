import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
import { Pagination } from '../models/pagination.model';


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

  getCourses(pagination:Pagination): Observable<Course[]> {
    const url = `${endPoints.baseURL}/secure/courses?page=${pagination.page}&size=${pagination.size}`;
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

  showSubsciptionApprovalSection(reviewStatus: string): boolean {
    const role = this.authService.getUserRole();
    let roleEnum: UserRole = UserRole[role as keyof typeof UserRole];
    let statusEnum: ReviewStatus = ReviewStatus[reviewStatus as keyof typeof ReviewStatus];
    
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

  showApprovalSectionForAdmin(reviewStatus: string, proxy_role: any): boolean {
    const role = proxy_role;
    let roleEnum: UserRole = UserRole[role as keyof typeof UserRole];
    let statusEnum: ReviewStatus = ReviewStatus[reviewStatus as keyof typeof ReviewStatus];
    
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

  getReviewCourses(pagination :Pagination): Observable<any> {
    const url = `${endPoints.baseURL}/secure/courses/review?number?page=${pagination.page}&size=20&sort=createdDate,DESC`;
    return this.httpClient.get(url);
  }

  getThumbnailUrl(thumbnailPath: string): string {
    return `${environment.endpoints.secureBaseURL}/${thumbnailPath}`;
  }

  getCourseById(courseId: number): Observable<Course> {
    const url = `${endPoints.baseURL}/secure/courses/${courseId}`;
    return this.httpClient.get<Course>(url);
  }

  getSubscriberCourseId(courseId: number): Observable<Course> {
    const url = `${endPoints.baseURL}/secure/subscriber/course/${courseId}`;
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

  publishCourse(courseId: number): Observable<any> {
    const url = `${endPoints.baseURL}/secure/admin/courses/publish/${courseId}`;
    return this.httpClient.post(url, {});
  }

  getCmReviewCourses(pagination: Pagination): Observable<ApiResponse> {
    const url = `${endPoints.baseURL}/secure/courses/review`;
    const params = new HttpParams()
      .set('number', pagination.page.toString())
      .set('size', pagination.size.toString())
      .set('sort', 'createdDate,DESC')
      .set('filters', 'filterKey:reviewStatus,operation:equal,value:SUBMITTED');

    return this.httpClient.get<ApiResponse>(url, { params });
  }

  getRevReviewCourses(pagination: Pagination): Observable<ApiResponse> {
    const url = `${endPoints.baseURL}/secure/courses/review`;
    const params = new HttpParams()
      .set('number', pagination.page.toString())
      .set('size', pagination.size.toString())
      .set('sort', 'createdDate,DESC')
      .set('filters', 'filterKey:reviewStatus,operation:equal,value:CONTENT_MANAGER_ACCEPTED');

    return this.httpClient.get<ApiResponse>(url, { params });
  }
  
}
