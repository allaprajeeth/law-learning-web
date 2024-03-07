import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  name: string | undefined;
  email: string | undefined;
  phoneno: string | undefined;
  jwtToken: string | null = null;

  constructor() {}

  getUserInfoFromLocalStorage(): void {
    const userDetailsString = localStorage.getItem('userDetails');
    this.jwtToken = localStorage.getItem('jwtToken');

    if (userDetailsString) {
      try {
        const userDetails = JSON.parse(userDetailsString);

        if (userDetails && userDetails.name && userDetails.email && userDetails.phone) {
          this.name = userDetails.name;
          this.email = userDetails.email;
          this.phoneno = userDetails.phone;
        } else {
          console.error('Invalid user details format:', userDetails);
        }
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
}
}
