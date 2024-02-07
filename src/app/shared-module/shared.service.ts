// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private contactUsClickedSource = new Subject<void>();
  private userDetailsSubject = new BehaviorSubject<{ name: string, email: string, phone: string } | null>(null);
  private showLogoutAlertSubject = new BehaviorSubject<boolean>(false);

  contactUsClicked$ = this.contactUsClickedSource.asObservable();
  showLogoutAlert$ = this.showLogoutAlertSubject.asObservable();

  setUserDetails(name: string, email: string, phone: string): void {
    this.userDetailsSubject.next({ name, email, phone });
  }

  getUserDetails(): Observable<{ name: string, email: string, phone: string } | null> {
    return this.userDetailsSubject.asObservable();
  }

  emitContactUsClicked(): void {
    this.contactUsClickedSource.next();
  }

  // Make sure to return an observable here
  onContactUsClicked(): Observable<void> {
    return this.contactUsClicked$;
  }

  setShowLogoutAlert(value: boolean): void {
    this.showLogoutAlertSubject.next(value);
  }
}
