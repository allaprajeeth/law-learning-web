import { TestBed } from '@angular/core/testing';

import { ArticleformService } from './articleform.service';

describe('ArticleformService', () => {
  let service: ArticleformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
