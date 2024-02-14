import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  post<T>(url: string, data: FormData): Observable<T> {
    const headers = new HttpHeaders();
    return this.httpClient.post<T>(url, data, { headers }).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }
}
