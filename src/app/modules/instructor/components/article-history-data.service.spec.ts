import { TestBed } from '@angular/core/testing';

import { ArticleHistoryDataService } from './article-history-data.service';

describe('ArticleHistoryDataService', () => {
  let service: ArticleHistoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleHistoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
