import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleStatusComponent } from './article-status.component';

describe('ArticleStatusComponent', () => {
  let component: ArticleStatusComponent;
  let fixture: ComponentFixture<ArticleStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleStatusComponent]
    });
    fixture = TestBed.createComponent(ArticleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
