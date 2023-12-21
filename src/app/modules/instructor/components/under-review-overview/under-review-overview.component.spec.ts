import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderReviewOverviewComponent } from './under-review-overview.component';

describe('UnderReviewCommentedOverviewComponent', () => {
  let component: UnderReviewOverviewComponent;
  let fixture: ComponentFixture<UnderReviewOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnderReviewOverviewComponent]
    });
    fixture = TestBed.createComponent(UnderReviewOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
