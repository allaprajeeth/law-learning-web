import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }
  
  private isAcceptButtonClickedSubject = new BehaviorSubject<boolean>(false);
  isAcceptButtonClicked$ = this.isAcceptButtonClickedSubject.asObservable();
   setAcceptButtonClicked(value: boolean) {
    this.isAcceptButtonClickedSubject.next(value);
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
