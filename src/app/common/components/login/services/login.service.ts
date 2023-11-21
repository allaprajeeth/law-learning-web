import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { endPoints } from 'src/app/common/api-layer/endpoints';
import { ApiService } from 'src/app/common/services/api/api.service';
import { LoggingService } from 'src/app/common/services/logging/logging.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  validationKey$: BehaviorSubject<string> = new BehaviorSubject('');
  // validationKey: string='';
  loggedInUserEmail$:BehaviorSubject<string> = new BehaviorSubject('');
  

  constructor(
    private apiService: ApiService,
    private authTokenService: AuthTokenService,
    private loggingService: LoggingService,
    private notificationService: NotificationService
  ) {}

  sendOtpLogin(data: any): Observable<any> {
    let url = endPoints.baseApi + endPoints.loginRequest;
    return this.apiService.post(url, data).pipe(
      tap((response: any) => {
        if (!!response && !!response?.message) {
          this.validationKey$.next(response.data.validation_key);
          this.notificationService.notify(`OTP's sent successfully`);
        }
      }),
      catchError((errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          // console.log("@@error", errorResponse);
          this.loggingService.log(errorResponse?.error?.error.message);
          this.notificationService.notify(errorResponse?.error?.error.message);
        }
        return EMPTY;
      })
    );
  }

  loginpage(data: any): Observable<any> {
    let url = endPoints.baseApi + endPoints.loginComplete;
    return this.apiService.post(url, data).pipe(
      tap((response: any) => {
        if (!!response && !!response?.message) {
         this.authTokenService.jwtToken$.next(response.data.jwt_token);
          this.loggedInUserEmail$.next(data.email)
          this.notificationService.notify(`Login Successfull`);
          
        }
      }),
      catchError((errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          // console.log("@@error", errorResponse);
          this.loggingService.log(errorResponse?.error?.error.message);
          this.notificationService.notify(errorResponse?.error?.error.message);
        }
        return EMPTY;
      })
    );
  }
  // getEmail(): string {
  //   return this.loggedInUserEmail$.value;
  // }
}
