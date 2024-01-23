import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from '../auth-token/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private commonHeaders: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private authTokenService: AuthTokenService
  ) {
    this.commonHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authTokenService.getCurrentToken()}`
    });
  }

  get<T>(url: string, params?: HttpParams | {}): Observable<T> {
    return this.httpClient.get<T>(url, { params });
  }

  post<T>(url: string, body: any | undefined, params?: HttpParams | {}): Observable<T> {
    return this.httpClient.post<T>(url, body, { params });
  }
}
