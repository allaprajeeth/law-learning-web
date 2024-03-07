import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, tap } from 'rxjs';
import { ApiService } from 'src/app/common/services/api/api.service';
import { LoggingService } from 'src/app/common/services/logging/logging.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Router } from '@angular/router';

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
    private router: Router,
    
  ) {}

 

  getAuthTokenService(): AuthTokenService {
    return this.authTokenService;
  }

  sendOtpClick(data: any): Observable<any> {
    let url = endPoints.baseURL + endPoints.auth + endPoints.loginRequest;
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
    let url = endPoints.baseURL + endPoints.auth + endPoints.loginComplete;
    return this.apiService.post(url, data).pipe(
      tap((response: any) => {
        if (!!response) {
          localStorage.setItem('jwtToken', response.data.jwt_token);
          localStorage.setItem(
            'userDetails',
            JSON.stringify(response.data.user)
          );
          const userDetailsObject=localStorage.getItem("userDetails")
         console.log("user details " , userDetailsObject)
          this.notificationService.notify(`Login Successfull`);

          const role: string = response.data.user.role;

          switch (role) {
            case 'CONTENTMANAGER':
              this.router.navigate(['authentication/homepage']);
              // console.log('User Role:', role);
              break;

            case 'ADMIN':
              this.router.navigate(['admin/homepage']);
              console.log('User Role:', role);
              break;

            case 'INSTRUCTOR':
              this.router.navigate(['instructor/homepage']);
              console.log('User Role:', role);
              break;

            case 'SUBSCRIBER':
              this.router.navigate(['subscriber/homepage']);
              console.log('User Role:', role);
              break;

            case 'REVIEWER':
              this.router.navigate(['reviewer/homepage']);
              console.log('User Role:', role);
              break;

            // Add more cases for other roles as needed

            default:
              break;
          }
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
