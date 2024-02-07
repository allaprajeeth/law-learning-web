import { TestBed } from '@angular/core/testing';

import { FetcharticlesService } from './fetcharticles.service';

describe('FetcharticlesService', () => {
  let service: FetcharticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetcharticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
