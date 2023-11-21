import { TestBed } from '@angular/core/testing';

import { ForgotPhoneService } from './forgot-phone.service';

describe('ForgotPhoneService', () => {
  let service: ForgotPhoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPhoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
