import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Article, CreatedBy, UpdatedBy, File } from './article.model';


@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://192.168.1.42:8080/api/v1/secure/articles/review';
  private articles: Article[] = [];
  private selectedArticle: Article | undefined;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data.content as Article[]),
      tap((articles) => {
        this.articles = articles;
        console.log('Articles from server:', articles);
      }),
      catchError((error) => {
        console.error('Error fetching articles:', error);
        return throwError(error);
      })
    );
  }
  

  setSelectedArticle(articleId: number): void {
    this.selectedArticle = this.articles.find((article) => article.id === articleId);
  }

  getSelectedArticle(): Article | undefined {
    return this.selectedArticle;
  }
}
