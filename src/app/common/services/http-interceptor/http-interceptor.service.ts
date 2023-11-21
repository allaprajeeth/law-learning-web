import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthTokenService } from '../auth-token/auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  excludedUrls = ['login','signup'];

  constructor(private authTokenService: AuthTokenService) {}

  isValidUrl(url: string){
    let anyUrl = this.excludedUrls?.filter((endpoint: string) => url.includes(endpoint))?.[0]
    return !!anyUrl;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedRequest;
    if(this.isValidUrl(request.url)){// need to work further
      modifiedRequest = request.clone();
    }else{
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authTokenService.jwtToken$.value}`,
        },
      });
    }

    return next.handle(modifiedRequest);
  }
}
