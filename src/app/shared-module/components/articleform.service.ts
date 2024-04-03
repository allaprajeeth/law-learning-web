import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleformService {
  constructor(private httpClient: HttpClient) {}

  post<T>(url: string, data: FormData): Observable<T> {
    return this.httpClient.post<T>(url, data, { headers: this.defaultHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url, { headers: this.defaultHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  private defaultHeaders = new HttpHeaders();

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
