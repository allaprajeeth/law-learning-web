import { TestBed } from '@angular/core/testing';

import { ArticleStatusDataService } from './article-status-data.service';

describe('ArticleStatusDataService', () => {
  let service: ArticleStatusDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleStatusDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
