import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new Subject<string>();

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  showError(message: string) {
    this.errorSubject.next(message);
  }

  hideError() {
    this.errorSubject.next('');
  }
}
