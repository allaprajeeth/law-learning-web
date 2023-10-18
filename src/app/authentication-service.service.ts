import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor() { }

  private loginIsSuccessful = false;

  login() {
    // Implement your login logic here, e.g., making an API call, validating credentials, etc.
    // Set loginIsSuccessful to true if login is successful.
    this.loginIsSuccessful = true;
  }

  logout() {
    // Implement your logout logic here, e.g., clearing tokens, session, etc.
    // Set loginIsSuccessful to false when the user logs out.
    this.loginIsSuccessful = false;
  }

  isLoggedIn() {
    return this.loginIsSuccessful;
  }

}
