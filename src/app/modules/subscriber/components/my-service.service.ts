import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor() { }

  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  openDialog() {
    this.isOpenSubject.next(true);
  }

  closeDialog() {
    this.isOpenSubject.next(false);
  }
}
