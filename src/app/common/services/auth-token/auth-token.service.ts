// auth-token.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../../models/user.model';

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

  isLoggedIn() {
    // Get token from local storage
    const jwtToken = localStorage.getItem('jwtToken');
    if(jwtToken && jwtToken.length > 0) {
        // Decode payload of token
        const payload = atob(jwtToken.split('.')[1]);
        // Convert payload into an Object
        const parsedPayload = JSON.parse(payload);
        // Check if token is expired
        return parsedPayload.exp > Date.now() / 1000;
    }
    return false;
  }

  getUserDetails(): UserModel | null {
    const user = localStorage.getItem('userDetails');
    if(!user) return null;
    return Object.assign(new UserModel(), JSON.parse(user));
  }

  hasAnyRole(roles: string[]): boolean {
    if(this.isLoggedIn()) {
      const user: UserModel|null = this.getUserDetails();
      if(user && user.id) {
        return roles.includes(user.role);
      }
    }
    return false;
  }
}
