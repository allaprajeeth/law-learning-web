import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  errorMessage$ = new BehaviorSubject(null);

  handleError(error: any): void {
    // Log the error
    console.error(error);
    this.errorMessage$.next(error);
  }
}
