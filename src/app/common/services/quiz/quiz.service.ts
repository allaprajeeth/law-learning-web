import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { endPoints } from '../../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) {}

  getQuiz(courseId: number) {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = `${baseUrl}/course/${courseId}/quiz`;

    return this.http.get<any>(apiUrl).pipe(
      catchError(error => {
        // Handle HTTP errors
        console.error('Error fetching quiz:', error);
        return throwError(error);
      })
    );
  }
}
