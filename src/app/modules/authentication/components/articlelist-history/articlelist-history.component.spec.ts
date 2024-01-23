import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlelistHistoryComponent } from './articlelist-history.component';

describe('ArticlelistHistoryComponent', () => {
  let component: ArticlelistHistoryComponent;
  let fixture: ComponentFixture<ArticlelistHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlelistHistoryComponent]
    });
    fixture = TestBed.createComponent(ArticlelistHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
