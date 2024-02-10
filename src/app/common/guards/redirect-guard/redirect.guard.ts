import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { UserModel } from '../../models/user.model';

export const redirectGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthTokenService);
  const router = inject(Router);
  const user: UserModel|null = authService.getUserDetails();
  //const url = authService.getCurrentRouteURL(route);
  //console.log(url);
  if (authService.isLoggedIn()) {
    if(user && user.role) {
      switch (user.role){
        case 'ADMIN':
          router.navigate(['/admin']);
          break;
        case 'REVIEWER':
          router.navigate(['/reviewer']);
          break;
        case 'INSTRUCTOR':
          router.navigate(['/instructor']);
          break;
        case 'SUBSCRIBER':
          router.navigate(['/subscriber']);
          break;
        case 'CONTENTMANAGER':
          router.navigate(['/authentication']);
          break;     
      }
      return true;
    }
    return createUrlTreeFromSnapshot(route, ['']);
  }
  return true;
};
