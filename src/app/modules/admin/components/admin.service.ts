import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticleApiResponse, Article } from './admin.model';
import { endPoints } from 'src/app/common/constants/endpoints';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Pagination } from 'src/app/common/models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  getLibraryData() {
    throw new Error('Method not implemented.');
  }
  approvalResponse: any;

  constructor(private http: HttpClient,
    private domSanitizer: DomSanitizer) {}

    getApprovedArticles(pagination: Pagination): Observable<ArticleApiResponse> {
      const url = `${endPoints.baseURL}/secure/articles/review?page=${pagination.page}&size=${pagination.size}`;
      return this.http.get<ArticleApiResponse>(url);
    }
    

  getArticleDetails(articleId: number): Observable<Article> {
    const articleDetailsUrl = `${endPoints.baseURL}/articles/${articleId}`;
    return this.http.get<Article>(articleDetailsUrl).pipe(
      catchError((error) => {
        console.error('Error fetching article details:', error);
        return throwError(error);
      })
    );
  }

  getFileContent(fileId: number | string): Observable<SafeResourceUrl> {
    const fileContentUrl = `${endPoints.baseURL}/files/${fileId}`;
    return this.http.get<string>(fileContentUrl).pipe(
      catchError((error) => {
        console.error('Error fetching file content:', error);
        return throwError(error);
      })
    );
  }

  setApprovalResponse(response: any): void {
    this.approvalResponse = response;
    console.log('Setting approval response:', response);
  }
  
  getApprovalResponse(): any {
    return this.approvalResponse;
  }

}



