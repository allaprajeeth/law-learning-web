import { Injectable } from '@angular/core';
import { BaseModel } from '../../models/base.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpResponse } from '../../models/response.model';
import { Library } from '../../models/library.model';
import { endPoints } from '../../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  options = {}

  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new(m: HttpResponse<T>, ...args: unknown[]): HttpResponse<T> },
    protected apiUrl: string
  ) { 
    this.options = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  }

  public get(params: any, _url: string): Observable<HttpResponse<T>> {
    return this.httpClient
      .get<HttpResponse<T>>(`${this.apiUrl}` + _url, { params: params })
      .pipe(map((result) => {
        return new this.tConstructor(result);
      }));
  }

  public post(url: string, data: FormData): Observable<HttpResponse<T>> {
    return this.httpClient.post<HttpResponse<T>>(`${this.apiUrl}` + url, data, this.options).pipe(map((result) => {
      return new this.tConstructor(result);
    }), catchError((error: any, caught: Observable<any>): Observable<any> => {
      console.error('There was an error!', error);
      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
    }));;
  }

  public getById(id: string, params: any): Observable<HttpResponse<T>> {
    return this.httpClient
      .get<HttpResponse<T>>(`${this.apiUrl}` + endPoints.libraries + `/${id}`, { params: params })
      .pipe(map((result) => {
        return new this.tConstructor(result);
      }), catchError((error: any, caught: Observable<any>): Observable<any> => {
      console.error('There was an error!', error);
      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
    }));
  }

  public patch(url: string, body: T, options: HttpHeaders): Observable<HttpResponse<T>> {
    const headers = new HttpHeaders();
    return this.httpClient.patch<HttpResponse<T>>(`${this.apiUrl}` + url, body, this.options).pipe(map((result) => {
      return new this.tConstructor(result);
    }), catchError((error: any, caught: Observable<any>): Observable<any> => {
      console.error('There was an error!', error);
      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
    }));;
  }
}
