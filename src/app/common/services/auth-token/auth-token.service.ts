// auth-token.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  // Change the access modifier from private to public
  public jwtToken$ = new BehaviorSubject('');

  getCurrentToken(): string {
    return this.jwtToken$.value;
  }
  constructor() { }
}
