import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishArticlesComponent } from './publish-articles.component';

describe('PublishArticlesComponent', () => {
  let component: PublishArticlesComponent;
  let fixture: ComponentFixture<PublishArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishArticlesComponent]
    });
    fixture = TestBed.createComponent(PublishArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
