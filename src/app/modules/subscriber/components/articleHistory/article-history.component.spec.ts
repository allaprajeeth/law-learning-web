import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHistoryComponent } from './article-history.component';

describe('ArticleHistoryComponent', () => {
  let component: ArticleHistoryComponent;
  let fixture: ComponentFixture<ArticleHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleHistoryComponent]
    });
    fixture = TestBed.createComponent(ArticleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
