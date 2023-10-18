import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  showLogoutAlert: boolean = false;

  constructor() { }
  // private popupMessageSubject = new BehaviorSubject<string>('');
  // public popupMessage$ = this.popupMessageSubject.asObservable();

  // private popupVisibilitySubject = new BehaviorSubject<boolean>(false);
  // public popupVisibility$ = this.popupVisibilitySubject.asObservable();

  // showPopup(message: string) {
  //   this.popupMessageSubject.next(message);
  //   this.popupVisibilitySubject.next(true);

  //   setTimeout(() => {
  //     this.popupVisibilitySubject.next(false);
  //   }, 5000);
  // }
}
