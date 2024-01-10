// articleform.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleformService {
  constructor(private httpClient: HttpClient) {}


  post<T>(url: string, data: FormData): Observable<T> {
    const headers = new HttpHeaders();
    //headers.set('Content-Type', 'multipart/form-data'); // Set the appropriate Content-Type header

    return this.httpClient.post<T>(url, data, { headers });
  }
 
  // post<T>(url: string, data: FormData): Observable<T> {
  //   return this.http.post<T>(url, data);

  // }

  // post<T>(url: string, body: any | undefined, params?: HttpParams | {}): Observable<T> {
  //   return this.httpClient.post<T>(url, body, { params });
  // }
}
