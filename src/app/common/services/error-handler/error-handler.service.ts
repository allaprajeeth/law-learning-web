import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  handleError(error: any): void {
    // Log the error
    console.error(error);
  }
}
