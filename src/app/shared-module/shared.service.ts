// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private contactUsClickedSource = new Subject<void>();

  contactUsClicked$ = this.contactUsClickedSource.asObservable();

  emitContactUsClicked(): void {
    this.contactUsClickedSource.next();
  }

  // Make sure to return an observable here
  onContactUsClicked(): Observable<void> {
    return this.contactUsClicked$;
  }
}
