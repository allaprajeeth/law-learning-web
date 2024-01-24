import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFileComponent } from './article-file.component';

describe('ArticleFileComponent', () => {
  let component: ArticleFileComponent;
  let fixture: ComponentFixture<ArticleFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleFileComponent]
    });
    fixture = TestBed.createComponent(ArticleFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
