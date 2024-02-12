import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, tap } from 'rxjs';
import { endPoints } from 'src/app/common/api-layer/endpoints';
import { ApiService } from 'src/app/common/services/api/api.service';
import { LoggingService } from 'src/app/common/services/logging/logging.service';
import { NotificationService } from 'src/app/common/services/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotEmailService {

  constructor(
    private apiService: ApiService,
    //private authTokenService: AuthTokenService,
    private loggingService: LoggingService,
    private notificationService: NotificationService
  ) { }

  validationKey$: BehaviorSubject<string> = new BehaviorSubject('');

  sendOtp(data: any): Observable<any> {
    let url = endPoints.baseURL + endPoints.auth + endPoints.forgotEmail;
    return this.apiService.post(url, data).pipe(
      tap((response: any) => {
        if (!!response && !!response?.message) {
          this.validationKey$.next(response.data.validation_key);
          this.notificationService.notify(`OTP's sent successfully`);
        }
      }),
      catchError((errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          this.loggingService.log(errorResponse?.error?.error.message);
          this.notificationService.notify(errorResponse?.error?.error.message);
        }
        return EMPTY;
      })
    );
  }

  verifyotp(data: any): Observable<any> {
    let url = endPoints.baseURL + endPoints.auth + endPoints.forgotEmail;
    return this.apiService.post(url, data).pipe(
      tap((response: any) => {
        if (!!response && !!response?.message) {
          this.notificationService.notify(`OTP's verified successfully`);
        }
      }),
      catchError((errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          this.loggingService.log(errorResponse?.error?.error.message);
          this.notificationService.notify(errorResponse?.error?.error.message);
        }
        return EMPTY;
      })
    );
  }
  sendOtpEmail(data: any): Observable<any> {
    let url = endPoints.baseURL + endPoints.auth + endPoints.forgotEmail;
    return this.apiService.post(url, data).pipe(
      tap((response: any) => {
        if (!!response && !!response?.message) {
          this.validationKey$.next(response.data.validation_key);
          this.notificationService.notify(`Email OTP sent successfully`);
        }
      }),
      catchError((errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          this.loggingService.log(errorResponse?.error?.error.message);
          this.notificationService.notify(errorResponse?.error?.error.message);
        }
        return EMPTY;
      })
    );
  }
 
  verifyotpEmail(data: any): Observable<any> {
    let url = endPoints.baseURL + endPoints.auth + endPoints.forgotEmail;
    return this.apiService.post(url, data).pipe(
      tap((response: any) => {
        if (!!response && !!response?.message) {
          this.notificationService.notify('Your Details Successfully Updated. Login with new  credentials.');
        }
      }),
      catchError((errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          this.loggingService.log(errorResponse?.error?.error.message);
          this.notificationService.notify(errorResponse?.error?.error.message);
        }
        return EMPTY;
      })
    );
  }

}
