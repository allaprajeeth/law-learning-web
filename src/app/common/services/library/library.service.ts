import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoints } from '../../constants/endpoints';
import { Library } from '../../models/library.model';
import { BaseService } from '../base-service/base-service.service';
import { HttpResponse } from '../../models/response.model';
import { Observable, throwError } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';
import { Pagination } from 'src/app/common/models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class LibraryService extends BaseService<Library> {
  libraries: Library[] = [];
  pagination: Pagination = new Pagination();
  constructor(private http: HttpClient) {
    const baseUrl = endPoints.baseURL;
    super(http, HttpResponse<Library>, baseUrl);
  }

  getFileContent(fileUrl: string): Observable<string> {
    const fileContentUrl = `${
      endPoints.baseURL
    }/downloadFile?path=${encodeURIComponent(fileUrl)}`;

    return this.http.get(fileContentUrl, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error fetching file content:', error);
        return throwError(error);
      })
    );
  }
  loadLibraries(params: any) {
    this.libraries = [];
    this.get(params, endPoints.libraries).subscribe(
      (response: HttpResponse<Library>) => {
        for (const record of response.records) {
          // Add properties to control file content visibility and store file content
          record.showFileContent = false;
          record.fileContent = '';
          this.libraries.push(record);
        }
        this.pagination = new Pagination(response.pagination);
      }
    );
  }
}
