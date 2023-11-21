import { TestBed } from '@angular/core/testing';

import { ForgotEmailService } from './forgot-email.service';

describe('ForgotEmailService', () => {
  let service: ForgotEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
