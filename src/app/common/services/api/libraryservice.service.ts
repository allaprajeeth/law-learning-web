import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibraryserviceService {

  private apiUrl = 'http://192.168.1.42:8080/api/v1/auth/';

  constructor(private httpClient: HttpClient) { }

  // Fetches the list of items from the library
  getLibrary(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/api/v1/libraries`);
  }

  // Handles the uploading of a PDF file to the library
  uploadPdf(pdfFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('pdfFile', pdfFile, pdfFile.name);
    return this.httpClient.post(`${this.apiUrl}/api/v1/libraries/upload`, formData);
  }
}
