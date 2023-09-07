import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoadingService } from '../../services/loading/loading.service';

export const loadingGuard: CanActivateFn = (route, state) => {
  const loadingService = inject(LoadingService);
  // Show the loading spinner
  loadingService.show();
  return true;
};
