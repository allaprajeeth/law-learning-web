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

   isTestAvailable: boolean =true;
  setIsTestAvailable(value: boolean) {
    this.isTestAvailable = value;
  }

  getIsTestAvailable(): boolean {
    return this.isTestAvailable;
  }
 
  private countdownKey = 'countdownValue';

  setCountdownValue(value: number): void {
    localStorage.setItem(this.countdownKey, value.toString());
  }

  getCountdownValue(): number | null {
    const value = localStorage.getItem(this.countdownKey);
    return value ? parseInt(value, 10) : null;
  }

  clearCountdownValue(): void {
    localStorage.removeItem(this.countdownKey);
  }
}
