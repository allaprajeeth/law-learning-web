import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${'<jwt-token>'}`,
      },
    });

    return next.handle(modifiedRequest);
  }
}
