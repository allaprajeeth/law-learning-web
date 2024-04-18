import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { endPoints } from '../constants/endpoints';
import { BaseModel } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  createCourse: any;
  
  constructor(private httpClient: HttpClient) {}

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

  getReviewCourses(number: number, size: number): Observable<any> {
    const url = `${endPoints.baseURL}/secure/courses/review?number=${number}&size=${size}&sort=createdDate,DESC`;
    return this.httpClient.get(url);
  }
}
