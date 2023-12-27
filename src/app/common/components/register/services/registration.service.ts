import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { endPoints } from 'src/app/common/api-layer/endpoints';
import { ApiService } from 'src/app/common/services/api/api.service';
import { LoggingService } from 'src/app/common/services/logging/logging.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  validationKey$: BehaviorSubject<string> = new BehaviorSubject('');
  // validationKey: string='';

  constructor(private apiService: ApiService,
    private loggingService: LoggingService,
    private notificationService:NotificationService) { }

  sendOtpSignup(data: any): Observable<any>{
    let url = endPoints.baseApi+endPoints.signUp;
    return this.apiService.post(url, data)
    .pipe(
     
      tap((response: any) => {
        if(!!response ){
          this.validationKey$.next(response.data.validation_key);
          this.notificationService.notify(`OTP's sent successfully`)
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
    )
  }

  signUppage(data: any): Observable<any>{
    let url = endPoints.baseApi+endPoints.signUpComplete;
    return this.apiService.post(url, data)
    .pipe(
      tap((response: any) => {
        if(!!response ){
          this.notificationService.notify(`User Registered Successfully`)
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
      
    )

  }


}
