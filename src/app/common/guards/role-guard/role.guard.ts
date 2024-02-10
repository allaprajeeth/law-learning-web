import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { inject } from '@angular/core';
import { UserModel } from '../../models/user.model';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthTokenService);
  const allowedRoles = route.data['roles'] as Array<string>;
  if (authService.hasAnyRole(allowedRoles)) {
    return true;
  } else {
    // Redirect or handle unauthorized access
    return createUrlTreeFromSnapshot(route, ['/']);
  }
};
