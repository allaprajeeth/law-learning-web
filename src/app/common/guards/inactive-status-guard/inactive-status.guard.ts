import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, createUrlTreeFromSnapshot } from '@angular/router';
import { UserModel } from '../../models/user.model';

export const inactiveStatusGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const userDetailsString = localStorage.getItem('userDetails');
  
  if (userDetailsString) {
    const userDetails: UserModel = JSON.parse(userDetailsString);

    if (userDetails.status === 'INACTIVE') {
      // Allow access only to the revert-delete route
      if (state.url.includes('/revert-delete')) {
        return true;
      }
      // Redirect to revert-delete route if trying to access any other route
      return router.parseUrl('/revert-delete');
    }

    // If user is active, allow access to any route
    return true;
  }

  // Handle scenario where userDetails are not found in localStorage
  return createUrlTreeFromSnapshot(route, ['/', 'login']);
};
