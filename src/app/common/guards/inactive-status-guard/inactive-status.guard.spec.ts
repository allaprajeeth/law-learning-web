import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { inactiveStatusGuard } from './inactive-status.guard';

describe('inactiveStatusGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => inactiveStatusGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
