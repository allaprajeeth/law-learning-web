import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { endPoints } from 'src/app/common/constants/endpoints';
import { ApiService } from 'src/app/common/services/api/api.service';
import { LoggingService } from 'src/app/common/services/logging/logging.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserDetailsService } from 'src/app/common/services/user-details/user-details.service';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';
@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private apiService: ApiService,
    private loggingService: LoggingService,
    private userDetailsService: UserDetailsService,
    private router: Router,
    private sharedService: PopupService,
  ) {}

  name: string | undefined;
  email: string | undefined;
  phoneno: string | undefined;
  jwtToken: string | null = null;

  logOutUser(): Observable<any> {
    this.userDetailsService.getUserInfoFromLocalStorage();
    this.name = this.userDetailsService.name;
    this.email = this.userDetailsService.email;
    this.phoneno = this.userDetailsService.phoneno;
    this.jwtToken = this.userDetailsService.jwtToken;

    const logoutData = {
      token: this.jwtToken,
      email: this.email,
    };
    let url = endPoints.baseURL + endPoints.auth + endPoints.logout;
    return this.apiService.post(url, logoutData).pipe(
      tap((response: any) => {
        if (!!response) {
         
          localStorage.removeItem('userDetails');
          localStorage.removeItem('jwtToken');
          this.router.navigate(['/header']);
          this.sharedService.showLogoutAlert = true;
          setTimeout(() => {
            this.sharedService.showLogoutAlert = false;
          }, 5000);
        }
      }),
      catchError((errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          this.loggingService.log(errorResponse?.error?.error.message);
          console.log(errorResponse?.error?.error.message);
        }
        return EMPTY;
      })
    );
  }
}
