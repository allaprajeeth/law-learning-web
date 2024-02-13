import { Injectable } from '@angular/core';
import { BaseModel } from '../../models/base.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpResponse } from '../../models/response.model';
import { Library } from '../../models/library.model';
import { endPoints } from '../../api-layer/endpoints';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new (m: HttpResponse<T>, ...args: unknown[]): HttpResponse<T> },
    protected apiUrl: string
  ) {}

  public get(params: any): Observable<HttpResponse<T>> {
    return this.httpClient
      .get<HttpResponse<T>>(`${this.apiUrl}`+ endPoints.libraries, {params:params})
      .pipe(map((result) => {
        return new this.tConstructor(result);
      }));
  }

  public post(url: string, data: FormData): Observable<HttpResponse<T>> {
    const headers = new HttpHeaders();
    return this.httpClient.post<HttpResponse<T>>(`${this.apiUrl}` + url, data, { headers }).pipe(map((result) => {
      return new this.tConstructor(result);
    }), catchError((error: any, caught: Observable<any>): Observable<any> => {
      console.error('There was an error!', error);
      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
  }));;
  }
}
