import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { LoginService } from '../../components/login/services/login.service';
// import { LogoutService } from '../logout.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  excludedUrls = ['login','signup'];
  
  constructor(private authTokenService: AuthTokenService, private loginService: LoginService ) {}

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
      const jwtToken=  localStorage.getItem('jwtToken');
      if(jwtToken && jwtToken.length > 0) {
        let modifiedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        return next.handle(modifiedRequest);
      }
      return next.handle(request.clone());
    }
  }
}
