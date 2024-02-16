import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { endPoints } from '../api-layer/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  post<T>(url: string, data: FormData): Observable<T> {
    const headers = new HttpHeaders();
    return this.httpClient.post<T>(url, data, { headers });
  }

  getCourses(): Observable<Course[]> {
    const url = `${endPoints.baseURL}/secure/courses`;
    return this.httpClient.get<Course[]>(url);
  }

  getCourseDetails(courseId: number): Observable<Course> {
    const url = `${endPoints.baseURL}/secure/courses/${courseId}`;
    return this.httpClient.get<Course>(url);
  }
  
}
