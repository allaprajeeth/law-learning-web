import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, tap } from 'rxjs';
import { ApiService } from 'src/app/common/services/api/api.service';
import { LoggingService } from 'src/app/common/services/logging/logging.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';
import { endPoints } from 'src/app/common/api-layer/endpoints';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from '../store/auth.reducer';
 
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  validationKey$: BehaviorSubject<string> = new BehaviorSubject('');
  loggedInUserEmail$: BehaviorSubject<string> = new BehaviorSubject('');
  
 
  constructor(
    private apiService: ApiService,
    public authTokenService: AuthTokenService,
    private loggingService: LoggingService,
    private notificationService: NotificationService,
    private store: Store<fromAuth.AuthState>
   
  ) {}

  setUserInfoInLocalStorage(email: string, name: string, phone: string) {
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('loggedInUserName', name);
    localStorage.setItem('loggedInUserPhone', phone);
  }

  getAuthTokenService(): AuthTokenService {
    return this.authTokenService;
  }
 
  sendOtpClick(data: any): Observable<any> {
    let url = endPoints.baseApi + endPoints.loginRequest;
    return this.apiService.post(url, data).pipe(
      tap((response: any) => {
        if (!!response) {
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
 
  loginClick(data: any): Observable<any> {
    let url = endPoints.baseApi + endPoints.loginComplete;
    return this.apiService.post(url, data).pipe(
      tap((response: any) => {
        if (!!response) {

          this.authTokenService.jwtToken$.next(response.data.jwt_token);
          console.log('JWT Token after login:', response.data.jwt_token);

          this.loggedInUserEmail$.next(data.email);
  
          // Store data in localStorage
          localStorage.setItem('jwtToken', response.data.jwt_token);

          localStorage.setItem('userDetails',JSON.stringify(response.data.user));
  
          this.store.dispatch(AuthActions.loginSuccess({
            user: {
              jwtToken: response.data.jwt_token,
              userEmail: data.email,
              name: response.data.user.name,
              phone: response.data.user.phone
            }
          }));
          this.notificationService.notify(`Login Successfull`);
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