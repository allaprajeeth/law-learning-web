import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { LoginService } from '../../components/login/services/login.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  excludedUrls = ['login','signup'];
  
  constructor(private authTokenService: AuthTokenService, private loginService: LoginService, private router: Router ) {}

  isValidUrl(url: string): boolean {
    let anyUrl = this.excludedUrls?.filter((endpoint: string) => url.includes(endpoint))?.[0]
    return !!anyUrl;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(this.isValidUrl(request.url)){// need to work further
      return next.handle(request.clone());
    }else{
      return this.handleRequest(request, next);
    }
  }

  private handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken && jwtToken.length > 0) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return next.handle(modifiedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.handleUnauthorizedError(error);
          } else {
            return throwError(error);
          }
        })
      );
    } else {
      return next.handle(request.clone());
    }
  }

  private handleUnauthorizedError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    // Clear authentication token or perform other actions as needed
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userDetails');
    this.router.navigate(['/login']);
    return throwError(error);
  }
}
