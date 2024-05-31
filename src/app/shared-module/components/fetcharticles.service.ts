// fetcharticles.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Article, ArticleApiResponse } from './fetcharticle.model';
import { LoggingService } from 'src/app/common/services/logging/logging.service';
import { ApiService } from 'src/app/common/services/api/api.service';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Pagination } from 'src/app/common/models/pagination.model';
@Injectable({
  providedIn: 'root'
})
export class FetcharticlesService {

  private apiUrl = endPoints.baseURL + '/articles';

  constructor (
    private apiService: ApiService,
    private loggingService: LoggingService,
    private http: HttpClient
    ) {}

  getArticles(search: string = '', number: number = 0, size: number = 20, sort: string = 'title,DESC'): Observable<ArticleApiResponse[]> {
    const params = new HttpParams()
      .set('search', search)
      .set('number', number.toString())
      .set('size', size.toString())
      .set('sort', sort);

      return this.http.get<ArticleApiResponse[]>(this.apiUrl, { params })
      .pipe(
        catchError(this.handleError)
      );
      
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);  // Log error details
    return throwError('Something went wrong. Please try again later.');
  }



  loadPublishArticles(search: string = '',pagination:Pagination ,sort: string = 'title,DESC'): Observable<any> {
    let url = endPoints.baseURL + `/articles?search=${search}&page=${pagination.page}&size=${pagination.size}&sort=${sort}`;
    return this.apiService.get(url).pipe(
      tap((response: any) => {
        if (!!response) {
          console.log(response.data);
          return response.data
        }
      }),
      catchError((errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          this.loggingService.log(errorResponse?.error?.error.message);
        }
        return EMPTY;
      })
    );
  }
  
  getArticleDetails(articleId: number): Observable<Article> {
    const articleDetailsUrl = `${this.apiUrl}/${articleId}`;
    return this.http.get<Article>(articleDetailsUrl).pipe(
      catchError((error) => {
        console.error('Error fetching article details:', error);
        return throwError(error);
      })
    );
  }


 
}