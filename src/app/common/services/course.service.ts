import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Course } from '../models/course.model';
import { endPoints } from '../constants/endpoints';
import { BaseModel } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
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
  
}
