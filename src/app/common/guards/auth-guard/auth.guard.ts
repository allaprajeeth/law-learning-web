import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { UserModel } from '../../models/user.model';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthTokenService);
  const router = inject(Router);
  const user: UserModel|null = authService.getUserDetails();
  if (authService.isLoggedIn() && user && user.id) {
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
  
  return createUrlTreeFromSnapshot(route, ['/', 'login']);
};
