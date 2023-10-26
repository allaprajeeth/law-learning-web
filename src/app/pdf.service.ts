import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }

  getPdfUrl(pdfName: string): Observable<Blob> {
    const pdfUrl = `assets/pdfs/${pdfName}.pdf`;
    return this.http.get(pdfUrl, { responseType: 'blob' });
  }
}
