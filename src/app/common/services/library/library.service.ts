import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoints } from '../../constants/endpoints';
import { Library } from '../../models/library.model';
import { BaseService } from '../base-service/base-service.service';
import { HttpResponse } from '../../models/response.model';
import { Observable, throwError  } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LibraryService extends BaseService<Library>{
  // getFileContent(url: string) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private http: HttpClient) {
    const baseUrl = endPoints.baseURL;
    super(http, HttpResponse<Library>, baseUrl);
  }

  getFileContent(fileUrl: string): Observable<string> {
    const fileContentUrl = `${endPoints.baseURL}/downloadFile?path=${encodeURIComponent(fileUrl)}`;
    
    return this.http.get(fileContentUrl, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error fetching file content:', error);
          return throwError(error);
        })
      );
  }
  
  
  
  // getFileContent(fileUrl: string | undefined): Observable<string> {
  //   if (!fileUrl) {
  //     return throwError('File URL is undefined.');  // or handle it as needed
  //   }
  
  //   const fileContentUrl = `${endPoints.baseURL}/downloadFile?path=${encodeURIComponent(fileUrl)}`;
    
  //   return this.http.get(fileContentUrl, { responseType: 'text' }).pipe(
  //     catchError((error) => {
  //       console.error('Error fetching file content:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
  
}
